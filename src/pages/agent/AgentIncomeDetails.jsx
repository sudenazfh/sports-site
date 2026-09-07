import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../api.js'
import AppLayout from '../../components/AppLayout.jsx'

const MEMBER_ROWS = [
  { id: 2, name: 'Deniz Kızılbora', sub: 'Member Since: 10 September, 2025', date: '21 July, 2026', gross: '€12', com: '%10', cut: '€1,2', net: '€10,8' },
  { id: 1, name: 'Hello Kitty', sub: 'Member Since: 15 August, 2026', date: '15 September, 2026', gross: '€12', com: '%10', cut: '€1,2', net: '€10,8' },
  { id: 3, name: 'Sıla İl', sub: 'Member Since: 7 January, 2024', date: '6 August , 2026', gross: '€12', com: '%9', cut: '€1,08', net: '€10,92' },
]

export default function AgentIncomeDetails({ kind = 'events' }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [eventRows, setEventRows] = useState([])
  const events = kind === 'events'
  useEffect(() => {
    if (!events) return
    api('/agent/events')
      .then((agentEvents) =>
        setEventRows(
          agentEvents.map((event) => ({
            id: event.id,
            name: event.name,
            sub: `${event.date}  ·  ${event.city}`,
            gross: `€${event.taken * event.price}`,
            com: '%10',
            cut: `€${(event.taken * event.price * 0.1).toFixed(1)}`,
            net: `€${(event.taken * event.price * 0.9).toFixed(1)}`,
          })),
        ),
      )
      .catch(() => {})
  }, [events])

  const rows = (events ? eventRows : MEMBER_ROWS).filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <AppLayout title={events ? 'Event Income' : 'Income'} role="agent">
      <div className="flex flex-col gap-5 p-7">
        <button
          type="button"
          onClick={() => navigate('/agent/income')}
          className="self-start rounded-[15px] bg-card px-4 py-1.5 text-[12px] font-bold text-white hover:brightness-150"
        >
          ← Back
        </button>

        <div className="flex items-center gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={events ? 'Search for events...' : 'Search for members...'}
            className="h-[46px] flex-1 rounded-[10px] border border-white/10 bg-card px-5 text-[12px] text-white placeholder:text-white/50 outline-none focus:border-accent"
          />
          <button type="button" className="flex h-[46px] items-center gap-4 rounded-[10px] border border-white/10 bg-card px-4 text-[13px] font-bold hover:border-accent">
            Filter By Month: <span className="text-white/60">⌄</span>
          </button>
          <button type="button" className="flex h-[46px] items-center gap-4 rounded-[10px] border border-white/10 bg-card px-4 text-[13px] font-bold hover:border-accent">
            Sort By: <span className="text-white/60">⌄</span>
          </button>
          <span className="flex h-[46px] items-center gap-3 rounded-[10px] border border-white/10 bg-card px-4 text-[13px] font-bold">
            ‹ <span className="text-accent">2026</span> ›
          </span>
        </div>

        <div
          className={`grid px-6 text-[13px] font-bold text-white/90 ${
            events ? 'grid-cols-[1fr_130px_130px_130px_130px_110px]' : 'grid-cols-[1fr_170px_130px_130px_130px_130px_110px]'
          }`}
        >
          <span />
          {!events && <span>Date</span>}
          <span>Gross</span>
          <span>Comission</span>
          <span>Cut</span>
          <span>Net</span>
          <span />
        </div>

        {rows.map((r) => (
          <div
            key={r.id}
            className={`grid items-center rounded-[12px] border border-white/10 bg-card px-6 py-5 ${
              events ? 'grid-cols-[1fr_130px_130px_130px_130px_110px]' : 'grid-cols-[1fr_170px_130px_130px_130px_130px_110px]'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="size-9 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div>
                <p className="text-[13px] font-bold">{r.name}</p>
                <p className="text-[11px] text-white/60">{r.sub}</p>
              </div>
            </div>
            {!events && <p className="text-[14px]">{r.date}</p>}
            <p className="text-[15px] font-bold">{r.gross}</p>
            <p className="text-[15px] font-bold">{r.com}</p>
            <p className="text-[15px] font-bold">{r.cut}</p>
            <p className="text-[15px] font-bold">{r.net}</p>
            <Link
              to={events ? `/agent/event-details/${r.id}` : `/agent/members/${r.id}`}
              className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-4 py-1.5 text-center text-[11px] font-bold text-accent hover:brightness-125"
            >
              {events ? 'View Event' : 'View Member'}
            </Link>
          </div>
        ))}
        {events && rows.length === 0 && <p className="text-[13px] text-white/50">No event income records.</p>}
      </div>
    </AppLayout>
  )
}
