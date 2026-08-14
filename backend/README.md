# Backend

Basic Express server and MongoDB setup for the Snitch project.

Getting started:

1. Copy `.env.example` to `.env` and set `MONGODB_URI` and optionally `DB_NAME` and `PORT`.

2. Install dependencies:

```bash
cd backend
npm install
```

3. Start the server:

```bash
npm start
```

Endpoints:

- `GET /health` — basic health check
- `GET /users` — list users (from `users` collection)
- `POST /users` — create user (JSON body)
