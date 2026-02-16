# DevOps SRE Practice

Modern landing page for DevOps SRE consulting & training services.  
**Stack:** Next.js 14 · Express · TypeScript · Tailwind CSS · Framer Motion · PostgreSQL · Docker · Kubernetes

## Project Structure

```
.
├── api/                    # Express.js backend API
│   ├── src/
│   │   ├── index.ts       # Server entry — runs migrations, registers routes
│   │   ├── routes/        # blog, news, contact, auth, webhooks
│   │   ├── middleware/    # errorHandler, auth (JWT)
│   │   ├── services/      # database, authService, contentfulService, emailService
│   │   └── types/         # Shared TypeScript interfaces
│   └── .env.example       # All available env vars
│
├── web/                    # Next.js frontend (standalone output)
│   ├── src/
│   │   ├── app/           # App Router pages (/, /blog, /news, /about, /login, /register)
│   │   ├── components/    # Header, Footer, sections, motion, graphics
│   │   └── lib/           # api.ts — typed fetch utilities
│   └── .env.example
│
├── k8s/                    # Kubernetes manifests
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secrets.yaml
│   ├── postgres.yaml       # PVC + Deployment + Service
│   ├── api.yaml            # Deployment + Service + HPA
│   ├── web.yaml            # Deployment + Service + HPA
│   ├── ingress.yaml        # Nginx Ingress with TLS
│   └── deploy.sh           # One-command deploy script
│
├── .github/workflows/ci.yml  # CI/CD — lint, build, Docker push, staging deploy
├── Dockerfile.api
├── Dockerfile.web
└── docker-compose.yml      # Local multi-service stack (api + web + postgres)
```

## Prerequisites

- Node.js 22+ & npm
- Docker & Docker Compose (for containerised deployment)
- PostgreSQL 16+ (or use Docker Compose)

## Quick Start

```bash
# 1. Clone & install
cd api && npm install && cd ../web && npm install && cd ..

# 2. Copy env files
cp api/.env.example api/.env
cp web/.env.example web/.env.local

# 3. Start PostgreSQL (Docker one-liner)
docker run -d --name pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=devopssrepractice -p 5432:5432 postgres:16-alpine

# 4. Run servers
cd api && npm run dev &
cd web && npm run dev &
```

- Frontend: http://localhost:3000
- API: http://localhost:5000

## Docker Compose

```bash
docker-compose build
docker-compose up -d          # starts postgres + api + web
docker-compose logs -f
docker-compose down -v        # tear down including volumes
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | — | Health check (includes DB status) |
| GET | `/api/blog` | — | List blog posts |
| GET | `/api/blog/:slug` | — | Single blog post with content |
| GET | `/api/news` | — | List news items |
| POST | `/api/contact` | — | Submit contact form |
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Sign in → JWT token |
| GET | `/api/auth/me` | Bearer | Current user profile |
| POST | `/api/auth/logout` | Bearer | Invalidate session |
| POST | `/api/webhooks/contentful` | Secret | Contentful publish webhook |

## Authentication

JWT-based auth with PostgreSQL-backed sessions.

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jane","email":"jane@example.com","password":"Secret1234"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"jane@example.com","password":"Secret1234"}'

# Authenticated request
curl http://localhost:5000/api/auth/me -H 'Authorization: Bearer <token>'
```

## Contentful CMS (Optional)

Blog posts and news items can be sourced from Contentful. If env vars are not set, the API serves built-in mock data.

1. Create a Contentful space with content types `blogPost` and `newsItem`
2. Set `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` in `api/.env`
3. Optionally configure a webhook pointing to `/api/webhooks/contentful`

## Kubernetes Deployment

```bash
# Edit k8s/secrets.yaml with real values first!
cd k8s
./deploy.sh                   # applies all manifests in order
```

Includes:
- Namespace isolation
- PostgreSQL with PVC
- API & Web Deployments with HPA (autoscaling)
- Nginx Ingress with TLS (cert-manager)
- Health/readiness probes on all services

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`):

1. **Lint & Build** — `next build` + `tsc --noEmit`
2. **Docker Build & Push** — builds both images, pushes to GHCR on `main`
3. **Deploy to Staging** — rolling update via `kubectl set image` (requires `KUBE_CONFIG` secret)

## Frontend Pages

| Route | Description |
|-------|-------------|
| `/` | Landing (Hero, Features, Process, CTA) |
| `/blog` | Blog listing — fetches from API with fallback |
| `/blog/[slug]` | Individual post with full content |
| `/news` | News feed |
| `/about` | About page with contact form |
| `/login` | Sign-in form |
| `/register` | Registration form |

## Environment Variables

See `api/.env.example` and `web/.env.example` for all options.

Key variables:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — **change in production** (`openssl rand -base64 32`)
- `NEXT_PUBLIC_API_URL` — baked at build time into the client bundle
- `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN` — enable CMS

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Frontend can't reach API | Check `NEXT_PUBLIC_API_URL` and CORS `FRONTEND_URL` |
| Auth endpoints return 503 | `DATABASE_URL` not set — PostgreSQL is required for auth |
| Docker build fails | `docker-compose build --no-cache` |
| Port conflict | Change ports in `.env` or `docker-compose.yml` |

## Contributing

- TypeScript for all code
- Components: PascalCase · Utilities: camelCase
- Descriptive commit messages

## License

MIT
