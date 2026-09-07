import express from 'express'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDb, nextId, save } from './db.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

// ponytail: sabit dev secret — canlıya çıkarken ortam değişkenine taşı
const JWT_SECRET = process.env.JWT_SECRET || 'sports-site-dev-secret'
const COOKIE = 'sports_token'

function publicUser(u) {
  const { password, ...rest } = u
  return rest
}

function auth(req, res, next) {
  const token = req.cookies[COOKIE]
  if (!token) return res.status(401).json({ error: 'Not logged in' })
  try {
    req.user = getDb().users.find((u) => u.id === jwt.verify(token, JWT_SECRET).id)
    if (!req.user) throw new Error()
    next()
  } catch {
    res.status(401).json({ error: 'Invalid session' })
  }
}

// ---- Auth ----
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })
  const db = getDb()
  if (db.users.some((u) => u.email === email)) return res.status(409).json({ error: 'Email already registered' })
  const user = {
    id: nextId(),
    role: 'user',
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    created: new Date().toISOString().slice(0, 10),
    phone: '',
    documents: {},
  }
  db.users.push(user)
  save()
  res.json(publicUser(user))
})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const user = getDb().users.find((u) => u.email === email)
  if (!user || !bcrypt.compareSync(password || '', user.password))
    return res.status(401).json({ error: 'Wrong email or password' })
  if (user.role === 'agent' && user.approvalStatus === 'pending')
    return res.status(403).json({ error: 'Your agent access request is awaiting admin approval' })
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: 'lax' })
  res.json(publicUser(user))
})

app.post('/api/logout', (req, res) => {
  res.clearCookie(COOKIE)
  res.json({ ok: true })
})

app.get('/api/me', auth, (req, res) => res.json(publicUser(req.user)))

app.put('/api/profile', auth, (req, res) => {
  const db = getDb()
  const user = db.users.find((u) => u.id === req.user.id)
  const { name, email, phone, avatar, avatarPosition } = req.body
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' })
  if (db.users.some((u) => u.id !== user.id && u.email === email)) return res.status(409).json({ error: 'Email already registered' })
  Object.assign(user, { name, email, phone: phone || '', avatar: avatar || user.avatar, avatarPosition: avatarPosition || user.avatarPosition })
  save()
  res.json(publicUser(user))
})

app.put('/api/profile/password', auth, (req, res) => {
  const { password } = req.body
  if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' })
  const user = getDb().users.find((u) => u.id === req.user.id)
  user.password = bcrypt.hashSync(password, 10)
  save()
  res.json({ ok: true })
})

app.put('/api/profile/documents/:kind', auth, (req, res) => {
  const { name, data } = req.body
  if (!data || !data.startsWith('data:application/pdf')) return res.status(400).json({ error: 'A PDF document is required' })
  const user = getDb().users.find((u) => u.id === req.user.id)
  user.documents ??= {}
  user.documents[req.params.kind] = { name: name || `${req.params.kind}.pdf`, data }
  save()
  res.json({ ok: true, document: user.documents[req.params.kind] })
})

app.post('/api/agent-requests', auth, (req, res) => {
  const db = getDb()
  if (req.user.role !== 'user') return res.status(403).json({ error: 'Only user accounts can request agent access' })
  if (db.agentRequests.some((request) => request.userId === req.user.id && request.status === 'pending'))
    return res.status(409).json({ error: 'An agent request is already pending' })
  const { agentType, orgName, phone, reason } = req.body
  const request = { id: nextId(), userId: req.user.id, agentType, orgName: orgName || '', phone: phone || '', reason: reason || '', status: 'pending', created: new Date().toISOString().slice(0, 10) }
  db.agentRequests.push(request)
  save()
  res.json(request)
})

app.get('/api/currency-rates', async (_req, res) => {
  const currencies = ['EUR', 'USD', 'GBP', 'AUD', 'DKK', 'SEK', 'CHF', 'JPY']
  try {
    const response = await fetch(`https://api.frankfurter.app/latest?from=TRY&to=${currencies.join(',')}`)
    if (!response.ok) throw new Error('Currency service unavailable')
    const data = await response.json()
    res.json(currencies.map((currency) => {
      const rate = 1 / Number(data.rates[currency])
      return [currency, (rate * 0.995).toFixed(4), (rate * 1.005).toFixed(4)]
    }))
  } catch {
    res.status(503).json({ error: 'Currency rates unavailable' })
  }
})

// ---- Events ----
app.get('/api/events', (req, res) => {
  res.json(getDb().events.filter((e) => e.status === 'active'))
})

app.get('/api/events/:id', (req, res) => {
  const e = getDb().events.find((x) => x.id === Number(req.params.id))
  if (!e) return res.status(404).json({ error: 'Event not found' })
  const agent = getDb().users.find((u) => u.id === e.agentId)
  res.json({ ...e, agent: agent ? publicUser(agent) : null })
})

// ---- Registration (sahte ödeme: anında completed) ----
app.post('/api/events/:id/register', auth, (req, res) => {
  const db = getDb()
  const e = db.events.find((x) => x.id === Number(req.params.id))
  if (!e) return res.status(404).json({ error: 'Event not found' })
  if (e.taken >= e.capacity) return res.status(400).json({ error: 'Event is full' })
  if (db.registrations.some((r) => r.userId === req.user.id && r.eventId === e.id))
    return res.status(409).json({ error: 'Already registered' })
  e.taken++
  const reg = {
    id: nextId(),
    userId: req.user.id,
    eventId: e.id,
    status: 'REGISTERED',
    paid: e.price,
    date: new Date().toDateString(),
  }
  db.registrations.push(reg)
  db.notifications.push({
    id: nextId(),
    userId: req.user.id,
    text: `Registered to ${e.name} successfully`,
    time: 'just now',
    dot: 'blue',
  })
  save()
  res.json(reg)
})

app.delete('/api/events/:id/registration', auth, (req, res) => {
  const db = getDb()
  const e = db.events.find((x) => x.id === Number(req.params.id))
  if (!e) return res.status(404).json({ error: 'Event not found' })
  const i = db.registrations.findIndex((r) => r.userId === req.user.id && r.eventId === e.id)
  if (i === -1) return res.status(404).json({ error: 'Not registered' })
  db.registrations.splice(i, 1)
  if (e.taken > 0) e.taken--
  db.notifications.push({
    id: nextId(),
    userId: req.user.id,
    text: `Your registration for ${e.name} was cancelled. Refund will be processed.`,
    time: 'just now',
    dot: 'red',
  })
  save()
  res.json({ ok: true })
})

app.get('/api/my/registrations', auth, (req, res) => {
  const db = getDb()
  res.json(
    db.registrations
      .filter((r) => r.userId === req.user.id)
      .map((r) => ({ ...r, event: db.events.find((e) => e.id === r.eventId) })),
  )
})

// Dashboard: kayıtlar + üyelikler + işlem geçmişi tek çağrıda
app.get('/api/my/dashboard', auth, (req, res) => {
  const db = getDb()
  const regs = db.registrations
    .filter((r) => r.userId === req.user.id)
    .map((r) => ({ ...r, event: db.events.find((e) => e.id === r.eventId) }))
  const memberships = db.memberships
    .filter((m) => m.userId === req.user.id)
    .map((m) => {
      const agent = db.users.find((u) => u.id === m.agentId)
      return { ...m, agentName: agent?.orgName || agent?.name, agentType: agent?.agentType }
    })
  const transactions = regs.map((r) => ({
    id: r.id,
    date: r.date,
    type: r.paid === 0 ? 'Event (Free)' : 'Event',
    to: r.event?.name ?? 'Unknown event',
    amount: `€${r.paid}.00`,
    status: 'COMPLETED',
  }))
  res.json({ registrations: regs, memberships, transactions })
})

app.get('/api/my/notifications', auth, (req, res) => {
  res.json(getDb().notifications.filter((n) => n.userId === req.user.id).reverse())
})

// ---- Favourites (toggle) ----
app.post('/api/events/:id/favourite', auth, (req, res) => {
  const db = getDb()
  const eventId = Number(req.params.id)
  if (!db.events.some((e) => e.id === eventId)) return res.status(404).json({ error: 'Event not found' })
  const i = db.favourites.findIndex((f) => f.userId === req.user.id && f.eventId === eventId)
  if (i === -1) db.favourites.push({ userId: req.user.id, eventId })
  else db.favourites.splice(i, 1)
  save()
  res.json({ fav: i === -1 })
})

app.get('/api/my/favourites', auth, (req, res) => {
  const db = getDb()
  const ids = db.favourites.filter((f) => f.userId === req.user.id).map((f) => f.eventId)
  res.json(db.events.filter((e) => ids.includes(e.id)))
})

// ---- Attended events + reviews ----
// ponytail: "attended" = kayıtlı olduğu tüm etkinlikler — gerçek tarih kontrolü yok,
// event.date serbest metin; tarih ISO'ya geçince Date karşılaştırması ekle
app.get('/api/my/attended', auth, (req, res) => {
  const db = getDb()
  res.json(
    db.registrations
      .filter((r) => r.userId === req.user.id && r.status === 'REGISTERED')
      .map((r) => {
        const e = db.events.find((x) => x.id === r.eventId)
        const rev = db.reviews.find((x) => x.userId === req.user.id && x.eventId === r.eventId)
        return { id: e.id, name: e.name, date: e.date, city: e.city, rating: rev?.rating ?? 0, review: rev?.text ?? null }
      }),
  )
})

app.put('/api/events/:id/review', auth, (req, res) => {
  const db = getDb()
  const eventId = Number(req.params.id)
  const rating = Number(req.body.rating)
  const text = (req.body.text || '').trim()

  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    return res.status(400).json({ error: 'Rating must be 1-5' })
  if (text.length > 1000) return res.status(400).json({ error: 'Review too long' })
  const attended = db.registrations.some(
    (r) => r.userId === req.user.id && r.eventId === eventId && r.status === 'REGISTERED',
  )
  if (!attended) return res.status(400).json({ error: 'You can only review events you attended' })

  const rev = db.reviews.find((x) => x.userId === req.user.id && x.eventId === eventId)
  if (rev) Object.assign(rev, { rating, text })
  else db.reviews.push({ id: nextId(), userId: req.user.id, eventId, rating, text, date: new Date().toDateString() })
  save()
  res.json({ eventId, rating, text })
})

app.delete('/api/events/:id/review', auth, (req, res) => {
  const db = getDb()
  const i = db.reviews.findIndex((x) => x.userId === req.user.id && x.eventId === Number(req.params.id))
  if (i !== -1) db.reviews.splice(i, 1)
  save()
  res.json({ ok: true })
})

function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden' })
    next()
  }
}

// ---- Agent: etkinlik CRUD ----
app.get('/api/agent/events', auth, requireRole('agent'), (req, res) => {
  res.json(getDb().events.filter((e) => e.agentId === req.user.id))
})

app.put('/api/agent/profile', auth, requireRole('agent'), (req, res) => {
  const db = getDb()
  const agent = db.users.find((u) => u.id === req.user.id)
  const { name, email, phone, orgName, about, membershipFee } = req.body
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' })
  if (db.users.some((u) => u.id !== agent.id && u.email === email)) return res.status(409).json({ error: 'Email already registered' })
  Object.assign(agent, { name, email, phone, orgName, about, membershipFee: Number(membershipFee) || 0 })
  save()
  res.json(publicUser(agent))
})

app.post('/api/agent/events', auth, requireRole('agent'), (req, res) => {
  const db = getDb()
  const { name, category, date, city, location, capacity, price, description, status } = req.body
  if (!name) return res.status(400).json({ error: 'Event name required' })
  const event = {
    id: nextId(),
    agentId: req.user.id,
    name,
    category: (category || 'FOOTBALL').toUpperCase(),
    date: date || 'TBA',
    city: city || 'Nicosia',
    location: location || 'TBA',
    taken: 0,
    capacity: Number(capacity) || 50,
    price: Number(price) || 0,
    status: status === 'draft' ? 'draft' : 'pending', // admin onayına düşer
    description: description || '',
  }
  db.events.push(event)
  save()
  res.json(event)
})

app.put('/api/agent/events/:id', auth, requireRole('agent'), (req, res) => {
  const db = getDb()
  const e = db.events.find((x) => x.id === Number(req.params.id) && x.agentId === req.user.id)
  if (!e) return res.status(404).json({ error: 'Event not found' })
  Object.assign(e, req.body, { id: e.id, agentId: e.agentId })
  save()
  res.json(e)
})

app.delete('/api/agent/events/:id', auth, requireRole('agent'), (req, res) => {
  const db = getDb()
  const i = db.events.findIndex((x) => x.id === Number(req.params.id) && x.agentId === req.user.id)
  if (i === -1) return res.status(404).json({ error: 'Event not found' })
  db.events.splice(i, 1)
  save()
  res.json({ ok: true })
})

app.get('/api/agent/events/:id/participants', auth, requireRole('agent'), (req, res) => {
  const db = getDb()
  const event = db.events.find((x) => x.id === Number(req.params.id) && x.agentId === req.user.id)
  if (!event) return res.status(404).json({ error: 'Event not found' })
  const regs = db.registrations
    .filter((r) => r.eventId === Number(req.params.id))
    .map((r) => ({ ...r, user: db.users.find((u) => u.id === r.userId)?.name ?? 'Unknown' }))
  res.json(regs)
})

app.get('/api/agent/events/:id/reviews', auth, requireRole('agent'), (req, res) => {
  const db = getDb()
  const event = db.events.find((x) => x.id === Number(req.params.id) && x.agentId === req.user.id)
  if (!event) return res.status(404).json({ error: 'Event not found' })
  res.json(
    db.reviews
      .filter((r) => r.eventId === Number(req.params.id))
      .map((r) => ({
        id: r.id,
        user: db.users.find((u) => u.id === r.userId)?.name ?? 'Unknown',
        member: true,
        date: r.date ?? '',
        rating: r.rating,
        text: r.text,
      })),
  )
})

app.post('/api/registrations/:id/:action', auth, requireRole('agent'), (req, res) => {
  if (!['accept', 'reject', 'remove'].includes(req.params.action))
    return res.status(400).json({ error: 'Unknown action' })
  const db = getDb()
  const i = db.registrations.findIndex((r) => r.id === Number(req.params.id))
  if (i === -1) return res.status(404).json({ error: 'Registration not found' })
  const reg = db.registrations[i]
  const event = db.events.find((e) => e.id === reg.eventId && e.agentId === req.user.id)
  if (!event) return res.status(403).json({ error: 'Forbidden' })
  if (req.params.action === 'accept') reg.status = 'REGISTERED'
  else {
    if (event && reg.status === 'REGISTERED') event.taken = Math.max(0, event.taken - 1)
    db.registrations.splice(i, 1)
  }
  save()
  res.json({ ok: true })
})

// ---- Üyelik satın alma (sahte ödeme) ----
app.post('/api/agents/:id/join', auth, (req, res) => {
  const db = getDb()
  const agent = db.users.find((u) => u.id === Number(req.params.id) && u.role === 'agent')
  if (!agent) return res.status(404).json({ error: 'Agent not found' })
  if (db.memberships.some((m) => m.userId === req.user.id && m.agentId === agent.id))
    return res.status(409).json({ error: 'Already a member' })
  const m = {
    id: nextId(),
    userId: req.user.id,
    agentId: agent.id,
    fee: agent.membershipFee ?? 12,
    expires: 'expires in 30 days',
    status: 'ACTIVE',
  }
  db.memberships.push(m)
  db.notifications.push({
    id: nextId(),
    userId: req.user.id,
    text: `Acceptance: Your membership for ${agent.orgName ?? agent.name} has been confirmed`,
    time: 'just now',
    dot: 'blue',
  })
  save()
  res.json(m)
})

// ---- Mesajlaşma ----
app.get('/api/my/conversations', auth, (req, res) => {
  const db = getDb()
  const mine = db.conversations.filter(
    (c) => c.userId === req.user.id || c.agentId === req.user.id,
  )
  res.json(
    mine.map((c) => {
      const otherId = c.userId === req.user.id ? c.agentId : c.userId
      const other = db.users.find((u) => u.id === otherId)
      return {
        id: c.id,
        name: other?.orgName ?? other?.name ?? 'Unknown',
        messages: c.messages.map((m) => ({ ...m, me: m.from === req.user.id })),
      }
    }),
  )
})

app.get('/api/users/search', auth, (req, res) => {
  const query = String(req.query.q || '').trim().toLowerCase()
  if (!query) return res.json([])
  res.json(
    getDb().users
      .filter((user) => user.id !== req.user.id && `${user.orgName ?? ''} ${user.name} ${user.email}`.toLowerCase().includes(query))
      .map(publicUser),
  )
})

app.post('/api/conversations', auth, (req, res) => {
  const db = getDb()
  const otherId = Number(req.body.userId)
  const other = db.users.find((user) => user.id === otherId)
  if (!other || other.id === req.user.id) return res.status(404).json({ error: 'User not found' })
  const existing = db.conversations.find(
    (conversation) =>
      (conversation.userId === req.user.id && conversation.agentId === otherId) ||
      (conversation.userId === otherId && conversation.agentId === req.user.id),
  )
  const conversation = existing ?? { id: nextId(), userId: req.user.id, agentId: otherId, messages: [] }
  if (!existing) {
    db.conversations.push(conversation)
    save()
  }
  res.json({ id: conversation.id, name: other.orgName ?? other.name, messages: conversation.messages.map((m) => ({ ...m, me: m.from === req.user.id })), live: true, preview: conversation.messages.at(-1)?.text ?? '' })
})

app.post('/api/conversations/:id/messages', auth, (req, res) => {
  const db = getDb()
  const c = db.conversations.find(
    (x) => x.id === Number(req.params.id) && (x.userId === req.user.id || x.agentId === req.user.id),
  )
  if (!c) return res.status(404).json({ error: 'Conversation not found' })
  const text = (req.body.text || '').trim()
  if (!text) return res.status(400).json({ error: 'Empty message' })
  const msg = { id: nextId(), from: req.user.id, text, time: 'just now' }
  c.messages.push(msg)
  save()
  res.json({ ...msg, me: true })
})

// ---- Admin ----
app.get('/api/admin/pending-events', auth, requireRole('admin'), (req, res) => {
  const db = getDb()
  res.json(
    db.events
      .filter((e) => e.status === 'pending')
      .map((e) => ({ ...e, agentName: db.users.find((u) => u.id === e.agentId)?.orgName })),
  )
})

app.post('/api/admin/events/:id/:action', auth, requireRole('admin'), (req, res) => {
  if (!['approve', 'reject'].includes(req.params.action))
    return res.status(400).json({ error: 'Unknown action' })
  const db = getDb()
  const e = db.events.find((x) => x.id === Number(req.params.id))
  if (!e) return res.status(404).json({ error: 'Event not found' })
  e.status = req.params.action === 'approve' ? 'active' : 'draft'
  db.notifications.push({
    id: nextId(),
    userId: e.agentId,
    text:
      req.params.action === 'approve'
        ? `Event Approved: ${e.name} is now live`
        : `Event Rejected: ${e.name} has been sent back to drafts`,
    time: 'just now',
    dot: req.params.action === 'approve' ? 'blue' : 'red',
  })
  save()
  res.json(e)
})

app.get('/api/admin/accounts', auth, requireRole('admin'), (req, res) => {
  res.json(getDb().users.map(({ password, ...u }) => u))
})

app.get('/api/admin/agent-requests', auth, requireRole('admin'), (req, res) => {
  const db = getDb()
  res.json(db.agentRequests.map((request) => ({ ...request, user: publicUser(db.users.find((user) => user.id === request.userId)) })))
})

app.post('/api/admin/agent-requests/:id/:action', auth, requireRole('admin'), (req, res) => {
  if (!['approve', 'reject'].includes(req.params.action)) return res.status(400).json({ error: 'Unknown action' })
  const db = getDb()
  const request = db.agentRequests.find((item) => item.id === Number(req.params.id))
  if (!request) return res.status(404).json({ error: 'Request not found' })
  const user = db.users.find((item) => item.id === request.userId)
  if (!user) return res.status(404).json({ error: 'User not found' })
  request.status = req.params.action === 'approve' ? 'approved' : 'rejected'
  request.reviewedBy = req.user.id
  if (request.status === 'approved') {
    user.role = 'agent'
    user.agentType = request.agentType
    user.orgName = request.orgName
    user.phone = request.phone
    user.approvalStatus = 'approved'
    user.commissionMembers = Number(req.body.commissionMembers) || (request.agentType === 'association' ? 10 : 0)
    user.commissionEvents = Number(req.body.commissionEvents) || 10
  }
  save()
  res.json({ request, user: publicUser(user) })
})

app.post('/api/admin/accounts/:id/:action', auth, requireRole('admin'), (req, res) => {
  if (!['ban', 'unban'].includes(req.params.action))
    return res.status(400).json({ error: 'Unknown action' })
  const db = getDb()
  const u = db.users.find((x) => x.id === Number(req.params.id))
  if (!u) return res.status(404).json({ error: 'Account not found' })
  u.banned = req.params.action === 'ban'
  u.bannedBy = u.banned ? req.user.name : undefined
  save()
  res.json({ ok: true })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
