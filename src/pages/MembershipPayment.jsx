import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import StepBar from '../components/StepBar.jsx'
import creditCard from '../assets/credit-card.svg'
import shield from '../assets/shield.svg'

const clubTag = (
  <span className="rounded-[15px] bg-[rgba(123,136,255,0.1)] px-3 py-1 font-anon text-[12px] font-bold text-accent">
    Famagusta Athletic Union
  </span>
)

function Field({ label, id, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-anon text-[12px] text-accent">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full rounded-[10px] border border-white/13 bg-night p-3.5 text-[14px] text-white placeholder:text-white/40 outline-none focus:border-accent'

export default function MembershipPayment() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/membership/complete')
  }

  return (
    <AppLayout title="Membership Sign-Up" headerRight={clubTag}>
      <div className="flex flex-col gap-8 p-12">
        <StepBar current={2} />

        <div className="flex items-start gap-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-[1_0_0] flex-col gap-6 rounded-[20px] border border-white/13 bg-card p-8"
          >
            <div className="flex flex-col gap-2">
              <p className="font-anon text-[20px] font-bold">CREDIT CARD PAYMENT</p>
              <p className="text-[13px] text-white/50">Safe &amp; encrypted 256-bit SSL transaction.</p>
            </div>

            <Field label="CARDHOLDER NAME" id="m-cardholder">
              <input id="m-cardholder" required placeholder="Sude Naz Helvacı" className={inputCls} />
            </Field>

            <Field label="CARD NUMBER" id="m-cardnumber">
              <div className="relative">
                <input
                  id="m-cardnumber"
                  required
                  inputMode="numeric"
                  placeholder="4312 •••• •••• 9821"
                  className={inputCls}
                />
                <img
                  src={creditCard}
                  alt=""
                  className="absolute top-1/2 right-3.5 h-4 w-6 -translate-y-1/2"
                />
              </div>
            </Field>

            <div className="flex gap-4">
              <div className="flex-1">
                <Field label="EXPIRATION DATE" id="m-expiry">
                  <input id="m-expiry" required placeholder="08 / 29" className={inputCls} />
                </Field>
              </div>
              <div className="flex-1">
                <Field label="SECURITY CODE (CVV)" id="m-cvv">
                  <input
                    id="m-cvv"
                    required
                    type="password"
                    maxLength={4}
                    placeholder="•••"
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                to="/membership"
                className="rounded-[10px] bg-[rgba(21,27,52,0.8)] px-4 py-3 font-anon text-[14px] font-bold italic text-[#7b88ff] hover:underline"
              >
                ← Plan details
              </Link>
              <button
                type="submit"
                className="h-[51px] rounded-[10px] bg-[#7b88ff] px-10 text-[16px] font-bold text-night hover:brightness-110"
              >
                Pay €12.00
              </button>
            </div>
          </form>

          <aside className="flex w-[400px] shrink-0 flex-col gap-5 rounded-[20px] border border-white/13 bg-card p-8">
            <p className="font-anon text-[18px] font-bold">ORDER SUMMARY</p>
            <hr className="border-dashed border-white/20" />
            <div className="flex items-center justify-between text-[14px]">
              <p className="font-anon text-white/70">Monthly Membership Plan</p>
              <p className="font-bold">€12.00</p>
            </div>
            <div className="flex items-center justify-between text-[14px] text-white/70">
              <p className="font-anon">VAT (Included)</p>
              <p>€0.00</p>
            </div>
            <hr className="border-dashed border-white/20" />
            <div className="flex items-center justify-between">
              <p className="font-anon text-[16px] font-bold text-accent">TOTAL AMOUNT</p>
              <p className="text-[24px] font-extrabold">€12.00</p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <img src={shield} alt="" className="size-3.5" />
              <p className="font-anon text-[11px] text-white/70">100% Refundable within first 24h</p>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  )
}
