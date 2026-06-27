"""
Seed script — run once to populate the database with initial scrap rates and reviews.
Usage: python seed.py
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal, engine
from app import models
from app.models.scrap_rate import ScrapRate
from app.models.contact import Review

models.Booking  # ensure models are imported so tables are created

from app.database import Base
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# ── Scrap Rates ───────────────────────────────────────────────────────────────
rates_data = [
    # Paper
    {"name": "Newspaper", "category": "paper", "price": 14.00, "unit": "kg", "emoji": "📰"},
    {"name": "Cardboard / Boxes", "category": "paper", "price": 8.00, "unit": "kg", "emoji": "📦"},
    {"name": "Books / Copies", "category": "paper", "price": 10.00, "unit": "kg", "emoji": "📚"},
    {"name": "Office Paper", "category": "paper", "price": 12.00, "unit": "kg", "emoji": "📄"},
    # Plastic
    {"name": "Hard Plastic", "category": "plastic", "price": 8.00, "unit": "kg", "emoji": "🪣"},
    {"name": "PET Bottles", "category": "plastic", "price": 10.00, "unit": "kg", "emoji": "🍶"},
    {"name": "Plastic Bags", "category": "plastic", "price": 5.00, "unit": "kg", "emoji": "🛍️"},
    # Metal
    {"name": "Iron / Steel", "category": "metal", "price": 28.00, "unit": "kg", "emoji": "⚙️"},
    {"name": "Copper", "category": "metal", "price": 420.00, "unit": "kg", "emoji": "🔧"},
    {"name": "Aluminium", "category": "metal", "price": 90.00, "unit": "kg", "emoji": "🥫"},
    {"name": "Brass", "category": "metal", "price": 270.00, "unit": "kg", "emoji": "🔩"},
    {"name": "Steel Utensils", "category": "metal", "price": 30.00, "unit": "kg", "emoji": "🍳"},
    # E-Waste
    {"name": "Mobile Phone", "category": "ewaste", "price": 150.00, "unit": "pcs", "emoji": "📱"},
    {"name": "Laptop", "category": "ewaste", "price": 500.00, "unit": "pcs", "emoji": "💻"},
    {"name": "CPU / Desktop", "category": "ewaste", "price": 300.00, "unit": "pcs", "emoji": "🖥️"},
    {"name": "TV / Monitor", "category": "ewaste", "price": 200.00, "unit": "pcs", "emoji": "📺"},
    {"name": "AC / Fridge (scrap)", "category": "ewaste", "price": 800.00, "unit": "pcs", "emoji": "❄️"},
    {"name": "Washing Machine", "category": "ewaste", "price": 600.00, "unit": "pcs", "emoji": "🫧"},
    # Glass
    {"name": "Glass Bottles", "category": "glass", "price": 2.00, "unit": "kg", "emoji": "🍾"},
    {"name": "Broken Glass", "category": "glass", "price": 1.00, "unit": "kg", "emoji": "🪟"},
    # Rubber
    {"name": "Rubber / Tyres", "category": "rubber", "price": 6.00, "unit": "kg", "emoji": "🛞"},
    # Other
    {"name": "Wooden Furniture", "category": "other", "price": 3.00, "unit": "kg", "emoji": "🪑"},
    {"name": "Batteries (Lead)", "category": "other", "price": 80.00, "unit": "kg", "emoji": "🔋"},
]

existing = db.query(ScrapRate).count()
if existing == 0:
    for r in rates_data:
        db.add(ScrapRate(**r))
    print(f"✅ Inserted {len(rates_data)} scrap rates")
else:
    print(f"⚠️  Scrap rates already exist ({existing} records) — skipping")

# ── Reviews ───────────────────────────────────────────────────────────────────
reviews_data = [
    {"customer_name": "Ramesh Sharma", "location": "Lajpat Nagar, Delhi", "rating": 5, "comment": "Excellent service! They came on time and gave the best price for my newspaper and cardboard. Very professional team.", "initials": "RS", "is_published": True},
    {"customer_name": "Priya Patel", "location": "Koramangala, Bangalore", "rating": 5, "comment": "Very happy with Kabadi Market. They took away my old AC and washing machine. Quick pickup and instant payment. Highly recommended!", "initials": "PP", "is_published": True},
    {"customer_name": "Amit Kumar", "location": "Andheri West, Mumbai", "rating": 5, "comment": "Best rates in the city! I sold my old laptop and mobile phones. Got ₹650 instantly. Will definitely use again.", "initials": "AK", "is_published": True},
    {"customer_name": "Sunita Verma", "location": "Sector 14, Gurgaon", "rating": 4, "comment": "Good experience overall. The team was polite and efficient. Received payment immediately after weighing the scrap.", "initials": "SV", "is_published": True},
    {"customer_name": "Rohit Jain", "location": "Aundh, Pune", "rating": 5, "comment": "Cleared out years of accumulated scrap from my house. The kabadiwala team handled everything. Super easy process!", "initials": "RJ", "is_published": True},
    {"customer_name": "Meena Iyer", "location": "T. Nagar, Chennai", "rating": 5, "comment": "Very trustworthy service. They weighed everything in front of me and paid the exact amount. No tricks, no haggling.", "initials": "MI", "is_published": True},
]

existing_reviews = db.query(Review).count()
if existing_reviews == 0:
    for r in reviews_data:
        db.add(Review(**r))
    print(f"✅ Inserted {len(reviews_data)} reviews")
else:
    print(f"⚠️  Reviews already exist ({existing_reviews} records) — skipping")

db.commit()
db.close()
print("🎉 Seed complete!")
