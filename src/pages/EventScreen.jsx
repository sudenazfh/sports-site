import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api.js'
import AppLayout from '../components/AppLayout.jsx'
import { LoginRequiredModal, ReasonModal } from '../components/Modals.jsx'
import heartFav from '../assets/icon-heart-fav.svg'
import { categoryImage } from '../data/mock.js'

export default function EventScreen({ visitor = false, role = 'user' }) {
  const navigate = useNavigate()
  const { id = 1 } = useParams()
  const [event, setEvent] = useState(null)
  const [registered, setRegistered] = useState(false)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [reporting, setReporting] = useState(false)
  const loginOr = (path) => {
    if (visitor) return '/login'
    if (role === 'agent') return '/agent/messages'
    if (role === 'admin') return '/admin/messages'
    return path
  }
  const profilePath = visitor ? '/visitor/agent' : role === 'agent' ? '/agent/agent-profile' : '/agent-profile'
  const canRegister = visitor || role === 'user'

  useEffect(() => {
    api(`/events/${id}`).then(setEvent).catch(() => {})
    if (!visitor && role === 'user')
      api('/my/registrations')
        .then((rs) => setRegistered(rs.some((r) => r.eventId === Number(id))))
        .catch(() => {})
  }, [id, visitor, role])

  async function cancelRegistration() {
    try {
      await api(`/events/${id}/registration`, { method: 'DELETE' })
      setRegistered(false)
      setEvent((e) => ({ ...e, taken: Math.max(0, e.taken - 1) }))
    } catch {}
    setConfirmCancel(false)
  }

  if (!event) {
    return (
      <AppLayout title="Event" visitor={visitor} role={role}>
        <p className="p-10 text-white/60">Loading event...</p>
      </AppLayout>
    )
  }

  const pct = Math.round((event.taken / event.capacity) * 100)
  const agentName = event.agent?.orgName ?? 'Unknown Agent'

  return (
    <AppLayout title={event.name} visitor={visitor} role={role}>
      <div className="relative h-[290px] overflow-clip">
        <img src={categoryImage(event.category)} alt="" className="size-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent" />
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-7 left-7 rounded-[15px] bg-night/80 px-4 py-1.5 text-[12px] font-bold text-white hover:brightness-150"
        >
          ← Back
        </button>
        <div className="absolute top-7 right-8 flex items-center gap-4">
          <p className="font-mono text-[12px] text-white">125 user marked this event as their favourite</p>
          <span className="flex size-11 items-center justify-center rounded-full bg-white">
            <img src={heartFav} alt="" className="size-6" />
          </span>
        </div>
        <div className="absolute bottom-6 left-7 flex flex-col gap-2">
          <span className="w-[71px] rounded-[15px] bg-[rgba(13,16,29,0.9)] py-0.5 text-center font-anon text-[10px] font-bold text-white">
            {event.category}
          </span>
          <h1 className="text-[36px] font-extrabold">{event.name}</h1>
        </div>
        <button
          type="button"
          onClick={() => setReporting(true)}
          className="absolute right-8 bottom-6 rounded-[15px] bg-[rgba(247,63,82,0.2)] px-4 py-1.5 font-anon text-[12px] font-bold text-[#f73f52] hover:brightness-125"
        >
          REPORT EVENT
        </button>
      </div>

      <div className="flex flex-wrap items-start gap-6 p-7">
        <div className="flex min-w-[420px] flex-[1.4] flex-col gap-5 font-mono">
          <section className="rounded-[12px] border border-white/10 bg-card p-6">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="text-[12px] text-white/50">
                  <th className="pb-3 font-normal">DATE</th>
                  <th className="pb-3 font-normal">LOCATION</th>
                  <th className="pb-3 font-normal">CITY</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1">{event.date}</td>
                  <td className="py-1">{event.location}</td>
                  <td className="py-1">{event.city}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="rounded-[12px] border border-white/10 bg-card p-6 text-[13px] leading-relaxed">
            <p className="pb-2 text-[12px] text-white/50">ABOUT</p>
            <p className="text-white/80">{event.description}</p>
          </section>
        </div>

        <section className="flex min-w-[360px] flex-1 flex-col gap-5 rounded-[12px] border border-white/10 bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <p className="text-[16px] font-bold">{agentName}</p>
              <p className="text-[11px] text-white/60">{event.agent?.agentType === 'association' ? 'Association' : 'Organizer'}</p>
            </div>
            <Link
              to={profilePath}
              className="rounded-[10px] bg-night px-3 py-1.5 text-[10px] font-bold text-white hover:brightness-150"
            >
              VIEW PROFILE →
            </Link>
          </div>
          <div className="flex gap-5 text-[11px] text-white/70">
            <span>📅 87 events</span>
            <span>👥 256 members</span>
            <span>♡ 1032 favourites</span>
          </div>
          <Link
            to={loginOr('/messages')}
            className="mt-4 self-center rounded-[10px] bg-[rgba(123,136,255,0.15)] px-10 py-2.5 text-[13px] font-bold text-accent hover:brightness-125"
          >
            MESSAGE AGENT
          </Link>
        </section>

        <section className="ml-auto flex w-[310px] flex-col gap-5 rounded-[12px] border border-white/15 bg-[#12172e] p-6 shadow-[0px_0px_40px_0px_rgba(123,136,255,0.15)]">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-white/70">Registration fee</p>
            <p className="text-[26px] font-extrabold">{event.price === 0 ? 'FREE' : `€${event.price}`}</p>
          </div>
          <div>
            <div className="flex items-center justify-between text-[12px] text-white/70">
              <span>Availability</span>
              <span>
                {event.taken}/{event.capacity}
              </span>
            </div>
            <div className="mt-1 h-[3px] w-full rounded bg-white/10">
              <div className="h-full rounded bg-accent" style={{ width: `${pct}%` }} />
            </div>
          </div>
          {!canRegister ? (
            <span className="self-center rounded-[10px] border border-white/10 bg-night px-10 py-2.5 font-serif text-[15px] font-bold text-white/60">
              AGENT VIEW
            </span>
          ) : registered ? (
            <span className="self-center rounded-[10px] border border-accent/40 bg-[rgba(123,136,255,0.15)] px-10 py-2.5 font-serif text-[15px] font-bold text-accent">
              PAID
            </span>
          ) : (
            <Link
              to={loginOr(`/checkout/${event.id}`)}
              className="self-center rounded-[10px] bg-field px-8 py-2.5 font-serif text-[15px] font-bold text-white hover:bg-accent hover:text-night"
            >
              REGISTER NOW
            </Link>
          )}
        </section>
      </div>
      {registered && (
        <div className="flex justify-end px-7 pb-7">
          <button
            type="button"
            onClick={() => setConfirmCancel(true)}
            className="w-[310px] rounded-[10px] border border-white/20 bg-card py-2.5 font-serif text-[15px] font-bold text-white hover:border-[#f73f52] hover:text-[#f73f52]"
          >
            CANCEL REGISTRATION
          </button>
        </div>
      )}
      {reporting &&
        (visitor ? (
          <LoginRequiredModal onClose={() => setReporting(false)} />
        ) : (
          <ReasonModal
            title="Reason of Report"
            onCancel={() => setReporting(false)}
            onSend={() => setReporting(false)}
          />
        ))}
      {confirmCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="flex w-[820px] flex-col gap-8 rounded-[15px] border border-white/10 bg-card p-10">
            <p className="text-[13px] leading-relaxed text-white/80">
              Notice: Users are allowed to ask for a %50 refund only if there are less than 24 hours until the
              event starts, and a full refund if there are more than 24 hours until the event begins when they
              cancel their participation. If an event is cancelled, the users will receive a full refund
              regardless of the cancellation time.
            </p>
            <p className="text-center text-[14px]">Are you sure that you want to cancel your registiration?</p>
            <div className="flex justify-center gap-6">
              <button
                type="button"
                onClick={() => setConfirmCancel(false)}
                className="w-[135px] rounded-[8px] bg-night py-2.5 text-[13px] font-bold text-white hover:brightness-150"
              >
                NO
              </button>
              <button
                type="button"
                onClick={cancelRegistration}
                className="w-[135px] rounded-[8px] bg-[rgba(123,136,255,0.2)] py-2.5 text-[13px] font-bold text-accent hover:brightness-125"
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
