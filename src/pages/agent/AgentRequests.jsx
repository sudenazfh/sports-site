import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api.js'
import AppLayout from '../../components/AppLayout.jsx'

export default function AgentRequests() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api('/agent/events')
      .then(async (agentEvents) => {
        const withRequests = await Promise.all(
          agentEvents.map(async (event) => {
            const registrations = await api(`/agent/events/${event.id}/participants`)
            return { ...event, pending: registrations.filter((registration) => registration.status === 'PENDING').length }
          }),
        )
        setEvents(withRequests.filter((event) => event.pending > 0))
      })
      .catch(() => {})
  }, [])

  return (
    <AppLayout title="Requests" role="agent">
      <div className="flex flex-col gap-5 p-7">
        {events.length === 0 && <p className="text-[13px] text-white/50">No pending requests.</p>}
        {events.map((event) => (
          <div key={event.id} className="rounded-[12px] border border-white/10 bg-card px-6 py-5">
            <div className="flex items-center gap-4">
              <span className="size-9 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div className="flex-1">
                <p className="text-[14px] font-bold">{event.name}</p>
                <p className="text-[11px] text-white/70">{event.date} · {event.city}</p>
              </div>
              <span className="rounded-[10px] bg-[rgba(123,136,255,0.15)] px-3 py-1.5 text-[12px] font-bold text-accent">
                {event.pending} Pending Request{event.pending === 1 ? '' : 's'}
              </span>
              <Link
                to={`/agent/event-details/${event.id}?tab=pending`}
                className="rounded-[10px] bg-field px-4 py-2 text-[11px] font-bold text-white hover:brightness-125"
              >
                View Requests
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
