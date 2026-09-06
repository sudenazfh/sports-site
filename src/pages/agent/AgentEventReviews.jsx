import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../api.js'
import AppLayout from '../../components/AppLayout.jsx'

const FALLBACK = [
  { id: 1, user: 'Sıla İl', member: true, date: 'August 16, 2026', rating: 5, text: 'Great experince!' },
]

export default function AgentEventReviews({ admin = false }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [reviews, setReviews] = useState(FALLBACK)
  const [query, setQuery] = useState('')

  useEffect(() => {
    api(`/agent/events/${id}/reviews`).then(setReviews).catch(() => {})
  }, [id])

  const shown = reviews.filter((r) => r.user.toLowerCase().includes(query.toLowerCase()))

  return (
    <AppLayout title={admin ? 'Reports' : 'My Events'} role={admin ? 'admin' : 'agent'}>
      <div className="flex flex-col gap-5 p-7">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="self-start rounded-[15px] bg-card px-4 py-1.5 text-[12px] font-bold text-white hover:brightness-150"
        >
          ← Back
        </button>

        <div className="flex items-center gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for participants.."
            className="h-[46px] flex-1 rounded-[10px] border border-white/10 bg-card px-5 text-[12px] text-white placeholder:text-white/50 outline-none focus:border-accent"
          />
          <button type="button" className="flex h-[46px] items-center gap-6 rounded-[10px] border border-white/10 bg-card px-4 text-[13px] font-bold hover:border-accent">
            Sort By: <span className="text-white/60">⌄</span>
          </button>
        </div>

        {shown.length === 0 && <p className="text-[13px] text-white/50">No reviews yet.</p>}

        {shown.map((r) => (
          <div key={r.id} className="flex flex-col gap-3 rounded-[12px] border border-white/10 bg-card px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="size-9 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div>
                <p className="flex items-center gap-3 text-[13px] font-bold">
                  {r.user}
                  {r.member && (
                    <span className="flex items-center gap-1 text-[9px] font-normal text-accent">
                      <span className="size-1 rounded-full bg-accent" /> Member
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-white/60">{r.date}</p>
              </div>
            </div>
            <div className="ml-12 flex gap-1 text-[20px] text-accent">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n}>{n <= r.rating ? '★' : '☆'}</span>
              ))}
            </div>
            {r.text && (
              <p className="ml-12 rounded-[8px] bg-night px-4 py-2.5 text-[12px] font-bold text-white/90">{r.text}</p>
            )}
            <div className="ml-12 flex gap-4">
              <Link
                to={admin ? '/admin/messages' : '/agent/messages'}
                className="rounded-[15px] bg-night px-5 py-1.5 text-[12px] font-bold text-white hover:brightness-150"
              >
                Message User
              </Link>
              <button
                type="button"
                onClick={admin ? () => setReviews((rs) => rs.filter((x) => x.id !== r.id)) : undefined}
                className="rounded-[15px] bg-[rgba(247,63,82,0.1)] px-5 py-1.5 text-[12px] font-bold text-[#f73f52] hover:brightness-125"
              >
                {admin ? 'Delete Review' : 'Report Review'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
