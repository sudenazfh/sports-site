const STYLES = {
  PENDING: 'bg-[rgba(123,136,255,0.1)] text-accent',
  FAILED: 'bg-[rgba(247,63,82,0.1)] text-[#f73f52]',
  DEFAULT: 'bg-[rgba(13,16,29,0.9)] text-white',
}

export default function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex w-[71px] items-center justify-center rounded-[15px] py-0.5 font-anon text-[10px] font-bold ${
        STYLES[status] ?? STYLES.DEFAULT
      }`}
    >
      {status}
    </span>
  )
}
