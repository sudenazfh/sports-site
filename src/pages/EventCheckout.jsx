import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api.js'
import AppLayout from '../components/AppLayout.jsx'
import shieldAlert from '../assets/shield-alert.svg'

export default function EventCheckout() {
  const navigate = useNavigate()
  const { id = 1 } = useParams()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api(`/events/${id}`).then(setEvent).catch(() => {})
  }, [id])

  async function handlePay(e) {
    e.preventDefault()
    setError(null)
    try {
      await api(`/events/${id}/register`, { method: 'POST' })
      navigate('/checkout/processing')
    } catch (err) {
      setError(err.message)
    }
  }

  const price = event ? (event.price === 0 ? 'FREE' : `€${event.price}`) : '...'

  return (
    <AppLayout title="Event Checkout">
      <div className="flex justify-center pt-[149px] pb-16">
        <form
          onSubmit={handlePay}
          className="flex w-[552px] max-w-[94vw] flex-col gap-6 rounded-[16px] border border-white/20 bg-card p-8 drop-shadow-[0px_0px_25px_rgba(123,136,255,0.2)]"
        >
          <div className="flex flex-col gap-3">
            <span className="self-start rounded-[12px] bg-[rgba(247,63,82,0.1)] px-3 py-1 font-mono text-[10px] font-bold text-[#f73f52]">
              {event?.category ?? '...'}
            </span>
            <p className="text-[22px] font-bold">{event?.name ?? 'Loading...'}</p>
            <div className="flex items-center justify-between pt-2">
              <p className="text-[12px] text-white/70">Registration Fee</p>
              <p className="text-[28px] font-bold">{price}</p>
            </div>
            {error && <p className="text-[13px] font-bold text-[#f73f52]">{error}</p>}
          </div>

          <hr className="border-white/20" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="cardholder" className="font-mono text-[12px] font-bold uppercase text-white/70">
                Cardholder Name
              </label>
              <input
                id="cardholder"
                required
                placeholder="Deniz Kızılbora"
                className="w-full rounded-[15px] border border-white/20 bg-night px-4 py-3 font-mono text-[14px] text-white placeholder:text-white/40 outline-none focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="cardnumber" className="font-mono text-[12px] font-bold uppercase text-white/70">
                Card Number
              </label>
              <input
                id="cardnumber"
                required
                inputMode="numeric"
                placeholder="4321 •••• •••• ••••"
                className="w-full rounded-[15px] border border-white/20 bg-night px-4 py-3 font-mono text-[14px] text-white placeholder:text-white/40 outline-none focus:border-accent"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="expiry" className="font-mono text-[12px] font-bold uppercase text-white/70">
                  Expiry Date
                </label>
                <input
                  id="expiry"
                  required
                  placeholder="12/34"
                  className="w-full rounded-full border border-white/20 bg-night px-4 py-3 font-mono text-[14px] text-white placeholder:text-white/40 outline-none focus:border-accent"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="cvv" className="font-mono text-[12px] font-bold uppercase text-white/70">
                  CVV / CVC
                </label>
                <input
                  id="cvv"
                  required
                  type="password"
                  maxLength={4}
                  placeholder="•••"
                  className="w-full rounded-[15px] border border-white/20 bg-night px-4 py-3 text-[14px] text-white placeholder:text-white/40 outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 px-5 pt-2">
            <button
              type="submit"
              className="h-[50px] w-full rounded-[16px] bg-accent font-mono text-[15px] font-bold text-night hover:brightness-110"
            >
              PAY {price} &amp; SECURE TICKET
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-[40px] w-[330px] rounded-[10px] border border-white/20 bg-night font-mono text-[14px] font-bold text-white/70 hover:border-white/40"
            >
              CANCEL REGISTRATION
            </button>
          </div>

          <hr className="border-white/20" />

          <div className="flex items-start gap-3">
            <img src={shieldAlert} alt="" className="size-[13px]" />
            <p className="flex-1 font-mono text-[7px] leading-4 text-white/70">
              Refund policy: 100% refund available if cancelled more than 24 hours before the event start date.
            </p>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
