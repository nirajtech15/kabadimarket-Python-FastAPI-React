// ── Scrap Rate ────────────────────────────────────────────────────────────────
export interface ScrapRate {
  id: number
  name: string
  category: 'paper' | 'plastic' | 'metal' | 'ewaste' | 'glass' | 'rubber' | 'other'
  price: number
  unit: 'kg' | 'pcs'
  emoji: string
  is_active: boolean
  updated_at: string
}

// ── Booking ───────────────────────────────────────────────────────────────────
export interface BookingFormData {
  customer_name: string
  mobile: string
  address: string
  scrap_types: string[]
  preferred_date?: string
  time_slot?: string
  notes?: string
}

export interface Booking extends BookingFormData {
  id: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
}

// ── Contact ───────────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string
  mobile?: string
  email?: string
  message: string
}

export interface ContactMessage extends ContactFormData {
  id: number
  is_read: boolean
  created_at: string
}

// ── Review ────────────────────────────────────────────────────────────────────
export interface Review {
  id: number
  customer_name: string
  location?: string
  rating: number
  comment: string
  initials?: string
  is_published: boolean
  created_at: string
}

// ── Dashboard Stats ───────────────────────────────────────────────────────────
export interface DashboardStats {
  total_bookings: number
  pending_bookings: number
  confirmed_bookings: number
  completed_bookings: number
  total_messages: number
  unread_messages: number
}

// ── Admin ─────────────────────────────────────────────────────────────────────
export interface AdminLogin {
  username: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}
