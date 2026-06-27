import BookingForm from '../components/BookingForm'
import { CheckCircle, Phone, Clock, Shield } from 'lucide-react'

const FEATURES = [
  { icon: <CheckCircle size={18} />, text: '100% Free Pickup' },
  { icon: <Clock size={18} />, text: 'Within 24–48 hours' },
  { icon: <Phone size={18} />, text: 'Confirmation call in 2 hrs' },
  { icon: <Shield size={18} />, text: 'Verified kabadiwala' },
]

export default function Booking() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Book Free Pickup</h1>
          <p className="text-green-100 text-lg">Schedule your scrap pickup in just 2 minutes</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <span className="text-yellow-300">{f.icon}</span> {f.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Schedule Your Pickup</h2>
              <p className="text-gray-500 text-sm mb-6">Fill in the form below. Our team will call to confirm within 2 hours.</p>
              <BookingForm />
            </div>
          </div>

          <div className="space-y-5">
            {/* Call CTA */}
            <div className="card border-l-4 border-l-green-500">
              <h3 className="font-bold text-gray-900 mb-1">Prefer to call?</h3>
              <p className="text-sm text-gray-500 mb-3">Our team is available Mon–Sat, 8 AM – 7 PM</p>
              <a href="tel:+911800000000" className="btn-primary flex items-center justify-center gap-2">
                <Phone size={16} /> 1800-000-0000
              </a>
            </div>

            {/* Process steps */}
            <div className="card">
              <h3 className="font-bold text-gray-900 mb-4">What Happens Next?</h3>
              <ol className="space-y-4">
                {[
                  { n: '1', t: 'Submit Form', d: 'Takes less than 2 minutes' },
                  { n: '2', t: 'We Call You', d: 'Within 2 hours to confirm date & time' },
                  { n: '3', t: 'Pickup Visit', d: 'Kabadiwala arrives at your door' },
                  { n: '4', t: 'Get Paid', d: 'Instant cash after digital weighing' },
                ].map(step => (
                  <li key={step.n} className="flex gap-3">
                    <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {step.n}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{step.t}</div>
                      <div className="text-xs text-gray-500">{step.d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Trust badges */}
            <div className="card bg-green-50 border border-green-100">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Why Trust Us?</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                {['50,000+ happy customers', 'Background-verified team', 'Digital weighing machine', 'No hidden charges', 'Eco-friendly recycling'].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
