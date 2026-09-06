import { useState } from 'react'
import AppLayout from '../../components/AppLayout.jsx'
import Toggle from '../../components/Toggle.jsx'
import avatar from '../../assets/avatar.svg'

const PREFS = [
  { key: 'reminder', label: 'Remeinder', on: true },
  { key: 'membership', label: 'Membership alerts', on: true },
  { key: 'created', label: 'Created Event', on: true },
  { key: 'payment', label: 'Payment confirmations', on: true },
  { key: 'system', label: 'System updates', on: false },
]

const labelCls = 'font-mono text-[12px] uppercase text-white/70'
const inputCls =
  'h-[34px] w-full rounded-[6px] border border-white/20 bg-night px-3 text-[12px] text-white outline-none focus:border-accent'

function Field({ label, id, defaultValue }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <input id={id} defaultValue={defaultValue} className={inputCls} />
    </div>
  )
}

function EditButtons() {
  return (
    <div className="ml-auto flex flex-col gap-3">
      <button
        type="button"
        className="rounded-[15px] bg-[rgba(123,136,255,0.15)] px-4 py-1.5 text-[11px] font-bold text-accent hover:brightness-125"
      >
        Edit Profile
      </button>
    </div>
  )
}

function RequestModal({ subject, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="flex w-[840px] max-w-[92vw] flex-col gap-4 rounded-[15px] border border-white/10 bg-card p-8 shadow-[0px_0px_60px_0px_rgba(123,136,255,0.25)]">
        <p className="text-[15px] font-bold">Reason for change of commission rate for {subject}</p>
        <textarea
          rows={5}
          placeholder="Please give a reason"
          className="w-full resize-none rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[14px] text-white placeholder:text-white/50 outline-none focus:border-accent"
        />
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] bg-night px-8 py-2.5 text-[13px] font-bold text-white hover:brightness-150"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] bg-field px-9 py-2.5 text-[13px] font-bold text-accent hover:brightness-125"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AgentProfileSettings() {
  const [prefs, setPrefs] = useState(PREFS)
  const [modal, setModal] = useState(null)

  return (
    <AppLayout title="Profile & Settings" role="agent">
      <div className="flex items-start gap-8 p-7">
        <div className="flex w-[740px] flex-col gap-7">
          <section className="flex flex-col gap-6 rounded-[15px] border border-white/10 bg-card p-8">
            <div className="flex items-start gap-7">
              <img src={avatar} alt="" className="size-[92px]" />
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-[24px] font-bold">Denizz Kızılbora</p>
                <p className="text-[14px] text-white/80">Account created: 02/07/2025</p>
              </div>
              <div className="ml-auto flex flex-col gap-3">
                <button
                  type="button"
                  className="rounded-[15px] bg-[rgba(123,136,255,0.15)] px-4 py-1.5 text-[11px] font-bold text-accent hover:brightness-125"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  className="rounded-[15px] bg-night px-4 py-1.5 text-[11px] font-bold text-white hover:brightness-150"
                >
                  Change Password
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <Field label="Full Name" id="a-name" defaultValue="Denizz Kızılbora" />
              <Field label="Email" id="a-email" defaultValue="denizz@sports.com" />
              <Field label="Association Name" id="a-assoc" defaultValue="Famagusta Athletic Union" />
              <Field label="Phone" id="a-phone" defaultValue="+90 5** *** ** **" />
            </div>
          </section>

          <section className="flex flex-col gap-6 rounded-[15px] border border-white/10 bg-card p-8">
            <div className="flex items-start gap-7">
              <img src={avatar} alt="" className="size-[92px]" />
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-[24px] font-bold">Famagusta Atletic Union</p>
                <p className="text-[14px] text-white/80">Account created: 05/02/2024</p>
              </div>
              <EditButtons />
            </div>
            <div className="flex flex-col gap-2">
              <p className={labelCls}>About</p>
              <textarea
                rows={4}
                defaultValue="Anorthosis Famagusta, founded in 1911, is a vibrant multi-sport community dedicated to helping athletes of all ages reach their full potential. Whether you want to compete professionally, join our youth academies, or stay active, we offer top-tier coaching in football, volleyball, and basketball. Join our family today to build your skills, make lifelong friends, and become part of a historic sports legacy."
                className="w-full resize-none rounded-[6px] border border-white/20 bg-night px-3 py-2 text-[12px] leading-relaxed text-white outline-none focus:border-accent"
              />
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <Field label="Email" id="c-email" defaultValue="famagustaathleticunion@sports.com" />
              <Field label="Phone" id="c-phone" defaultValue="+90 5** *** ** **" />
              <div className="w-1/2">
                <Field label="Monthly Membership (€)" id="c-fee" defaultValue="12" />
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-1 flex-col gap-7">
          <section className="flex flex-col rounded-[15px] border border-white/10 bg-card p-8">
            <p className="pb-4 text-[20px] font-bold">Notification Preferences</p>
            <div className="divide-y divide-white/15">
              {prefs.map((p, i) => (
                <div key={p.key} className="flex items-center justify-between py-3">
                  <p className="text-[14px] text-white/90">{p.label}</p>
                  <Toggle
                    on={p.on}
                    onChange={(v) => setPrefs((ps) => ps.map((x, j) => (j === i ? { ...x, on: v } : x)))}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-[15px] border border-white/10 bg-card p-8">
            <p className="font-mono text-[13px] font-bold uppercase">Portal Membership</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Type" id="pm-type" defaultValue="Association" />
              <Field label="Membership (€)" id="pm-fee" defaultValue="0" />
              <Field label="Commission Rate (Members)" id="pm-crm" defaultValue="%10" />
              <Field label="Commission Rate (Event)" id="pm-cre" defaultValue="%10" />
            </div>
          </section>

          <div className="mt-auto flex flex-col items-end gap-3 pt-24">
            <button
              type="button"
              onClick={() => setModal('members')}
              className="rounded-[6px] bg-field px-4 py-2 font-mono text-[11px] text-white/90 hover:brightness-125"
            >
              SEND REQUEST: change for commission rate for members
            </button>
            <button
              type="button"
              onClick={() => setModal('events')}
              className="rounded-[6px] bg-field px-4 py-2 font-mono text-[11px] text-white/90 hover:brightness-125"
            >
              SEND REQUEST: change for commission rate for events
            </button>
          </div>
        </div>
      </div>
      {modal && <RequestModal subject={modal} onClose={() => setModal(null)} />}
    </AppLayout>
  )
}
