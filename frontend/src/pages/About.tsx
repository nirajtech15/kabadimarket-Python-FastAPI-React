import { Link } from 'react-router-dom'
import { Recycle, Users, MapPin, TrendingUp } from 'lucide-react'

const TEAM = [
  { name: 'Rajesh Gupta', role: 'Founder & CEO', initials: 'RG' },
  { name: 'Priya Singh', role: 'Head of Operations', initials: 'PS' },
  { name: 'Amit Sharma', role: 'Technology Lead', initials: 'AS' },
  { name: 'Sunita Jain', role: 'Customer Success', initials: 'SJ' },
]

const IMPACT = [
  { icon: <Recycle size={24} />, value: '5,000+ Tons', label: 'Scrap Recycled' },
  { icon: <Users size={24} />, value: '50,000+', label: 'Happy Customers' },
  { icon: <MapPin size={24} />, value: '25+ Cities', label: 'Across India' },
  { icon: <TrendingUp size={24} />, value: '₹2 Crore+', label: 'Paid to Customers' },
]

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About KabadiMarket</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            We're on a mission to make scrap recycling easy, transparent, and rewarding for every Indian household.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">Our Story</p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5">From a Simple Idea to India's Trusted Scrap Platform</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>KabadiMarket was founded in 2018 with a simple observation — millions of Indian households struggle to sell their scrap at fair prices, while the informal kabadi sector operates without transparency or standardization.</p>
            <p>We built a technology platform that connects verified kabadiwala with customers, ensuring fair weighing, transparent pricing, and instant cash payment every single time.</p>
            <p>Today, we've served over 50,000 households across 25+ cities, recycled 5,000+ tons of scrap, and paid out more than ₹2 crore to our customers — all while keeping India cleaner and greener.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {IMPACT.map(item => (
            <div key={item.label} className="card text-center bg-green-50 border border-green-100">
              <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3">
                {item.icon}
              </div>
              <div className="text-2xl font-extrabold text-green-700">{item.value}</div>
              <div className="text-sm text-gray-600 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '🎯', title: 'Our Mission', desc: 'To make scrap recycling accessible, transparent, and rewarding for every Indian — while contributing to a cleaner environment.' },
              { emoji: '👁️', title: 'Our Vision', desc: 'A future where no recyclable material goes to waste, and every household earns fairly for their contribution to sustainability.' },
              { emoji: '💚', title: 'Our Values', desc: 'Transparency, fairness, reliability, and environmental responsibility guide every decision we make.' },
            ].map(v => (
              <div key={v.title} className="card text-center">
                <div className="text-4xl mb-4">{v.emoji}</div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Meet Our Team</h2>
          <p className="text-gray-500">The people behind KabadiMarket</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map(m => (
            <div key={m.name} className="card text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {m.initials}
              </div>
              <div className="font-bold text-gray-900">{m.name}</div>
              <div className="text-sm text-gray-500 mt-1">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-700 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Join 50,000+ Happy Customers</h2>
          <p className="text-green-100 mb-8">Book your first free pickup today and experience the KabadiMarket difference.</p>
          <Link to="/booking" className="bg-yellow-400 text-gray-900 font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all text-lg">
            📅 Book Free Pickup
          </Link>
        </div>
      </section>
    </div>
  )
}
