import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import AppLayout from '../components/AppLayout.jsx'
import StatusPill from '../components/StatusPill.jsx'
import { memberships as mockMemberships, myEvents as mockEvents, transactions as mockTransactions } from '../data/mock.js'

export default function UserDashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    api('/my/dashboard').then(setData).catch(() => {})
  }, [])

  const myEvents = data
    ? data.registrations.map((r) => ({
        id: r.id,
        name: r.event?.name,
        date: r.event?.date,
        city: r.event?.city,
        status: r.status,
        eventId: r.eventId,
      }))
    : mockEvents
  const memberships = data
    ? data.memberships.map((m) => ({
        id: m.id,
        name: m.agentName,
        type: m.agentType === 'association' ? 'Association' : 'Club',
        fee: `€${m.fee}/month`,
        expires: m.expires,
        urgent: m.expires.includes('5 days'),
      }))
    : mockMemberships
  const transactions = data ? data.transactions : mockTransactions

  return (
    <AppLayout title="Dashboard">
      <div className="flex flex-col gap-7 p-7">
        <div className="flex gap-6">
          <section className="flex h-[307px] flex-[1.1_0_0] flex-col rounded-[15px] border-[0.2px] border-white/70 bg-card p-6">
            <div className="flex items-center justify-between pb-3">
              <p className="text-[12px] font-bold">
                My Events <span className="ml-1">({myEvents.length})</span>
              </p>
              <Link to="/attended-events" className="text-[12px] font-bold text-accent hover:underline">
                View All →
              </Link>
            </div>
            <div className="flex-1 divide-y divide-white/20 overflow-y-auto">
              {myEvents.map((e) => (
                <Link key={e.id} to={e.eventId ? `/event/${e.eventId}` : '/event'} className="flex items-center gap-4 py-3.5 hover:brightness-125">
                  <span className="size-8 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
                  <div className="flex-1">
                    <p className="text-[12px] font-bold">{e.name}</p>
                    <p className="text-[10px] text-white/70">
                      {e.date} <span className="mx-1">·</span> {e.city}
                    </p>
                  </div>
                  <StatusPill status={e.status} />
                </Link>
              ))}
            </div>
          </section>

          <section className="flex h-[303px] flex-1 flex-col rounded-[15px] border-[0.2px] border-white/70 bg-card p-6">
            <p className="pb-3 text-[12px] font-bold">
              Active Memberships <span className="ml-1">({memberships.length})</span>
            </p>
            <div className="flex-1 divide-y divide-white/20">
              {memberships.map((m) => (
                <div key={m.id} className="flex items-center gap-4 py-4">
                  <div className="flex-1">
                    <p className="text-[12px] font-bold">{m.name}</p>
                    <p className="text-[10px] text-white/70">
                      {m.type} <span className="mx-1">·</span> {m.fee} <span className="mx-1">·</span>{' '}
                      <span className={m.urgent ? 'font-bold text-[#f73f52]' : ''}>{m.expires}</span>
                    </p>
                  </div>
                  <Link
                    to="/agent-profile"
                    className="rounded-[10px] bg-[rgba(123,136,255,0.1)] px-3 py-1.5 text-[8px] font-bold text-[#7b88ff] hover:brightness-125"
                  >
                    View Agent
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="flex flex-col rounded-[15px] border-[0.2px] border-white/70 bg-card p-6">
          <p className="pb-4 text-[12px] font-bold">Transactions</p>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20 text-[12px] font-bold text-white/70">
                <th className="py-2 font-bold">DATE</th>
                <th className="py-2 font-bold">TYPE</th>
                <th className="py-2 font-bold">TO</th>
                <th className="py-2 font-bold">AMOUNT</th>
                <th className="py-2 font-bold">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-white/20 text-[11px]">
                  <td className="py-3.5 font-bold text-white/70">{t.date}</td>
                  <td className="py-3.5 font-bold">{t.type}</td>
                  <td className="py-3.5 font-bold">{t.to}</td>
                  <td className="py-3.5 text-[12px] font-bold">{t.amount}</td>
                  <td className="py-3.5">
                    <StatusPill status={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </AppLayout>
  )
}
