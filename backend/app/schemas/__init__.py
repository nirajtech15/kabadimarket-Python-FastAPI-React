from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date, datetime
from decimal import Decimal


# ── Booking ──────────────────────────────────────────────────────────────────
class BookingCreate(BaseModel):
    customer_name: str
    mobile: str
    address: str
    scrap_types: List[str]
    preferred_date: Optional[date] = None
    time_slot: Optional[str] = None
    notes: Optional[str] = None


class BookingResponse(BookingCreate):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class BookingStatusUpdate(BaseModel):
    status: str  # pending/confirmed/completed/cancelled


# ── Scrap Rate ────────────────────────────────────────────────────────────────
class ScrapRateCreate(BaseModel):
    name: str
    category: str
    price: Decimal
    unit: str
    emoji: Optional[str] = "♻️"


class ScrapRateResponse(ScrapRateCreate):
    id: int
    is_active: bool
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class ScrapRateUpdate(BaseModel):
    price: Decimal
    is_active: Optional[bool] = None


# ── Contact ───────────────────────────────────────────────────────────────────
class ContactCreate(BaseModel):
    name: str
    mobile: Optional[str] = None
    email: Optional[str] = None
    message: str


class ContactResponse(ContactCreate):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ── Review ────────────────────────────────────────────────────────────────────
class ReviewCreate(BaseModel):
    customer_name: str
    location: Optional[str] = None
    rating: int = 5
    comment: str
    initials: Optional[str] = None


class ReviewResponse(ReviewCreate):
    id: int
    is_published: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ── Admin Auth ────────────────────────────────────────────────────────────────
class AdminLogin(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ── Dashboard Stats ───────────────────────────────────────────────────────────
class DashboardStats(BaseModel):
    total_bookings: int
    pending_bookings: int
    confirmed_bookings: int
    completed_bookings: int
    total_messages: int
    unread_messages: int
