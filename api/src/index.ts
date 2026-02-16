import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { contactRouter } from './routes/contact'
import { blogRouter } from './routes/blog'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

// Middleware
app.use(cors({ origin: FRONTEND_URL }))
app.use(express.json())

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/contact', contactRouter)
app.use('/api/blog', blogRouter)

// Error handler
app.use(errorHandler)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' })
})

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`✓ Frontend URL: ${FRONTEND_URL}`)
})
