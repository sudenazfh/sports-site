import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'
import { AdminRow, AdminSearchBar, greyBtnCls, viewBtnCls } from './AdminLists.jsx'

const REPORTS = [
  { id: 1, type: 'account', name: 'Kyrenia Tennis Association', sub: 'Member Since: 3 December, 2026' },
  { id: 2, type: 'event', name: 'Aquatic Cup', sub: 'Sep 5, 2026 · Nicosia' },
  { id: 3, type: 'review', name: 'Famagusta International Marathon', sub: 'August 15, 2026 · Famagusta', rating: 1, review: '"Very boring event"' },
]

export default function AdminReports() {
  const [query, setQuery] = useState('')
  const [reports, setReports] = useState(REPORTS)
  const shown = reports.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))

  const resolve = (id) => setReports((rs) => rs.filter((x) => x.id !== id))

  return (
    <AppLayout title="Reports" role="admin">
      <div className="flex flex-col gap-5 p-7">
        <AdminSearchBar query={query} onQuery={setQuery} dropdowns={2} />
        {shown.length === 0 && <p className="text-[13px] text-white/50">No reports.</p>}
        {shown.map((r) => (
          <div key={r.id} className="rounded-[12px] border border-white/10 bg-card px-6 py-5">
            <div className="flex items-center gap-4">
              <span className="size-9 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div className="w-[320px]">
                <p className="text-[13px] font-bold">{r.name}</p>
                <p className="text-[11px] text-white/60">{r.sub}</p>
              </div>
              {r.type === 'review' && (
                <span className="text-[18px] text-accent">
                  {[1, 2, 3, 4, 5].map((n) => (n <= r.rating ? '★' : '☆')).join(' ')}
                </span>
              )}
              <div className="ml-auto flex gap-4">
                {r.type === 'account' && (
                  <Link to="/admin/account-report" className={viewBtnCls}>
                    View
                  </Link>
                )}
                {r.type === 'event' && (
                  <>
                    <Link to="/admin/event-participants" className={greyBtnCls}>
                      Details
                    </Link>
                    <Link to="/admin/report-view" className={viewBtnCls}>
                      View Event
                    </Link>
                  </>
                )}
                {r.type === 'review' && (
                  <>
                    <button type="button" onClick={() => resolve(r.id)} className={`font-anon ${greyBtnCls}`}>
                      DELETE REVIEW
                    </button>
                    <button type="button" onClick={() => resolve(r.id)} className={`font-anon ${greyBtnCls}`}>
                      KEEP REVIEW
                    </button>
                  </>
                )}
              </div>
            </div>
            {r.review && (
              <p className="mt-3 ml-12 w-fit rounded-[8px] bg-night px-4 py-2 text-[12px] font-bold text-white/90">
                {r.review}
              </p>
            )}
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
