from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.booking import Booking
from app.models.contact import ContactMessage
from app.schemas import AdminLogin, TokenResponse, DashboardStats
from app.core.security import create_access_token, verify_token
from app.core.config import settings

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.post("/login", response_model=TokenResponse)
def admin_login(data: AdminLogin):
    if data.username != settings.ADMIN_USERNAME or data.password != settings.ADMIN_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    token = create_access_token({"sub": data.username})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
def get_me(current_user: str = Depends(verify_token)):
    return {"username": current_user}


@router.get("/dashboard", response_model=DashboardStats)
def dashboard_stats(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    total = db.query(Booking).count()
    pending = db.query(Booking).filter(Booking.status == "pending").count()
    confirmed = db.query(Booking).filter(Booking.status == "confirmed").count()
    completed = db.query(Booking).filter(Booking.status == "completed").count()
    total_msg = db.query(ContactMessage).count()
    unread_msg = db.query(ContactMessage).filter(ContactMessage.is_read == False).count()
    return DashboardStats(
        total_bookings=total,
        pending_bookings=pending,
        confirmed_bookings=confirmed,
        completed_bookings=completed,
        total_messages=total_msg,
        unread_messages=unread_msg,
    )
