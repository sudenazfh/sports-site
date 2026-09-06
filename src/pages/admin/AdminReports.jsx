import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'
import { AdminRow, AdminSearchBar, viewBtnCls } from './AdminLists.jsx'

const REPORTS = [
  { id: 1, name: 'Event Report: Nicosia Football Tournament', sub: 'Reported by Sude Katırcıoğlu · 2 days ago' },
  { id: 2, name: 'Agent Report: Kardelen Işık', sub: 'Reported by İdil Derin · 3 days ago' },
  { id: 3, name: 'Review Report: APOEL vs Omonai Derby', sub: 'Reported by Famagusta Athletic Union · 5 days ago' },
  { id: 4, name: 'User Report: Hello Kitty', sub: 'Reported by Cyprus Tennis Club · 1 week ago' },
]

export default function AdminReports() {
  const [query, setQuery] = useState('')
  const shown = REPORTS.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <AppLayout title="Reports" role="admin">
      <div className="flex flex-col gap-5 p-7">
        <AdminSearchBar query={query} onQuery={setQuery} dropdowns={1} />
        {shown.map((r) => (
          <AdminRow key={r.id} title={r.name} subtitle={r.sub}>
            <Link to="/admin/report-view" className={viewBtnCls}>
              View Report
            </Link>
          </AdminRow>
        ))}
      </div>
    </AppLayout>
  )
}
