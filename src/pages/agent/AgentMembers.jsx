import { useState } from 'react'
import AppLayout from '../../components/AppLayout.jsx'

const MEMBERS = [
  { id: 1, name: 'Hello Kitty', since: '15 August, 2026', expires: '15 September, 2026', until: '1 month', urgent: false, attended: 3, payment: '€12' },
  { id: 2, name: 'Deniz Kızılbora', since: '10 September, 2025', expires: '21 July, 2026', until: '4 days', urgent: true, attended: 12, payment: '€12' },
  { id: 3, name: 'Sıla İl', since: '7 January, 2024', expires: '6 August , 2026', until: '2 weeks', urgent: false, attended: 21, payment: '€12' },
]

export default function AgentMembers() {
  const [members, setMembers] = useState(MEMBERS)
  const [query, setQuery] = useState('')

  const shown = members.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <AppLayout title="Members (Total 147)" role="agent">
      <div className="flex flex-col gap-5 p-7">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4 rounded-[12px] border border-white/10 bg-card px-5 py-4">
            <p className="text-[14px] font-bold">Members:</p>
            <p className="text-[20px] font-extrabold text-accent">147</p>
          </div>
          <div className="flex items-center gap-4 rounded-[12px] border border-white/10 bg-card px-5 py-4">
            <p className="text-[14px] font-bold">Expiring Soon:</p>
            <p className="text-[20px] font-extrabold text-[#f73f52]">9</p>
          </div>
          <div className="flex items-center gap-4 rounded-[12px] border border-white/10 bg-card px-5 py-4">
            <p className="text-[14px] font-bold">Monthly Revenue:</p>
            <p className="text-[20px] font-extrabold">€1,764</p>
          </div>
          <button
            type="button"
            className="ml-auto flex items-center gap-6 rounded-[10px] border border-white/10 bg-card px-4 py-3 text-[13px] font-bold hover:border-accent"
          >
            Sort By: <span className="text-white/60">⌄</span>
          </button>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for members..."
          className="h-[46px] w-full rounded-[10px] border border-white/10 bg-card px-5 text-[12px] text-white placeholder:text-white/50 outline-none focus:border-accent"
        />

        <div className="grid grid-cols-[1fr_170px_170px_150px_100px] px-6 text-[13px] font-bold text-white/90">
          <span />
          <span>Expires</span>
          <span>Time Until Expiry</span>
          <span>Events Attended</span>
          <span>Payment</span>
        </div>

        {shown.map((m) => (
          <div
            key={m.id}
            className="grid grid-cols-[1fr_170px_170px_150px_100px] items-center rounded-[12px] border border-white/10 bg-card px-6 py-4"
          >
            <div className="flex items-center gap-4">
              <span className="size-9 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div className="w-[220px]">
                <p className="text-[13px] font-bold">{m.name}</p>
                <p className="text-[11px] text-white/60">Member Since: {m.since}</p>
              </div>
              <button
                type="button"
                className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-4 py-1.5 text-[11px] font-bold text-accent hover:brightness-125"
              >
                View Member
              </button>
              <button
                type="button"
                onClick={() => setMembers((ms) => ms.filter((x) => x.id !== m.id))}
                className="rounded-[10px] bg-[rgba(247,63,82,0.1)] px-4 py-1.5 text-[11px] font-bold text-[#f73f52] hover:brightness-125"
              >
                Remove Member
              </button>
            </div>
            <p className="text-[13px]">{m.expires}</p>
            <p className={`text-[13px] ${m.urgent ? 'text-[#f73f52]' : ''}`}>{m.until}</p>
            <p className="text-[13px]">{m.attended}</p>
            <p className="text-[13px]">{m.payment}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
