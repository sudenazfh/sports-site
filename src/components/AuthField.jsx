export default function AuthField({ label, id, type = 'text', placeholder }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-bold text-white/70">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required
        className="h-[48px] w-full rounded-[10px] border-[0.5px] border-white/20 bg-field px-4 text-[14px] text-white placeholder:text-white/40 outline-none focus:border-accent"
      />
    </div>
  )
}
