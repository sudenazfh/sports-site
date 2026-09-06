import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { api } from '../api.js'
import avatar from '../assets/avatar.svg'

const MENUS = {
  user: {
    name: 'Deniz K.',
    role: 'User Account',
    items: [
      { label: 'Browse', to: '/browse' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Favourites', to: '/favourites' },
      { label: 'Attended Events', to: '/attended-events' },
      { label: 'Messages', to: '/messages', badge: 1 },
      { label: 'Notifications', to: '/notifications', badge: 2 },
      { label: 'Profile & Settings', to: '/profile' },
    ],
  },
  agent: {
    name: 'Denizz K.',
    role: 'Agent Account',
    items: [
      { label: 'Browse', to: '/agent/browse' },
      { label: 'My Events', to: '/agent/my-events' },
      { label: 'Create Event', to: '/agent/create-event' },
      { label: 'Requests', to: '/agent/requests' },
      { label: 'Dashboard', to: '/agent/dashboard' },
      { label: 'Members', to: '/agent/members' },
      { label: 'Messages', to: '/agent/messages' },
      { label: 'Income', to: '/agent/income' },
      { label: 'Notifications', to: '/agent/notifications' },
      { label: 'Profile & Settings', to: '/agent/profile' },
    ],
  },
  admin: {
    name: 'Denizzz K.',
    role: 'Admin Account',
    items: [
      { label: 'Dashboard', to: '/admin/dashboard' },
      { label: 'Event Requests', to: '/admin/event-requests' },
      { label: 'Account Requests', to: '/admin/account-requests' },
      { label: 'Accounts', to: '/admin/accounts' },
      { label: 'Events', to: '/admin/events' },
      { label: 'System Income', to: '/admin/system-income' },
      { label: 'Messages', to: '/admin/messages' },
      { label: 'Reports', to: '/admin/reports' },
      { label: 'Profile & Settings', to: '/admin/profile' },
    ],
  },
}

export default function AppLayout({ title, headerRight, visitor = false, role = 'user', children }) {
  if (visitor) {
    return (
      <div className="flex min-h-screen flex-col bg-night">
        <header className="flex h-[68px] items-center bg-night px-16">
          <p className="flex-1 text-[18px] font-bold">{title}</p>
          {headerRight}
        </header>
        <main className="relative flex-1">{children}</main>
      </div>
    )
  }

  const menu = MENUS[role]
  const [me, setMe] = useState(null)

  useEffect(() => {
    api('/me').then(setMe).catch(() => {})
  }, [])

  const displayName = me && me.role === role ? me.name : menu.name

  return (
    <div className="flex min-h-screen bg-night">
      <aside className="fixed inset-y-0 left-0 flex w-[327px] flex-col border-r-[0.2px] border-white/70 bg-card">
        <div className="flex items-center gap-4 p-6">
          <img src={avatar} alt="" className="size-14" />
          <div>
            <p className="text-[16px] font-bold">{displayName}</p>
            <p className="text-[13px] text-white/70">{menu.role}</p>
          </div>
        </div>
        <hr className="mx-6 border-white/20" />
        <nav className="mt-8 flex flex-col gap-3 px-6">
          {menu.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center rounded-[10px] px-4 py-3 text-[14px] font-bold ${
                  isActive ? 'bg-field text-white' : 'text-white/70 hover:bg-field/50'
                }`
              }
            >
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-night">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="ml-[327px] flex min-h-screen flex-1 flex-col">
        <header className="flex h-[72px] items-center bg-card px-8">
          <p className="flex-1 text-[18px] font-bold">{title}</p>
          {headerRight}
        </header>
        <main className="relative flex-1">{children}</main>
      </div>
    </div>
  )
}
