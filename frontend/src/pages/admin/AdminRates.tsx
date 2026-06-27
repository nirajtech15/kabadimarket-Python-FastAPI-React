import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllRates, updateRate, createRate, deleteRate } from '../../api'
import toast from 'react-hot-toast'
import { Pencil, Check, X, Trash2, Plus } from 'lucide-react'
import type { ScrapRate } from '../../types'

export default function AdminRates() {
  const qc = useQueryClient()
  const { data: rates = [], isLoading } = useQuery({ queryKey: ['rates-admin'], queryFn: getAllRates })
  const [editId, setEditId] = useState<number | null>(null)
  const [editPrice, setEditPrice] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newRate, setNewRate] = useState({ name: '', category: 'paper', price: '', unit: 'kg', emoji: '♻️' })

  const updateMutation = useMutation({
    mutationFn: ({ id, price }: { id: number; price: number }) => updateRate(id, price),
    onSuccess: () => { toast.success('Rate updated'); qc.invalidateQueries({ queryKey: ['rates-admin'] }); setEditId(null) },
    onError: () => toast.error('Failed to update'),
  })

  const createMutation = useMutation({
    mutationFn: createRate,
    onSuccess: () => { toast.success('Rate added'); qc.invalidateQueries({ queryKey: ['rates-admin'] }); setShowAdd(false); setNewRate({ name: '', category: 'paper', price: '', unit: 'kg', emoji: '♻️' }) },
    onError: () => toast.error('Failed to add rate'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteRate,
    onSuccess: () => { toast.success('Rate deleted'); qc.invalidateQueries({ queryKey: ['rates-admin'] }) },
  })

  const grouped = rates.reduce<Record<string, ScrapRate[]>>((acc, r) => {
    acc[r.category] = acc[r.category] || []
    acc[r.category].push(r)
    return acc
  }, {})

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Scrap Rates</h1>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary flex items-center gap-2 text-sm py-2">
          <Plus size={16} /> Add Rate
        </button>
      </div>

      {/* Add new rate form */}
      {showAdd && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Add New Rate</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <input value={newRate.emoji} onChange={e => setNewRate(p => ({ ...p, emoji: e.target.value }))} className="input" placeholder="Emoji" />
            <input value={newRate.name} onChange={e => setNewRate(p => ({ ...p, name: e.target.value }))} className="input col-span-1 md:col-span-1" placeholder="Material name" />
            <select value={newRate.category} onChange={e => setNewRate(p => ({ ...p, category: e.target.value }))} className="input">
              {['paper', 'plastic', 'metal', 'ewaste', 'glass', 'rubber', 'other'].map(c => <option key={c}>{c}</option>)}
            </select>
            <input value={newRate.price} onChange={e => setNewRate(p => ({ ...p, price: e.target.value }))} className="input" placeholder="Price (₹)" type="number" />
            <select value={newRate.unit} onChange={e => setNewRate(p => ({ ...p, unit: e.target.value }))} className="input">
              <option value="kg">kg</option>
              <option value="pcs">pcs</option>
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => createMutation.mutate({ ...newRate, price: parseFloat(newRate.price) } as any)} className="btn-primary text-sm py-2">
              Save Rate
            </button>
            <button onClick={() => setShowAdd(false)} className="btn-secondary text-sm py-2">Cancel</button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                <h3 className="font-bold text-gray-700 capitalize">{category}</h3>
              </div>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {items.map(r => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3.5 w-10 text-lg">{r.emoji}</td>
                      <td className="px-2 py-3.5 font-medium text-gray-900">{r.name}</td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs hidden md:table-cell">{r.unit}</td>
                      <td className="px-5 py-3.5">
                        {editId === r.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">₹</span>
                            <input
                              value={editPrice}
                              onChange={e => setEditPrice(e.target.value)}
                              className="input w-24 py-1.5 text-sm"
                              type="number"
                              autoFocus
                            />
                            <button onClick={() => updateMutation.mutate({ id: r.id, price: parseFloat(editPrice) })} className="text-green-600 hover:text-green-700">
                              <Check size={16} />
                            </button>
                            <button onClick={() => setEditId(null)} className="text-gray-400 hover:text-gray-600">
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <span className="font-bold text-green-600">₹{r.price}<span className="text-gray-400 font-normal text-xs">/{r.unit}</span></span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => { setEditId(r.id); setEditPrice(String(r.price)) }} className="text-blue-400 hover:text-blue-600">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => { if (confirm('Delete this rate?')) deleteMutation.mutate(r.id) }} className="text-red-400 hover:text-red-600">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
