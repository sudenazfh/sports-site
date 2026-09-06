import { useState } from 'react'
import AppLayout from '../components/AppLayout.jsx'
import { DocumentModal } from '../components/Modals.jsx'
import Toggle from '../components/Toggle.jsx'
import avatar from '../assets/avatar.svg'

const PREFS = [
  { key: 'event', label: 'Event reminder', on: true },
  { key: 'membership', label: 'Membership alerts', on: true },
  { key: 'quota', label: 'Quota warning', on: true },
  { key: 'payment', label: 'Payment confirmations', on: true },
  { key: 'system', label: 'System updates', on: false },
]

function Field({ label, id, defaultValue }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[12px] uppercase text-white/70">
        {label}
      </label>
      <input
        id={id}
        defaultValue={defaultValue}
        className="h-[34px] w-full rounded-[6px] border border-white/20 bg-night px-3 text-[12px] text-white outline-none focus:border-accent"
      />
    </div>
  )
}

export default function ProfileSettings({ role = 'user' }) {
  const [prefs, setPrefs] = useState(PREFS)
  const [docModal, setDocModal] = useState(null)

  return (
    <AppLayout title="Profile & Settings" role={role}>
      <div className="flex items-start gap-8 p-7">
        <div className="flex w-[740px] flex-col gap-6">
          <section className="flex flex-col gap-6 rounded-[15px] border border-white/10 bg-card p-8">
            <div className="flex items-start gap-7">
              <img src={avatar} alt="" className="size-[92px]" />
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-[24px] font-bold">Deniz Kızılbora</p>
                <p className="text-[14px] text-white/80">Account created: 01/07/2026</p>
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
              <Field label="Full Name" id="p-name" defaultValue="Deniz Kızılbora" />
              <Field label="Email" id="p-email" defaultValue="deniz@sports.com" />
              <div />
              <Field label="Phone" id="p-phone" defaultValue="+90 5** *** ** **" />
            </div>
          </section>

          <div className="flex w-[230px] flex-col gap-3">
            {[
              ['View ID Document', 'ID Document'],
              ['View Medical Certificate', 'Medical Certificate'],
              ['View Parent Consent', 'Parent Consent'],
            ].map(([label, doc]) => (
              <button
                key={label}
                type="button"
                onClick={() => setDocModal(doc)}
                className="rounded-[10px] bg-field py-2.5 text-[14px] font-bold text-white/90 hover:brightness-125"
              >
                {label}
              </button>
            ))}
          </div>
          {docModal && <DocumentModal title={docModal} onClose={() => setDocModal(null)} />}
        </div>

        <section className="flex flex-1 flex-col rounded-[15px] border border-white/10 bg-card p-8">
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
      </div>
    </AppLayout>
  )
}
