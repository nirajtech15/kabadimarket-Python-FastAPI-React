import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRates } from '../api'
import type { ScrapRate } from '../types'
import { Calculator } from 'lucide-react'

export default function ScrapCalculator() {
  const { data: rates = [] } = useQuery({ queryKey: ['rates'], queryFn: () => getRates() })
  const [selectedRate, setSelectedRate] = useState<ScrapRate | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const earning = selectedRate ? parseFloat((Number(selectedRate.price) * quantity).toFixed(2)) : 0

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <Calculator className="text-green-600" size={20} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Earning Calculator</h3>
          <p className="text-xs text-gray-500">Know your scrap value instantly</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
            Select Material
          </label>
          <select
            onChange={e => setSelectedRate(rates.find(r => r.id === +e.target.value) || null)}
            className="input"
          >
            <option value="">-- Choose scrap type --</option>
            {['paper', 'plastic', 'metal', 'ewaste', 'glass', 'rubber', 'other'].map(cat => (
              <optgroup key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1)}>
                {rates.filter(r => r.category === cat).map(r => (
                  <option key={r.id} value={r.id}>
                    {r.emoji} {r.name} — ₹{r.price}/{r.unit}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
            {selectedRate ? `Quantity (${selectedRate.unit})` : 'Quantity'}
          </label>
          <input
            type="number"
            min={0.1}
            step={0.1}
            value={quantity}
            onChange={e => setQuantity(parseFloat(e.target.value) || 0)}
            className="input"
            placeholder="Enter weight / quantity"
          />
        </div>

        {selectedRate ? (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
            <p className="text-sm opacity-90">Your estimated earnings</p>
            <p className="text-4xl font-extrabold mt-1">₹{earning}</p>
            <div className="flex justify-between mt-3 text-xs opacity-80">
              <span>{selectedRate.emoji} {selectedRate.name}</span>
              <span>₹{selectedRate.price} × {quantity} {selectedRate.unit}</span>
            </div>
            <p className="text-xs mt-3 opacity-80">✅ Pickup FREE &nbsp;•&nbsp; 💰 Instant Payment</p>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-400 text-sm border border-dashed border-gray-200">
            Select a material to see your earnings
          </div>
        )}
      </div>
    </div>
  )
}
