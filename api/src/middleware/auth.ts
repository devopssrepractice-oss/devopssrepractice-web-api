import { Request, Response, NextFunction } from 'express'
import { verifyToken, UserPayload } from '../services/authService'

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}

/** Require a valid JWT Bearer token */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  const token = authHeader.slice(7)
  const user = verifyToken(token)

  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  req.user = user
  next()
}

/** Require a specific role (use after requireAuth) */
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    next()
  }
}
