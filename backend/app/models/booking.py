from sqlalchemy import Column, Integer, String, Text, Date, ARRAY, TIMESTAMP, func
from app.database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100), nullable=False)
    mobile = Column(String(15), nullable=False)
    address = Column(Text, nullable=False)
    scrap_types = Column(ARRAY(String), nullable=False)
    preferred_date = Column(Date, nullable=True)
    time_slot = Column(String(50), nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String(20), default="pending")  # pending/confirmed/completed/cancelled
    created_at = Column(TIMESTAMP, server_default=func.now())
