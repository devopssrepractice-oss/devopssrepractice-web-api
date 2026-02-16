import { Router, Request, Response } from 'express'
import { z } from 'zod'
import {
  createUser,
  findUserByEmail,
  verifyPassword,
  generateToken,
  findUserById,
  createSession,
  invalidateSession,
} from '../services/authService'
import { isDbConfigured } from '../services/database'
import { requireAuth } from '../middleware/auth'

const router = Router()

// ---- Validation schemas ----

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// ---- Routes ----

/**
 * POST /api/auth/register
 */
router.post('/register', async (req: Request, res: Response) => {
  if (!isDbConfigured()) {
    return res.status(503).json({ error: 'Database not configured' })
  }

  try {
    const { name, email, password } = registerSchema.parse(req.body)

    const existing = await findUserByEmail(email)
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' })
    }

    // First user automatically becomes admin
    const db = (await import('../services/database')).getPool()
    const countResult = await db.query('SELECT COUNT(*) as count FROM users')
    const isFirstUser = parseInt(countResult.rows[0].count, 10) === 0
    const role = isFirstUser ? 'admin' : 'user'

    const user = await createUser(name, email, password, role)
    const token = generateToken(user)

    // Store session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    await createSession(user.id, token, expiresAt)

    res.status(201).json({
      success: true,
      data: { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors })
    }
    console.error('[Auth] Registration error:', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

/**
 * POST /api/auth/login
 */
router.post('/login', async (req: Request, res: Response) => {
  if (!isDbConfigured()) {
    return res.status(503).json({ error: 'Database not configured' })
  }

  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = generateToken(user)

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await createSession(user.id, token, expiresAt)

    res.json({
      success: true,
      data: { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors })
    }
    console.error('[Auth] Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

/**
 * POST /api/auth/logout
 */
router.post('/logout', requireAuth, async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization!.slice(7)
    await invalidateSession(token)
    res.json({ success: true, message: 'Logged out' })
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' })
  }
})

/**
 * GET /api/auth/me — get current user profile
 */
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.user!.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

export { router as authRouter }
