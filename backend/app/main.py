from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.database import Base
from app.routers import bookings, rates, contact, admin
from app.routers.contact import reviews_router

# Create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="KabadiMarket API",
    description="Backend API for KabadiMarket — India's modern scrap pickup platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://kabadimarket.com",
        "https://www.kabadimarket.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bookings.router)
app.include_router(rates.router)
app.include_router(contact.router)
app.include_router(reviews_router)
app.include_router(admin.router)


@app.get("/")
def root():
    return {"message": "KabadiMarket API is running 🟢", "docs": "/docs"}


@app.get("/health")
def health():
    return {"status": "ok"}
