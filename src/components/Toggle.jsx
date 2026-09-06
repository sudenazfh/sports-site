export default function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`flex h-[18px] w-[34px] items-center rounded-full px-0.5 transition ${
        on ? 'justify-end bg-accent' : 'justify-start bg-white/20'
      }`}
    >
      <span className={`size-[14px] rounded-full ${on ? 'bg-night' : 'bg-white/70'}`} />
    </button>
  )
}
