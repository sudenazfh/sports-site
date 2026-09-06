import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, roleHome } from '../api.js'
import title from '../assets/sports-site-title.png'

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const user = await api('/login', {
        method: 'POST',
        body: { email: e.target.email.value, password: e.target.password.value },
      })
      navigate(roleHome(user.role))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-night">
      <img
        src={title}
        alt="Sports Site"
        className="mt-14 w-[64%] max-w-[1380px] select-none"
        draggable="false"
      />

      <form
        onSubmit={handleSubmit}
        className="relative -mt-24 flex w-[665px] max-w-[92vw] flex-col rounded-[20px] bg-card px-32 py-11 shadow-[0px_0px_250px_50px_var(--color-glow)]"
      >
        <h1 className="text-center font-serif text-[30px]">Login</h1>
        {error && <p className="mt-2 text-center text-[13px] text-[#f73f52]">{error}</p>}

        <label className="mt-9 text-[14px] font-bold text-white/70" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="mt-2 h-[26px] rounded-[10px] border-[0.2px] border-white/70 bg-field px-3 text-[14px] outline-none focus:border-accent"
        />

        <label className="mt-6 text-[14px] font-bold text-white/70" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          className="mt-2 h-[26px] rounded-[10px] border-[0.2px] border-white/70 bg-field px-3 text-[14px] outline-none focus:border-accent"
        />

        <Link
          to="/forgot-password"
          className="mt-3 self-center text-[14px] font-bold text-white/70 hover:text-white"
        >
          Forgot password?
        </Link>

        <button
          type="submit"
          className="mt-16 h-[45px] w-[291px] self-center rounded-[20px] bg-accent font-serif text-[14px] text-night hover:brightness-110"
        >
          Login
        </button>

        <Link
          to="/signup"
          className="mt-4 self-center rounded-[20px] border-[0.2px] border-white/70 bg-field px-4 py-2 font-serif text-[14px] text-accent hover:border-accent"
        >
          Create a new account
        </Link>
      </form>

      <Link
        to="/signup-agent"
        className="absolute bottom-8 text-[12px] font-medium underline underline-offset-4"
      >
        Become An Agent NOW!
      </Link>
    </div>
  )
}
