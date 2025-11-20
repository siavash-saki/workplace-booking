# Backend (FastAPI + SQLite)

## Stack
- FastAPI, SQLAlchemy ORM, SQLite (`app.db`)
- Pydantic models for payloads
- Uvicorn ASGI server

## Structure
- `main.py` – FastAPI app, routes, CORS, startup seeding.
- `database.py` – engine/session setup.
- `models.py` – `Workplace`, `Booking` tables.
- `schemas.py` – request/response schemas.
- `crud.py` – DB operations.
- `seed_data.py` – seeds 10 desks on startup.

## Endpoints
- `POST /login` `{ username }` → `{ token, user }` (dummy).
- `GET /workplaces` → list of desks with `is_booked` + optional `booking_id`.
- `GET /bookings` → list current bookings.
- `POST /bookings` `{ workplace_id, user }` → create booking.
- `DELETE /bookings/{id}` → cancel booking.

## Run Locally
```bash
pip install -r requirements.txt
uvicorn backend.main:app --reload
# http://localhost:8000
```

## Run in Docker
```bash
docker build -t workplace-backend .
docker run -p 8000:8000 -v ${PWD}/app.db:/app/app.db workplace-backend
```

## Behavior Notes
- DB seeded on startup if empty.
- Booking fails with 400 if desk already booked, 404 if not found.
- CORS is wide-open for local dev.
