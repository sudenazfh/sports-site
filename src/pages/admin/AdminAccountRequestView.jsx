import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AppLayout from '../../components/AppLayout.jsx'
import { api } from '../../api.js'

const labelCls = 'text-[14px] font-bold'
const inputCls =
  'w-full rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] text-white outline-none'

export default function AdminAccountRequestView() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const requestId = params.get('id')
  const [request, setRequest] = useState(null)
  const [membersCommission, setMembersCommission] = useState('')
  const [eventsCommission, setEventsCommission] = useState('10')

  useEffect(() => {
    if (requestId) api('/admin/agent-requests').then((requests) => setRequest(requests.find((item) => item.id === Number(requestId)))).catch(() => {})
  }, [requestId])

  async function decide(action) {
    await api(`/admin/agent-requests/${requestId}/${action}`, { method: 'POST', body: { commissionMembers: membersCommission, commissionEvents: eventsCommission } }).catch(() => {})
    navigate('/admin/account-requests')
  }

  return (
    <AppLayout title="Account Requests" role="admin">
      <div className="flex flex-wrap items-start gap-7 p-7">
        <div className="flex min-w-[520px] flex-[1.6] flex-col gap-5">
          <section className="flex flex-col gap-4 rounded-[15px] border border-white/10 bg-card p-8">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Full Name</span>
                <input readOnly value={request?.user?.name ?? ''} className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Email</span>
                <input readOnly value={request?.user?.email ?? ''} className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Phone Number</span>
                <input readOnly value={request?.phone ?? ''} className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <span className={labelCls}>Organization / Company Name</span>
                <input readOnly value={request?.orgName ?? ''} className={inputCls} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className={labelCls}>Agent Type</span>
              <input readOnly value={request?.agentType ?? ''} className="w-[280px] rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] text-white outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <span className={labelCls}>Reason for requesting agent access</span>
              <textarea
                readOnly
                rows={4}
                value={
                  request?.reason ?? ''
                }
                className="w-full resize-none rounded-[8px] border border-white/20 bg-night px-4 py-3 text-[13px] text-white outline-none"
              />
            </div>
          </section>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <section className="flex flex-col gap-5 rounded-[15px] border border-white/10 bg-card p-8">
            <div className="flex flex-col gap-2">
              <span className={labelCls}>Membership Commision (%)</span>
              <input value={membersCommission} onChange={(e) => setMembersCommission(e.target.value)} placeholder={request?.agentType === 'association' ? 'Commission rate from members' : 'Not applicable for organizers'} className={inputCls} />
            </div>
            <div className="flex flex-col gap-2">
              <span className={labelCls}>Set Default Event Commision (%)</span>
              <input value={eventsCommission} onChange={(e) => setEventsCommission(e.target.value)} placeholder="Commission rate from events" className={inputCls} />
            </div>
          </section>
          <div className="flex justify-center gap-5 rounded-[15px] border border-white/10 bg-card p-4">
            <button
              type="button"
              onClick={() => decide('reject')}
              className="w-[130px] rounded-[8px] bg-[rgba(247,63,82,0.1)] py-2.5 text-[13px] font-bold text-[#f73f52] hover:brightness-125"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => decide('approve')}
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
