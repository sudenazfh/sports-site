import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import AppLayout from '../components/AppLayout.jsx'
import { agentNotifications, notifications } from '../data/mock.js'

const DOTS = {
  blue: 'bg-[#7b88ff]',
  red: 'bg-[#f73f52]',
  read: 'border border-white/40',
}

export default function Notifications({ role = 'user' }) {
  const fallback = role === 'agent' ? agentNotifications : notifications
  const [source, setSource] = useState(fallback)

  useEffect(() => {
    if (role !== 'user') return
    api('/my/notifications')
      .then(setSource)
      .catch(() => {})
  }, [role])
  return (
    <AppLayout title="Notifications" role={role}>
      <div className="flex flex-col gap-4 p-7">
        {source.map((n) => (
          <Link
            key={n.id}
            to="/notification-details"
            className="flex items-start justify-between rounded-[12px] border border-white/10 bg-card px-5 py-4 hover:border-white/30"
          >
            <div>
              <p className="text-[14px] font-bold">{n.text}</p>
              <p className="mt-1 text-[11px] text-white/60">{n.time}</p>
            </div>
            <span className={`mt-1 size-2 shrink-0 rounded-full ${DOTS[n.dot]}`} />
          </Link>
        ))}
      </div>
    </AppLayout>
  )
}
