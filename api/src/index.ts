import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { contactRouter } from './routes/contact'
import { blogRouter } from './routes/blog'
import { newsRouter } from './routes/news'
import { webhookRouter } from './routes/webhooks'
import { authRouter } from './routes/auth'
import { adminRouter } from './routes/admin'
import { errorHandler } from './middleware/errorHandler'
import { isDbConfigured, runMigrations, closePool } from './services/database'
import { seedIfEmpty } from './services/cmsService'
import { mockBlogPosts } from './routes/blog'
import { mockNewsItems } from './routes/news'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

// Middleware
app.use(cors({ origin: FRONTEND_URL, credentials: true }))
app.use(express.json())

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), db: isDbConfigured() })
})

// Routes
app.use('/api/contact', contactRouter)
app.use('/api/blog', blogRouter)
app.use('/api/news', newsRouter)
app.use('/api/webhooks', webhookRouter)
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)

// Error handler
app.use(errorHandler)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' })
})

// Start server
async function start() {
  // Run database migrations if configured
  if (isDbConfigured()) {
    try {
      await runMigrations()
      console.log('✓ Database migrations complete')
      // Seed mock content into DB on first run
      await seedIfEmpty(mockBlogPosts, mockNewsItems)
    } catch (err) {
      console.error('✗ Database migration failed:', err)
      // Continue without DB — auth/admin endpoints will return 503
    }
  } else {
    console.log('⚠ Database not configured — auth endpoints disabled')
  }

  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`)
    console.log(`✓ Frontend URL: ${FRONTEND_URL}`)
  })
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down…')
  await closePool()
  process.exit(0)
})

start()
