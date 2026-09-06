import chevron from '../assets/icon-chevron.svg'

function FilterButton({ label }) {
  return (
    <button
      type="button"
      className="flex h-[46px] w-[170px] items-center justify-between rounded-[10px] border-[0.2px] border-white/70 bg-field px-4 text-[12px] font-bold text-white hover:border-accent"
    >
      {label}
      <img src={chevron} alt="" className="w-3 rotate-90" />
    </button>
  )
}

export default function FilterBar({ query, onQuery, freeOnly, onFreeOnly, count, placeholder, extraFilters = [] }) {
  return (
    <div className="flex items-center gap-4 border-b-[0.2px] border-white/70 bg-card px-7 py-4">
      <input
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder={placeholder}
        className="h-[46px] flex-1 rounded-[10px] border-[0.2px] border-white/70 bg-field px-4 text-[12px] text-white placeholder:text-white/70 outline-none focus:border-accent"
      />
      <FilterButton label="All Types" />
      <FilterButton label="All Locations" />
      <FilterButton label="Most Popular" />
      {extraFilters.map((f) => (
        <FilterButton key={f} label={f} />
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
