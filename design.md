# Design Document — Patient Documents Manager

## 1. Tech stack choices
- Frontend: React (Vite) — It is lightweight, fast dev server, component-based UI.
- Backend: Django + Django REST Framework — rapid API development, built-in admin, stable file handling.
- Database: PostgreSQL — production-ready; used locally for practice and scale testing.

## 2. Architecture Overview
- Browser (React UI) ↔ HTTP requests ↔ Django REST API.
- Django stores files on local filesystem under `uploads/`.
- Document metadata persisted in PostgreSQL table `documents_document`.
- No authentication (assume single user).

Flow bullet points:
1. User selects PDF & submits upload form.
2. Frontend sends `POST /api/documents/` with `multipart/form-data`.
3. Backend validates, saves file to `uploads/`, stores metadata in DB, returns record.
4. Frontend fetches `GET /api/documents/` to display list.
5. User clicks download → browser `GET /api/documents/<id>/` returns file as attachment.
6. User deletes → `DELETE /api/documents/<id>/` removes DB record & file.

## 3. API Specification

### `POST /api/documents/`
- Description: Upload a PDF.
- Request: `multipart/form-data` with field `file`.
- Response 201:
```json
{
  "id": 1,
  "filename": "prescription.pdf",
  "filepath": "1620000000_prescription.pdf",
  "filesize": 12345,
  "created_at": "2025-12-09T12:00:00Z"
}
```
- Errors: 400 with `{ "error": "Only PDF files allowed." }`

### `GET /api/documents/`
- Description: List documents metadata.
- Response 200:
```json
[
  { "id":1, "filename": "...", "filepath":"...", "filesize": 123, "created_at":"..." },
  ...
]
```

### `GET /api/documents/<id>/`
- Description: Download file (attachment).
- Response: Binary file stream; `Content-Disposition: attachment; filename="original.pdf"`

### `DELETE /api/documents/<id>/`
- Description: Delete file and metadata.
- Response 204 on success.

## 4. Data Flow (upload)
1. Frontend sends form with PDF.
2. Backend `request.FILES['file']` is read.
3. Validate type & size.
4. Save file to `uploads/<timestamp>_<original_name>`.
5. Create DB row with `filename`, `filepath` (saved name), `filesize`, `created_at`.
6. Return created resource.

(Data flow for download is reverse: DB -> filepath -> file served)

## 5. Assumptions
- Single-user environment (no auth).
- Max file size set to 10MB (adjustable).
- File collisions avoided using timestamp prefix.
- Local filesystem used; in production switch to object storage (S3).
- Concurrent uploads for many users not optimized (for >1000 users: use S3, scalable DB, cloud storage, signed URLs, job queues).
