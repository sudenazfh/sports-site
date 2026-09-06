import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import StepBar from '../components/StepBar.jsx'
import check from '../assets/check.svg'
import arrowRight from '../assets/arrow-right.svg'

const BENEFITS = [
  'Free entry to all local Famagusta Athletic Union home matches & running events',
  '15% Discount on official club merchandise, sports gear & training kits',
  'Priority facility booking (tennis courts, football pitch, indoor arenas) 48 hours early',
  'Access to exclusive member-only digital content, training programs & athlete insights',
  'Monthly family networking event pass & digital community board access',
]

const clubTag = (
  <span className="rounded-[15px] bg-[rgba(123,136,255,0.1)] px-3 py-1 font-anon text-[12px] font-bold text-accent">
    Famagusta Athletic Union
  </span>
)

export default function MembershipPlan() {
  return (
    <AppLayout title="Membership Sign-Up" headerRight={clubTag}>
      <div className="flex flex-col gap-8 p-12">
        <StepBar current={1} />

        <div className="relative overflow-clip rounded-[20px] border border-white/13 bg-card">
          <div className="pointer-events-none absolute -top-[400px] -right-[100px] h-[386px] w-[1290px] rotate-[15deg] rounded-[150px] bg-[rgba(123,136,255,0.27)] blur-[100px]" />

          <div className="relative flex items-center justify-between px-10 pt-10">
            <div className="flex flex-col gap-2">
              <p className="font-anon text-[24px] font-bold">MONTHLY MEMBERSHIP</p>
              <p className="text-[14px] text-white/70">
                Cancel anytime. Instant access to events &amp; priority facilities.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p>
                <span className="text-[36px] font-extrabold">€12</span>
                <span className="text-[18px] font-medium text-white/70">/mo</span>
              </p>
              <p className="font-anon text-[12px] text-accent">Billed Monthly</p>
            </div>
          </div>

          <hr className="relative mx-10 mt-6 border-dashed border-white/20" />

          <div className="relative flex flex-col gap-4 px-10 py-6">
            <p className="font-anon text-[14px] font-bold text-accent">MEMBER EXCLUSIVE BENEFITS:</p>
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <span className="flex size-5 items-center justify-center rounded-[10px] bg-[rgba(123,136,255,0.1)]">
                  <img src={check} alt="" className="size-2.5" />
                </span>
                <p className="flex-1 font-anon text-[14px] text-white/70">{b}</p>
              </div>
            ))}
          </div>

          <hr className="relative mx-10 border-dashed border-white/20" />

          <div className="relative flex items-center justify-between px-10 py-6">
            <Link
              to="/agent-profile"
              className="rounded-[10px] bg-[rgba(21,27,52,0.8)] px-4 py-3 font-anon text-[14px] font-bold italic text-[#7b88ff] hover:underline"
            >
              ← Return to Agent Profile
            </Link>
            <Link
              to="/membership/payment"
              className="flex h-[51px] items-center gap-3 rounded-[10px] bg-[#7b88ff] px-8 text-[16px] font-bold text-night hover:brightness-110"
            >
              Proceed to Secure Payment
              <img src={arrowRight} alt="" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
