import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'

const labelCls = 'text-[14px] font-bold'
const inputCls =
  'w-full rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] text-white outline-none'

export default function AdminAccountRequestView() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const commission = params.get('kind') === 'commission'

  return (
    <AppLayout title="Account Requests" role="admin">
      <div className="flex flex-wrap items-start gap-7 p-7">
        <div className="flex min-w-[520px] flex-[1.6] flex-col gap-5">
          <section className="flex flex-col gap-4 rounded-[15px] border border-white/10 bg-card p-8">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Full Name</span>
                <input readOnly value={commission ? 'İdil Derin' : 'Şerife Kocabaşoğlu'} className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Email</span>
                <input readOnly value="association@gmail.com" className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Phone Number</span>
                <input readOnly value="+1 (555) 000-0000" className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Organization / Company Name</span>
                <input readOnly value="Association Name" className={inputCls} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className={labelCls}>Agent Type</span>
              <input readOnly value="Association" className="w-[280px] rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] text-white outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <span className={labelCls}>{commission ? 'Reason for request' : 'Reason for requesting agent access'}</span>
              <textarea
                readOnly
                rows={4}
                value={
                  commission
                    ? 'I request the decrease of membership commission because of ... this reason.'
                    : 'I request to become an agent ....'
                }
                className="w-full resize-none rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] text-white outline-none"
              />
            </div>
          </section>
          {commission && (
            <Link
              to="/agent-profile"
              className="self-start rounded-[10px] bg-[rgba(123,136,255,0.2)] px-6 py-2.5 text-[13px] font-bold text-accent hover:brightness-125"
            >
              View Agent Page
            </Link>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <section className="flex flex-col gap-5 rounded-[15px] border border-white/10 bg-card p-8">
            <div className="flex flex-col gap-2">
              <span className={labelCls}>Membership Commision (%)</span>
              <input placeholder="Commission rate to be collected from each member" className={inputCls} />
            </div>
            <div className="flex flex-col gap-2">
              <span className={labelCls}>Set Default Event Commision (%)</span>
              <input placeholder="Commission rate to be deducted from each event" className={inputCls} />
            </div>
          </section>
          <div className="flex justify-center gap-5 rounded-[15px] border border-white/10 bg-card p-4">
            <button
              type="button"
              onClick={() => navigate('/admin/account-requests')}
              className="w-[130px] rounded-[8px] bg-[rgba(247,63,82,0.1)] py-2.5 text-[13px] font-bold text-[#f73f52] hover:brightness-125"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/account-requests')}
              className="w-[130px] rounded-[8px] bg-[rgba(123,136,255,0.2)] py-2.5 text-[13px] font-bold text-accent hover:brightness-125"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
