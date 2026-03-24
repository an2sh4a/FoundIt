**FoundIt**

Short description
-----------------

FoundIt is a simple lost-and-found web application with a Go backend and a React (Vite) frontend.

**Repository**

- `backend/` — Go server and SQLite database file
- `frontend/` — React + Vite frontend

**Prerequisites**

- Go 1.25+ for the backend
- Node.js (16+) and npm for the frontend

**Run (developer)**

- Backend (from project root):

```bash
cd backend
go mod download
go build ./...
go run .
```

- Frontend:

```bash
cd frontend
npm install
npm run dev
```

**About backend files**

The code under `backend/` is the server implementation. Please avoid editing backend files unless you intend to change server behavior — this helps keep development and deployments predictable.

This README itself is part of the repository and should be committed so that others who open the GitHub project can read these instructions.

**Contributing / Commit & Push**

To add this README to the remote GitHub repo:

```bash
git add README.md
git commit -m "docs: add project README"
git push
```





