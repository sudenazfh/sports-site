import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'

const labelCls = 'text-[14px] font-bold'
const inputCls =
  'w-full rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] text-white outline-none'

function Panel({ title, children }) {
  return (
    <section className="flex flex-col gap-4 rounded-[15px] border border-white/10 bg-card p-8">
      <div className="flex items-center justify-between">
        <span />
        <p className="text-[16px] font-bold">{title}</p>
        <Link
          to="/agent-profile"
          className="rounded-[8px] bg-[rgba(123,136,255,0.2)] px-4 py-2 text-[12px] font-bold text-accent hover:brightness-125"
        >
          View Page
        </Link>
      </div>
      {children}
    </section>
  )
}

export default function AdminAccountReport() {
  const navigate = useNavigate()

  return (
    <AppLayout title="Reports" role="admin">
      <div className="flex flex-wrap items-start gap-7 p-7">
        <div className="flex min-w-[520px] flex-[1.6] flex-col gap-7">
          <Panel title="Reported Account">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Full Name</span>
                <input readOnly value="Şerife Kocabaşoğlu" className={inputCls} />
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
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Agent Type</span>
                <input readOnly value="Association" className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Agent Since</span>
                <input readOnly value="••/••/••••" className={inputCls} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className={labelCls}>Reason for requesting agent access</span>
              <textarea
                readOnly
                rows={4}
                value="I request to become an agent ...."
                className="w-full resize-none rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] text-white outline-none"
              />
            </div>
          </Panel>

          <Panel title="Reporting Account">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Full Name</span>
                <input readOnly value="Sude Katırcıoğlu" className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Email</span>
                <input readOnly value="user@gmail.com" className={inputCls} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className={labelCls}>Reason of Report</span>
              <textarea
                readOnly
                rows={5}
                value="The agent has done ... theredore i am reporting this account."
                className="w-full resize-none rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] text-white outline-none"
              />
            </div>
          </Panel>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <section className="flex flex-col gap-5 rounded-[15px] border border-white/10 bg-card p-8">
            <div className="flex flex-col gap-2">
              <span className={labelCls}>Membership Commision (%)</span>
              <input readOnly placeholder="Commission rate to be collected from each member" className={inputCls} />
            </div>
            <div className="flex flex-col gap-2">
              <span className={labelCls}>Set Default Event Commision (%)</span>
              <input readOnly placeholder="Commission rate to be deducted from each event" className={inputCls} />
            </div>
          </section>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/reports')}
              className="rounded-[8px] bg-field px-6 py-2.5 font-anon text-[13px] font-bold text-white hover:brightness-125"
            >
              REJECT REPORT
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/reports')}
              className="rounded-[8px] bg-[rgba(247,63,82,0.15)] px-6 py-2.5 font-anon text-[13px] font-bold text-[#f73f52] hover:brightness-125"
            >
              BAN ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
