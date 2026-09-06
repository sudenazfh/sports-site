import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import EventCard from '../components/EventCard.jsx'
import { events } from '../data/mock.js'

export default function AgentProfile({ visitor = false }) {
  const navigate = useNavigate()
  const agentEvents = events.slice(0, 2)
  const loginOr = (path) => (visitor ? '/login' : path)

  return (
    <AppLayout title="Famagusta Athletic Union" visitor={visitor}>
      <div className="relative bg-gradient-to-r from-[#1b2148] to-night px-7 pt-7 pb-10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-[15px] bg-night/80 px-4 py-1.5 text-[12px] font-bold text-white hover:brightness-150"
          >
            ← Back
          </button>
          <button
            type="button"
            className="rounded-[15px] bg-[rgba(247,63,82,0.15)] px-4 py-1.5 font-anon text-[12px] font-bold text-[#f73f52] hover:brightness-125"
          >
            REPORT AGENT
          </button>
        </div>
        <h1 className="mt-8 text-[36px] font-extrabold">Famagusta Athletic Union</h1>
        <span className="mt-1 inline-block rounded-[10px] bg-[rgba(123,136,255,0.15)] px-3 py-0.5 font-anon text-[11px] text-accent">
          Association
        </span>
      </div>

      <div className="flex items-start gap-6 p-7">
        <div className="flex w-[610px] flex-col gap-5">
          <section className="rounded-[12px] border border-white/10 bg-card p-6 font-mono text-[13px] leading-relaxed">
            <p className="pb-2 text-[12px] text-white/50">ABOUT</p>
            <p className="text-white/80">
              Anorthosis Famagusta, founded in 1911, is a vibrant multi-sport community dedicated to helping
              athletes of all ages reach their full potential. Whether you want to compete professionally,
              join our youth academies, or stay active, we offer top-tier coaching in football, volleyball,
              and basketball. Join our family today to build your skills, make lifelong friends, and become
              part of a historic sports legacy.
            </p>
          </section>

          <section className="rounded-[12px] border border-white/10 bg-card p-6 font-mono text-[13px]">
            <p>AGENT SINCE: 1 JANUARY 2024</p>
            <div className="mt-5 grid grid-cols-3">
              <div>
                <p className="text-[12px] text-white/50">EVENTS CREATED</p>
                <p className="mt-1">87</p>
              </div>
              <div>
                <p className="text-[12px] text-white/50">ACTIVE MEMBERS</p>
                <p className="mt-1">256</p>
              </div>
              <div>
                <p className="text-[12px] text-white/50">FAVOURITES</p>
                <p className="mt-1">1032</p>
              </div>
            </div>
          </section>

          <div>
            <p className="pb-3 text-[15px] font-bold">Events ({agentEvents.length})</p>
            <div className="flex gap-5">
              {agentEvents.map((e) => (
                <EventCard key={e.id} event={e} to={visitor ? '/visitor/event' : '/event'} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-[350px] flex-col items-center gap-5">
          <section className="w-full rounded-[12px] border border-white/10 bg-card p-6 font-mono text-[13px]">
            <p className="pb-2 text-[12px] text-white/50">CONTACT</p>
            <p>
              <span className="text-white/50">email:</span> famagustaathleticunion@sports.com
            </p>
            <p className="mt-1">
              <span className="text-white/50">phone:</span> +90 5** *** ** **
            </p>
          </section>
          <Link
            to={loginOr('/messages')}
            className="rounded-[10px] bg-[rgba(123,136,255,0.15)] px-10 py-2.5 text-[13px] font-bold text-accent hover:brightness-125"
          >
            MESSAGE AGENT
          </Link>
        </div>

        <div className="ml-auto flex w-[440px] flex-col gap-6">
          <section className="rounded-[12px] border border-white/10 bg-card p-6 font-mono text-[12px] leading-relaxed text-white/80">
            <p className="pb-2 text-white/50">BECOME A MEMBER</p>
            <p>
              By applying for a membership you can benefit from opportinities only exclusive for members.
              Become a member now and enjoy free or discounted entry to all their events and support your
              local sports community.
            </p>
          </section>

          <section className="flex flex-col items-center gap-3 self-center rounded-[15px] border border-white/15 bg-[#12172e] px-10 py-7 shadow-[0px_0px_50px_0px_rgba(123,136,255,0.2)]">
            <div className="flex items-baseline gap-6">
              <p className="text-[14px] font-bold">Monthly Membership</p>
              <p className="text-[24px] font-extrabold">€12/mo</p>
            </div>
            <p className="text-[11px] text-white/60">Cancel anytime (refund within 24h).</p>
            <Link
              to={loginOr('/membership')}
              className="rounded-[10px] bg-[rgba(123,136,255,0.2)] px-10 py-2 text-[13px] font-bold text-accent hover:brightness-125"
            >
              JOIN US
            </Link>
          </section>
        </div>
      </div>
    </AppLayout>
  )
}
