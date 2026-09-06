import { useEffect, useState } from 'react'
import { api } from '../api.js'
import AppLayout from '../components/AppLayout.jsx'
import EventCard from '../components/EventCard.jsx'
import FilterBar from '../components/FilterBar.jsx'
import { favouriteEvents } from '../data/mock.js'

export default function Favourites() {
  const [freeOnly, setFreeOnly] = useState(false)
  const [query, setQuery] = useState('')
  const [source, setSource] = useState(favouriteEvents)

  useEffect(() => {
    api('/my/favourites').then(setSource).catch(() => {})
  }, [])

  async function unfav(e) {
    try {
      await api(`/events/${e.id}/favourite`, { method: 'POST' })
      setSource((s) => s.filter((x) => x.id !== e.id))
    } catch {}
  }

  const shown = source.filter(
    (e) =>
      (!freeOnly || e.price === 0) &&
      e.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <AppLayout title="Favourite Events">
      <FilterBar
        query={query}
        onQuery={setQuery}
        freeOnly={freeOnly}
        onFreeOnly={setFreeOnly}
        placeholder="Search for events.."
      />
      <div className="flex flex-wrap gap-5 p-7">
        {shown.map((e) => (
          <EventCard key={e.id} event={e} fav to={`/event/${e.id}`} onFav={unfav} />
        ))}
      </div>
    </AppLayout>
  )
}
