import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import AppLayout from '../components/AppLayout.jsx'

const FAMAGUSTA_AGENT_ID = 2 // seed agent
import StepBar from '../components/StepBar.jsx'
import check from '../assets/check.svg'
import arrowRight from '../assets/arrow-right.svg'

const clubTag = (
  <span className="rounded-[15px] bg-[rgba(123,136,255,0.1)] px-3 py-1 font-anon text-[12px] font-bold text-accent">
    Famagusta Athletic Union
  </span>
)

export default function MembershipComplete() {
  useEffect(() => {
    // sahte ödeme tamam → üyeliği kaydet (zaten üyeyse 409, sorun değil)
    api(`/agents/${FAMAGUSTA_AGENT_ID}/join`, { method: 'POST' }).catch(() => {})
  }, [])

  return (
    <AppLayout title="Membership Complete" headerRight={clubTag}>
      <div className="flex flex-col items-center gap-8 p-12">
        <div className="w-full">
          <StepBar current={3} />
        </div>

        <div className="relative w-[700px] max-w-full overflow-clip rounded-[20px] border border-white/13 bg-card">
          <div className="pointer-events-none absolute -top-[176px] left-1/2 h-[291px] w-[398px] -translate-x-1/2 rounded-[125px] bg-[rgba(167,175,245,0.18)] blur-[60px]" />

          <div className="relative flex flex-col items-center gap-6 p-12">
            <span className="flex size-20 items-center justify-center rounded-[40px] border-2 border-[#7b88ff] bg-[rgba(167,175,245,0.1)]">
              <img src={check} alt="" className="size-10" />
            </span>

            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-[32px] font-extrabold">Welcome to the family!</p>
              <p className="font-anon text-[16px] text-accent">
                You are now an active member of Famagusta Athletic Union.
              </p>
            </div>

            <hr className="w-full border-dashed border-white/20" />

            <div className="flex w-full flex-col gap-4 rounded-[10px] border border-white/13 bg-night p-5">
              <div className="flex items-center justify-between">
                <p className="font-anon text-[13px] text-white/50">MEMBER SINCE</p>
                <p className="text-[14px] font-bold">October 24, 2026</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-anon text-[13px] text-white/50">MEMBERSHIP TIER</p>
                <p className="text-[14px] font-bold text-[#7b88ff]">Monthly Plan (€12/mo)</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-anon text-[13px] text-white/50">NEXT BILLING DATE</p>
                <p className="text-[14px] font-bold">November 24, 2026</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-anon text-[13px] text-white/50">STATUS</p>
                <span className="rounded-[10px] bg-[rgba(123,136,255,0.1)] px-2.5 py-0.5 font-anon text-[10px] font-bold text-accent">
                  ACTIVE
                </span>
              </div>
            </div>

            <hr className="w-full border-dashed border-white/20" />

            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 rounded-[10px] bg-[#7b88ff] px-12 py-[18px] text-[16px] font-bold text-night hover:brightness-110"
            >
              Go to Member Dashboard
              <img src={arrowRight} alt="" className="size-[18px]" />
            </Link>

            <p className="font-anon text-[12px] text-white/50">
              A confirmation receipt with your digital member card has been sent to your email.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
