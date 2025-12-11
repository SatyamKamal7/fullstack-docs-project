# Patient Documents Manager — Fullstack (React + Django + PostgreSQL)

# Live - https://fullstack-docs-project.vercel.app

## Overview
Small practice full-stack app that allows uploading, listing, downloading and deleting PDF documents. Files stored locally (`backend/uploads/`). Metadata stored in PostgreSQL.

## Repo layout
- `backend/` — Django + DRF backend
- `frontend/` — React (Vite) frontend
- `design.md` — design doc & API spec

## Prerequisites
- Python 3.10+ and `venv`
- Node 18+
- PostgreSQL (or change DB to SQLite for simplicity)
- Git

---

## Backend setup (Django)
1. Open a terminal:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

2. Configure DB:
- Create Postgres DB and user:
```sql
CREATE DATABASE docsdb;
CREATE USER docsuser WITH PASSWORD 'docspassword';
GRANT ALL PRIVILEGES ON DATABASE docsdb TO docsuser;
```
- Or update `backend/.env` for connection.

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create uploads folder (Django will create it automatically but you can ensure):
```bash
mkdir uploads
```

5. Start server:
```bash
python manage.py runserver 8000
```

API base: `http://127.0.0.1:8000/api`

---

## Frontend setup (React)
1. In another terminal:
```bash
cd frontend
npm install
npm run dev
```
2. Open `http://localhost:3000`

Note: Frontend expects backend at `http://127.0.0.1:8000/api`. To change, set `VITE_API_BASE` in a frontend `.env`.

---

## Example API usage (curl)

Upload:
```bash
curl -i -X POST "http://127.0.0.1:8000/api/documents/" -F "file=@/path/to/file.pdf"
```

List:
```bash
curl "http://127.0.0.1:8000/api/documents/"
```

Download:
Open in browser or:
```bash
curl -O "http://127.0.0.1:8000/api/documents/1/"
```

Delete:
```bash
curl -X DELETE "http://127.0.0.1:8000/api/documents/1/"
```

---

## Notes & next improvements
- For production: use S3 / signed URLs, authentication, rate limiting, virus scanning, pagination, and more robust file naming.
- Limit file types and size on both client & server.
