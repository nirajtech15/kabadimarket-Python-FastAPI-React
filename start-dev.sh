#!/bin/bash
# KabadiMarket — Local Dev Quick Start
# Usage: bash start-dev.sh

set -e

echo "🟢 Starting KabadiMarket local development..."

# ── Backend ───────────────────────────────────────────────────────────────────
echo ""
echo "📦 Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
  python3 -m venv venv
  echo "  ✅ Virtual environment created"
fi

source venv/bin/activate
pip install -r requirements.txt -q
echo "  ✅ Python packages installed"

if [ ! -f ".env" ]; then
  cp .env.example .env 2>/dev/null || cp ../.env . 2>/dev/null || true
  echo "  ⚠️  Created .env — edit DATABASE_URL if needed"
fi

echo "  🚀 Starting FastAPI on http://localhost:8000 ..."
uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!

cd ..

# ── Frontend ──────────────────────────────────────────────────────────────────
echo ""
echo "📦 Setting up frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
  npm install
  echo "  ✅ npm packages installed"
fi

if [ ! -f ".env" ]; then
  echo "VITE_API_URL=http://localhost:8000" > .env
fi

echo "  🚀 Starting React dev server on http://localhost:5173 ..."
npm run dev &
FRONTEND_PID=$!

cd ..

echo ""
echo "══════════════════════════════════════════════════"
echo "✅ KabadiMarket is running!"
echo "   Frontend:   http://localhost:5173"
echo "   API:        http://localhost:8000"
echo "   API Docs:   http://localhost:8000/docs"
echo "   Admin:      http://localhost:5173/admin"
echo "   Admin creds: admin / Admin@123"
echo "══════════════════════════════════════════════════"
echo ""
echo "Press Ctrl+C to stop all servers."

# Wait and handle shutdown
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Servers stopped.'; exit 0" SIGINT SIGTERM
wait
