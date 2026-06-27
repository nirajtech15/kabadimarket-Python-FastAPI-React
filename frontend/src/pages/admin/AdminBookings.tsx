import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBookings, updateBookingStatus, deleteBooking } from '../../api'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'

const STATUSES = ['all', 'pending', 'confirmed', 'completed', 'cancelled']

export default function AdminBookings() {
  const [filter, setFilter] = useState('all')
  const qc = useQueryClient()

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings(filter === 'all' ? undefined : filter),
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updateBookingStatus(id, status),
    onSuccess: () => { toast.success('Status updated'); qc.invalidateQueries({ queryKey: ['bookings'] }) },
    onError: () => toast.error('Failed to update status'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => { toast.success('Booking deleted'); qc.invalidateQueries({ queryKey: ['bookings'] }) },
    onError: () => toast.error('Failed to delete'),
  })

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Bookings</h1>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              filter === s ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
            }`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3">#</th>
                  <th className="text-left px-5 py-3">Customer</th>
                  <th className="text-left px-5 py-3 hidden md:table-cell">Address</th>
                  <th className="text-left px-5 py-3 hidden lg:table-cell">Scrap</th>
                  <th className="text-left px-5 py-3 hidden lg:table-cell">Date/Slot</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-left px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-gray-400 text-xs">#{b.id}</td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-900">{b.customer_name}</div>
                      <div className="text-xs text-gray-500">{b.mobile}</div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-gray-600 text-xs max-w-[150px] truncate">{b.address}</td>
                    <td className="px-5 py-4 hidden lg:table-cell text-gray-600 text-xs max-w-[150px]">
                      {b.scrap_types?.join(', ')}
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-gray-500 text-xs">
                      <div>{b.preferred_date || '—'}</div>
                      <div className="text-gray-400">{b.time_slot || ''}</div>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={b.status}
                        onChange={e => statusMutation.mutate({ id: b.id, status: e.target.value })}
                        className={`text-xs font-semibold rounded-full px-3 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          b.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          b.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => {
                          if (confirm('Delete this booking?')) deleteMutation.mutate(b.id)
                        }}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-400">No bookings found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
