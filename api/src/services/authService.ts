import bcrypt from 'bcryptjs'
import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import { getPool } from './database'

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'dev-secret-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
const SALT_ROUNDS = 12

export interface UserPayload {
  id: number
  email: string
  name: string
  role: string
}

// ---- Password helpers ----

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// ---- JWT helpers ----

export function generateToken(user: UserPayload): string {
  const opts: SignOptions = { expiresIn: JWT_EXPIRES_IN as any }
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    opts
  )
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload
  } catch {
    return null
  }
}

// ---- User CRUD ----

export async function createUser(
  name: string,
  email: string,
  password: string,
  role = 'user'
): Promise<UserPayload> {
  const db = getPool()
  const hash = await hashPassword(password)

  const result = await db.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, name, role`,
    [name, email, hash, role]
  )

  return result.rows[0]
}

export async function findUserByEmail(
  email: string
): Promise<(UserPayload & { password_hash: string }) | null> {
  const db = getPool()
  const result = await db.query(
    `SELECT id, email, name, role, password_hash FROM users WHERE email = $1`,
    [email]
  )
  return result.rows[0] || null
}

export async function findUserById(
  id: number
): Promise<UserPayload | null> {
  const db = getPool()
  const result = await db.query(
    `SELECT id, email, name, role FROM users WHERE id = $1`,
    [id]
  )
  return result.rows[0] || null
}

// ---- Session management ----

export async function createSession(
  userId: number,
  token: string,
  expiresAt: Date
): Promise<void> {
  const db = getPool()
  await db.query(
    `INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)`,
    [userId, token, expiresAt]
  )
}

export async function invalidateSession(token: string): Promise<void> {
  const db = getPool()
  await db.query(`DELETE FROM sessions WHERE token = $1`, [token])
}

export async function invalidateAllUserSessions(
  userId: number
): Promise<void> {
  const db = getPool()
  await db.query(`DELETE FROM sessions WHERE user_id = $1`, [userId])
}
