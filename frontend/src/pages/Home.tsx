import { Link } from 'react-router-dom'
import { CheckCircle, Star, ArrowRight, Truck, Scale, IndianRupee, Phone } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import PriceTicker from '../components/PriceTicker'
import ScrapCalculator from '../components/ScrapCalculator'
import { getReviews } from '../api'

const STATS = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '25+', label: 'Cities Covered' },
  { value: '₹2Cr+', label: 'Paid to Customers' },
  { value: '4.8★', label: 'Average Rating' },
]

const PROCESS_STEPS = [
  { step: '1', icon: '📱', title: 'Book Online', desc: 'Fill the form or call us. Takes just 2 minutes.' },
  { step: '2', icon: '📞', title: 'Get Confirmation', desc: 'Our team calls within 2 hours to confirm your pickup.' },
  { step: '3', icon: '🚛', title: 'Free Pickup', desc: 'Our verified kabadiwala arrives at your doorstep.' },
  { step: '4', icon: '💰', title: 'Instant Payment', desc: 'Get cash instantly after weighing your scrap.' },
]

const SCRAP_TYPES = [
  { emoji: '📰', label: 'Paper', desc: 'Newspaper, books, cardboard', to: '/rates' },
  { emoji: '🪣', label: 'Plastics', desc: 'Bottles, containers, bags', to: '/rates' },
  { emoji: '⚙️', label: 'Metal', desc: 'Iron, copper, aluminium', to: '/rates' },
  { emoji: '💻', label: 'E-Waste', desc: 'Mobiles, laptops, ACs', to: '/rates' },
  { emoji: '🪑', label: 'Furniture', desc: 'Old chairs, tables, sofas', to: '/services' },
  { emoji: '🚗', label: 'Vehicle', desc: 'Old bikes, cars for scrap', to: '/services' },
]

const FAQS = [
  { q: 'Is the pickup service really free?', a: 'Yes, 100% free! We never charge for pickup, weighing, or any other service.' },
  { q: 'How quickly will you come for pickup?', a: 'We typically schedule pickup within 24–48 hours. Same-day available in select areas.' },
  { q: 'How is payment made?', a: 'Cash on the spot immediately after weighing. No waiting, no online transfers.' },
  { q: 'What is the minimum scrap quantity?', a: 'We accept all quantities — even a single kg of newspaper is fine!' },
  { q: 'Are your kabadiwala verified?', a: 'Yes, all our team members are background-verified and wear KabadiMarket uniforms.' },
  { q: 'Which cities do you serve?', a: 'We currently serve Delhi, Mumbai, Bangalore, Pune, Hyderabad, Chennai, Kolkata and 20+ more cities.' },
]

export default function Home() {
  const { data: reviews = [] } = useQuery({ queryKey: ['reviews'], queryFn: getReviews })

  return (
    <div>
      <PriceTicker />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Trusted by 50,000+ households
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Sell Your Scrap<br />
              <span className="text-yellow-300">at Best Price!</span>
            </h1>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              Free home pickup • Instant cash payment • Best rates guaranteed.<br />
              India's most trusted kabadi service — now at your fingertips.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/booking" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl text-lg">
                📅 Book Free Pickup
              </Link>
              <Link to="/rates" className="bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/30 transition-all text-lg">
                📊 Check Rates
              </Link>
            </div>
            <div className="flex gap-6 mt-8">
              {['Free Pickup', 'Instant Cash', 'Best Rates'].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm text-green-100">
                  <CheckCircle size={16} className="text-yellow-400" /> {t}
                </div>
              ))}
            </div>
          </div>
          <div>
            <ScrapCalculator />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-green-400">{s.value}</div>
              <div className="text-gray-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Scrap types */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">What We Accept</p>
          <h2 className="section-title">We Buy All Types of Scrap</h2>
          <p className="section-subtitle">From a single newspaper to a full house clearance</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SCRAP_TYPES.map(s => (
            <Link key={s.label} to={s.to}
              className="card text-center hover:border-green-400 hover:-translate-y-1 transition-all duration-200 group p-5">
              <div className="text-4xl mb-3">{s.emoji}</div>
              <div className="font-bold text-gray-900 group-hover:text-green-700">{s.label}</div>
              <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">Simple Process</p>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">4 easy steps to sell your scrap</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-green-200 z-0" />
            {PROCESS_STEPS.map((s, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl mx-auto mb-4 border-4 border-green-100">
                  {s.icon}
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/booking" className="btn-primary inline-flex items-center gap-2">
              Get Started Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">Why Choose Us</p>
            <h2 className="section-title">India's Most Trusted Scrap Platform</h2>
            <div className="space-y-5 mt-8">
              {[
                { icon: <Truck size={20} />, title: 'Free Home Pickup', desc: 'No pickup charges. Ever. Our team comes to your door.' },
                { icon: <Scale size={20} />, title: 'Transparent Weighing', desc: 'Digital scale weighing done right in front of you.' },
                { icon: <IndianRupee size={20} />, title: 'Instant Cash Payment', desc: 'Get paid on the spot. No waiting, no online transfers needed.' },
                { icon: <CheckCircle size={20} />, title: 'Verified Team', desc: 'Background-verified kabadiwala in official uniforms.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-700 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Ready to Sell Your Scrap?</h3>
            <p className="text-green-100 mb-6">Book your free pickup in under 2 minutes. Our team will be at your door within 24 hours.</p>
            <Link to="/booking" className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-all block text-center mb-4">
              📅 Book Free Pickup Now
            </Link>
            <a href="tel:+911800000000" className="flex items-center justify-center gap-2 border border-green-400 text-white py-3 rounded-xl hover:bg-green-600 transition-all">
              <Phone size={16} /> Call 1800-000-0000
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">Testimonials</p>
              <h2 className="section-title">What Our Customers Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map(r => (
                <div key={r.id} className="card">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">"{r.comment}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {r.initials || r.customer_name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{r.customer_name}</div>
                      {r.location && <div className="text-xs text-gray-500">{r.location}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="card cursor-pointer group">
              <summary className="font-semibold text-gray-900 flex justify-between items-center list-none">
                {faq.q}
                <span className="text-green-600 ml-4 shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Turn Your Scrap into Cash Today!</h2>
          <p className="text-green-100 text-lg mb-8">Free pickup • Best price • Instant payment</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="bg-yellow-400 text-gray-900 font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all text-lg shadow-lg">
              📅 Book Free Pickup
            </Link>
            <Link to="/rates" className="border-2 border-white text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/10 transition-all text-lg">
              📊 Check Rates
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
