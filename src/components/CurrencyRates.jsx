import { useEffect, useState } from 'react'
import { api } from '../api.js'

const FALLBACK = [
  ['EUR', '47.0550', '48.6555'],
  ['USD', '54.5780', '56.4350'],
  ['GBP', '63.8255', '66.0060'],
  ['AUD', '33.0905', '34.9195'],
  ['DKK', '7.2140', '7.6085'],
  ['SEK', '4.9035', '5.1715'],
  ['CHF', '57.4645', '60.6005'],
  ['JPY', '0.2955', '0.3055'],
]

export default function CurrencyRates() {
  const [rates, setRates] = useState(FALLBACK)

  useEffect(() => {
    let active = true
    const load = () => api('/currency-rates').then((next) => active && setRates(next)).catch(() => {})
    load()
    const timer = setInterval(load, 5 * 60 * 1000)
    return () => {
      active = false
      clearInterval(timer)
    }
  }, [])

  return (
    <section className="rounded-[12px] border border-white/10 bg-card p-6">
      <div className="flex items-center justify-between pb-4">
        <p className="text-[15px] font-bold">Live Currency Rates (TRY)</p>
        <span className="text-[10px] text-white/50">Updates every 5 minutes</span>
      </div>
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-white/20 text-[12px] text-white/60">
            <th className="pb-2 font-normal">CURRENCY</th>
            <th className="pb-2 font-normal">BUYING</th>
            <th className="pb-2 font-normal">SELLING</th>
          </tr>
        </thead>
        <tbody>
          {rates.map(([currency, buying, selling]) => (
            <tr key={currency}>
              <td className="py-1.5 font-bold">{currency}</td>
              <td className="py-1.5">{buying}</td>
              <td className="py-1.5">{selling}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
