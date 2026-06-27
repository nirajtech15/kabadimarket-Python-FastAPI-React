from sqlalchemy import Column, Integer, String, Text, Boolean, TIMESTAMP, func
from app.database import Base


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    mobile = Column(String(15), nullable=True)
    email = Column(String(100), nullable=True)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, server_default=func.now())


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100), nullable=False)
    location = Column(String(100), nullable=True)
    rating = Column(Integer, default=5)
    comment = Column(Text, nullable=False)
    initials = Column(String(5), nullable=True)
    is_published = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
