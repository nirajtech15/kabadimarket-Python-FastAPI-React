import { Link } from 'react-router-dom'
import { Recycle, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
              <Recycle className="text-white" size={20} />
            </div>
            <span className="text-xl font-extrabold text-white">KabadiMarket</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            India's most trusted platform for hassle-free scrap pickup. We connect you with verified kabadiwala at the best prices.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: '/', label: 'Home' },
              { to: '/services', label: 'Our Services' },
              { to: '/rates', label: 'Scrap Rates' },
              { to: '/booking', label: 'Book Pickup' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact' },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-green-400 transition-colors">
                  → {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">We Accept</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {['📰 Paper & Cardboard', '🪣 Plastic Scrap', '⚙️ Metal & Iron', '💻 E-Waste', '🪑 Old Furniture', '🛞 Rubber & Tyres', '🍾 Glass', '🔋 Batteries'].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3 items-start">
              <Phone size={15} className="text-green-400 mt-0.5 shrink-0" />
              <span>1800-000-0000 (Toll Free)<br />Mon–Sat: 8 AM – 7 PM</span>
            </li>
            <li className="flex gap-3 items-start">
              <Mail size={15} className="text-green-400 mt-0.5 shrink-0" />
              <span>support@kabadimarket.com</span>
            </li>
            <li className="flex gap-3 items-start">
              <MapPin size={15} className="text-green-400 mt-0.5 shrink-0" />
              <span>KabadiMarket HQ, New Delhi, India – 110001</span>
            </li>
          </ul>
          <Link to="/booking" className="btn-primary block text-center text-sm mt-6">
            📅 Book Free Pickup
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
          <span>© {new Date().getFullYear()} KabadiMarket. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
