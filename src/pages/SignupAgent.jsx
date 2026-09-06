import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthField from '../components/AuthField.jsx'

const TYPES = [
  {
    id: 'organizer',
    title: 'Organizer',
    desc: 'Independent agent who publishes events with no members. Pays a agent membership to stay active.',
  },
  {
    id: 'association',
    title: 'Association/Club',
    desc: 'No agent membership. Commission is collected from members of association and events.',
  },
]

export default function SignupAgent() {
  const navigate = useNavigate()
  const [type, setType] = useState('organizer')

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-night py-10">
      <p className="pointer-events-none absolute top-[59px] left-1/2 -translate-x-1/2 select-none font-serif text-[275px] leading-none whitespace-nowrap text-white opacity-[0.06]">
        Sports Site
      </p>

      <form
        onSubmit={handleSubmit}
        className="relative flex w-[840px] max-w-[94vw] flex-col gap-7 rounded-[20px] bg-card p-12 drop-shadow-[0px_0px_125px_var(--color-glow)]"
      >
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-serif text-[36px]">Request Agent Access</h1>
          <p className="text-[14px] text-white/70">
            Partner with Sports Life to host and manage premium events
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <AuthField label="Full Name" id="fullname" placeholder="Enter your name" />
          <AuthField label="Email" id="email" type="email" placeholder="agent@company.com" />
          <AuthField label="Phone Number" id="phone" type="tel" placeholder="+1 (555) 000-0000" />
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="org" className="text-[14px] font-bold text-white/70">
              Organization / Company Name <span className="text-[10px] font-normal">(optional)</span>
            </label>
            <input
              id="org"
              placeholder="e.g. Athletic Club"
              className="h-[48px] w-full rounded-[10px] border-[0.5px] border-white/20 bg-field px-4 text-[14px] text-white placeholder:text-white/40 outline-none focus:border-accent"
            />
          </div>
          <AuthField label="Password" id="password" type="password" placeholder="Choose password" />
          <AuthField label="Confirm Password" id="confirm" type="password" placeholder="Repeat password" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-bold text-white/70">Portal Membership Type</p>
          <div className="grid grid-cols-2 gap-4">
            {TYPES.map((t) => {
              const selected = type === t.id
              return (
                <label
                  key={t.id}
                  className={`flex h-[100px] cursor-pointer flex-col gap-2 rounded-[10px] border p-[13px] ${
                    selected
                      ? 'border-[rgba(167,175,245,0.5)] bg-[rgba(112,112,242,0.08)] shadow-[0px_0px_30px_0px_rgba(167,175,245,0.4)]'
                      : 'border-white/20 bg-field'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="type"
                      checked={selected}
                      onChange={() => setType(t.id)}
                      className="size-4 accent-accent"
                    />
                    <span className={`text-[14px] font-bold ${selected ? 'text-[#e5e5ff]' : 'text-[#d9deeb]'}`}>
                      {t.title}
                    </span>
                  </span>
                  <span className="text-[12px] leading-normal text-[#99a1b2]">{t.desc}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reason" className="text-[14px] font-bold text-white/70">
            Reason for requesting agent access
          </label>
          <textarea
            id="reason"
            required
            placeholder="Briefly describe your experience, the types of events you intend to host, or any affiliation credentials..."
            className="h-[88px] w-full resize-none rounded-[10px] border-[0.5px] border-white/20 bg-field px-4 py-3 text-[14px] text-white placeholder:text-white/40 outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            className="h-[50px] w-full rounded-[25px] bg-accent font-serif text-[16px] font-bold text-night hover:brightness-110"
          >
            Submit Request
          </button>
          <p className="text-[12px] italic text-white/70">
            Your request will be reviewed by an admin. You will be notified via email upon approval.
          </p>
          <p className="text-[14px] text-white/70">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-accent hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
