import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createBooking } from '../api'
import type { BookingFormData } from '../types'
import { CalendarCheck, Loader2 } from 'lucide-react'

const SCRAP_TYPES = [
  { value: 'Paper Scrap', emoji: '📰' },
  { value: 'Plastics', emoji: '🪣' },
  { value: 'E-Waste', emoji: '💻' },
  { value: 'Furniture', emoji: '🪑' },
  { value: 'Metal Scrap', emoji: '⚙️' },
  { value: 'Vehicle Scrap', emoji: '🚗' },
  { value: 'Cardboard', emoji: '📦' },
  { value: 'Batteries', emoji: '🔋' },
  { value: 'Glass', emoji: '🍾' },
  { value: 'Rubber / Tyres', emoji: '🛞' },
]

const TIME_SLOTS = [
  '8:00 AM – 10:00 AM',
  '10:00 AM – 12:00 PM',
  '12:00 PM – 2:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
]

export default function BookingForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormData>()

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success('🎉 Booking confirmed! We will call you within 2 hours.')
      reset()
    },
    onError: () => toast.error('Something went wrong. Please try again.'),
  })

  const onSubmit = (data: BookingFormData) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
          <input
            {...register('customer_name', { required: 'Name is required' })}
            className="input"
            placeholder="Your full name"
          />
          {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number *</label>
          <input
            {...register('mobile', {
              required: 'Mobile is required',
              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile' },
            })}
            className="input"
            placeholder="10-digit mobile number"
            maxLength={10}
          />
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Pickup Address *</label>
        <textarea
          {...register('address', { required: 'Address is required' })}
          className="input resize-none"
          rows={3}
          placeholder="Full pickup address with landmark"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Scrap Types *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SCRAP_TYPES.map(type => (
            <label
              key={type.value}
              className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-green-400 hover:bg-green-50 cursor-pointer transition-all text-sm"
            >
              <input
                type="checkbox"
                value={type.value}
                {...register('scrap_types', { required: 'Select at least one scrap type' })}
                className="accent-green-600 w-4 h-4"
              />
              <span>{type.emoji} {type.value}</span>
            </label>
          ))}
        </div>
        {errors.scrap_types && <p className="text-red-500 text-xs mt-1">{errors.scrap_types.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Date</label>
          <input
            type="date"
            {...register('preferred_date')}
            className="input"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Time Slot</label>
          <select {...register('time_slot')} className="input">
            <option value="">-- Any time --</option>
            {TIME_SLOTS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Notes</label>
        <textarea
          {...register('notes')}
          className="input resize-none"
          rows={2}
          placeholder="Anything else you'd like us to know..."
        />
      </div>

      <button type="submit" disabled={mutation.isPending} className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base">
        {mutation.isPending ? (
          <><Loader2 size={18} className="animate-spin" /> Booking...</>
        ) : (
          <><CalendarCheck size={18} /> Book Free Pickup</>
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        🔒 Your data is safe. We will call within 2 hours to confirm.
      </p>
    </form>
  )
}
