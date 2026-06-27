import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { submitContact } from '../api'
import type { ContactFormData } from '../types'
import { Phone, Mail, MapPin, Clock, Loader2 } from 'lucide-react'

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>()

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      toast.success('Message sent! We will get back to you soon.')
      reset()
    },
    onError: () => toast.error('Failed to send message. Please try again.'),
  })

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-green-100 text-lg">We're here to help. Get in touch with our friendly team.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-3 gap-10">
        {/* Contact form */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Send a Message</h2>
            <p className="text-gray-500 text-sm mb-6">We typically respond within 24 hours on business days.</p>

            <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name *</label>
                  <input {...register('name', { required: 'Name is required' })} className="input" placeholder="Full name" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                  <input {...register('mobile')} className="input" placeholder="10-digit number" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input {...register('email')} type="email" className="input" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  className="input resize-none"
                  rows={5}
                  placeholder="How can we help you?"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={mutation.isPending} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                {mutation.isPending ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : '✉️ Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-5">
          {[
            { icon: <Phone size={20} />, title: 'Phone / WhatsApp', lines: ['1800-000-0000 (Toll Free)', '+91-98765-43210'] },
            { icon: <Mail size={20} />, title: 'Email', lines: ['support@kabadimarket.com', 'info@kabadimarket.com'] },
            { icon: <MapPin size={20} />, title: 'Head Office', lines: ['KabadiMarket HQ', 'Connaught Place, New Delhi', 'India – 110001'] },
            { icon: <Clock size={20} />, title: 'Business Hours', lines: ['Mon – Sat: 8:00 AM – 7:00 PM', 'Sunday: 9:00 AM – 5:00 PM'] },
          ].map(item => (
            <div key={item.title} className="card flex gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                {item.lines.map(line => <p key={line} className="text-gray-600 text-sm">{line}</p>)}
              </div>
            </div>
          ))}

          <div className="card bg-green-700 text-white">
            <h4 className="font-bold mb-2">For instant help</h4>
            <p className="text-green-100 text-sm mb-3">WhatsApp us and get a response in minutes.</p>
            <a
              href="https://wa.me/919876543210?text=Hi+KabadiMarket+I+need+help"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-green-700 font-semibold text-sm py-2.5 px-4 rounded-xl hover:bg-green-50 transition-all block text-center"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
