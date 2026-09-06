import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'
import avatar from '../../assets/avatar.svg'

const HISTORY = [
  { start: '6 July, 2026', expires: '21 July, 2026', until: '4 days', urgent: true, attended: 12, payment: '€12', net: '€11.76' },
  { start: '2 January, 2026', expires: '2 February, 2026', until: 'expired', urgent: false, attended: 3, payment: '€12', net: '€11.76' },
  { start: '10 September, 2026', expires: '10 October, 2026', until: 'expired', urgent: false, attended: 8, payment: '€10', net: '€8' },
]

const EVENTS = [
  { name: 'APOEL vs Omonai Derby', date: 'August 3, 2026', city: 'Nicosia', taken: 15, capacity: 50 },
  { name: 'Famagusta International Marathon', date: 'August 15, 2026', city: 'Famagusta', taken: 90, capacity: 100 },
  { name: 'Aquatic Cup', date: 'Sep 5, 2026', city: 'Nicosia', taken: 20, capacity: 150 },
]

export default function AdminAccountView() {
  const navigate = useNavigate()

  const headerRight = (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="mr-auto ml-6 rounded-[15px] bg-night px-4 py-1.5 text-[12px] font-bold text-white hover:brightness-150"
    >
      ← Back
    </button>
  )

  return (
    <AppLayout title="Members (Total 147)" role="admin" headerRight={headerRight}>
      <div className="flex flex-col gap-6 p-7">
        <div className="flex items-center gap-5">
          <img src={avatar} alt="" className="size-14" />
          <p className="text-[18px] font-bold">Deniz Kızılbora</p>
          <p className="text-[12px] text-accent">· Member</p>
          <div className="ml-auto flex gap-4">
            {['View ID Document', 'View Medical Certificate', 'View Parent Consent'].map((d) => (
              <button
                key={d}
                type="button"
                className="rounded-[10px] bg-field px-6 py-2.5 text-[14px] font-bold text-white/90 hover:brightness-125"
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <section>
          <div className="grid grid-cols-[1fr_170px_170px_150px_100px_100px] px-6 pb-2 text-[13px] font-bold">
            <span className="text-[12px] font-normal text-white/70">Membership History:</span>
            <span>Expires</span>
            <span>Time Until Expiry</span>
            <span>Events Attended</span>
            <span>Payment</span>
            <span>Net</span>
          </div>
          <div className="flex flex-col gap-3">
            {HISTORY.map((h) => (
              <div
                key={h.start}
                className="grid grid-cols-[1fr_170px_170px_150px_100px_100px] items-center rounded-[10px] border border-white/10 bg-card px-6 py-4 text-[13px]"
              >
                <span className="font-bold">{h.start}</span>
                <span>{h.expires}</span>
                <span className={h.urgent ? 'text-[#f73f52]' : ''}>{h.until}</span>
                <span>{h.attended}</span>
                <span>{h.payment}</span>
                <span>{h.net}</span>
              </div>
            ))}
          </div>
        </section>

        <button
          type="button"
          className="ml-auto flex items-center gap-6 rounded-[10px] border border-white/10 bg-card px-4 py-3 text-[13px] font-bold hover:border-accent"
        >
          Sort By: <span className="text-white/60">⌄</span>
        </button>

        <input
          placeholder="Search for attended events..."
          className="h-[46px] w-full rounded-[10px] border border-white/10 bg-card px-5 text-[12px] text-white placeholder:text-white/50 outline-none focus:border-accent"
        />

        {EVENTS.map((e) => (
          <div key={e.name} className="rounded-[12px] border border-white/10 bg-card px-6 py-5">
            <div className="flex items-center gap-4">
              <span className="size-8 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div className="flex-1">
                <p className="text-[14px] font-bold">{e.name}</p>
                <p className="text-[11px] text-white/70">
                  {e.date} <span className="mx-1">·</span> {e.city}
                </p>
              </div>
              <button
                type="button"
                className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-4 py-2 text-[11px] font-bold text-accent hover:brightness-125"
              >
                View Event
              </button>
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
