import { Link } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'
import CurrencyRates from '../../components/CurrencyRates.jsx'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

const REVENUE_BY_CITY = [
  { city: 'Limassol', pct: 30 },
  { city: 'Cyprus', pct: 78 },
  { city: 'Paphos', pct: 10 },
  { city: 'Ayia', pct: 6 },
]

function StatCard({ label, value, valueClass = 'text-accent' }) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-[12px] border border-white/10 bg-card px-5 py-5">
      <p className="text-[14px] font-bold leading-snug">{label}</p>
      <p className={`text-[22px] font-extrabold ${valueClass}`}>{value}</p>
    </div>
  )
}

export default function AgentDashboard() {
  return (
    <AppLayout title="Dashboard" role="agent">
      <div className="flex items-start gap-7 p-7">
        <div className="flex w-[810px] flex-col gap-6">
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Total Members:" value="147" />
            <StatCard label="Expiring Soon Members:" value="9" valueClass="text-[#f73f52]" />
            <StatCard label="Current Membership Cost:" value="€12/mo" valueClass="text-white" />
            <StatCard label="Commission Cut from Memberships:" value="1.2€" valueClass="text-white" />
          </div>

          <section className="rounded-[12px] border border-white/10 bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-bold">Upcoming Event: 2 days</p>
              <Link
                to="/agent/my-events"
                className="rounded-[10px] bg-[rgba(123,136,255,0.15)] px-3 py-1.5 text-[10px] font-bold text-accent hover:brightness-125"
              >
                View Event
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <span className="size-8 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div>
                <p className="text-[13px] font-bold">APOEL vs Omonai Derby</p>
                <p className="text-[10px] text-white/70">August 3, 2026 · Nicosia</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[12px] text-white/70">
              <span>Participants</span>
              <span>15/50</span>
            </div>
            <div className="mt-1 h-[3px] w-full rounded bg-white/10">
              <div className="h-full w-[30%] rounded bg-accent" />
            </div>
          </section>

          <section className="rounded-[12px] border border-white/10 bg-card p-6">
            <div className="flex items-center justify-between pb-4">
              <p className="text-[16px] font-bold text-accent">Monthly Net Income</p>
              <span className="rounded-[10px] bg-field px-3 py-1 text-[12px] font-bold text-accent">
                ‹ 2025 ›
              </span>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col justify-between py-1 text-right text-[10px] text-white/50">
                <span>€100k</span>
                <span>€75k</span>
                <span>€50k</span>
                <span>€25k</span>
                <span>€0k</span>
              </div>
              <div className="flex-1">
                <svg viewBox="0 0 700 180" className="h-[180px] w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#17e9a1" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#17e9a1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,150 C60,148 90,145 120,142 C170,135 200,40 250,25 C290,15 310,90 350,140 C400,158 450,150 500,145 C560,140 640,135 700,128"
                    fill="none"
                    stroke="#17e9a1"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M0,150 C60,148 90,145 120,142 C170,135 200,40 250,25 C290,15 310,90 350,140 C400,158 450,150 500,145 C560,140 640,135 700,128 L700,180 L0,180 Z"
                    fill="url(#incomeFill)"
                  />
                </svg>
                <div className="flex justify-between text-[11px] text-white/60">
                  {MONTHS.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="w-[85%] rounded-[12px] border border-white/10 bg-card p-6">
            <p className="pb-5 text-[16px] font-bold text-accent">Commission Revenue by Agent</p>
            <div className="flex gap-3">
              <div className="flex h-[120px] flex-col justify-between text-right text-[10px] text-white/50">
                <span>€22k</span>
                <span>€17k</span>
                <span>€11k</span>
                <span>€6k</span>
                <span>€0k</span>
              </div>
              <div className="flex flex-1 items-end justify-around">
                {REVENUE_BY_CITY.map((r) => (
                  <div key={r.city} className="flex w-[125px] flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-[4px] bg-[#17e9a1]"
                      style={{ height: `${(r.pct / 100) * 120}px` }}
                    />
                    <span className="text-[11px] text-white/60">{r.city}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <section className="rounded-[12px] border border-white/10 bg-card p-6">
            <p className="pb-3 text-[15px] font-bold">Last Month Status</p>
            <table className="w-full text-left text-[13px]">
              <tbody>
                <tr className="border-t border-white/15">
                  <td className="py-3 font-bold">August 2026</td>
                  <td className="py-3">Membership</td>
                  <td className="py-3">€8.766</td>
                  <td className="py-3 text-right text-accent">%700 ↑</td>
                </tr>
                <tr className="border-t border-white/15">
                  <td className="py-3 font-bold">August 2026</td>
                  <td className="py-3">Event</td>
                  <td className="py-3">€3.820</td>
                  <td className="py-3 text-right text-[#f73f52]">%50 ↓</td>
                </tr>
              </tbody>
            </table>
          </section>

          <CurrencyRates />
        </div>
      </div>
    </AppLayout>
  )
}
