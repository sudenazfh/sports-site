import { Link, useNavigate } from 'react-router-dom'
import title from '../assets/sports-site-title.png'

export default function ForgotPassword() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/set-new-password')
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-night">
      <img
        src={title}
        alt=""
        className="pointer-events-none absolute top-[59px] left-1/2 w-[64%] max-w-[1380px] -translate-x-1/2 select-none"
        draggable="false"
      />

      <form
        onSubmit={handleSubmit}
        className="relative flex w-[665px] max-w-[92vw] flex-col items-center gap-8 rounded-[20px] bg-card px-16 py-[54px] drop-shadow-[0px_0px_125px_var(--color-glow)]"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-serif text-[30px]">Forgot Password?</h1>
          <p className="text-[14px] leading-normal text-white/70">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="email" className="text-[14px] font-bold text-white/70">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="yourname@example.com"
              className="h-[44px] w-full rounded-[10px] border-[0.2px] border-white/70 bg-field px-4 text-[14px] text-white placeholder:text-white/40 outline-none focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="h-[44px] w-full rounded-[20px] bg-accent font-serif text-[14px] text-night hover:brightness-110"
          >
            Send Reset Link
          </button>
        </div>

        <Link to="/login" className="font-serif text-[14px] text-accent hover:underline">
          Back to Login
        </Link>
      </form>
    </div>
  )
}
