import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'

const MEMBERS = {
  1: { name: 'Hello Kitty' },
  2: { name: 'Deniz Kızılbora' },
  3: { name: 'Sıla İl' },
}

const HISTORY = [
  { paid: '6 July, 2026', expires: '21 July, 2026', until: '4 days', urgent: true, attended: 12, payment: '€12', net: '€11.76' },
  { paid: '2 January, 2026', expires: '2 February, 2026', until: 'expired', attended: 3, payment: '€12', net: '€11.76' },
  { paid: '10 September, 2026', expires: '10 October, 2026', until: 'expired', attended: 8, payment: '€10', net: '€8' },
]

const ATTENDED = [
  { id: 1, name: 'APOEL vs Omonai Derby', sub: 'August 3, 2026  ·  Nicosia', taken: 15, capacity: 50 },
  { id: 2, name: 'Famagusta International Marathon', sub: 'August 15, 2026  ·  Famagusta', taken: 90, capacity: 100 },
  { id: 3, name: 'Aquatic Cup', sub: 'Sep 5, 2026  ·  Nicosia', taken: 20, capacity: 150 },
]

export default function AgentMemberDetail() {
  const { id } = useParams()
  const [query, setQuery] = useState('')
  const member = MEMBERS[id] ?? MEMBERS[2]
  const shown = ATTENDED.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <AppLayout title="Members (Total 147)" role="agent">
      <div className="flex flex-col gap-6 p-7">
        <div className="flex items-center gap-5">
          <span className="size-14 rounded-full bg-white/90" />
          <p className="text-[18px] font-bold">{member.name}</p>
          <span className="flex items-center gap-1.5 text-[11px] text-accent">
            <span className="size-1.5 rounded-full bg-accent" /> Member
          </span>
          <div className="ml-auto flex gap-4">
            {['View ID Document', 'View Medical Certificate', 'View Parent Consent'].map((b) => (
              <button
                key={b}
                type="button"
                className="rounded-[10px] border border-white/10 bg-card px-6 py-2.5 text-[13px] font-bold text-white hover:border-accent"
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-[1fr_170px_170px_150px_110px_110px] px-6 pb-2 text-[13px] font-bold text-white/90">
            <span className="text-[12px] text-white/60">Membership History:</span>
            <span>Expires</span>
            <span>Time Until Expiry</span>
            <span>Events Attended</span>
            <span>Payment</span>
            <span>Net</span>
          </div>
          <div className="flex flex-col gap-2">
            {HISTORY.map((h) => (
              <div
                key={h.paid}
                className="grid grid-cols-[1fr_170px_170px_150px_110px_110px] items-center rounded-[10px] border border-white/10 bg-card px-6 py-3 text-[13px]"
              >
                <span className="text-[11px] font-bold">{h.paid}</span>
                <span>{h.expires}</span>
                <span className={h.urgent ? 'text-[#f73f52]' : h.until === 'expired' ? 'text-white/60' : ''}>{h.until}</span>
                <span>{h.attended}</span>
                <span>{h.payment}</span>
                <span>{h.net}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" className="flex items-center gap-6 rounded-[10px] border border-white/10 bg-card px-4 py-3 text-[13px] font-bold hover:border-accent">
            Sort By: <span className="text-white/60">⌄</span>
          </button>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for attended events..."
          className="h-[46px] w-full rounded-[10px] border border-white/10 bg-card px-5 text-[12px] text-white placeholder:text-white/50 outline-none focus:border-accent"
        />

        {shown.map((e) => (
          <div key={e.id} className="rounded-[12px] border border-white/10 bg-card px-6 py-5">
            <div className="flex items-center gap-4">
              <span className="size-8 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div className="flex-1">
                <p className="text-[14px] font-bold">{e.name}</p>
                <p className="text-[11px] text-white/70">{e.sub}</p>
              </div>
              <Link
                to={`/agent/event-details/${e.id}`}
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
              <div className="h-full rounded bg-accent" style={{ width: `${Math.round((e.taken / e.capacity) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
