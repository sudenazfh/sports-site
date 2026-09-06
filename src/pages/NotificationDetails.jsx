import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'

export default function NotificationDetails() {
  const navigate = useNavigate()

  const headerRight = (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="mr-auto ml-6 rounded-[15px] bg-night px-4 py-1.5 text-[12px] font-bold text-white hover:brightness-150"
    >
      ← Back
    </button>
  )

  return (
    <AppLayout title="Notifications" headerRight={headerRight}>
      <div className="flex flex-col gap-4 p-7">
        <div className="flex items-start justify-between rounded-[12px] border border-white/10 bg-card px-5 py-4">
          <div>
            <p className="text-[14px] font-bold">
              Event Cancellation: Beach Volleyball Cyprus has been CANCELLED! click to get further information..
            </p>
            <p className="mt-1 text-[11px] text-white/60">4 days ago</p>
          </div>
          <span className="mt-1 size-2 shrink-0 rounded-full bg-[#f73f52]" />
        </div>

        <div className="flex flex-col gap-4 rounded-[12px] border border-white/10 bg-card px-5 py-4">
          <div>
            <p className="text-[14px] font-bold">Agent: Cyprus Tennis Federation</p>
            <p className="mt-1 text-[11px] text-white/60">Date: 5 July 2025</p>
          </div>
          <div className="rounded-[10px] border border-white/20 bg-[#12172e] px-4 py-4 text-[13px] leading-relaxed text-white/80">
            <p>Dear participants,</p>
            <p>
              We are sorry to inform that our event has been cancelled due to bad weather conditions. Thank
              you for your understanding. Can&apos;t wait to see you in our upcoming events.
            </p>
            <p className="mt-4">Sincerely,</p>
            <p>Cyprus Tennis Federation</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
