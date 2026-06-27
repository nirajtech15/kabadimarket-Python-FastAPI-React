from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.contact import ContactMessage, Review
from app.schemas import ContactCreate, ContactResponse, ReviewCreate, ReviewResponse
from app.core.security import verify_token

router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.post("/", response_model=ContactResponse)
def submit_contact(data: ContactCreate, db: Session = Depends(get_db)):
    msg = ContactMessage(**data.model_dump())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


@router.get("/", response_model=List[ContactResponse])
def list_messages(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()


@router.patch("/{msg_id}/read")
def mark_read(msg_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    msg = db.query(ContactMessage).filter(ContactMessage.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_read = True
    db.commit()
    return {"success": True}


@router.delete("/{msg_id}")
def delete_message(msg_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    msg = db.query(ContactMessage).filter(ContactMessage.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(msg)
    db.commit()
    return {"success": True}


# ── Reviews ───────────────────────────────────────────────────────────────────
reviews_router = APIRouter(prefix="/api/reviews", tags=["Reviews"])


@reviews_router.get("/", response_model=List[ReviewResponse])
def get_published_reviews(db: Session = Depends(get_db)):
    return db.query(Review).filter(Review.is_published == True).order_by(Review.created_at.desc()).all()


@reviews_router.post("/", response_model=ReviewResponse)
def submit_review(data: ReviewCreate, db: Session = Depends(get_db)):
    review = Review(**data.model_dump())
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


@reviews_router.get("/all", response_model=List[ReviewResponse])
def get_all_reviews(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(Review).order_by(Review.created_at.desc()).all()


@reviews_router.patch("/{review_id}/publish")
def toggle_publish(review_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.is_published = not review.is_published
    db.commit()
    return {"success": True, "is_published": review.is_published}


@reviews_router.delete("/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    db.delete(review)
    db.commit()
    return {"success": True}
