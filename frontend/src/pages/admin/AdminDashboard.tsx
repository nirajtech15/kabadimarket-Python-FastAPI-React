import { useQuery } from '@tanstack/react-query'
import { getDashboardStats, getBookings } from '../../api'
import { CalendarCheck, MessageSquare, CheckCircle, Clock, TrendingUp, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { data: stats } = useQuery({ queryKey: ['dashboard'], queryFn: getDashboardStats })
  const { data: recentBookings = [] } = useQuery({ queryKey: ['bookings'], queryFn: () => getBookings() })

  const STAT_CARDS = [
    { label: 'Total Bookings', value: stats?.total_bookings ?? 0, icon: <CalendarCheck size={22} />, color: 'bg-blue-500', change: 'All time' },
    { label: 'Pending Bookings', value: stats?.pending_bookings ?? 0, icon: <Clock size={22} />, color: 'bg-yellow-500', change: 'Needs action' },
    { label: 'Completed', value: stats?.completed_bookings ?? 0, icon: <CheckCircle size={22} />, color: 'bg-green-500', change: 'Fulfilled' },
    { label: 'Unread Messages', value: stats?.unread_messages ?? 0, icon: <MessageSquare size={22} />, color: 'bg-red-500', change: 'New inquiries' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(card => (
          <div key={card.label} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <div className={`w-10 h-10 ${card.color} text-white rounded-xl flex items-center justify-center mb-3`}>
              {card.icon}
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-600 font-medium">{card.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{card.change}</div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Bookings</h2>
          <Link to="/admin/bookings" className="text-green-600 text-sm hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="text-left px-5 py-3">Customer</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Scrap Types</th>
                <th className="text-left px-5 py-3 hidden lg:table-cell">Date</th>
                <th className="text-left px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.slice(0, 8).map(b => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-gray-900">{b.customer_name}</div>
                    <div className="text-xs text-gray-500">{b.mobile}</div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-gray-600 text-xs max-w-[180px] truncate">
                    {b.scrap_types?.join(', ')}
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell text-gray-500 text-xs">
                    {b.preferred_date || '—'}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`status-${b.status}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400">No bookings yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
