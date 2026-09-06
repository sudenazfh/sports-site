import { Link } from 'react-router-dom'
import calendar from '../assets/icon-calendar.svg'
import location from '../assets/icon-location.svg'
import heartBtn from '../assets/icon-heart-btn.svg'
import heartFav from '../assets/icon-heart-fav.svg'
import { categoryImage } from '../data/mock.js'

export default function EventCard({ event, fav = false, to = '/event', onFav }) {
  const pct = Math.round((event.taken / event.capacity) * 100)
  return (
    <Link
      to={to}
      className="flex w-[314px] flex-col overflow-clip rounded-[15px] bg-card transition hover:brightness-110"
    >
      <div className="relative h-[155px]">
        <img
          src={event.image ?? categoryImage(event.category)}
          alt={event.name}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 shadow-[inset_0px_-20px_40px_0px_#101528]" />
        <span className="absolute top-3 left-2.5 flex w-[71px] items-center justify-center rounded-[15px] bg-[rgba(13,16,29,0.9)] py-0.5 font-anon text-[10px] font-bold text-white">
          {event.category}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            onFav?.(event)
          }}
          className="absolute top-2 right-2.5 size-[25px] hover:brightness-125"
          aria-label="Add to favourites"
        >
          <img src={fav ? heartFav : heartBtn} alt="" className="size-full" />
        </button>
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        <p className="text-[15px] font-bold">{event.name}</p>
        <div className="flex items-center gap-1.5 text-[12px] text-white/70">
          <img src={calendar} alt="" className="size-[15px]" />
          <span>{event.date}</span>
          <img src={location} alt="" className="ml-2 size-[18px]" />
          <span>{event.city}</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-[12px] text-white/70">
          <span>Availability</span>
          <span>
            {event.taken}/{event.capacity}
          </span>
        </div>
        <div className="h-[3px] w-full rounded bg-white/10">
          <div className="h-full rounded bg-accent" style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-2 flex items-baseline justify-between">
          {event.price === 0 ? (
            <p className="text-[20px] font-bold text-accent">FREE</p>
          ) : (
            <p className="text-[20px] font-bold">{event.price} €</p>
          )}
          {event.memberNote && <p className="text-[12px] text-accent">{event.memberNote}</p>}
        </div>
      </div>
    </Link>
  )
}
