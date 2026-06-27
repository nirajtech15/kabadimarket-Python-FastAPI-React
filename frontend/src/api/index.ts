import axios from 'axios'
import type {
  ScrapRate, Booking, BookingFormData,
  ContactFormData, ContactMessage, Review,
  DashboardStats, AdminLogin, TokenResponse,
} from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
})

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('km_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Rates ─────────────────────────────────────────────────────────────────────
export const getRates = (category?: string): Promise<ScrapRate[]> =>
  api.get('/api/rates', { params: category && category !== 'all' ? { category } : {} }).then(r => r.data)

export const getAllRates = (): Promise<ScrapRate[]> =>
  api.get('/api/rates/all').then(r => r.data)

export const updateRate = (id: number, price: number): Promise<ScrapRate> =>
  api.put(`/api/rates/${id}`, { price }).then(r => r.data)

export const createRate = (data: Partial<ScrapRate>): Promise<ScrapRate> =>
  api.post('/api/rates', data).then(r => r.data)

export const deleteRate = (id: number): Promise<void> =>
  api.delete(`/api/rates/${id}`).then(r => r.data)

// ── Bookings ──────────────────────────────────────────────────────────────────
export const createBooking = (data: BookingFormData): Promise<Booking> =>
  api.post('/api/bookings', data).then(r => r.data)

export const getBookings = (status?: string): Promise<Booking[]> =>
  api.get('/api/bookings', { params: status ? { status } : {} }).then(r => r.data)

export const updateBookingStatus = (id: number, status: string): Promise<Booking> =>
  api.patch(`/api/bookings/${id}/status`, { status }).then(r => r.data)

export const deleteBooking = (id: number): Promise<void> =>
  api.delete(`/api/bookings/${id}`).then(r => r.data)

// ── Contact ───────────────────────────────────────────────────────────────────
export const submitContact = (data: ContactFormData): Promise<ContactMessage> =>
  api.post('/api/contact', data).then(r => r.data)

export const getMessages = (): Promise<ContactMessage[]> =>
  api.get('/api/contact').then(r => r.data)

export const markMessageRead = (id: number): Promise<void> =>
  api.patch(`/api/contact/${id}/read`).then(r => r.data)

export const deleteMessage = (id: number): Promise<void> =>
  api.delete(`/api/contact/${id}`).then(r => r.data)

// ── Reviews ───────────────────────────────────────────────────────────────────
export const getReviews = (): Promise<Review[]> =>
  api.get('/api/reviews').then(r => r.data)

export const getAllReviews = (): Promise<Review[]> =>
  api.get('/api/reviews/all').then(r => r.data)

export const togglePublishReview = (id: number): Promise<void> =>
  api.patch(`/api/reviews/${id}/publish`).then(r => r.data)

export const deleteReview = (id: number): Promise<void> =>
  api.delete(`/api/reviews/${id}`).then(r => r.data)

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminLogin = (data: AdminLogin): Promise<TokenResponse> =>
  api.post('/api/admin/login', data).then(r => r.data)

export const getDashboardStats = (): Promise<DashboardStats> =>
  api.get('/api/admin/dashboard').then(r => r.data)

export const verifyAdmin = (): Promise<{ username: string }> =>
  api.get('/api/admin/me').then(r => r.data)
