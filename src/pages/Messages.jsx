import { useEffect, useState } from 'react'
import { api } from '../api.js'
import AppLayout from '../components/AppLayout.jsx'
import { agentConversations, conversations } from '../data/mock.js'

export default function Messages({ role = 'user' }) {
  const source = role === 'agent' ? agentConversations : conversations
  const [convos, setConvos] = useState(source)
  const [activeId, setActiveId] = useState(source[0].id)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    api('/my/conversations')
      .then((cs) => {
        if (!cs.length) return
        setConvos(cs.map((c) => ({ ...c, live: true, unread: 0, time: '', preview: c.messages.at(-1)?.text ?? '' })))
        setActiveId(cs[0].id)
      })
      .catch(() => {})
  }, [role])

  const active = convos.find((c) => c.id === activeId) ?? convos[0]

  async function send(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    let msg = { id: Date.now(), me: true, text, time: 'now' }
    if (active.live) {
      try {
        msg = await api(`/conversations/${active.id}/messages`, { method: 'POST', body: { text } })
      } catch {
        return
      }
    }
    setConvos((cs) =>
      cs.map((c) => (c.id === active.id ? { ...c, messages: [...c.messages, msg] } : c)),
    )
    setDraft('')
  }

  return (
    <AppLayout title="Messages" role={role}>
      <div className="flex h-[calc(100vh-72px)]">
        <aside className="flex w-[305px] shrink-0 flex-col border-r border-white/20">
          <div className="p-4">
            <div className="flex h-[40px] items-center gap-2 rounded-[10px] border-[0.2px] border-white/40 bg-field px-3">
              <span className="text-white/50">⌕</span>
              <input
                placeholder=""
                className="w-full bg-transparent text-[12px] text-white outline-none"
              />
            </div>
          </div>
          {convos.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setActiveId(c.id)
                setConvos((cs) => cs.map((x) => (x.id === c.id ? { ...x, unread: 0 } : x)))
              }}
              className={`flex flex-col gap-1 border-b border-white/10 px-4 py-4 text-left hover:bg-field/40 ${
                c.id === activeId ? 'bg-field/30' : ''
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="text-[13px] font-bold">{c.name}</span>
                {c.unread > 0 && (
                  <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-night">
                    {c.unread}
                  </span>
                )}
              </span>
              <span className="truncate text-[10px] text-white/60">{c.preview}</span>
              <span className="text-[10px] text-white/40">{c.time}</span>
            </button>
          ))}
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-white/20 px-9 py-4">
            <p className="text-[14px] font-bold">{active.name}</p>
            {active.online && <p className="text-[11px] text-accent">· Online</p>}
          </header>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-9 py-6">
            {active.messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[46%] rounded-[10px] px-4 py-2.5 ${
                  m.me ? 'self-end bg-[#181d38]' : 'self-start bg-[#232a52]'
                }`}
              >
                <p className="text-[13px] leading-normal text-white/90">{m.text}</p>
                <p className="text-right text-[11px] text-white/50">{m.time}</p>
              </div>
            ))}
          </div>

          <form onSubmit={send} className="flex items-center gap-4 border-t border-white/20 px-9 py-5">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="h-[46px] flex-1 rounded-[10px] border-[0.2px] border-white/40 bg-field px-4 text-[13px] text-white placeholder:text-white/50 outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="h-[46px] rounded-[10px] bg-field px-8 text-[15px] font-bold text-white/90 hover:bg-accent hover:text-night"
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </AppLayout>
  )
}
