import { Link } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'

const MONTHLY = [
  { m: 'Jan', a: 14, b: 12 },
  { m: 'Feb', a: 4, b: 3 },
  { m: 'Mar', a: 100, b: 90 },
  { m: 'Apr', a: 5, b: 4 },
  { m: 'May', a: 16, b: 14 },
  { m: 'Jun', a: 20, b: 18 },
  { m: 'Jul', a: 30, b: 27 },
]

const PER_EVENT = [
  { name: 'APOEL vs Omonai Derby', gross: '€375', com: '%10', net: '€337,5' },
  { name: 'Famagusta International Marathon', gross: '€415', com: '%10', net: '€373,5' },
  { name: 'Cablenet Run', gross: '€150', com: '%10', net: '€135,0' },
  { name: 'Beach Volleyball Cyprus', gross: '€200', com: '%9', net: '€180,0' },
]

const INCOME_ROWS = [
  ['August 2026', 'Membership', '-', '€100', '0'],
  ['August 2026', 'Event', '€4.200', '€380', '€3.820'],
  ['July 2026', 'Membership', '-', '€100', '0'],
  ['July 2026', 'Event', '€6.800', '€650', '€6.150'],
  ['June 2026', 'Membership', '-', '€100', '0'],
  ['June 2026', 'Event', '€2.200', '€200', '€2.000'],
  ['May 2026', 'Membership', '-', '€100', '0'],
]

export default function AgentIncome() {
  return (
    <AppLayout title="Income" role="agent">
      <div className="flex items-start gap-7 p-7">
        <div className="flex w-[880px] flex-col gap-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-[12px] border border-white/10 bg-card px-6 py-5">
              <p className="text-[24px] font-extrabold">€192.2k</p>
              <p className="mt-2 text-[11px] font-bold text-white/80">Gross Income:</p>
              <p className="text-[10px] text-white/50">Total Collected</p>
            </div>
            <div className="rounded-[12px] border border-white/10 bg-card px-6 py-5">
              <p className="text-[24px] font-extrabold text-[#f73f52]">-€19.2k</p>
              <p className="mt-2 text-[11px] font-bold text-white/80">Platform Commission (%10)</p>
              <p className="text-[10px] text-white/50">Deducted at payment</p>
            </div>
            <div className="rounded-[12px] border border-white/10 bg-card px-6 py-5">
              <p className="text-[24px] font-extrabold text-accent">€173.0k</p>
              <p className="mt-2 text-[11px] font-bold text-white/80">Net Income Received</p>
              <p className="text-[10px] text-white/50">After Commission</p>
            </div>
          </div>

          <section className="rounded-[12px] border border-white/10 bg-card p-6">
            <div className="flex items-center justify-between pb-6">
              <p className="text-[16px] font-bold text-accent">Monthly Breakdown</p>
              <span className="rounded-[10px] bg-field px-3 py-1 text-[12px] font-bold text-accent">
                ‹ 2025 ›
              </span>
            </div>
            <div className="flex gap-3">
              <div className="flex h-[200px] flex-col justify-between text-right text-[10px] text-white/50">
                <span>€100k</span>
                <span>€75k</span>
                <span>€50k</span>
                <span>€25k</span>
                <span>€0k</span>
              </div>
              <div className="flex flex-1 items-end justify-around">
                {MONTHLY.map((r) => (
                  <div key={r.m} className="flex flex-col items-center gap-2">
                    <div className="flex items-end gap-1.5">
                      <div className="w-[48px] rounded-t-[3px] bg-[#0d9373]" style={{ height: `${r.a * 2}px` }} />
                      <div className="w-[48px] rounded-t-[3px] bg-[#17e9a1]" style={{ height: `${r.b * 2}px` }} />
                    </div>
                    <span className="text-[11px] text-white/60">{r.m}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[12px] border border-white/10 bg-card p-6">
            <p className="pb-4 text-[13px] font-bold">Monthly Income Table</p>
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b border-white/20 text-white/60">
                  <th className="py-2 font-bold">DATE</th>
                  <th className="py-2 font-bold">TYPE</th>
                  <th className="py-2 font-bold">GROSS</th>
                  <th className="py-2 font-bold">CUT</th>
                  <th className="py-2 font-bold">TOTAL RECEIVED</th>
                </tr>
              </thead>
              <tbody>
                {INCOME_ROWS.map((r, i) => (
                  <tr key={i} className="border-b border-white/15">
                    <td className="py-3 font-bold text-white/80">{r[0]}</td>
                    <td className="py-3 font-bold">{r[1]}</td>
                    <td className="py-3">{r[2]}</td>
                    <td className={`py-3 ${r[1] === 'Membership' ? 'text-[#f73f52]' : ''}`}>{r[3]}</td>
                    <td className="py-3">{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <section className="rounded-[12px] border border-white/10 bg-card p-6">
            <div className="flex items-center justify-between pb-4">
              <p className="text-[14px] font-bold">Per Event Income</p>
              <Link to="/agent/income/events" className="text-[12px] font-bold text-accent hover:brightness-125">
                View All →
              </Link>
            </div>
            <div className="divide-y divide-white/15">
              {PER_EVENT.map((e) => (
                <div key={e.name} className="flex items-center gap-4 py-3.5">
                  <span className="size-8 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
                  <div className="flex-1">
                    <p className="text-[13px] font-bold">{e.name}</p>
                    <p className="text-[10px] text-white/60">
                      Gross: {e.gross} · Commission: {e.com}
                    </p>
                  </div>
                  <p className="text-[13px] font-bold">{e.net}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[12px] border border-white/10 bg-card p-6">
            <div className="flex items-center justify-between pb-4">
              <p className="text-[14px] font-bold">Monthly Membership Income</p>
              <Link to="/agent/income/members" className="text-[12px] font-bold text-accent hover:brightness-125">
                View All →
              </Link>
            </div>
            <div className="flex items-center justify-between border-t border-white/15 py-3.5">
              <div>
                <p className="text-[13px] font-bold">August 2026</p>
                <p className="text-[10px] text-white/60">Gross: €9740 · Commission: %10</p>
              </div>
              <p className="text-[13px] font-bold">€8.766</p>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  )
}
