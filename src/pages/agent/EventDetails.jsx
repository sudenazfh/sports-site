import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../api.js'
import AppLayout from '../../components/AppLayout.jsx'
import { ConfirmModal } from '../../components/Modals.jsx'

const INITIAL_PARTICIPANTS = [
  { id: 1, name: 'Hello Kitty', member: false, accepted: 'Accepted 2 hours ago', fee: '€22,5', attended: false },
  { id: 2, name: 'Deniz Kızılbora', member: true, accepted: 'Accepted 1 week ago', fee: '€22,5', attended: false },
  { id: 3, name: 'Sıla İl', member: true, accepted: 'Accepted 1 week ago', fee: '€22,5', attended: true },
]

const INITIAL_PENDING = [
  { id: 4, name: 'Nisa Nur', member: true, sent: 'Sent 1 week ago' },
  { id: 5, name: 'Azra Nakışçı', member: false, sent: 'Sent 2 hours ago' },
]

export default function EventDetails({ admin = false }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [tab, setTab] = useState('participants')
  const [participants, setParticipants] = useState(INITIAL_PARTICIPANTS)
  const [pending, setPending] = useState(INITIAL_PENDING)
  const [query, setQuery] = useState('')
  const [approving, setApproving] = useState(null)

  function approveAttendance() {
    setParticipants((xs) => xs.map((x) => (x.id === approving.id ? { ...x, attended: true } : x)))
    setApproving(null)
  }

  useEffect(() => {
    if (!id) return
    api(`/agent/events/${id}/participants`)
      .then((regs) => {
        setParticipants(
          regs
            .filter((r) => r.status === 'REGISTERED')
            .map((r) => ({ id: r.id, name: r.user, member: false, accepted: `Accepted · ${r.date}`, fee: `€${r.paid}`, attended: false, live: true })),
        )
        setPending(
          regs
            .filter((r) => r.status === 'PENDING')
            .map((r) => ({ id: r.id, name: r.user, member: false, sent: r.date, live: true })),
        )
      })
      .catch(() => {})
  }, [id])

  async function accept(p) {
    if (p.live) await api(`/registrations/${p.id}/accept`, { method: 'POST' }).catch(() => {})
    setPending((ps) => ps.filter((x) => x.id !== p.id))
    setParticipants((xs) => [...xs, { ...p, accepted: 'Accepted just now', fee: '€22,5', attended: false }])
  }

  async function removeReg(p) {
    if (p.live) await api(`/registrations/${p.id}/remove`, { method: 'POST' }).catch(() => {})
    setParticipants((xs) => xs.filter((x) => x.id !== p.id))
  }

  async function rejectReg(p) {
    if (p.live) await api(`/registrations/${p.id}/reject`, { method: 'POST' }).catch(() => {})
    setPending((ps) => ps.filter((x) => x.id !== p.id))
  }

  const shownParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <AppLayout title={admin ? 'Reports' : 'My Events'} role={admin ? 'admin' : 'agent'}>
      <div className="flex flex-col gap-5 p-7">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-[15px] bg-card px-4 py-1.5 text-[12px] font-bold text-white hover:brightness-150"
          >
            ← Back
          </button>
          <p className="text-[13px] text-white/80">Commission Cut: %10</p>
        </div>

        <section className="rounded-[12px] border border-white/10 bg-card px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="size-8 shrink-0 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div>
                <p className="text-[14px] font-bold">APOEL vs Omonai Derby</p>
                <p className="text-[11px] text-white/70">August 3, 2026 · Nicosia</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[12px] text-white/80">TOTAL COLLECTED</p>
              <p className="text-[22px] font-extrabold text-accent">€337,5</p>
              <p className="text-[10px] text-white/50">from accepted registirations</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[12px] text-white/70">
            <span>Participants</span>
            <span>15/50</span>
          </div>
          <div className="mt-1 h-[3px] w-full rounded bg-white/10">
            <div className="h-full w-[30%] rounded bg-accent" />
          </div>
          <div className="mt-3 flex items-center justify-between text-[12px] text-white/70">
            <span>Attendance</span>
            <span>1/50</span>
          </div>
          <div className="mt-1 h-[3px] w-full rounded bg-white/10">
            <div className="h-full w-[2%] rounded bg-accent" />
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTab('participants')}
            className={`rounded-[10px] px-4 py-2 text-[13px] font-bold ${
              tab === 'participants' ? 'bg-field text-accent' : 'bg-card text-white/80 hover:bg-field/60'
            }`}
          >
            Participants ({participants.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('pending')}
            className={`rounded-[10px] px-4 py-2 text-[13px] font-bold ${
              tab === 'pending' ? 'bg-field text-accent' : 'bg-card text-white/80 hover:bg-field/60'
            }`}
          >
            Pending Requests ({pending.length})
          </button>
          <div className="ml-auto flex items-center gap-5 text-[13px] font-bold">
            {['Free', 'Paid', 'Member'].map((f) => (
              <label key={f} className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" className="size-4 accent-accent" />
                {f}
              </label>
            ))}
          </div>
        </div>

        {tab === 'participants' && (
          <>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for participants.."
              className="h-[46px] w-full rounded-[10px] border border-white/10 bg-card px-5 text-[12px] text-white placeholder:text-white/50 outline-none focus:border-accent"
            />
            {shownParticipants.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 rounded-[12px] border border-white/10 bg-card px-6 py-4"
              >
                {p.attended ? (
                  <span className="flex size-9 items-center justify-center rounded-full border-2 border-accent text-accent">
                    ✓
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setApproving(p)}
                    aria-label="Approve attendance"
                    className="size-9 rounded-[8px] bg-[rgba(123,136,255,0.1)] hover:bg-[rgba(123,136,255,0.25)]"
                  />
                )}
                <div
                  className={`flex-1 ${admin ? '' : 'cursor-pointer hover:brightness-125'}`}
                  onClick={admin ? undefined : () => navigate(`/agent/members/${p.id}`)}
                >
                  <p className="text-[13px] font-bold">
                    {p.name}{' '}
                    {p.member && <span className="ml-2 text-[11px] font-normal text-accent">· Member</span>}
                  </p>
                  <p className="text-[11px] text-white/60">{p.accepted}</p>
                </div>
                <p className="text-[20px] font-bold">{p.fee}</p>
                <button
                  type="button"
                  onClick={() => removeReg(p)}
                  className="ml-6 rounded-[8px] bg-[rgba(247,63,82,0.1)] px-5 py-1.5 font-anon text-[11px] font-bold text-[#f73f52] hover:brightness-125"
                >
                  REMOVE
                </button>
              </div>
            ))}
          </>
        )}

        {tab === 'pending' &&
          pending.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-[12px] border border-white/10 bg-card px-6 py-4"
            >
              <span className="size-9 rounded-[8px] bg-[rgba(123,136,255,0.1)]" />
              <div className="flex-1">
                <p className="text-[13px] font-bold">
                  {p.name}{' '}
                  {p.member && <span className="ml-2 text-[11px] font-normal text-accent">· Member</span>}
                </p>
                <p className="text-[11px] text-white/60">{p.sent}</p>
              </div>
              <button
                type="button"
                onClick={() => accept(p)}
                className="rounded-[8px] bg-[rgba(123,136,255,0.2)] px-6 py-2 text-[12px] font-bold text-accent hover:brightness-125"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => rejectReg(p)}
                className="rounded-[8px] bg-night px-6 py-2 text-[12px] font-bold text-white hover:brightness-150"
              >
                Reject
              </button>
            </div>
          ))}
      </div>
      {approving && (
        <ConfirmModal
          message={`Approve attendance for ${approving.name}?`}
          onNo={() => setApproving(null)}
          onYes={approveAttendance}
        />
      )}
    </AppLayout>
  )
}
