# MISALA

**Portfolio + AI Opportunity Matching + Career Growth platform**, built under
Kamate Group Ltd.

The pitch in one line: a public portfolio page
(`portfolio.kamategroup.online/james`) is just the entry point — the real
product is the AI engine underneath that matches a profile to jobs,
internships, scholarships, fellowships, grants, trainings, and
competitions, and keeps being useful long after someone's already hired.

This repo currently ships **only the homepage** that explains that pitch.
Profiles, auth, the matching engine, and employer dashboards are designed
and added later, on top of this shell.

---

## How it's built

| Layer     | Stack                                                        |
|-----------|---------------------------------------------------------------|
| Frontend  | React 19 + Vite, plain CSS (no framework), served by nginx    |
| Backend   | Django 5 + Django REST Framework, served by Gunicorn         |
| Database  | SQLite (file-based; swappable later without code changes)     |
| Web server| nginx — static files + reverse proxy in front of the backend  |
| Packaging | Docker + Docker Compose                                       |

```
misala/
├── backend/                 Django project
│   ├── config/               Settings module — settings.py, urls.py, wsgi.py, asgi.py
│   ├── apps/core/            Minimal API app: /api/health/, /api/homepage/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-entrypoint.sh  Runs migrate + collectstatic, then starts Gunicorn
│
├── frontend/                 React (Vite) homepage
│   ├── src/components/       Nav, Hero, MatchWidget, Ticker, HowItWorks,
│   │                         TwoSides, WhyItLasts, Pricing, Footer
│   ├── nginx/default.conf    nginx config baked into the frontend image
│   └── Dockerfile            Multi-stage: builds the app, then serves it with nginx
│
├── nginx/                     Reference config for a non-Docker (bare-metal) VPS deploy
├── docker-compose.yml         Wires the two services together
└── README.md                  This file
```

**Why the settings live in `config/`:** `backend/config/` is a proper
Python module (`settings.py`, `urls.py`, `wsgi.py`, `asgi.py`,
`__init__.py`), not settings sitting at the project root — so the layout
reads `manage.py`, `config/`, `apps/`.

**Why two containers, not one:** nginx does two jobs — serve the built
React files, and reverse-proxy `/api/`, `/admin/`, and `/django-static/`
to Gunicorn. Keeping the frontend build and the Django app as separate
images means either can be rebuilt and redeployed independently.

**The signature piece of the homepage** is the match widget in the hero:
an animated diagram of a profile (James) connecting to three ranked
opportunities with a count-up match score, because that visual — not a
portfolio template — is what the product actually is.

---

## Running it with Docker (recommended)

Requires Docker and the Docker Compose plugin (`docker compose`, not the
older standalone `docker-compose`).

```bash
git clone <this-repo> misala && cd misala
cp backend/.env.example backend/.env    # edit DJANGO_SECRET_KEY etc. for real use
docker compose up -d --build
```

That builds both images and starts two containers:

- **`backend`** — Gunicorn serving Django on port 8000, only reachable
  from inside the Docker network (not published to the host). On every
  start, `docker-entrypoint.sh` runs `migrate` and `collectstatic`
  automatically. Its SQLite database lives in the `sqlite_data` named
  volume, so it survives `docker compose down` (but not `down -v`).
- **`frontend`** — nginx serving the built React app and proxying API
  calls to `backend` over the internal Docker network. Published to the
  host on **port 8014**.

Once it's up:

```bash
curl http://localhost:8014/api/health/
```

Open **http://localhost:8014** in a browser for the homepage itself.

Other useful commands:

```bash
docker compose logs -f              # tail both services' logs
docker compose exec backend python manage.py createsuperuser
docker compose down                 # stop (keeps the sqlite_data volume)
docker compose down -v              # stop and also delete the database
docker compose up -d --build        # rebuild after changing code
```

### Notes on the Docker setup

- `frontend/nginx/default.conf` is the file that gets copied to
  `/etc/nginx/conf.d/default.conf` inside the frontend image — that's
  the "default.conf" referred to for the nginx/Docker setup. It listens
  on port 80 *inside* the container; `docker-compose.yml` is what maps
  host port 8014 to it.
- The backend's `SQLITE_PATH` environment variable is set by
  `docker-compose.yml` to point at the mounted volume — you don't need
  to set it yourself unless you're running the backend outside Docker.
- CORS/CSRF/allowed-hosts defaults in `backend/.env.example` already
  include `localhost:8014` so the stack works out of the box; add the
  real domain when deploying.

---

## Running it without Docker (manual / local dev)

Useful for actively developing the React side with hot reload, or on a
machine without Docker.

**Backend:**

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

**Frontend** (in a second terminal):

```bash
cd frontend
npm install
cp .env.example .env
npm run dev       # http://localhost:5173, proxies /api to :8000
```

`npm run build` outputs static files to `frontend/dist`, which is what
the Docker image (and `nginx/misala.conf`, for a bare-metal VPS instead
of Docker) serves in production.

---

## What's next

Once this shell is confirmed running, the following get designed and
added on top of it: individual profile pages (`/james`, `/anna`, `/john`),
authentication, the AI matching engine itself, the employer dashboard and
candidate ranking, and the premium/recruiter/institution billing tiers.
