# Workplace Booking MVP

Lightweight desk booking proof-of-concept with a FastAPI backend and a Vite/React/Tailwind frontend. Uses SQLite and mock login to demonstrate core flows: view desks, see availability, book/cancel, and browse a simple floorplan.

## Project Structure
- `backend/` – FastAPI app, SQLite via SQLAlchemy, seed data for 10 desks.
- `frontend/` – Vite + React + TypeScript + Tailwind UI with Zustand store.
- `docker-compose.yml` – One-step local run for frontend + backend.

## How It Works
- Backend exposes `/login`, `/workplaces`, `/bookings` (list/create/delete). On startup it seeds 10 desks into `app.db`. CORS is open for local dev.
- Frontend uses a simple login (any name), stores session in Zustand (persisted), calls the API for workplaces/bookings, and renders pages: login, dashboard, workplaces list, floorplan, bookings.
- Floorplan is a clickable SVG grid; booking buttons toggle via API calls.

## Run Locally (without Docker)
Prereqs: Python 3.11+, Node 18+, npm.

Backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn backend.main:app --reload
# API at http://localhost:8000
```

Frontend (new shell):
```bash
cd frontend
npm install
npm run dev
# App at http://localhost:5173
```

## Run with Docker Compose (recommended)
```bash
docker-compose up --build
# Frontend: http://localhost:5173
# Backend:  http://localhost:8000
```

## Build/Run Images Manually
Backend:
```bash
docker build -t workplace-backend ./backend
docker run -p 8000:8000 -v ${PWD}/backend/app.db:/app/app.db workplace-backend
```

Frontend:
```bash
docker build -t workplace-frontend ./frontend
docker run -p 5173:4173 workplace-frontend
```

## API Quick Peek
- `POST /login` – `{ "username": "Alice" }` → dummy token.
- `GET /workplaces` – list desks with `is_booked` + `booking_id`.
- `POST /bookings` – `{ "workplace_id": 1, "user": "Alice" }` → creates booking.
- `DELETE /bookings/{id}` – cancel booking.

Example:
```bash
curl http://localhost:8000/workplaces
curl -X POST http://localhost:8000/bookings -H "Content-Type: application/json" -d '{\"workplace_id\":1,\"user\":\"Alice\"}'
```

## Notes
- SQLite file lives at `backend/app.db` when run from repo, or `/app/app.db` in containers (mounted via compose).
- No environment variables are required for this MVP.
