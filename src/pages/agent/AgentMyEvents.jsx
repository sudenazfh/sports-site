import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api.js'
import AppLayout from '../../components/AppLayout.jsx'
import { Modal } from '../../components/Modals.jsx'

const TABS = ['Active', 'Pending', 'Draft', 'Completed', 'Cancelled']

const FALLBACK = [
  { id: 1, name: 'APOEL vs Omonai Derby', date: 'August 3, 2026', city: 'Nicosia', taken: 15, capacity: 50, status: 'active', badge: 2 },
  { id: 2, name: 'Famagusta International Marathon', date: 'August 15, 2026', city: 'Famagusta', taken: 90, capacity: 100, status: 'active', badge: 20 },
  { id: 3, name: 'Aquatic Cup', date: 'Sep 5, 2026', city: 'Nicosia', taken: 20, capacity: 150, status: 'active', badge: 5 },
  { id: 4, name: 'Cablenet Run', date: 'October 11, 2026', city: 'Famagusta', taken: 0, capacity: 450, status: 'pending' },
  { id: 5, name: 'Beach Volleyball Cyprus', date: 'August 12, 2026', city: 'Kyrenia', taken: 0, capacity: 64, status: 'draft' },
  { id: 6, name: 'Famagusta International Marathon', date: 'August 15, 2026', city: 'Famagusta', taken: 90, capacity: 100, attended: 70, status: 'completed' },
  { id: 7, name: 'Cablenet Run', date: 'October 11, 2026', city: 'Famagusta', taken: 0, capacity: 450, status: 'cancelled', cancelledBy: 'Admin Denizzz', cancelReason: 'The event is planned to be held within the military ceremonial area' },
  { id: 8, name: 'Beach Volleyball Cyprus', date: 'August 12, 2026', city: 'Kyrenia', taken: 0, capacity: 64, status: 'cancelled', cancelledBy: 'You' },
]

const LETTER_TEMPLATE =
  "Dear participants,\nWe are sorry to inform that our event has been cancelled due to bad weather conditions. Thank you for your understanding. Can't wait to see you in our upcoming events.\n\nSincerely,\nCyprus Football Federation"

export default function AgentMyEvents() {
  const [tab, setTab] = useState('Active')
  const [events, setEvents] = useState(FALLBACK)
  const [cancelling, setCancelling] = useState(null)
  const [letter, setLetter] = useState(LETTER_TEMPLATE)

  function sendCancellation() {
    setEvents((es) =>
      es.map((e) => (e.id === cancelling.id ? { ...e, status: 'cancelled', cancelledBy: 'You' } : e)),
    )
    setCancelling(null)
    setLetter(LETTER_TEMPLATE)
  }

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
              {e.status === 'active' && (
                <button
                  type="button"
                  onClick={() => setCancelling(e)}
                  className="rounded-[10px] bg-[rgba(247,63,82,0.1)] px-4 py-2 text-[11px] font-bold text-[#f73f52] hover:brightness-125"
                >
                  Cancel
                </button>
              )}
              {e.status !== 'cancelled' && (
                <Link
                  to={`/agent/create-event/${e.id}`}
                  className="rounded-[10px] bg-night px-5 py-2 text-[11px] font-bold text-white hover:brightness-150"
                >
                  Details
                </Link>
              )}
              {e.status === 'completed' && (
                <Link
                  to={`/agent/event-reviews/${e.id}`}
                  className="rounded-[10px] bg-night px-4 py-2 text-[11px] font-bold text-white hover:brightness-150"
                >
                  View Reviews
                </Link>
              )}
              <Link
                to={`/agent/event-details/${e.id}`}
                className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-4 py-2 text-[11px] font-bold text-accent hover:brightness-125"
              >
                View Event
              </Link>
            </div>
            {e.status === 'cancelled' ? (
              <div
                className={`mt-3 ml-12 rounded-[8px] px-4 py-2 text-[11px] font-bold ${
                  e.cancelReason ? 'bg-[rgba(247,63,82,0.08)] text-[#f73f52]' : 'bg-night text-white/80'
                }`}
              >
                <p>By: {e.cancelledBy}</p>
                {e.cancelReason && <p>Cancellation Reason: {e.cancelReason}</p>}
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
                  <div
                    className="h-full rounded bg-accent"
                    style={{ width: `${Math.round((e.taken / e.capacity) * 100)}%` }}
                  />
                </div>
                {e.status === 'completed' && (
                  <>
                    <div className="mt-3 flex items-center justify-between text-[12px] text-white/70">
                      <span>Attendance</span>
                      <span>
                        {e.attended ?? 0}/{e.capacity}
                      </span>
                    </div>
                    <div className="mt-1 h-[3px] w-full rounded bg-white/10">
                      <div
                        className="h-full rounded bg-accent/70"
                        style={{ width: `${Math.round(((e.attended ?? 0) / e.capacity) * 100)}%` }}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      {cancelling && (
        <Modal width="w-[900px]">
          <div>
            <p className="text-[15px] font-bold">{cancelling.name}</p>
            <p className="text-[12px] text-white/60">Date: {cancelling.date}</p>
          </div>
          <p className="text-[12px] text-white/80">
            Please provide a brief explanation about the cancellation of event to the participants.
          </p>
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            rows={8}
            className="w-full resize-none rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] leading-relaxed text-white outline-none focus:border-accent"
          />
          <div className="flex justify-end gap-5">
            <button
              type="button"
              onClick={() => setCancelling(null)}
              className="w-[135px] rounded-[8px] bg-night py-2.5 text-[13px] font-bold text-white hover:brightness-150"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={sendCancellation}
              className="w-[135px] rounded-[8px] bg-[rgba(123,136,255,0.2)] py-2.5 text-[13px] font-bold text-accent hover:brightness-125"
            >
              Send
            </button>
          </div>
        </Modal>
      )}
    </AppLayout>
  )
}
