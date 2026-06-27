import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    emoji: '📰',
    title: 'Paper Scrap Pickup',
    desc: 'We collect all types of paper waste including newspapers, books, magazines, cardboard boxes, office paper, and packaging material.',
    items: ['Newspapers & Magazines', 'Books & Notebooks', 'Cardboard & Corrugated Boxes', 'Office Paper & Files', 'Packaging Material'],
    rate: 'Starts from ₹8/kg',
    color: 'from-blue-50 to-blue-100',
    accent: 'bg-blue-600',
  },
  {
    emoji: '🪣',
    title: 'Plastic Scrap Pickup',
    desc: 'All kinds of plastic scrap including bottles, containers, household items, PVC pipes, and more are collected at competitive prices.',
    items: ['PET Bottles', 'Hard Plastic', 'Plastic Bags & Films', 'PVC Pipes', 'Plastic Furniture'],
    rate: 'Starts from ₹5/kg',
    color: 'from-orange-50 to-orange-100',
    accent: 'bg-orange-600',
  },
  {
    emoji: '💻',
    title: 'E-Waste Collection',
    desc: 'Responsible disposal and recycling of electronic waste. We ensure eco-friendly processing of all your old electronics.',
    items: ['Mobile Phones & Tablets', 'Laptops & Computers', 'TVs & Monitors', 'AC & Refrigerators', 'Washing Machines'],
    rate: 'Mobiles from ₹150/pcs',
    color: 'from-purple-50 to-purple-100',
    accent: 'bg-purple-600',
  },
  {
    emoji: '🪑',
    title: 'Old Furniture Pickup',
    desc: 'We take away your old, broken, or unwanted furniture. Wooden, metal, plastic — all types of furniture accepted.',
    items: ['Wooden Chairs & Tables', 'Steel Almirahs & Racks', 'Old Sofas & Mattresses', 'Broken Furniture', 'Office Furniture'],
    rate: 'Wooden from ₹3/kg',
    color: 'from-yellow-50 to-yellow-100',
    accent: 'bg-yellow-600',
  },
  {
    emoji: '⚙️',
    title: 'Metal Scrap Pickup',
    desc: 'Iron, steel, copper, brass, aluminium — all types of metals purchased at market-best rates with same-day pickup.',
    items: ['Iron & Steel', 'Copper Wire & Pipes', 'Aluminium Cans & Sheets', 'Brass Items', 'Steel Utensils'],
    rate: 'Iron from ₹28/kg',
    color: 'from-gray-50 to-gray-100',
    accent: 'bg-gray-600',
  },
  {
    emoji: '🚗',
    title: 'Vehicle Scrap',
    desc: 'Sell your old, damaged, or non-running vehicles for scrap. We handle all paperwork and give the best market value.',
    items: ['Old Motorcycles & Scooters', 'Damaged Cars', 'Auto Rickshaws', 'Cycle Scrap', 'Vehicle Parts'],
    rate: 'Price on inspection',
    color: 'from-red-50 to-red-100',
    accent: 'bg-red-600',
  },
]

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Services</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            From paper to vehicles — we pick up everything. Free of charge, at your doorstep.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map(s => (
            <div key={s.title} className={`rounded-2xl bg-gradient-to-br ${s.color} p-6 border border-white shadow-sm hover:shadow-lg transition-shadow`}>
              <div className="text-4xl mb-4">{s.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{s.desc}</p>
              <ul className="space-y-1.5 mb-5">
                {s.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-green-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className={`${s.accent} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
                  {s.rate}
                </span>
                <Link to="/booking" className="text-green-700 text-sm font-semibold hover:underline flex items-center gap-1">
                  Book Now <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-700 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Book Your Free Pickup?</h2>
          <p className="text-green-100 mb-8">Schedule in 2 minutes. We arrive within 24 hours.</p>
          <Link to="/booking" className="bg-yellow-400 text-gray-900 font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all text-lg">
            📅 Book Free Pickup
          </Link>
        </div>
      </section>
    </div>
  )
}
