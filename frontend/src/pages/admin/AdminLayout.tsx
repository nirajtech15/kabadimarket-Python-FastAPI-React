import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Recycle, LayoutDashboard, CalendarCheck, BarChart3, MessageSquare, Star, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
  { to: '/admin/bookings', label: 'Bookings', icon: <CalendarCheck size={18} /> },
  { to: '/admin/rates', label: 'Scrap Rates', icon: <BarChart3 size={18} /> },
  { to: '/admin/messages', label: 'Messages', icon: <MessageSquare size={18} /> },
  { to: '/admin/reviews', label: 'Reviews', icon: <Star size={18} /> },
]

export default function AdminLayout() {
  const { logout, username } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const Sidebar = () => (
    <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col min-h-screen">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
            <Recycle className="text-white" size={18} />
          </div>
          <div>
            <div className="text-white font-bold text-sm">KabadiMarket</div>
            <div className="text-xs text-gray-500">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase">
            {username?.[0] || 'A'}
          </div>
          <div className="text-sm text-gray-400">{username || 'Admin'}</div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 transition-colors w-full px-2 py-1.5 rounded-lg hover:bg-gray-800">
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64"><Sidebar /></div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar mobile */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-900">KabadiMarket Admin</span>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
