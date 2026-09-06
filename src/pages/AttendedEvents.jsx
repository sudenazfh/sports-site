import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import FilterBar from '../components/FilterBar.jsx'
import { attendedEvents } from '../data/mock.js'

function Stars({ value, onChange }) {
  return (
    <span className="flex gap-1.5 text-[18px] leading-none">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={n <= value ? 'text-accent' : 'text-accent/60'}
          aria-label={`${n} stars`}
        >
          {n <= value ? '★' : '☆'}
        </button>
      ))}
    </span>
  )
}

function AttendedRow({ event }) {
  const [rating, setRating] = useState(event.rating)
  const [review, setReview] = useState(event.review)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(review ?? '')
  const reviewed = review != null || event.hasReview

  function save() {
    setReview(draft ? `"${draft.replaceAll('"', '')}"` : null)
    setEditing(false)
  }

  return (
    <div className="flex flex-col gap-2 rounded-[15px] border border-white/10 bg-card px-6 py-5">
      <div className="flex items-center gap-4">
        <span className="size-8 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
        <div className="w-[300px]">
          <p className="text-[14px] font-bold">{event.name}</p>
          <p className="text-[11px] text-white/70">
            {event.date} <span className="mx-1">·</span> {event.city}
          </p>
        </div>
        {reviewed && <Stars value={rating} onChange={setRating} />}
        <div className="ml-auto flex items-center gap-4">
          <Link
            to="/event"
            className="rounded-[10px] bg-[rgba(123,136,255,0.1)] px-4 py-2 text-[11px] font-bold text-white hover:brightness-125"
          >
            View Event
          </Link>
          <div className="flex w-[150px] flex-col gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-[10px] bg-field px-4 py-2 text-[12px] font-bold text-accent hover:brightness-125"
            >
              {reviewed ? 'EDIT REVIEW' : 'ADD REVIEW'}
            </button>
            {reviewed && (
              <button
                type="button"
                onClick={() => {
                  setReview(null)
                  setRating(0)
                  event.hasReview = false
                }}
                className="rounded-[10px] bg-night px-4 py-2 text-[12px] font-bold text-white hover:brightness-150"
              >
                DELETE REVIEW
              </button>
            )}
          </div>
        </div>
      </div>
      {editing ? (
        <div className="ml-12 flex w-[660px] items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write your review.."
            className="h-[34px] flex-1 rounded-[10px] border-[0.2px] border-white/40 bg-[#12172e] px-4 text-[11px] text-white/90 outline-none focus:border-accent"
          />
          <button type="button" onClick={save} className="rounded-[10px] bg-accent px-4 py-2 text-[11px] font-bold text-night">
            Save
          </button>
        </div>
      ) : (
        review && (
          <p className="ml-12 w-[660px] rounded-[10px] bg-[#12172e] px-4 py-2 text-[11px] text-white/90">{review}</p>
        )
      )}
    </div>
  )
}

export default function AttendedEvents() {
  const [freeOnly, setFreeOnly] = useState(false)
  const [query, setQuery] = useState('')

  const shown = attendedEvents.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <AppLayout title="Attended Events">
      <FilterBar
        query={query}
        onQuery={setQuery}
        freeOnly={freeOnly}
        onFreeOnly={setFreeOnly}
        placeholder="Search for events.."
      />
      <div className="flex flex-col gap-5 p-7">
        {shown.map((e) => (
          <AttendedRow key={e.id} event={e} />
        ))}
      </div>
    </AppLayout>
  )
}
