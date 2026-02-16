import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { requireAuth, requireRole } from '../middleware/auth'
import { isDbConfigured } from '../services/database'
import {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllNewsItems,
  getNewsItemById,
  createNewsItem,
  updateNewsItem,
  deleteNewsItem,
} from '../services/cmsService'

const router = Router()

// All admin routes require authentication + admin role
router.use(requireAuth, requireRole('admin'))

// Guard: DB must be configured
router.use((req: Request, res: Response, next) => {
  if (!isDbConfigured()) {
    return res.status(503).json({ error: 'Database not configured' })
  }
  next()
})

// ──────────────── Blog Posts ────────────────

const contentBlockSchema = z.object({
  type: z.enum(['paragraph', 'heading', 'code', 'image', 'quote', 'list']),
  content: z.string().default(''),
  language: z.string().optional(),
  level: z.union([z.literal(2), z.literal(3)]).optional(),
  url: z.string().optional(),
  caption: z.string().optional(),
  items: z.array(z.string()).optional(),
})

const blogPostSchema = z.object({
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens'),
  title: z.string().min(1).max(500),
  excerpt: z.string().max(1000).default(''),
  content: z.array(contentBlockSchema).default([]),
  tag: z.string().max(100).default(''),
  tagColor: z.string().max(100).default('bg-blue-100 text-blue-700'),
  readTime: z.string().max(50).default('5 min read'),
  coverImage: z.string().max(2000).optional(),
  published: z.boolean().default(false),
})

/** GET /api/admin/posts — list all posts (drafts + published) */
router.get('/posts', async (_req: Request, res: Response) => {
  try {
    const posts = await getAllBlogPosts()
    res.json({ success: true, data: posts })
  } catch (err) {
    console.error('[Admin] List posts error:', err)
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

/** GET /api/admin/posts/:id */
router.get('/posts/:id', async (req: Request, res: Response) => {
  try {
    const post = await getBlogPostById(Number(req.params.id))
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json({ success: true, data: post })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' })
  }
})

/** POST /api/admin/posts */
router.post('/posts', async (req: Request, res: Response) => {
  try {
    const data = blogPostSchema.parse(req.body)
    const post = await createBlogPost({ ...data, authorId: req.user!.id })
    res.status(201).json({ success: true, data: post })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: err.errors })
    }
    console.error('[Admin] Create post error:', err)
    res.status(500).json({ error: 'Failed to create post' })
  }
})

/** PUT /api/admin/posts/:id */
router.put('/posts/:id', async (req: Request, res: Response) => {
  try {
    const data = blogPostSchema.partial().parse(req.body)
    const post = await updateBlogPost(Number(req.params.id), data)
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json({ success: true, data: post })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: err.errors })
    }
    res.status(500).json({ error: 'Failed to update post' })
  }
})

/** DELETE /api/admin/posts/:id */
router.delete('/posts/:id', async (req: Request, res: Response) => {
  try {
    const ok = await deleteBlogPost(Number(req.params.id))
    if (!ok) return res.status(404).json({ error: 'Post not found' })
    res.json({ success: true, message: 'Post deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' })
  }
})

/** PATCH /api/admin/posts/:id/publish — quick publish/unpublish toggle */
router.patch('/posts/:id/publish', async (req: Request, res: Response) => {
  try {
    const { published } = z.object({ published: z.boolean() }).parse(req.body)
    const post = await updateBlogPost(Number(req.params.id), { published })
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json({ success: true, data: post })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: err.errors })
    }
    res.status(500).json({ error: 'Failed to update post' })
  }
})

// ──────────────── News Items ────────────────

const newsItemSchema = z.object({
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens'),
  title: z.string().min(1).max(500),
  description: z.string().max(2000).default(''),
  content: z.array(contentBlockSchema).default([]),
  category: z.string().max(100).default(''),
  categoryColor: z.string().max(100).default('bg-primary-100 text-primary-700'),
  coverImage: z.string().max(2000).optional(),
  published: z.boolean().default(false),
})

/** GET /api/admin/news */
router.get('/news', async (_req: Request, res: Response) => {
  try {
    const items = await getAllNewsItems()
    res.json({ success: true, data: items })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' })
  }
})

/** GET /api/admin/news/:id */
router.get('/news/:id', async (req: Request, res: Response) => {
  try {
    const item = await getNewsItemById(Number(req.params.id))
    if (!item) return res.status(404).json({ error: 'News item not found' })
    res.json({ success: true, data: item })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news item' })
  }
})

/** POST /api/admin/news */
router.post('/news', async (req: Request, res: Response) => {
  try {
    const data = newsItemSchema.parse(req.body)
    const item = await createNewsItem({ ...data, authorId: req.user!.id })
    res.status(201).json({ success: true, data: item })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: err.errors })
    }
    res.status(500).json({ error: 'Failed to create news item' })
  }
})

/** PUT /api/admin/news/:id */
router.put('/news/:id', async (req: Request, res: Response) => {
  try {
    const data = newsItemSchema.partial().parse(req.body)
    const item = await updateNewsItem(Number(req.params.id), data)
    if (!item) return res.status(404).json({ error: 'News item not found' })
    res.json({ success: true, data: item })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: err.errors })
    }
    res.status(500).json({ error: 'Failed to update news item' })
  }
})

/** DELETE /api/admin/news/:id */
router.delete('/news/:id', async (req: Request, res: Response) => {
  try {
    const ok = await deleteNewsItem(Number(req.params.id))
    if (!ok) return res.status(404).json({ error: 'News item not found' })
    res.json({ success: true, message: 'News item deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete news item' })
  }
})

/** PATCH /api/admin/news/:id/publish */
router.patch('/news/:id/publish', async (req: Request, res: Response) => {
  try {
    const { published } = z.object({ published: z.boolean() }).parse(req.body)
    const item = await updateNewsItem(Number(req.params.id), { published })
    if (!item) return res.status(404).json({ error: 'News item not found' })
    res.json({ success: true, data: item })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: err.errors })
    }
    res.status(500).json({ error: 'Failed to update news item' })
  }
})

// ──────────────── Dashboard Stats ────────────────

/** GET /api/admin/stats — summary counts */
router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const { getPool } = await import('../services/database')
    const db = getPool()
    const [blogResult, newsResult, userResult] = await Promise.all([
      db.query(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE published) as published FROM blog_posts`),
      db.query(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE published) as published FROM news_items`),
      db.query(`SELECT COUNT(*) as total FROM users`),
    ])
    res.json({
      success: true,
      data: {
        blogPosts: { total: parseInt(blogResult.rows[0].total), published: parseInt(blogResult.rows[0].published) },
        newsItems: { total: parseInt(newsResult.rows[0].total), published: parseInt(newsResult.rows[0].published) },
        users: { total: parseInt(userResult.rows[0].total) },
      },
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

/** GET /api/admin/stats/detailed — extended analytics for dashboard */
router.get('/stats/detailed', async (_req: Request, res: Response) => {
  try {
    const { getPool } = await import('../services/database')
    const db = getPool()

    const [
      blogResult,
      newsResult,
      userResult,
      recentBlogPosts,
      recentNewsItems,
      blogByMonth,
      newsByMonth,
    ] = await Promise.all([
      db.query(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE published) as published FROM blog_posts`),
      db.query(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE published) as published FROM news_items`),
      db.query(`SELECT COUNT(*) as total FROM users`),
      db.query(`
        SELECT id, title, slug, published, tag, created_at, updated_at
        FROM blog_posts
        ORDER BY updated_at DESC NULLS LAST, created_at DESC
        LIMIT 5
      `),
      db.query(`
        SELECT id, title, slug, published, category, created_at, updated_at
        FROM news_items
        ORDER BY updated_at DESC NULLS LAST, created_at DESC
        LIMIT 5
      `),
      db.query(`
        SELECT
          TO_CHAR(created_at, 'YYYY-MM') as month,
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE published) as published
        FROM blog_posts
        WHERE created_at >= NOW() - INTERVAL '6 months'
        GROUP BY month
        ORDER BY month ASC
      `),
      db.query(`
        SELECT
          TO_CHAR(created_at, 'YYYY-MM') as month,
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE published) as published
        FROM news_items
        WHERE created_at >= NOW() - INTERVAL '6 months'
        GROUP BY month
        ORDER BY month ASC
      `),
    ])

    // Build combined recent activity feed sorted by date
    const recentActivity = [
      ...recentBlogPosts.rows.map((r: any) => ({
        type: 'blog' as const,
        id: r.id,
        title: r.title,
        slug: r.slug,
        published: r.published,
        category: r.tag || 'Blog',
        date: r.updated_at || r.created_at,
      })),
      ...recentNewsItems.rows.map((r: any) => ({
        type: 'news' as const,
        id: r.id,
        title: r.title,
        slug: r.slug,
        published: r.published,
        category: r.category || 'News',
        date: r.updated_at || r.created_at,
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8)

    // Build monthly publishing data for last 6 months
    const months: string[] = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push(d.toISOString().slice(0, 7))
    }

    const blogMonthMap = Object.fromEntries(blogByMonth.rows.map((r: any) => [r.month, { total: parseInt(r.total), published: parseInt(r.published) }]))
    const newsMonthMap = Object.fromEntries(newsByMonth.rows.map((r: any) => [r.month, { total: parseInt(r.total), published: parseInt(r.published) }]))

    const publishingTimeline = months.map((m) => ({
      month: m,
      blog: blogMonthMap[m]?.total || 0,
      news: newsMonthMap[m]?.total || 0,
      blogPublished: blogMonthMap[m]?.published || 0,
      newsPublished: newsMonthMap[m]?.published || 0,
    }))

    res.json({
      success: true,
      data: {
        counts: {
          blogPosts: { total: parseInt(blogResult.rows[0].total), published: parseInt(blogResult.rows[0].published) },
          newsItems: { total: parseInt(newsResult.rows[0].total), published: parseInt(newsResult.rows[0].published) },
          users: { total: parseInt(userResult.rows[0].total) },
        },
        recentActivity,
        publishingTimeline,
      },
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch detailed stats' })
  }
})

export { router as adminRouter }
