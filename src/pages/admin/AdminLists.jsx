import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api.js'
import AppLayout from '../../components/AppLayout.jsx'

export function AdminSearchBar({ query, onQuery, dropdowns = 1 }) {
  return (
    <div className="flex items-center gap-4">
      <input
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Search.."
        className="h-[46px] flex-1 rounded-[10px] border border-white/10 bg-card px-5 text-[12px] text-white placeholder:text-white/50 outline-none focus:border-accent"
      />
      {Array.from({ length: dropdowns }).map((_, i) => (
        <button
          key={i}
          type="button"
          className="flex h-[46px] w-[170px] items-center justify-between rounded-[10px] border border-white/10 bg-card px-4 text-[13px] font-bold hover:border-accent"
        >
          All <span className="text-white/60">⌄</span>
        </button>
      ))}
    </div>
  )
}

export function AdminRow({ title, subtitle, children }) {
  return (
    <div className="flex items-center gap-4 rounded-[12px] border border-white/10 bg-card px-6 py-5">
      <span className="size-9 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
      <div className="flex-1">
        <p className="text-[13px] font-bold">{title}</p>
        <p className="text-[11px] text-white/60">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}

export const viewBtnCls =
  'rounded-[10px] bg-[rgba(123,136,255,0.2)] px-5 py-2 text-[11px] font-bold text-accent hover:brightness-125'
export const greyBtnCls =
  'rounded-[10px] bg-field px-5 py-2 text-[11px] font-bold text-white hover:brightness-125'

export function EventRequests() {
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState([
    { id: 1, name: 'Nicosia Football Tournament', sub: 'August 5, 2026 · Nicosia' },
    { id: 2, name: 'Beach Volleyball Cyprus', sub: 'August 12, 2026 · Kyrenia' },
  ])

  useEffect(() => {
    api('/admin/pending-events')
      .then((es) =>
        setRows(es.map((e) => ({ id: e.id, name: e.name, sub: `${e.date} · ${e.city} · by ${e.agentName ?? '?'}`, live: true }))),
      )
      .catch(() => {})
  }, [])

  const shown = rows.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <AppLayout title="Event Requests" role="admin">
      <div className="flex flex-col gap-5 p-7">
        <AdminSearchBar query={query} onQuery={setQuery} dropdowns={0} />
        {shown.length === 0 && <p className="text-[13px] text-white/50">No pending event requests.</p>}
        {shown.map((r) => (
          <AdminRow key={r.id} title={r.name} subtitle={r.sub}>
            <Link to={r.live ? `/admin/event-view/${r.id}` : '/admin/event-view'} className={viewBtnCls}>
              View Event
            </Link>
          </AdminRow>
        ))}
      </div>
    </AppLayout>
  )
}

export function AccountRequests() {
  const [query, setQuery] = useState('')
  const rows = [
    { id: 1, name: 'Famagusta Athletic Union', sub: 'Request Sent: 4 February 2024' },
    { id: 2, name: 'İdil Derin', sub: 'Request Sent: 10 June 2025' },
    { id: 3, name: 'İnci Nakışçı', sub: 'Request Sent: 2 July 2026' },
  ].filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <AppLayout title="Account Requests" role="admin">
      <div className="flex flex-col gap-5 p-7">
        <AdminSearchBar query={query} onQuery={setQuery} dropdowns={2} />
        {rows.map((r) => (
          <AdminRow key={r.id} title={r.name} subtitle={r.sub}>
            <Link to="/admin/account-view" className={viewBtnCls}>
              View Info
            </Link>
          </AdminRow>
        ))}
      </div>
    </AppLayout>
  )
}

export function Accounts() {
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState([
    { id: 1, name: 'Famagusta Athletic Union', sub: 'Agent Since: 1 January 2024', banned: false },
    { id: 2, name: 'İdil Derin', sub: 'User Since: 11 June 2025', banned: false },
    { id: 3, name: 'Kardelen Işık', sub: 'Agent BANNED By: Mehmet Demir', banned: true },
    { id: 4, name: 'Sude Katırcıoğlu', sub: 'User Since: 11 June 2025', banned: false },
  ])

  function load() {
    api('/admin/accounts')
      .then((us) =>
        setRows(
          us.map((u) => ({
            id: u.id,
            name: u.orgName ?? u.name,
            sub: u.banned
              ? `${u.role === 'agent' ? 'Agent' : 'User'} BANNED By: ${u.bannedBy ?? 'admin'}`
              : `${u.role === 'agent' ? 'Agent' : u.role === 'admin' ? 'Admin' : 'User'} Since: ${u.created}`,
            banned: !!u.banned,
            live: true,
          })),
        ),
      )
      .catch(() => {})
  }
  useEffect(load, [])

  async function toggleBan(r, action) {
    if (!r.live) {
      setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, banned: action === 'ban' } : x)))
      return
    }
    await api(`/admin/accounts/${r.id}/${action}`, { method: 'POST' }).catch(() => {})
    load()
  }

  const shown = rows.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <AppLayout title="Accounts" role="admin">
      <div className="flex flex-col gap-5 p-7">
        <AdminSearchBar query={query} onQuery={setQuery} dropdowns={1} />
        {shown.map((r) => (
          <AdminRow key={r.id} title={r.name} subtitle={r.sub}>
            <button
              type="button"
              onClick={() => toggleBan(r, r.banned ? 'unban' : 'ban')}
              className="rounded-[10px] bg-[rgba(247,63,82,0.15)] px-5 py-2 text-[12px] font-bold text-[#f73f52] hover:brightness-125"
            >
              {r.banned ? 'Remove Ban' : 'Ban'}
            </button>
            <button type="button" className={greyBtnCls}>
              Commission
            </button>
            <Link to="/admin/account-view" className={viewBtnCls}>
              View Info
            </Link>
          </AdminRow>
        ))}
      </div>
    </AppLayout>
  )
}
