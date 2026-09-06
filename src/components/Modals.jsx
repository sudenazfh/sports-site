import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Modal({ children, width = 'w-[720px]' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className={`${width} flex flex-col gap-6 rounded-[15px] border border-white/10 bg-card p-8 shadow-[0px_0px_40px_0px_rgba(123,136,255,0.15)]`}>
        {children}
      </div>
    </div>
  )
}

export function ReasonModal({ title, placeholder = 'Please give a reason', sendLabel = 'Send', onCancel, onSend }) {
  const [text, setText] = useState('')
  return (
    <Modal>
      <p className="text-[15px] font-bold">{title}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder={placeholder}
        className="w-full resize-none rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] text-white placeholder:text-white/50 outline-none focus:border-accent"
      />
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="w-[135px] rounded-[8px] bg-night py-2.5 text-[13px] font-bold text-white hover:brightness-150"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSend(text)}
          className="w-[135px] rounded-[8px] bg-[rgba(123,136,255,0.2)] py-2.5 text-[13px] font-bold text-accent hover:brightness-125"
        >
          {sendLabel}
        </button>
      </div>
    </Modal>
  )
}

export function ConfirmModal({ message, notice, noLabel = 'No', yesLabel = 'Yes', onNo, onYes }) {
  return (
    <Modal>
      {notice && <p className="text-[13px] leading-relaxed text-white/80">{notice}</p>}
      <p className="text-center text-[14px]">{message}</p>
      <div className="flex justify-center gap-6">
        <button
          type="button"
          onClick={onNo}
          className="w-[135px] rounded-[8px] bg-night py-2.5 text-[13px] font-bold text-white hover:brightness-150"
        >
          {noLabel}
        </button>
        <button
          type="button"
          onClick={onYes}
          className="w-[135px] rounded-[8px] bg-[rgba(123,136,255,0.2)] py-2.5 text-[13px] font-bold text-accent hover:brightness-125"
        >
          {yesLabel}
        </button>
      </div>
    </Modal>
  )
}

export function LoginRequiredModal({ onClose }) {
  const navigate = useNavigate()
  return (
    <Modal width="w-[480px]">
      <p className="py-6 text-center text-[22px] font-bold text-white/90">Login Required!</p>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="rounded-[8px] bg-night px-6 py-2.5 text-[13px] font-bold text-white hover:brightness-150"
        >
          Maybe Later
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="rounded-[8px] bg-[rgba(123,136,255,0.2)] px-8 py-2.5 text-[13px] font-bold text-accent hover:brightness-125"
        >
          Login NOW
        </button>
      </div>
    </Modal>
  )
}

export function DocumentModal({ title = 'ID Document', onClose }) {
  const [docs, setDocs] = useState([
    { id: 1, name: `${title.split(' ')[0]} 2026`, default: true },
    { id: 2, name: `${title.split(' ')[0]} 2010`, default: false },
    { id: 3, name: `${title.split(' ')[0]} 2005`, default: false },
  ])
  const setDefault = (id) => setDocs((ds) => ds.map((d) => ({ ...d, default: d.id === id })))
  return (
    <Modal>
      <p className="text-[18px] font-bold">{title}</p>
      <div className="flex flex-col">
        {docs.map((d) => (
          <div key={d.id} className="flex items-center justify-between border-b border-white/15 py-3">
            <p className="text-[14px] text-white/90">{d.name}</p>
            {d.default ? (
              <span className="px-3 text-[11px] font-bold text-accent">Default</span>
            ) : (
              <button
                type="button"
                onClick={() => setDefault(d.id)}
                className="rounded-[8px] bg-field px-3 py-1.5 text-[11px] font-bold text-white hover:brightness-125"
              >
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="rounded-[8px] bg-night px-6 py-2.5 text-[13px] font-bold text-white hover:brightness-150"
        >
          Close
        </button>
        <button
          type="button"
          className="rounded-[8px] bg-night px-6 py-2.5 font-anon text-[13px] font-bold text-white hover:brightness-150"
        >
          UPLOAD NEW
        </button>
      </div>
    </Modal>
  )
}
