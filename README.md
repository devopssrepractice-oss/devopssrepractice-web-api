# DevOps SRE Practice - Landing Page MVP

Modern landing page for DevOps SRE consulting and training services. Built with Next.js, Express, TypeScript, Framer Motion, Tailwind CSS, and Docker.

## Project Structure

```
.
├── api/                    # Express.js backend API
│   ├── src/
│   │   ├── index.ts       # Main server entry
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── services/      # Business logic
│   ├── package.json
│   ├── tsconfig.json
│   └── .env              # Environment variables
│
├── web/                    # Next.js frontend
│   ├── src/
│   │   ├── app/          # Next.js app router
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities
│   ├── public/           # Static assets
│   ├── package.json
│   └── .env.local        # Environment variables
│
├── Dockerfile.api        # API container definition
├── Dockerfile.web        # Web container definition
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # This file
```

## Prerequisites

- Node.js 24+ & npm 11+
- Docker & Docker Compose (optional, for containerized deployment)

## Local Development Setup

### 1. Install Dependencies

```bash
# Backend
cd api
npm install
cd ..

# Frontend
cd web
npm install
cd ..
```

### 2. Configure Environment Variables

**Backend** (`api/.env`):
```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`web/.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Run Development Servers

**In Terminal 1 - Backend:**
```bash
cd api
npm run dev
# Server runs on http://localhost:5000
```

**In Terminal 2 - Frontend:**
```bash
cd web
npm run dev
# App runs on http://localhost:3000
```

## Docker Deployment

### Build and Run with Docker Compose

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:5000

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Contact Form
- `POST /api/contact` - Submit contact form
  ```json
  {
    "name": "string",
    "email": "string",
    "message": "string"
  }
  ```

### Blog (Mock - Contentful integration coming)
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get single blog post

## Frontend Components

### Pages
- `/` - Landing page (Hero, Features, CTA)
- `/blog` - Blog listing
- `/news` - News feed
- `/about` - About page

### Key Components
- **HeroSection** - Animated hero with gradient background
- **FeaturesGrid** - Service features with hover animations
- **CTASection** - Contact form with validation
- **Header/Footer** - Navigation and footer

### Animations (Framer Motion)
- Fade-in transitions
- Scroll-triggered animations
- Hover effects on cards
- Button scaling interactions
- Parallax effects

## Build for Production

### Backend
```bash
cd api
npm run build
npm start
```

### Frontend
```bash
cd web
npm run build
npm start
```

## Configuration & Customization

### Tailwind CSS
Edit `web/tailwind.config.ts` to customize:
- Colors (primary, secondary, accent)
- Typography
- Spacing

### Features
Edit `web/src/components/sections/FeaturesGrid.tsx` to update:
- Service cards
- Feature descriptions
- Icons

### Contact Form
Edit `web/src/components/sections/CTASection.tsx` to modify:
- Form fields
- Validation
- Success/error messages

## Next Steps (Phase 2+)

- [ ] Integrate Contentful CMS for blog/news content
- [ ] Add user authentication for member content
- [ ] Set up PostgreSQL database
- [ ] Create Kubernetes manifests
- [ ] Implement CI/CD pipeline
- [ ] Add analytics tracking
- [ ] SEO optimization

## Email Configuration (Optional)

To enable contact form emails:

1. Generate Gmail app-specific password
2. Update `api/.env`:
   ```
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

## Deployment Options

### Single Server (Docker Compose)
- Self-hosted VPS (DigitalOcean, Linode, etc.)
- Install Docker, Docker Compose, Nginx
- Run `docker-compose up -d`

### Kubernetes (Future)
- Manifests ready in `/k8s` directory
- Deploy with `kubectl apply -f k8s/`

## Troubleshooting

**Frontend can't connect to API:**
- Ensure `NEXT_PUBLIC_API_URL` is set correctly
- Check API is running on port 5000
- Verify CORS is enabled in Express

**Docker build fails:**
- Clear build cache: `docker-compose build --no-cache`
- Ensure Node.js version is compatible

**Port already in use:**
- Change port in docker-compose.yml or `.env`

## Contributing

Follow these conventions:
- Use TypeScript for all new code
- Components use PascalCase
- Utilities/functions use camelCase
- Commit messages are descriptive

## License

MIT

## Support

For issues or questions, create an issue in the repository or contact the team.
