// ponytail: JSON dosya deposu — better-sqlite3 Windows'ta derlenemedi.
// Ölçek büyürse SQLite/Postgres'e geç; arayüz (load/save) aynı kalır.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import bcrypt from 'bcryptjs'

const DB_PATH = join(dirname(fileURLToPath(import.meta.url)), 'db.json')

const EMPTY = {
  users: [],
  events: [],
  registrations: [],
  memberships: [],
  conversations: [],
  notifications: [],
  favourites: [],
  reviews: [],
  nextId: 1,
}

let db = existsSync(DB_PATH) ? JSON.parse(readFileSync(DB_PATH, 'utf8')) : null

export function save() {
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
}

export function getDb() {
  return db
}

export function nextId() {
  return db.nextId++
}

function seed() {
  db = structuredClone(EMPTY)
  const hash = bcrypt.hashSync('123456', 10)

  db.users = [
    { id: nextId(), role: 'user', name: 'Deniz Kızılbora', email: 'deniz@sports.com', password: hash, phone: '+90 5** *** ** **', created: '2026-07-01' },
    { id: nextId(), role: 'agent', agentType: 'association', name: 'Denizz Kızılbora', orgName: 'Famagusta Athletic Union', email: 'agent@sports.com', password: hash, phone: '+90 5** *** ** **', created: '2025-07-02', about: 'Anorthosis Famagusta, founded in 1911, is a vibrant multi-sport community dedicated to helping athletes of all ages reach their full potential.', membershipFee: 12, commissionMembers: 10, commissionEvents: 10 },
    { id: nextId(), role: 'admin', name: 'Denizzz Kızılbora', email: 'admin@sports.com', password: hash, phone: '+90 5** *** ** **', created: '2024-01-01' },
  ]

  const agentId = db.users[1].id
  db.events = [
    { id: nextId(), agentId, name: 'APOEL vs Omonai Derby', category: 'FOOTBALL', date: 'August 3, 2026', city: 'Nicosia', location: 'GSP Stadium', taken: 15, capacity: 50, price: 25, status: 'active', description: 'The biggest fixture in Cypriot football.' },
    { id: nextId(), agentId, name: 'Famagusta International Marathon', category: 'MARATHON', date: 'August 15, 2026', city: 'Famagusta', location: 'City Center', taken: 90, capacity: 100, price: 45, status: 'active', description: 'Annual international marathon.' },
    { id: nextId(), agentId, name: 'Cablenet Run', category: 'RUNNING', date: 'October 11, 2026', city: 'Famagusta', location: 'Coastal Road', taken: 300, capacity: 450, price: 0, status: 'active', description: 'Free community run.' },
    { id: nextId(), agentId, name: 'Beach Volleyball Cyprus', category: 'VOLLEYBALL', date: 'August 12, 2026', city: 'Kyrenia', location: 'Escape Beach', taken: 30, capacity: 64, price: 5, status: 'active', description: 'Beach volleyball tournament.' },
    { id: nextId(), agentId, name: 'Keravnos vs AEL Basketball Cup', category: 'BASKETBALL', date: 'August 8, 2026', city: 'Nicosia', location: 'Eleftheria Arena', taken: 200, capacity: 350, price: 18, status: 'active', description: 'Basketball cup final.' },
    { id: nextId(), agentId, name: 'Cyprus Open Tennis Championship', category: 'TENNIS', date: 'August 22, 2026', city: 'Kyrenia', location: 'Tennis Club', taken: 50, capacity: 200, price: 25, status: 'active', memberNote: 'Free for Members', description: 'Open tennis championship.' },
    { id: nextId(), agentId, name: 'Mountain Bike Race', category: 'CYCLING', date: 'August 20, 2026', city: 'Kyrenia', location: 'Mountain Trail', taken: 241, capacity: 250, price: 35, status: 'active', description: 'Mountain bike race.' },
    { id: nextId(), agentId, name: 'Aquatic Cup', category: 'SWIMMING', date: 'Sep 5, 2026', city: 'Nicosia', location: 'Olympic Pool', taken: 20, capacity: 150, price: 20, status: 'active', memberNote: 'Free for Members', description: 'Swimming competition.' },
  ]

  const userId = db.users[0].id
  db.registrations = [
    { id: nextId(), userId, eventId: db.events[0].id, status: 'REGISTERED', paid: 25, date: 'July 1, 2026' },
    { id: nextId(), userId, eventId: db.events[1].id, status: 'REGISTERED', paid: 45, date: 'July 10, 2026' },
    { id: nextId(), userId, eventId: db.events[3].id, status: 'REGISTERED', paid: 5, date: 'July 18, 2026' },
  ]
  db.memberships = [
    { id: nextId(), userId, agentId, fee: 12, expires: 'expires in 5 days', status: 'ACTIVE' },
  ]
  db.notifications = [
    { id: nextId(), userId, text: 'Your registiration for Cablenet Run has been confirmed.', time: '1 hour ago', dot: 'blue' },
    { id: nextId(), userId, text: 'Reminder: 1 day left until APOEL vs Omonai Derby', time: '2 days ago', dot: 'blue' },
    { id: nextId(), userId, text: 'Membership expiriy: Your membership for Famagusta Athletic Union has expired.', time: '3 days ago', dot: 'red' },
  ]
  db.conversations = [
    {
      id: nextId(),
      userId,
      agentId,
      messages: [
        { id: nextId(), from: userId, text: 'Hi, I wanted to ask about the doubles category registration.', time: '1 day ago' },
        { id: nextId(), from: agentId, text: 'Hello Deniz! Yes, the doubles category is now open.', time: '1 day ago' },
      ],
    },
  ]
  save()
}

if (!db) seed()
// eski db.json'larda yeni koleksiyonlar eksik olabilir
db.favourites ??= []
db.reviews ??= []
