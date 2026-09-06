import { useState } from 'react'
import chevron from '../assets/icon-chevron.svg'

export const TYPE_OPTIONS = ['All', 'Football', 'Running', 'Basketball', 'Tennis', 'Cycling', 'Marathon', 'Volleyball', 'Swimming']
export const LOCATION_OPTIONS = ['All', 'Famagusta', 'Nicosia', 'Kyrenia', 'İskele', 'Karpass', 'Paphos']
export const SORT_OPTIONS = ['Most Popular', 'Newest First', 'Oldest First', 'Price: Low to High', 'Price: High to Low']
export const STATUS_OPTIONS = ['All Status', 'Pending', 'Completed', 'Failed']

export function sortEvents(events, sort) {
  const xs = [...events]
  switch (sort) {
    case 'Newest First':
      return xs.sort((a, b) => b.id - a.id)
    case 'Oldest First':
      return xs.sort((a, b) => a.id - b.id)
    case 'Price: Low to High':
      return xs.sort((a, b) => a.price - b.price)
    case 'Price: High to Low':
      return xs.sort((a, b) => b.price - a.price)
    default:
      // Most Popular: doluluk oranı en yüksek üstte
      return xs.sort((a, b) => b.taken / b.capacity - a.taken / a.capacity)
  }
}

function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const interactive = !!onChange
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => interactive && setOpen((o) => !o)}
        className="flex h-[46px] w-[170px] items-center justify-between rounded-[10px] border-[0.2px] border-white/70 bg-field px-4 text-[12px] font-bold text-white hover:border-accent"
      >
        {value ?? label}
        <img src={chevron} alt="" className={`w-3 ${open ? '-rotate-90' : 'rotate-90'}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-[52px] left-0 z-20 flex w-[170px] flex-col rounded-[10px] border-[0.2px] border-white/20 bg-field py-1 shadow-lg">
            {options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  onChange(o)
                  setOpen(false)
                }}
                className={`px-4 py-2 text-left text-[12px] font-bold hover:bg-white/10 ${o === value ? 'text-accent' : 'text-white'}`}
              >
                {o}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function FilterBar({
  query,
  onQuery,
  freeOnly,
  onFreeOnly,
  count,
  placeholder,
  extraFilters = [],
  type,
  onType,
  loc,
  onLoc,
  sort,
  onSort,
  status,
  onStatus,
}) {
  return (
    <div className="flex items-center gap-4 border-b-[0.2px] border-white/70 bg-card px-7 py-4">
      <input
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder={placeholder}
        className="h-[46px] flex-1 rounded-[10px] border-[0.2px] border-white/70 bg-field px-4 text-[12px] text-white placeholder:text-white/70 outline-none focus:border-accent"
      />
      <Dropdown label="All Types" options={TYPE_OPTIONS} value={type === 'All' ? 'All Types' : type} onChange={onType} />
      <Dropdown label="All Locations" options={LOCATION_OPTIONS} value={loc === 'All' ? 'All Locations' : loc} onChange={onLoc} />
      <Dropdown label="Most Popular" options={SORT_OPTIONS} value={sort} onChange={onSort} />
      {extraFilters.map((f) => (
        <Dropdown key={f} label={f} options={STATUS_OPTIONS} value={status} onChange={onStatus} />
      ))}
      <label className="flex cursor-pointer items-center gap-2 text-[12px] font-bold">
        <input
          type="checkbox"
          checked={freeOnly}
          onChange={(e) => onFreeOnly(e.target.checked)}
          className="size-5 accent-accent"
        />
        Free Only
      </label>
      {count != null && <span className="text-[12px] text-white/70">{count} events</span>}
    </div>
  )
}
