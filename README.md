# Genshin Progress Tracker

Track your Genshin Impact character build progress (levels, constellations, weapons, artifacts, and talents).
Streamlines progress tracking via a simple UI that provides checklists rather than excessive data input.

This repo contains:
- `frontend/`: SvelteKit UI (with Tailwind)
- `backend/`: GraphQL API (GraphQL Yoga) + SQLite persistence

## Prerequisites

- Node.js (and `npm`)

## Run locally

You need to run both the backend and the frontend.

## Quick Start (launch scripts)

This repo includes scripts that start **both** the backend and frontend from the parent directory and then open your browser.

Pre-req: run `npm install` in both `backend/` and `frontend/` at least once.

macOS / Linux:

```sh
./launch.sh
```

Windows:

```bat
launch.bat
```

What it does:
- starts `npm run dev` in `backend/` (GraphQL on `http://localhost:4000/graphql`)
- starts `npm run dev` in `frontend/` (UI on `http://localhost:5173`)
- attempts to open `http://localhost:5173` in your default browser

### 1) Start the backend (GraphQL + SQLite)

```sh
cd backend
npm install
npm run dev
```

By default, it serves GraphQL at:
- `http://localhost:4000/graphql`

Backend env vars:
- `PORT` (default: `4000`)
- `DB_PATH` (default: `backend/data.db`)
- `CORS_ORIGIN` (default: `http://localhost:5173`)

On startup, the backend initializes the SQLite schema automatically.

### 2) Start the frontend (SvelteKit)

```sh
cd frontend
npm install
npm run dev
```

The frontend uses the GraphQL endpoint from:
- `VITE_API_URL` (default: `http://localhost:4000/graphql`)

If you changed the backend `PORT`, set `VITE_API_URL` accordingly before starting the frontend.

## Authentication

Build queries and mutations require authentication.

The backend exposes these GraphQL mutations:
- `signup(email, password)` -> returns `{ token, user }`
- `login(email, password)` -> returns `{ token, user }`

The frontend stores the session token in `localStorage` (`auth_token`, `auth_email`) and sends it as:
- `Authorization: Bearer <token>`

## API (GraphQL)

Authenticated operations:
- Queries: `builds`, `build(id)`
- Mutations: `createBuild`, `updateBuild`, `deleteBuild`

For development, GraphiQL is enabled automatically when `NODE_ENV !== "production"`.

## Build & preview

### Frontend

```sh
cd frontend
npm run build
npm run preview
```

### Backend

```sh
cd backend
npm run build
npm start
```
