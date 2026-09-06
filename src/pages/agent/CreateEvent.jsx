import { Fragment, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../api.js'
import AppLayout from '../../components/AppLayout.jsx'
import { ConfirmModal, ReasonModal } from '../../components/Modals.jsx'

const EVENT_TYPES = [
  { id: 'free', title: 'Free Event', desc: 'No payment is required' },
  { id: 'paid-all', title: 'Paid -- All Users', desc: 'All participants must pay' },
  { id: 'paid-nonmembers', title: 'Paid -- Non-Members', desc: 'Only members attend for free' },
  { id: 'free-members', title: 'Free Event (Members Only)', desc: 'No payment is required' },
  { id: 'paid-members', title: 'Paid Event (Members Only)', desc: 'All participants must pay' },
]

const labelCls = 'font-mono text-[12px] uppercase text-white/70'
const inputCls =
  'h-[34px] w-full rounded-[8px] border border-white/20 bg-night px-3 text-[12px] text-white outline-none focus:border-accent'

function SmallBtn({ children }) {
  return (
    <button
      type="button"
      className="self-end rounded-[8px] bg-field px-3 py-1.5 text-[11px] font-bold text-white hover:brightness-125"
    >
      {children}
    </button>
  )
}

export default function CreateEvent({ mode = 'agent' }) {
  const admin = mode === 'admin'
  const report = mode === 'report'
  const navigate = useNavigate()
  const { id: reviewId } = useParams()
  const [type, setType] = useState('paid-all')
  const [saveError, setSaveError] = useState(null)
  const [modal, setModal] = useState(null) // 'reject' | 'cancel' | 'reject-report' | 'publish'

  async function decide(action) {
    setSaveError(null)
    if (!reviewId) return setSaveError('No event selected — open from Event Requests list')
    try {
      await api(`/admin/events/${reviewId}/${action}`, { method: 'POST' })
      navigate('/admin/event-requests')
    } catch (err) {
      setSaveError(err.message)
    }
  }

  async function saveEvent(status) {
    setSaveError(null)
    const v = (id) => document.getElementById(id)?.value
    try {
      await api('/agent/events', {
        method: 'POST',
        body: {
          name: v('ev-name'),
          category: v('ev-sport'),
          city: v('ev-city'),
          date: v('ev-date-0') || 'TBA',
          location: v('ev-loc'),
          capacity: v('ev-max'),
          price: type.startsWith('free') ? 0 : v('ev-fee'),
          description: v('ev-desc'),
          status,
        },
      })
      navigate('/agent/my-events')
    } catch (err) {
      setSaveError(err.message)
    }
  }
  const [dates, setDates] = useState([
    { date: '05.08.2026', time: '20.00' },
    { date: '06.08.2026', time: '19.00' },
    { date: '08.08.2026', time: '20.00' },
  ])

  const headerRight = (
    <span className="mr-auto ml-4 rounded-[10px] bg-field px-3 py-1 font-anon text-[11px] font-bold text-accent">
      STATUS: {admin ? 'PENDING' : 'ACTIVE'}
    </span>
  )

  return (
    <AppLayout
      title={report ? 'Reports' : 'Nicosia Football Tournament'}
      role={admin || report ? 'admin' : 'agent'}
      headerRight={headerRight}
    >
      <div className="flex items-start gap-7 p-7">
        <div className="flex w-[535px] flex-col gap-7">
          <section className="flex flex-col gap-4 rounded-[15px] border border-white/10 bg-card p-7">
            <p className="text-[18px] font-bold">Basic Information</p>

            <div className="flex flex-col gap-2">
              <label className={labelCls} htmlFor="ev-name">Event Name</label>
              <input id="ev-name" defaultValue="Nicosia Football Tournament" className={inputCls} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelCls} htmlFor="ev-sport">Sport Type</label>
                <select id="ev-sport" className={inputCls}>
                  <option>Football</option>
                  <option>Basketball</option>
                  <option>Tennis</option>
                  <option>Volleyball</option>
                  <option>Running</option>
                  <option>Swimming</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelCls} htmlFor="ev-city">City</label>
                <select id="ev-city" className={inputCls}>
                  <option>Nicosia</option>
                  <option>Famagusta</option>
                  <option>Kyrenia</option>
                  <option>Limassol</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-4">
              <p className={labelCls}>Date</p>
              <p className={labelCls}>Time</p>
              <span />
              {dates.map((d, i) => (
                <Fragment key={i}>
                  <input id={`ev-date-${i}`} defaultValue={d.date} className={inputCls} />
                  <input defaultValue={d.time} className={inputCls} />
                  {i === 0 ? (
                    <button
                      type="button"
                      onClick={() => setDates((ds) => [...ds, { date: '', time: '' }])}
                      className="rounded-[8px] bg-field px-3 py-1.5 text-[11px] font-bold text-white hover:brightness-125"
                    >
                      Add Date
                    </button>
                  ) : (
                    <span />
                  )}
                </Fragment>
              ))}
            </div>

            <div className="grid grid-cols-[1fr_auto] items-end gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelCls} htmlFor="ev-loc">Location</label>
                <input id="ev-loc" defaultValue="GSP Stadium" className={inputCls} />
              </div>
              <SmallBtn>Add Location</SmallBtn>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-[15px] border border-white/10 bg-card p-7">
            <p className="text-[18px] font-bold">Pricing</p>
            <p className={labelCls}>Event Type</p>
            <div className="flex flex-wrap gap-4">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`w-[150px] rounded-[10px] border p-4 text-left ${
                    type === t.id
                      ? 'border-[rgba(167,175,245,0.5)] bg-[rgba(112,112,242,0.08)] shadow-[0px_0px_25px_0px_rgba(167,175,245,0.3)]'
                      : 'border-white/15 bg-night'
                  }`}
                >
                  <p className="text-[12px] font-bold">{t.title}</p>
                  <p className="mt-1 text-[11px] text-white/60">{t.desc}</p>
                </button>
              ))}
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <label className={labelCls} htmlFor="ev-fee">Participation Fee (€)</label>
              <input id="ev-fee" defaultValue="15" className={inputCls} />
            </div>
          </section>
        </div>

        <div className="flex w-[550px] flex-col gap-7">
          <section className="flex flex-col gap-4 rounded-[15px] border border-white/10 bg-card p-7">
            <p className="text-[18px] font-bold">Details</p>
            <div className="flex flex-col gap-2">
              <label className={labelCls} htmlFor="ev-desc">Description</label>
              <textarea
                id="ev-desc"
                rows={3}
                defaultValue="The biggest fixture in Cypriot football. This is the defining match of the Cyprus football calendar, drawing fans from across the island and beyond. The atmosphere is electric — arrive early."
                className="w-full resize-none rounded-[8px] border border-white/20 bg-night px-3 py-2 text-[12px] leading-relaxed text-white outline-none focus:border-accent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelCls} htmlFor="ev-max">Max Attendees (optional)</label>
                <input id="ev-max" defaultValue="50" className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelCls} htmlFor="ev-deadline">Last Registration Date</label>
                <input id="ev-deadline" defaultValue="01.08.2025" className={inputCls} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelCls} htmlFor="ev-bring">What Do They Bring</label>
              <input id="ev-bring" defaultValue="Valid ID or Passport, Cash" className={inputCls} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelCls} htmlFor="ev-provide">What Will You Provide</label>
              <textarea
                id="ev-provide"
                rows={2}
                defaultValue="Assigned Seating, Stadium-wide Security, Food & Beverage Stands, Medical Team On Site, Live Big-Screen Replays"
                className="w-full resize-none rounded-[8px] border border-white/20 bg-night px-3 py-2 text-[12px] leading-relaxed text-white outline-none focus:border-accent"
              />
            </div>
          </section>

          {!report && (
            <section className="flex flex-col gap-2 rounded-[15px] border border-white/10 bg-card px-8 py-4">
              {saveError && <p className="text-center text-[13px] font-bold text-[#f73f52]">{saveError}</p>}
              <div className="flex items-center justify-around">
                <button
                  type="button"
                  onClick={() => (admin ? setModal('reject') : saveEvent('draft'))}
                  className="rounded-[10px] bg-[rgba(247,63,82,0.1)] px-8 py-2.5 text-[14px] font-bold text-[#f73f52] hover:brightness-125"
                >
                  {admin ? 'Reject Event' : 'Save As Draft'}
                </button>
                <button
                  type="button"
                  onClick={() => (admin ? decide('approve') : setModal('publish'))}
                  className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-8 py-2.5 text-[14px] font-bold text-accent hover:brightness-125"
                >
                  {admin ? 'Approve Event' : 'Publish Event'}
                </button>
              </div>
            </section>
          )}
        </div>

        {report && (
          <div className="flex w-[490px] flex-col gap-5">
            <section className="flex flex-col gap-4 rounded-[15px] border border-white/10 bg-card p-7">
              <div className="flex items-center justify-between">
                <p className="text-[18px] font-bold">Reporting Account</p>
                <button
                  type="button"
                  className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-4 py-1.5 text-[12px] font-bold text-accent hover:brightness-125"
                >
                  View Page
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[14px] font-bold">Full Name</span>
                  <input readOnly value="Sude Katırcıoğlu" className={inputCls} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[14px] font-bold">Email</span>
                  <input readOnly value="user@gmail.com" className={inputCls} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[14px] font-bold">Reason of Report</span>
                <textarea
                  readOnly
                  rows={5}
                  value="The agent has done ... theredore i am reporting this account."
                  className="w-full resize-none rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] text-white outline-none"
                />
              </div>
            </section>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setModal('reject-report')}
                className="rounded-[8px] bg-field px-6 py-2.5 font-anon text-[13px] font-bold text-white hover:brightness-125"
              >
                REJECT REPORT
              </button>
              <button
                type="button"
                onClick={() => setModal('cancel')}
                className="rounded-[8px] bg-[rgba(247,63,82,0.15)] px-6 py-2.5 font-anon text-[13px] font-bold text-[#f73f52] hover:brightness-125"
              >
                CANCEL EVENT
              </button>
            </div>
          </div>
        )}
        {admin && (
          <div className="flex w-[430px] flex-col items-center gap-6">
            <section className="flex w-full flex-col gap-4 rounded-[15px] border border-white/10 bg-card p-7">
              <p className="text-[18px] font-bold">Agent Information</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className={labelCls}>By</span>
                  <input readOnly value="Famagusta Athletic Union" className={inputCls} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className={labelCls}>Account Created</span>
                  <input readOnly value="05/02/2024" className={inputCls} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className={labelCls}>Email</span>
                  <input readOnly value="famagustaathleticunion@sports.com" className={inputCls} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className={labelCls}>Phone</span>
                  <input readOnly value="+90 5** *** ** **" className={inputCls} />
                </div>
              </div>
            </section>
            <a
              href="/agent-profile"
              className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-6 py-2.5 text-[13px] font-bold text-accent hover:brightness-125"
            >
              View Agent Page
            </a>
          </div>
        )}
      </div>
      {modal === 'reject' && (
        <ReasonModal
          title="Reason of Reject"
          onCancel={() => setModal(null)}
          onSend={() => {
            setModal(null)
            decide('reject')
          }}
        />
      )}
      {modal === 'reject-report' && (
        <ReasonModal
          title="Reason of Reject"
          onCancel={() => setModal(null)}
          onSend={() => {
            setModal(null)
            navigate('/admin/reports')
          }}
        />
      )}
      {modal === 'cancel' && (
        <ReasonModal
          title="Reason of Cancel"
          onCancel={() => setModal(null)}
          onSend={() => {
            setModal(null)
            navigate('/admin/reports')
          }}
        />
      )}
      {modal === 'publish' && (
        <ConfirmModal
          notice="Commission Notice: A %10 platform commission will be deducted from each paid registration for this event."
          message="Do you want to publish this event?"
          noLabel="Cancel"
          yesLabel="Publish Event"
          onNo={() => setModal(null)}
          onYes={() => {
            setModal(null)
            saveEvent('pending')
          }}
        />
      )}
    </AppLayout>
  )
}
