import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'

const TABS = ['Active', 'Pending', 'Draft', 'Completed', 'Cancelled']

const EVENTS = [
  { id: 1, name: 'APOEL vs Omonai Derby', sub: 'August 3, 2026  ·  Nicosia', taken: 15, capacity: 50, status: 'Active' },
  { id: 2, name: 'Famagusta International Marathon', sub: 'August 15, 2026  ·  Famagusta', taken: 90, capacity: 100, status: 'Active' },
  { id: 3, name: 'Aquatic Cup', sub: 'Sep 5, 2026  ·  Nicosia', taken: 20, capacity: 150, status: 'Active' },
  { id: 4, name: 'Cablenet Run', sub: 'October 11, 2026  ·  Famagusta', taken: 0, capacity: 450, status: 'Pending' },
  { id: 5, name: 'Beach Volleyball Cyprus', sub: 'August 12, 2026  ·  Kyrenia', taken: 0, capacity: 64, status: 'Draft' },
  { id: 6, name: 'Famagusta International Marathon', sub: 'August 15, 2026  ·  Famagusta', taken: 90, capacity: 100, attended: 70, status: 'Completed' },
  { id: 7, name: 'Cablenet Run', sub: 'October 11, 2026  ·  Famagusta', taken: 0, capacity: 450, status: 'Cancelled', cancelledBy: 'Admin Denizzz', cancelReason: 'The event is planned to be held within the military ceremonial area' },
]

export default function AdminAgentView() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Active')
  const byTab = (t) => EVENTS.filter((e) => e.status === t)
  const shown = byTab(tab)

  return (
    <AppLayout title="Famagusta Athletic Union" role="admin">
      <div className="relative bg-gradient-to-r from-[#2a3157] to-night px-7 pt-6 pb-8">
        <div className="flex items-start justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-[15px] bg-night/80 px-4 py-1.5 text-[12px] font-bold text-white hover:brightness-150"
          >
            ← Back
          </button>
          <button
            type="button"
            className="rounded-[8px] bg-[rgba(247,63,82,0.15)] px-4 py-2 text-[12px] font-bold text-[#f73f52] hover:brightness-125"
          >
            Ban Account
          </button>
        </div>
        <h1 className="mt-6 text-[36px] font-extrabold">Famagusta Athletic Union</h1>
        <span className="rounded-[10px] bg-night/70 px-3 py-1 font-mono text-[11px] text-white/80">Association</span>
      </div>

      <div className="flex flex-wrap items-start gap-7 p-7 pt-5">
        <div className="flex min-w-[480px] flex-[1.4] flex-col gap-5">
          <div className="flex gap-4">
            <button type="button" className="flex-1 rounded-[10px] bg-field py-3 text-[14px] font-bold text-white hover:brightness-125">
              VIEW AGENT INFO
            </button>
            <Link to="/agent/income" className="flex-1 rounded-[10px] bg-field py-3 text-center text-[14px] font-bold text-white hover:brightness-125">
              VIEW INCOME
            </Link>
            <Link to="/admin/messages" className="flex-1 rounded-[10px] bg-[rgba(123,136,255,0.15)] py-3 text-center text-[14px] font-bold text-accent hover:brightness-125">
              MESSAGE AGENT
            </Link>
          </div>
          <section className="rounded-[12px] border border-white/10 bg-card p-6 font-mono">
            <p className="pb-4 text-[13px] font-bold">AGENT SINCE: 1 JANUARY 2024</p>
            <div className="grid grid-cols-3 gap-4 text-[12px] text-white/70">
              <div>
                <p>EVENTS CREATED</p>
                <p className="pt-1 text-white">87</p>
              </div>
              <div>
                <p>ACTIVE MEMBERS</p>
                <p className="pt-1 text-white">256</p>
              </div>
              <div>
                <p>FAVOURITES</p>
                <p className="pt-1 text-white">1032</p>
              </div>
            </div>
          </section>
        </div>
        <section className="flex-1 rounded-[12px] border border-white/10 bg-card p-6 text-[13px] leading-relaxed">
          <p className="pb-2 text-[12px] font-bold text-white/70">ABOUT</p>
          <p className="text-white/80">
            Anorthosis Famagusta, founded in 1911, is a vibrant multi-sport community dedicated to helping
            athletes of all ages reach their full potential. Whether you want to compete professionally, join our
            youth academies, or stay active, we offer top-tier coaching in football, volleyball, and basketball.
          </p>
        </section>
      </div>

      <div className="flex flex-col gap-5 px-7 pb-7">
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
          <div key={e.id} className="rounded-[12px] border border-white/10 bg-card px-6 py-5">
            <div className="flex items-center gap-4">
              <span className="size-8 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div className="flex-1">
                <p className="text-[14px] font-bold">{e.name}</p>
                <p className="text-[11px] text-white/70">{e.sub}</p>
              </div>
              {e.status === 'Completed' && (
                <Link
                  to="/admin/event-reviews/1"
                  className="rounded-[10px] bg-night px-4 py-2 text-[11px] font-bold text-white hover:brightness-150"
                >
                  View Reviews
                </Link>
              )}
              {e.status !== 'Cancelled' && (
                <Link
                  to="/admin/event-participants"
                  className="rounded-[10px] bg-night px-5 py-2 text-[11px] font-bold text-white hover:brightness-150"
                >
                  Details
                </Link>
              )}
              <Link
                to="/admin/event-view"
                className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-4 py-2 text-[11px] font-bold text-accent hover:brightness-125"
              >
                View Event
              </Link>
            </div>
            {e.status === 'Cancelled' ? (
              <div className="mt-3 ml-12 rounded-[8px] bg-[rgba(247,63,82,0.08)] px-4 py-2 text-[11px] font-bold text-[#f73f52]">
                <p>By: {e.cancelledBy}</p>
                <p>Cancellation Reason: {e.cancelReason}</p>
              </div>
            ) : (
              <>
                <div className="mt-4 flex items-center justify-between text-[12px] text-white/70">
                  <span>Participants</span>
                  <span>
                    {e.taken}/{e.capacity}
                  </span>
                </div>
                <div className="mt-1 h-[3px] w-full rounded bg-white/10">
                  <div className="h-full rounded bg-accent" style={{ width: `${Math.round((e.taken / e.capacity) * 100)}%` }} />
                </div>
                {e.status === 'Completed' && (
                  <>
                    <div className="mt-3 flex items-center justify-between text-[12px] text-white/70">
                      <span>Attendance</span>
                      <span>
                        {e.attended ?? 0}/{e.capacity}
                      </span>
                    </div>
                    <div className="mt-1 h-[3px] w-full rounded bg-white/10">
                      <div className="h-full rounded bg-accent/70" style={{ width: `${Math.round(((e.attended ?? 0) / e.capacity) * 100)}%` }} />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
