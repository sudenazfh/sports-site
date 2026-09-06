import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api.js'
import AppLayout from '../../components/AppLayout.jsx'

const TABS = ['Active', 'Pending', 'Draft', 'Completed', 'Cancelled']

const FALLBACK = [
  { id: 1, name: 'APOEL vs Omonai Derby', date: 'August 3, 2026', city: 'Nicosia', taken: 15, capacity: 50, status: 'active', badge: 2 },
  { id: 2, name: 'Famagusta International Marathon', date: 'August 15, 2026', city: 'Famagusta', taken: 90, capacity: 100, status: 'active', badge: 20 },
  { id: 3, name: 'Aquatic Cup', date: 'Sep 5, 2026', city: 'Nicosia', taken: 20, capacity: 150, status: 'active', badge: 5 },
  { id: 4, name: 'Cablenet Run', date: 'October 11, 2026', city: 'Famagusta', taken: 0, capacity: 450, status: 'pending' },
  { id: 5, name: 'Beach Volleyball Cyprus', date: 'August 12, 2026', city: 'Kyrenia', taken: 0, capacity: 64, status: 'draft' },
]

export default function AgentMyEvents() {
  const [tab, setTab] = useState('Active')
  const [events, setEvents] = useState(FALLBACK)

  useEffect(() => {
    api('/agent/events').then(setEvents).catch(() => {})
  }, [])

  const byTab = (t) => events.filter((e) => e.status === t.toLowerCase())
  const shown = byTab(tab)

  return (
    <AppLayout title="My Events" role="agent">
      <div className="flex flex-col gap-5 p-7">
        <div className="flex gap-3">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-[10px] px-4 py-2 text-[13px] font-bold ${
                tab === t ? 'bg-field text-accent' : 'bg-card text-white/80 hover:bg-field/60'
              }`}
            >
              {t} ({byTab(t).length})
            </button>
          ))}
        </div>

        {shown.length === 0 && <p className="text-[13px] text-white/50">No {tab.toLowerCase()} events.</p>}

        {shown.map((e) => (
          <div key={e.id} className="relative rounded-[12px] border border-white/10 bg-card px-6 py-5">
            {e.badge && (
              <span className="absolute -top-2 -left-1 flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-night">
                {e.badge}
              </span>
            )}
            <div className="flex items-center gap-4">
              <span className="size-8 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div className="flex-1">
                <p className="text-[14px] font-bold">{e.name}</p>
                <p className="text-[11px] text-white/70">
                  {e.date} <span className="mx-1">·</span> {e.city}
                </p>
              </div>
              <Link
                to={`/agent/event-details/${e.id}`}
                className="rounded-[10px] bg-night px-5 py-2 text-[11px] font-bold text-white hover:brightness-150"
              >
                Details
              </Link>
              <Link
                to="/agent/create-event"
                className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-4 py-2 text-[11px] font-bold text-accent hover:brightness-125"
              >
                View Event
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-between text-[12px] text-white/70">
              <span>Registirations</span>
              <span>
                {e.taken}/{e.capacity}
              </span>
            </div>
            <div className="mt-1 h-[3px] w-full rounded bg-white/10">
              <div
                className="h-full rounded bg-accent"
                style={{ width: `${Math.round((e.taken / e.capacity) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
