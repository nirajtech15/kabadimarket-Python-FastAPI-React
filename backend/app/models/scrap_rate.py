from sqlalchemy import Column, Integer, String, Numeric, Boolean, TIMESTAMP, func
from app.database import Base


class ScrapRate(Base):
    __tablename__ = "scrap_rates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)  # paper/plastic/metal/ewaste/glass/rubber/other
    price = Column(Numeric(10, 2), nullable=False)
    unit = Column(String(20), nullable=False)  # kg / pcs
    emoji = Column(String(10), default="♻️")
    is_active = Column(Boolean, default=True)
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
