import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import checkCircle from '../assets/check-circle.svg'
import shieldCheck from '../assets/shield-check.svg'

export default function RegistrationConfirmed() {
  return (
    <AppLayout title="Registration Confirmed">
      <div className="flex justify-center pt-[160px] pb-16">
        <div className="flex w-[650px] max-w-[94vw] flex-col gap-6 rounded-[16px] border border-white/20 bg-card p-8 drop-shadow-[0px_0px_25px_rgba(123,136,255,0.2)]">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-[rgba(167,175,245,0.1)] p-3">
              <img src={checkCircle} alt="" className="size-6" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[22px] font-bold">You&apos;re Registered!</p>
              <p className="font-mono text-[12px] text-white/70">ORDER REFERENCE: #NIC-849032-FT</p>
            </div>
          </div>

          <hr className="border-white/20" />

          <div className="flex flex-col gap-4 rounded-[12px] border border-white/10 bg-night p-4">
            <div className="flex flex-col gap-1.5">
              <p className="font-mono text-[11px] font-bold uppercase text-accent">NICOSIA EVENT PASS</p>
              <p className="text-[18px] font-bold">Nicosia Football Tournament</p>
            </div>
            <hr className="border-dashed border-white/20" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase text-white/50">DATE</p>
                <p className="font-mono text-[14px] font-bold">August 5, 2025</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-white/50">TIME</p>
                <p className="font-mono text-[14px] font-bold">20:00</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-white/50">LOCATION</p>
                <p className="font-mono text-[14px] font-bold">GSP Stadium</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-white/50">CITY</p>
                <p className="font-mono text-[14px] font-bold">Nicosia</p>
              </div>
            </div>
            <hr className="border-dashed border-white/20" />
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-white/70">Amount Paid</p>
              <p className="text-[20px] font-bold">€15.00</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-[8px] bg-[rgba(167,175,245,0.1)] p-3">
            <img src={shieldCheck} alt="" className="size-4" />
            <p className="flex-1 font-mono text-[11px]">
              You are eligible for a 100% refund if you cancel more than 24 hours before the event.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 pt-2">
            <Link
              to="/attended-events"
              className="flex h-[50px] w-[452px] max-w-full items-center justify-center rounded-[15px] bg-[#7b88ff] font-mono text-[14px] font-bold text-night hover:brightness-110"
            >
              VIEW MY EVENTS
            </Link>
            <Link
              to="/browse"
              className="flex h-[40px] w-[332px] max-w-full items-center justify-center rounded-[12px] border border-white/20 bg-night font-mono text-[13px] font-bold text-white/70 hover:border-white/40"
            >
              BACK TO EVENT PAGE
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
