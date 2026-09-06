import AppLayout from '../../components/AppLayout.jsx'

const BARS = [
  { m: 'Jan', total: 34, com: 8 },
  { m: 'Feb', total: 28, com: 8 },
  { m: 'Mar', total: 96, com: 8 },
  { m: 'Apr', total: 38, com: 8 },
  { m: 'May', total: 58, com: 8 },
  { m: 'Jun', total: 72, com: 8 },
  { m: 'Jul', total: 92, com: 8 },
]

const ROWS = [
  ['August 2026', 'Membership', '€9.740', '€974', '€8.766', '%700 ↑', 'up'],
  ['August 2026', 'Event', '€4.200', '€380', '€3.820', '%50 ↓', 'down'],
  ['July 2026', 'Membership', '€1.600', '€160', '€1.440', '%12 ↓', 'down'],
  ['July 2026', 'Event', '€6.800', '€650', '€6.150', '%250 ↑', 'up'],
  ['June 2026', 'Membership', '€1.800', '€180', '€1.620', '%90 ↓', 'down'],
  ['June 2026', 'Event', '€2.200', '€200', '€2.000', '%6 ↑', 'up'],
  ['May 2026', 'Membership', '€3.100', '€300', '€2.800', '%150 ↓', 'down'],
  ['May 2026', 'Event', '€1.600', '€160', '€1.440', '%2 ↓', 'down'],
  ['April 2026', 'Membership', '€6.800', '€650', '€6.150', '%250 ↑', 'up'],
  ['April 2026', 'Event', '€1.800', '€180', '€1.620', '%4 ↓', 'down'],
  ['March 2026', 'Membership', '€2.200', '€200', '€2.000', '%5 ↑', 'up'],
  ['March 2026', 'Event', '€3.100', '€300', '€2.800', '%2 ↑', 'up'],
]

export default function SystemIncome() {
  return (
    <AppLayout title="System Income" role="admin">
      <div className="flex flex-col gap-6 p-7">
        <section className="rounded-[12px] border border-white/10 bg-card p-6">
          <div className="flex gap-3">
            <div className="flex h-[230px] flex-col justify-between text-right text-[10px] text-white/50">
              <span>€18k</span>
              <span>€14k</span>
              <span>€9k</span>
              <span>€5k</span>
              <span>€0k</span>
            </div>
            <div className="flex flex-1 items-end justify-around">
              {BARS.map((b) => (
                <div key={b.m} className="flex w-[170px] flex-col items-center gap-2">
                  <div className="flex w-full flex-col">
                    <div
                      className="w-full rounded-t-[6px] bg-[#4d79ff]"
                      style={{ height: `${(b.com / 100) * 220}px` }}
                    />
                    <div className="w-full bg-[#17e9a1]" style={{ height: `${(b.total / 100) * 220}px` }} />
                  </div>
                  <span className="text-[11px] text-white/60">{b.m}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[12px] border border-white/10 bg-card p-6">
          <p className="pb-4 text-[15px] font-bold">Monthly Income Table</p>
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-white/20 text-[12px] text-white/60">
                <th className="py-2 font-bold">MONTH</th>
                <th className="py-2 font-bold">TYPE</th>
                <th className="py-2 font-bold">TOTAL PAYEMNT</th>
                <th className="py-2 font-bold">COMMISSION CUT</th>
                <th className="py-2 font-bold">TOTAL PLATFORM REVENUE</th>
                <th className="py-2 font-bold">RATE</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} className="border-b border-white/15">
                  <td className="py-3 font-bold">{r[0]}</td>
                  <td className="py-3 font-bold">{r[1]}</td>
                  <td className="py-3">{r[2]}</td>
                  <td className="py-3">{r[3]}</td>
                  <td className="py-3">{r[4]}</td>
                  <td className={`py-3 font-bold ${r[6] === 'down' ? 'text-[#f73f52]' : ''}`}>{r[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </AppLayout>
  )
}
