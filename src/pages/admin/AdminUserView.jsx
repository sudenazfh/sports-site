import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'

const ATTENDED = [
  { id: 1, name: 'APOEL vs Omonai Derby', sub: 'August 3, 2026  ·  Nicosia', rating: 0, review: null },
  { id: 2, name: 'Famagusta International Marathon', sub: 'August 15, 2026  ·  Famagusta', rating: 1, review: '"Great event, had so much fun!"' },
  { id: 3, name: 'Cablenet Run', sub: 'October 11, 2026  ·  Famagusta', rating: 1, review: null },
]

const PAYMENTS = [
  ['August 2026', 'Event Registration', 'APOEL vs Omonai Derby', '€15', 'Completed'],
  ['August 2026', 'Membership', 'Famagusta Athletic Union', '€12', 'Completed'],
  ['July 2026', 'Event Registration', 'Beach Volleyball Cyprus', '€22,5', 'Failed'],
  ['July 2026', 'Membership', 'Famagusta Athletic Union', '€12', 'Pending'],
]

const MEMBERSHIPS = [
  { id: 1, name: 'Famagusta Athletic Union', sub: 'Member Since: 10 September, 2025' },
  { id: 2, name: 'Kyrenia Tennis Association', sub: 'Member Since: 3 December, 2026' },
  { id: 3, name: 'Cyprus Swimming Club', sub: 'Member Since: 7 January, 2024' },
  { id: 4, name: 'Nicosia Runners', sub: 'Member Since: 2 March, 2025' },
]

const TABS = ['Attended Events', 'Payments', 'Memberships']

export default function AdminUserView() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Attended Events')
  const [query, setQuery] = useState('')
  const [reviews, setReviews] = useState(ATTENDED)

  const deleteReview = (id) =>
    setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, rating: 0, review: null } : r)))

  return (
    <AppLayout title="Sude Katırcıoğlu" role="admin">
      <div className="relative bg-gradient-to-r from-[#2a3157] to-night px-7 pt-6 pb-8">
        <div className="flex items-start justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-[15px] bg-night/80 px-4 py-1.5 text-[12px] font-bold text-white hover:brightness-150"
          >
            ← Back
          </button>
          <button
            type="button"
            className="rounded-[8px] bg-[rgba(247,63,82,0.15)] px-4 py-2 font-anon text-[12px] font-bold text-[#f73f52] hover:brightness-125"
          >
            BAN USER
          </button>
        </div>
        <h1 className="mt-6 text-[36px] font-extrabold">Sude Katırcıoğlu</h1>
        <span className="rounded-[10px] bg-night/70 px-3 py-1 font-mono text-[11px] text-white/80">User</span>
      </div>

      <div className="flex flex-col gap-5 p-7 pt-5">
        <div className="flex gap-3">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-[10px] px-4 py-2 text-[13px] font-bold ${
                tab === t ? 'bg-field text-accent' : 'bg-card text-white/80 hover:bg-field/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab !== 'Memberships' && (
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tab === 'Payments' ? 'Search for payments..' : 'Search for events..'}
            className="h-[46px] w-full rounded-[10px] border border-white/10 bg-card px-5 text-[12px] text-white placeholder:text-white/50 outline-none focus:border-accent"
          />
        )}

        {tab === 'Attended Events' &&
          reviews
            .filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))
            .map((e) => (
              <div key={e.id} className="rounded-[12px] border border-white/10 bg-card px-6 py-5">
                <div className="flex items-center gap-4">
                  <span className="size-8 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
                  <div className="w-[280px]">
                    <p className="text-[14px] font-bold">{e.name}</p>
                    <p className="text-[11px] text-white/70">{e.sub}</p>
                  </div>
                  {e.rating > 0 && (
                    <span className="text-[18px] text-accent">
                      {[1, 2, 3, 4, 5].map((n) => (n <= e.rating ? '★' : '☆')).join(' ')}
                    </span>
                  )}
                  <div className="ml-auto">
                    {e.rating > 0 ? (
                      <button
                        type="button"
                        onClick={() => deleteReview(e.id)}
                        className="rounded-[10px] bg-night px-5 py-2 font-anon text-[11px] font-bold text-white hover:brightness-150"
                      >
                        DELETE REVIEW
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-5 py-2 font-anon text-[11px] font-bold text-accent hover:brightness-125"
                      >
                        ADD REVIEW
                      </button>
                    )}
                  </div>
                </div>
                {e.review && (
                  <p className="mt-3 ml-12 w-fit rounded-[8px] bg-night px-4 py-2 text-[12px] font-bold text-white/90">
                    {e.review}
                  </p>
                )}
              </div>
            ))}

        {tab === 'Payments' && (
          <section className="rounded-[12px] border border-white/10 bg-card p-6">
            <p className="pb-4 text-[13px] font-bold">Recent Payments</p>
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b border-white/20 text-white/60">
                  <th className="py-2 font-bold">DATE</th>
                  <th className="py-2 font-bold">TYPE</th>
                  <th className="py-2 font-bold">DETAIL</th>
                  <th className="py-2 font-bold">AMOUNT</th>
                  <th className="py-2 font-bold">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {PAYMENTS.filter((p) => p.join(' ').toLowerCase().includes(query.toLowerCase())).map((p, i) => (
                  <tr key={i} className="border-b border-white/15">
                    <td className="py-3 font-bold text-white/80">{p[0]}</td>
                    <td className="py-3 font-bold">{p[1]}</td>
                    <td className="py-3">{p[2]}</td>
                    <td className="py-3">{p[3]}</td>
                    <td
                      className={`py-3 font-bold ${
                        p[4] === 'Completed' ? 'text-accent' : p[4] === 'Failed' ? 'text-[#f73f52]' : 'text-white/70'
                      }`}
                    >
                      {p[4]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {tab === 'Memberships' &&
          MEMBERSHIPS.map((m) => (
            <div key={m.id} className="flex items-center gap-4 rounded-[12px] border border-white/10 bg-card px-6 py-5">
              <span className="size-9 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div className="flex-1">
                <p className="text-[13px] font-bold">{m.name}</p>
                <p className="text-[11px] text-white/60">{m.sub}</p>
              </div>
              <Link
                to="/admin/account-view"
                className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-5 py-2 text-[11px] font-bold text-accent hover:brightness-125"
              >
                View Info
              </Link>
            </div>
          ))}
      </div>
    </AppLayout>
  )
}
