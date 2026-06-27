import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRates } from '../api'
import { Link } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import ScrapCalculator from '../components/ScrapCalculator'

const CATEGORIES = [
  { value: 'all', label: 'All Categories', emoji: '♻️' },
  { value: 'paper', label: 'Paper', emoji: '📰' },
  { value: 'plastic', label: 'Plastic', emoji: '🪣' },
  { value: 'metal', label: 'Metal', emoji: '⚙️' },
  { value: 'ewaste', label: 'E-Waste', emoji: '💻' },
  { value: 'glass', label: 'Glass', emoji: '🍾' },
  { value: 'rubber', label: 'Rubber', emoji: '🛞' },
  { value: 'other', label: 'Other', emoji: '📦' },
]

export default function RateList() {
  const [category, setCategory] = useState('all')
  const { data: rates = [], isLoading, dataUpdatedAt, refetch } = useQuery({
    queryKey: ['rates', category],
    queryFn: () => getRates(category),
  })

  const updatedTime = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString('en-IN') : ''

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Today's Scrap Rates</h1>
          <p className="text-green-100 text-lg">Live prices updated daily. Best rates in your city.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: rate table */}
          <div className="lg:col-span-2">
            {/* Category filter */}
            <div className="flex gap-2 flex-wrap mb-6">
              {CATEGORIES.map(c => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === c.value
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>

            {/* Updated time */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                {rates.length} items &nbsp;•&nbsp; Updated: {updatedTime}
              </p>
              <button onClick={() => refetch()} className="flex items-center gap-1 text-xs text-green-600 hover:underline">
                <RefreshCw size={12} /> Refresh
              </button>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-green-50 border-b border-green-100">
                    <tr>
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">Material</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-700 hidden md:table-cell">Category</th>
                      <th className="text-right px-5 py-3 font-semibold text-gray-700">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {rates.map(rate => (
                      <tr key={rate.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5">
                          <span className="mr-2">{rate.emoji}</span>
                          <span className="font-medium text-gray-900">{rate.name}</span>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span className="badge bg-gray-100 text-gray-600">{rate.category}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="font-bold text-green-600 text-base">₹{rate.price}</span>
                          <span className="text-gray-400 text-xs">/{rate.unit}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
              ⚠️ <strong>Note:</strong> Prices may vary slightly based on quantity and location. Actual rates are confirmed at the time of pickup.
            </div>
          </div>

          {/* Right: calculator + CTA */}
          <div className="space-y-6">
            <ScrapCalculator />
            <div className="card bg-green-700 text-white">
              <h3 className="font-bold text-xl mb-2">Ready to Sell?</h3>
              <p className="text-green-100 text-sm mb-4">Book a free pickup and get instant cash at these rates.</p>
              <Link to="/booking" className="bg-yellow-400 text-gray-900 font-bold block text-center py-3 rounded-xl hover:bg-yellow-300 transition-all">
                📅 Book Free Pickup
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
