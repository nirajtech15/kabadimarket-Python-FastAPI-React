import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Recycle, Phone } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/rates', label: 'Rate List' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-green-700 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>📍 Serving Delhi, Mumbai, Bangalore, Pune & more cities</span>
          <a href="tel:+911800000000" className="flex items-center gap-1 hover:text-green-200">
            <Phone size={12} /> 1800-000-0000 (Free)
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
            <Recycle className="text-white" size={20} />
          </div>
          <div>
            <span className="text-xl font-extrabold text-green-700">Kabadi</span>
            <span className="text-xl font-extrabold text-gray-800">Market</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-green-700 bg-green-50' : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/booking" className="btn-primary text-sm py-2 px-5">
            📅 Book Pickup
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-3 text-sm font-medium border-b border-gray-50 ${
                  isActive ? 'text-green-700' : 'text-gray-700'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary block text-center mt-4 text-sm">
            📅 Book Free Pickup
          </Link>
        </div>
      )}
    </header>
  )
}
