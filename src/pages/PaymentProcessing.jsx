import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import loaderCircle from '../assets/loader-circle.svg'
import shieldCheck from '../assets/shield-check.svg'

export default function PaymentProcessing() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/checkout/confirmed'), 2500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <AppLayout title="Processing Transaction">
      <div className="flex justify-center pt-[282px] pb-16">
        <div className="flex w-[500px] max-w-[94vw] flex-col items-center gap-8 rounded-[16px] border border-white/20 bg-card p-12 drop-shadow-[0px_0px_25px_rgba(123,136,255,0.2)]">
          <div className="flex size-[120px] items-center justify-center">
            <div className="flex size-[80px] items-center justify-center rounded-full border-[3px] border-[#7b88ff] bg-[rgba(167,175,245,0.1)] shadow-[0px_0px_30px_0px_rgba(167,175,245,0.8)]">
              <img src={loaderCircle} alt="" className="size-8 animate-spin" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[20px] font-bold">Securing Your Spot...</p>
            <p className="font-mono text-[13px] text-white/70">Processing your payment safely.</p>
          </div>
          <div className="flex items-center gap-2 rounded-[8px] bg-night px-4 py-2">
            <img src={shieldCheck} alt="" className="size-[14px]" />
            <p className="font-mono text-[11px] text-white/70">SSL SECURED TRANSACTION</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
