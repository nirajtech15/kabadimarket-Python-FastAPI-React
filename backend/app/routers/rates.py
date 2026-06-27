from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.scrap_rate import ScrapRate
from app.schemas import ScrapRateCreate, ScrapRateResponse, ScrapRateUpdate
from app.core.security import verify_token

router = APIRouter(prefix="/api/rates", tags=["Rates"])


@router.get("/", response_model=List[ScrapRateResponse])
def get_rates(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(ScrapRate).filter(ScrapRate.is_active == True)
    if category and category != "all":
        query = query.filter(ScrapRate.category == category)
    return query.order_by(ScrapRate.category, ScrapRate.name).all()


@router.get("/all", response_model=List[ScrapRateResponse])
def get_all_rates(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(ScrapRate).order_by(ScrapRate.category, ScrapRate.name).all()


@router.post("/", response_model=ScrapRateResponse)
def create_rate(data: ScrapRateCreate, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    rate = ScrapRate(**data.model_dump())
    db.add(rate)
    db.commit()
    db.refresh(rate)
    return rate


@router.put("/{rate_id}", response_model=ScrapRateResponse)
def update_rate(
    rate_id: int,
    update: ScrapRateUpdate,
    db: Session = Depends(get_db),
    _: str = Depends(verify_token),
):
    rate = db.query(ScrapRate).filter(ScrapRate.id == rate_id).first()
    if not rate:
        raise HTTPException(status_code=404, detail="Rate not found")
    rate.price = update.price
    if update.is_active is not None:
        rate.is_active = update.is_active
    db.commit()
    db.refresh(rate)
    return rate


@router.delete("/{rate_id}")
def delete_rate(rate_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    rate = db.query(ScrapRate).filter(ScrapRate.id == rate_id).first()
    if not rate:
        raise HTTPException(status_code=404, detail="Rate not found")
    db.delete(rate)
    db.commit()
    return {"success": True}
