import { useEffect, useState } from 'react'
import { api } from '../api.js'
import AppLayout from '../components/AppLayout.jsx'
import EventCard from '../components/EventCard.jsx'
import FilterBar, { sortEvents } from '../components/FilterBar.jsx'
import { favouriteEvents } from '../data/mock.js'

export default function Browse({ visitor = false, role = 'user' }) {
  const [freeOnly, setFreeOnly] = useState(false)
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [loc, setLoc] = useState('All')
  const [sort, setSort] = useState('Most Popular')
  const [source, setSource] = useState(favouriteEvents)
  const [favIds, setFavIds] = useState(new Set())

  useEffect(() => {
    api('/events')
      .then(setSource)
      .catch(() => {}) // API kapalıysa mock veride kal
    if (!visitor && role === 'user')
      api('/my/favourites')
        .then((evs) => setFavIds(new Set(evs.map((e) => e.id))))
        .catch(() => {})
  }, [visitor, role])

  async function toggleFav(e) {
    if (visitor || role !== 'user') return
    try {
      const r = await api(`/events/${e.id}/favourite`, { method: 'POST' })
      setFavIds((s) => {
        const n = new Set(s)
        r.fav ? n.add(e.id) : n.delete(e.id)
        return n
      })
    } catch {}
  }

  const shown = sortEvents(
    source.filter(
      (e) =>
        (!freeOnly || e.price === 0) &&
        (type === 'All' || e.category === type) &&
        (loc === 'All' || e.city === loc) &&
        e.name.toLowerCase().includes(query.toLowerCase()),
    ),
    sort,
  )

  const eventPath = (id) => (visitor ? `/visitor/event/${id}` : `/event/${id}`)

  return (
    <AppLayout
      title={role === 'admin' ? 'Events' : visitor || role === 'agent' ? 'Browse Events' : 'My Events'}
      visitor={visitor}
      role={role}
    >
      <FilterBar
        query={query}
        onQuery={setQuery}
        freeOnly={freeOnly}
        onFreeOnly={setFreeOnly}
        type={type}
        onType={setType}
        loc={loc}
        onLoc={setLoc}
        sort={sort}
        onSort={setSort}
        count={shown.length}
        placeholder="Search for events or agents.."
        extraFilters={role === 'admin' ? ['Status'] : []}
      />
      <div className="flex flex-wrap gap-5 p-7">
        {shown.map((e) => (
          <EventCard key={e.id} event={e} to={eventPath(e.id)} fav={favIds.has(e.id)} onFav={toggleFav} />
        ))}
      </div>
    </AppLayout>
  )
}
