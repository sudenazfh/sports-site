import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api.js'
import AuthField from '../components/AuthField.jsx'

export default function SignupUser() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const f = e.target
    if (f.password.value !== f.confirm.value) return setError('Passwords do not match')
    try {
      await api('/register', {
        method: 'POST',
        body: { name: f.fullname.value, email: f.email.value, password: f.password.value },
      })
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-night">
      <p className="pointer-events-none absolute top-[59px] left-1/2 -translate-x-1/2 select-none font-serif text-[275px] leading-none whitespace-nowrap text-white opacity-[0.06]">
        Sports Site
      </p>

      <form
        onSubmit={handleSubmit}
        className="relative flex w-[665px] max-w-[92vw] flex-col gap-8 rounded-[20px] bg-card p-12 drop-shadow-[0px_0px_125px_var(--color-glow)]"
      >
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-serif text-[36px]">Create Account</h1>
          <p className="text-[14px] text-white/70">Join the Sports Life community today</p>
          {error && <p className="text-[13px] text-[#f73f52]">{error}</p>}
        </div>

        <div className="flex flex-col gap-5">
          <AuthField label="Full Name" id="fullname" placeholder="Enter your full name" />
          <AuthField label="Email" id="email" type="email" placeholder="name@example.com" />
          <AuthField label="Password" id="password" type="password" placeholder="Create a strong password" />
          <AuthField label="Confirm Password" id="confirm" type="password" placeholder="Repeat your password" />
        </div>

        <div className="flex flex-col items-center gap-5">
          <button
            type="submit"
            className="h-[50px] w-full rounded-[25px] bg-accent font-serif text-[16px] font-bold text-night hover:brightness-110"
          >
            Sign Up
          </button>
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
