import { Link } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'
import CurrencyRates from '../../components/CurrencyRates.jsx'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

const STATS = [
  { value: '4,103', label: 'Total Accounts', sub: '+32 this month' },
  { value: '23', label: 'Active Agents', sub: '+2 this month' },
  { value: '52', label: 'Active Events', sub: '+5 this week' },
  { value: '€16,823', label: 'Platform Revenue', sub: '+24% vs last month' },
]

const PENDING = [
  { text: '2 agent application awaiting review', to: '/admin/account-requests' },
  { text: '2 events pending approval', to: '/admin/event-requests' },
  { text: '4 Reports', to: '/admin/reports' },
  { text: '2 new messages', to: '/admin/messages' },
  { text: '8 change of commission rate requests', to: '/admin/account-requests' },
]

const REVENUE_BY_CITY = [
  { city: 'Limassol', pct: 30 },
  { city: 'Cyprus', pct: 78 },
  { city: 'Paphos', pct: 10 },
  { city: 'Ayia', pct: 6 },
]

export default function AdminDashboard() {
  return (
    <AppLayout title="Dashboard" role="admin">
      <div className="flex flex-wrap items-start gap-7 p-7">
        <div className="flex min-w-[560px] flex-[1.8] flex-col gap-6">
          <div className="grid grid-cols-4 gap-5">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-[12px] border border-white/10 bg-card px-5 py-4">
                <p className="text-[22px] font-extrabold">{s.value}</p>
                <p className="mt-1 text-[12px] font-bold text-white/80">{s.label}</p>
                <p className="text-[11px] text-white/50">{s.sub}</p>
              </div>
            ))}
          </div>

          <section className="rounded-[12px] border border-white/10 bg-card p-6">
            <div className="flex items-center justify-between pb-4">
              <p className="text-[16px] font-bold text-accent">Platform Income (2025)</p>
              <p className="font-mono text-[14px] font-bold text-[#17e9a1]">YTD: €76.2k</p>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col justify-between py-1 text-right text-[10px] text-white/50">
                <span>€18k</span>
                <span>€14k</span>
                <span>€9k</span>
                <span>€5k</span>
                <span>€0k</span>
              </div>
              <div className="flex-1">
                <svg viewBox="0 0 700 170" className="h-[170px] w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="platformFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4d79ff" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#4d79ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,125 C50,122 90,118 120,112 C170,100 200,30 250,22 C290,18 320,80 380,100 C440,118 500,95 560,75 C620,55 670,35 700,25"
                    fill="none"
                    stroke="#4d79ff"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M0,125 C50,122 90,118 120,112 C170,100 200,30 250,22 C290,18 320,80 380,100 C440,118 500,95 560,75 C620,55 670,35 700,25 L700,170 L0,170 Z"
                    fill="url(#platformFill)"
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

          <section className="w-[80%] rounded-[12px] border border-white/10 bg-card p-6">
            <p className="pb-5 text-[15px] font-bold">Commission Revenue by Agent</p>
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

          <section className="w-[80%] rounded-[12px] border border-white/10 bg-card p-6">
            <p className="pb-3 text-[15px] font-bold">Last Month Status</p>
            <table className="w-full text-left text-[13px]">
              <tbody>
                <tr className="border-t border-white/15">
                  <td className="py-3 font-bold">August 2026</td>
                  <td className="py-3">Membership</td>
                  <td className="py-3">€8.766</td>
                  <td className="py-3 text-right font-bold">%700 ↑</td>
                </tr>
                <tr className="border-t border-white/15">
                  <td className="py-3 font-bold">August 2026</td>
                  <td className="py-3">Event</td>
                  <td className="py-3">€3.820</td>
                  <td className="py-3 text-right font-bold text-[#f73f52]">%50 ↓</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        <div className="flex min-w-[340px] flex-1 flex-col gap-6">
          <section className="rounded-[12px] border border-white/10 bg-card p-6">
            <p className="pb-2 text-[16px] font-bold">Pending Actions</p>
            <div className="divide-y divide-white/15">
              {PENDING.map((p) => (
                <Link key={p.text} to={p.to} className="flex items-center gap-4 py-4 hover:brightness-125">
                  <span className="size-9 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
                  <p className="text-[14px] font-bold">{p.text}</p>
                </Link>
              ))}
            </div>
          </section>

          <CurrencyRates />
        </div>
      </div>
    </AppLayout>
  )
}
