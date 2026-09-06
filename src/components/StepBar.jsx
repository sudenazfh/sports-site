import check from '../assets/check.svg'

const STEPS = ['Confirm Plan', 'Secure Payment', 'Finish']

export default function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-12 py-4">
      {STEPS.map((label, i) => {
        const n = i + 1
        const done = n < current
        const active = n === current
        return (
          <div key={label} className="flex items-center gap-3">
            {done ? (
              <span className="flex size-7 items-center justify-center rounded-full bg-accent">
                <img src={check} alt="" className="size-3.5 invert" />
              </span>
            ) : (
              <span
                className={`flex size-7 items-center justify-center rounded-full text-[12px] font-bold ${
                  active
                    ? 'bg-[rgba(123,136,255,0.7)] text-night'
                    : 'border border-white/10 bg-card text-white/70'
                }`}
              >
                {n}
              </span>
            )}
            <span className={`font-anon text-[14px] font-bold ${active ? 'text-white' : 'text-white/50'}`}>
              {label}
            </span>
            {n < STEPS.length && <span className="w-8 border-t border-dashed border-white/20" />}
          </div>
        )
      })}
    </div>
  )
}
