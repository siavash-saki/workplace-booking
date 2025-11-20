# Frontend (Vite + React + TypeScript + Tailwind)

## Stack
- Vite + React 18 + TypeScript
- TailwindCSS for styling
- React Router, Zustand for global state

## Structure
- `src/main.tsx` – entry, router wrapper.
- `src/App.tsx` – routes + protected route wrapper.
- `src/store.ts` – Zustand store with persisted session and API helpers.
- `src/lib/api.ts` – API calls to FastAPI.
- Components: `Navbar`, `DeskCard`, `BookingButton`, `FloorplanSVG`.
- Pages: Login, Dashboard, Workplaces list, Floorplan, Bookings.

## Run Locally
```bash
npm install
npm run dev
# http://localhost:5173
```

## Docker
```bash
docker build -t workplace-frontend .
docker run -p 5173:4173 workplace-frontend
# Served via `vite preview` on 4173 inside the container.
```

## Notes
- API base URL is `http://localhost:8000` (set in `src/lib/api.ts`).
- Login is mock: any name signs you in and persists via Zustand storage.
