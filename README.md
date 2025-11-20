# Best Lines Of Books — Full Stack

This repository contains a full-stack application for collecting and browsing the best lines from books (quotes). It includes a React + Vite frontend and an Express + TypeScript backend with MongoDB persistence.

---

## Quick Summary

- Frontend: `client/` — Vite + React + TypeScript + Tailwind
- Backend: `server/` — Express + TypeScript, Mongoose for MongoDB
- Purpose: Browse books, view book details and quotes, add/generate book data via an AI GROQ endpoint.

---

## Repo Layout

Top-level folders:

- `client/` — React app (Vite)

  - `src/` — application source
    - `components/` — React components and pages (Dashboard, BooksList, BookItem, BookDetail, AddBook, EditBook, QuotesList, UI components)
    - `constants/constants.ts` — client configuration (BASE_URL, GROQ path, colors)
    - `main.tsx`, `App.tsx` — app boot and routes
  - `package.json` — scripts: `dev`, `build`, `preview`

- `server/` — Express API (TypeScript)
  - `src/`
    - `server.ts` — entry that loads `dotenv` and starts server
    - `app.ts` — sets up routes and middleware
    - `config/db.ts` — Mongoose connection helper
    - `modules/` — domain modules (book, quotes, grokai)
      - `book/` — model, controller, service, routes
      - `quotes/` — model, controller, service, routes
      - `grokai/` — controller/service/routes to generate book data via AI
  - `package.json` — scripts: `dev` (nodemon/ts-node-dev), `build`, `start`

---

## Important Files / Entry Points

- Frontend

  - `client/src/main.tsx` — React bootstrap
  - `client/src/App.tsx` — router and global layout (`<Navbar/>`, `<main className="flex-1">`)
  - `client/src/components/*` — all UI and pages (Dashboard, AddBook, BookDetail, etc.)

- Backend
  - `server/src/server.ts` — loads dotenv, connects DB, starts server
  - `server/src/app.ts` — mounts API routes and middleware
  - `server/src/config/db.ts` — `connectDB()` implementation
  - `server/src/modules/*` — routes/controllers/services for Books, Quotes and GROQ AI

---

## API Endpoints (overview)

Base path: `http://localhost:3000` (default server port)

- Health

  - `GET /health` — health check

- Books

  - `GET /api/books` — list books
  - `GET /api/books/:id` — get book by id
  - `POST /api/books` — create book
  - `PUT /api/books/:id` — update book
  - `DELETE /api/books/:id` — delete book
  - `POST /api/books/bulk` — bulk add

- Quotes

  - `GET /api/quotes` — list quotes
  - `GET /api/quotes/:id` — single quote
  - `GET /api/quotes/book/:bookId` — quotes for a book
  - `POST /api/quotes` — create quote
  - `PUT /api/quotes/:id` — update
  - `DELETE /api/quotes/:id` — delete
  - `POST /api/quotes/bulk` — bulk add

- GROQ (AI book generator)
  - `POST /api/groqai/generate-book-data` — generate book metadata/description from a title

Note: concrete route files live under `server/src/modules/*`.

---

## Environment / Configuration

Server (`server/.env`) (example):

```
MONGO_URL=mongodb+srv://<user>:<password>@cluster/DBNAME
PORT=3000
BASE_URL=https://your-backend-url.example
GROQ_API_KEY=your_groq_api_key
```

Client (`client/.env` or platform env variables):

```
VITE_BACKEND_BASE_URL=http://localhost:3000
```

Notes:

- The server expects `dotenv` to be loaded before modules that read `process.env`. `server/src/server.ts` should call `dotenv.config()` at the top.
- `MONGO_URL` must start with `mongodb://` or `mongodb+srv://`.

---

## Run Locally (development)

1. Start the backend

```powershell
cd server
npm install
# Run dev server (nodemon + ts-node-dev)
npm run dev
```

Default server dev script (from `server/package.json`):

```
npm run dev
# runs: nodemon --watch 'src/**/*.ts' --exec ts-node-dev --respawn src/server.ts
```

Server should be available on `http://localhost:3000` (unless configured otherwise).

2. Start the frontend

```powershell
cd client
npm install
npm run dev
```

Open the Vite dev URL (usually `http://localhost:5173`).

If the client fails to call the API, ensure `VITE_BACKEND_BASE_URL` points to the running backend.

---

## Build / Production

Frontend (Static build):

```powershell
cd client
npm run build
# built files in client/dist
```

Backend production (build + run):

```powershell
cd server
npm run build   # tsc -> output to dist/
npm start       # runs node dist/server.js
```

Serving frontend with backend (optional):

- Copy `client/dist` into `server/public` (or configure Express to serve static folder) and add an index fallback route. This is useful when deploying to a single VPS.

Deployment recommendations:

- Host backend on Render / Railway / Heroku / DigitalOcean and set env vars.
- Host frontend on Vercel / Netlify (set `VITE_BACKEND_BASE_URL` to API URL).

---

## Troubleshooting

- MongoParseError: Invalid scheme

  - Confirm `MONGO_URL` has no surrounding quotes or hidden characters and starts with `mongodb://` or `mongodb+srv://`.

- Env vars not loaded

  - Ensure `dotenv.config()` is called before other imports that read `process.env` in `server/src/server.ts`.

- Client cannot reach server
  - Verify `VITE_BACKEND_BASE_URL` and CORS settings on the backend.
