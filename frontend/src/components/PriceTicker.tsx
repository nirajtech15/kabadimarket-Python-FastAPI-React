import { useQuery } from '@tanstack/react-query'
import { getRates } from '../api'

export default function PriceTicker() {
  const { data: rates = [] } = useQuery({ queryKey: ['rates'], queryFn: () => getRates() })

  if (rates.length === 0) return null

  const items = [...rates, ...rates] // duplicate for seamless loop

  return (
    <div className="bg-green-700 text-white py-2 overflow-hidden">
      <div className="flex items-center gap-3">
        <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shrink-0 ml-4">
          LIVE RATES
        </span>
        <div className="ticker-wrap flex-1">
          <div className="ticker-content">
            {items.map((r, i) => (
              <span key={i} className="mr-8 text-sm whitespace-nowrap">
                {r.emoji} {r.name}:&nbsp;
                <span className="font-bold text-yellow-300">₹{r.price}/{r.unit}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
