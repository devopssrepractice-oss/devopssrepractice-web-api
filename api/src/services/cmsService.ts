import { getPool, isDbConfigured } from './database'
import { BlogPost, NewsItem, ContentBlock } from '../types'

// -----------------------------------------------------------------
// CMS Service — CRUD operations for blog posts & news items
// -----------------------------------------------------------------

// ---- Blog Posts ----

interface BlogPostRow {
  id: number
  slug: string
  title: string
  excerpt: string
  content: any // stored as JSONB — can be string[] (legacy) or ContentBlock[]
  tag: string
  tag_color: string
  read_time: string
  cover_image: string | null
  published: boolean
  published_date: string | null
  author_id: number | null
  created_at: string
  updated_at: string
}

/** Normalise legacy string[] content to ContentBlock[] */
function normaliseContent(raw: any): ContentBlock[] {
  if (!Array.isArray(raw)) return []
  return raw.map((item: any) => {
    if (typeof item === 'string') {
      return { type: 'paragraph' as const, content: item }
    }
    return item as ContentBlock
  })
}

function rowToBlogPost(row: BlogPostRow): BlogPost & { published: boolean; authorId: number | null } {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: normaliseContent(row.content),
    tag: row.tag,
    tagColor: row.tag_color,
    readTime: row.read_time,
    coverImage: row.cover_image || undefined,
    publishedDate: row.published_date || row.created_at,
    published: row.published,
    authorId: row.author_id,
  }
}

/** Get all published blog posts (public) */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!isDbConfigured()) return []
  const db = getPool()
  const { rows } = await db.query<BlogPostRow>(
    `SELECT * FROM blog_posts WHERE published = true ORDER BY published_date DESC`
  )
  return rows.map(rowToBlogPost)
}

/** Get a single published blog post by slug (public) */
export async function getPublishedBlogPost(slug: string): Promise<BlogPost | null> {
  if (!isDbConfigured()) return null
  const db = getPool()
  const { rows } = await db.query<BlogPostRow>(
    `SELECT * FROM blog_posts WHERE slug = $1 AND published = true`,
    [slug]
  )
  return rows[0] ? rowToBlogPost(rows[0]) : null
}

/** Get ALL blog posts including drafts (admin) */
export async function getAllBlogPosts(): Promise<(BlogPost & { published: boolean })[]> {
  const db = getPool()
  const { rows } = await db.query<BlogPostRow>(
    `SELECT * FROM blog_posts ORDER BY updated_at DESC`
  )
  return rows.map(rowToBlogPost)
}

/** Get a single blog post by id (admin) */
export async function getBlogPostById(id: number): Promise<(BlogPost & { published: boolean }) | null> {
  const db = getPool()
  const { rows } = await db.query<BlogPostRow>(
    `SELECT * FROM blog_posts WHERE id = $1`,
    [id]
  )
  return rows[0] ? rowToBlogPost(rows[0]) : null
}

interface CreateBlogPostInput {
  slug: string
  title: string
  excerpt: string
  content: ContentBlock[]
  tag: string
  tagColor: string
  readTime: string
  coverImage?: string
  published?: boolean
  authorId?: number
}

/** Create a new blog post */
export async function createBlogPost(input: CreateBlogPostInput) {
  const db = getPool()
  const publishedDate = input.published ? new Date().toISOString() : null
  const { rows } = await db.query<BlogPostRow>(
    `INSERT INTO blog_posts (slug, title, excerpt, content, tag, tag_color, read_time, cover_image, published, published_date, author_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING *`,
    [
      input.slug,
      input.title,
      input.excerpt,
      JSON.stringify(input.content),
      input.tag,
      input.tagColor,
      input.readTime,
      input.coverImage || null,
      input.published ?? false,
      publishedDate,
      input.authorId ?? null,
    ]
  )
  return rowToBlogPost(rows[0])
}

/** Update a blog post */
export async function updateBlogPost(id: number, input: Partial<CreateBlogPostInput>) {
  const db = getPool()

  // Build SET clause dynamically
  const fields: string[] = []
  const values: any[] = []
  let idx = 1

  if (input.slug !== undefined) { fields.push(`slug = $${idx++}`); values.push(input.slug) }
  if (input.title !== undefined) { fields.push(`title = $${idx++}`); values.push(input.title) }
  if (input.excerpt !== undefined) { fields.push(`excerpt = $${idx++}`); values.push(input.excerpt) }
  if (input.content !== undefined) { fields.push(`content = $${idx++}`); values.push(JSON.stringify(input.content)) }
  if (input.tag !== undefined) { fields.push(`tag = $${idx++}`); values.push(input.tag) }
  if (input.tagColor !== undefined) { fields.push(`tag_color = $${idx++}`); values.push(input.tagColor) }
  if (input.readTime !== undefined) { fields.push(`read_time = $${idx++}`); values.push(input.readTime) }
  if (input.coverImage !== undefined) { fields.push(`cover_image = $${idx++}`); values.push(input.coverImage || null) }
  if (input.published !== undefined) {
    fields.push(`published = $${idx++}`); values.push(input.published)
    // Set published_date on first publish
    if (input.published) {
      fields.push(`published_date = COALESCE(published_date, NOW())`)
    }
  }
  fields.push(`updated_at = NOW()`)

  if (fields.length === 1) return getBlogPostById(id) // nothing to update

  values.push(id)
  const { rows } = await db.query<BlogPostRow>(
    `UPDATE blog_posts SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  )
  return rows[0] ? rowToBlogPost(rows[0]) : null
}

/** Delete a blog post */
export async function deleteBlogPost(id: number): Promise<boolean> {
  const db = getPool()
  const { rowCount } = await db.query(`DELETE FROM blog_posts WHERE id = $1`, [id])
  return (rowCount ?? 0) > 0
}

// ---- News Items ----

interface NewsItemRow {
  id: number
  slug: string
  title: string
  description: string
  content: any
  category: string
  category_color: string
  cover_image: string | null
  published: boolean
  published_date: string | null
  author_id: number | null
  created_at: string
  updated_at: string
}

function rowToNewsItem(row: NewsItemRow): NewsItem & { published: boolean; authorId: number | null } {
  return {
    id: String(row.id),
    slug: row.slug || `news-${row.id}`,
    title: row.title,
    description: row.description,
    content: normaliseContent(row.content),
    category: row.category,
    categoryColor: row.category_color,
    coverImage: row.cover_image || undefined,
    date: row.published_date || row.created_at,
    published: row.published,
    authorId: row.author_id,
  }
}

/** Get all published news items (public) */
export async function getPublishedNewsItems(): Promise<NewsItem[]> {
  if (!isDbConfigured()) return []
  const db = getPool()
  const { rows } = await db.query<NewsItemRow>(
    `SELECT * FROM news_items WHERE published = true ORDER BY published_date DESC`
  )
  return rows.map(rowToNewsItem)
}

/** Get a single published news item by slug (public) */
export async function getPublishedNewsItem(slug: string): Promise<NewsItem | null> {
  if (!isDbConfigured()) return null
  const db = getPool()
  const { rows } = await db.query<NewsItemRow>(
    `SELECT * FROM news_items WHERE slug = $1 AND published = true`,
    [slug]
  )
  return rows[0] ? rowToNewsItem(rows[0]) : null
}

/** Get ALL news items including drafts (admin) */
export async function getAllNewsItems(): Promise<(NewsItem & { published: boolean })[]> {
  const db = getPool()
  const { rows } = await db.query<NewsItemRow>(
    `SELECT * FROM news_items ORDER BY updated_at DESC`
  )
  return rows.map(rowToNewsItem)
}

/** Get a single news item by id (admin) */
export async function getNewsItemById(id: number): Promise<(NewsItem & { published: boolean }) | null> {
  const db = getPool()
  const { rows } = await db.query<NewsItemRow>(
    `SELECT * FROM news_items WHERE id = $1`,
    [id]
  )
  return rows[0] ? rowToNewsItem(rows[0]) : null
}

interface CreateNewsItemInput {
  slug: string
  title: string
  description: string
  content?: ContentBlock[]
  category: string
  categoryColor: string
  coverImage?: string
  published?: boolean
  authorId?: number
}

/** Create a news item */
export async function createNewsItem(input: CreateNewsItemInput) {
  const db = getPool()
  const publishedDate = input.published ? new Date().toISOString() : null
  const { rows } = await db.query<NewsItemRow>(
    `INSERT INTO news_items (slug, title, description, content, category, category_color, cover_image, published, published_date, author_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [
      input.slug,
      input.title,
      input.description,
      JSON.stringify(input.content ?? []),
      input.category,
      input.categoryColor,
      input.coverImage ?? null,
      input.published ?? false,
      publishedDate,
      input.authorId ?? null,
    ]
  )
  return rowToNewsItem(rows[0])
}

/** Update a news item */
export async function updateNewsItem(id: number, input: Partial<CreateNewsItemInput>) {
  const db = getPool()
  const fields: string[] = []
  const values: any[] = []
  let idx = 1

  if (input.slug !== undefined) { fields.push(`slug = $${idx++}`); values.push(input.slug) }
  if (input.title !== undefined) { fields.push(`title = $${idx++}`); values.push(input.title) }
  if (input.description !== undefined) { fields.push(`description = $${idx++}`); values.push(input.description) }
  if (input.content !== undefined) { fields.push(`content = $${idx++}`); values.push(JSON.stringify(input.content)) }
  if (input.category !== undefined) { fields.push(`category = $${idx++}`); values.push(input.category) }
  if (input.categoryColor !== undefined) { fields.push(`category_color = $${idx++}`); values.push(input.categoryColor) }
  if (input.coverImage !== undefined) { fields.push(`cover_image = $${idx++}`); values.push(input.coverImage || null) }
  if (input.published !== undefined) {
    fields.push(`published = $${idx++}`); values.push(input.published)
    if (input.published) {
      fields.push(`published_date = COALESCE(published_date, NOW())`)
    }
  }
  fields.push(`updated_at = NOW()`)

  if (fields.length === 1) return getNewsItemById(id)

  values.push(id)
  const { rows } = await db.query<NewsItemRow>(
    `UPDATE news_items SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  )
  return rows[0] ? rowToNewsItem(rows[0]) : null
}

/** Delete a news item */
export async function deleteNewsItem(id: number): Promise<boolean> {
  const db = getPool()
  const { rowCount } = await db.query(`DELETE FROM news_items WHERE id = $1`, [id])
  return (rowCount ?? 0) > 0
}

/** Seed mock data into the database (for first-run) */
export async function seedIfEmpty(blogPosts: BlogPost[], newsItems: NewsItem[]): Promise<void> {
  const db = getPool()

  const { rows: blogCount } = await db.query(`SELECT COUNT(*) as c FROM blog_posts`)
  if (parseInt(blogCount[0].c, 10) === 0 && blogPosts.length > 0) {
    console.log('[CMS] Seeding blog posts…')
    for (const p of blogPosts) {
      await createBlogPost({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: normaliseContent(p.content ?? []),
        tag: p.tag,
        tagColor: p.tagColor,
        readTime: p.readTime,
        coverImage: p.coverImage,
        published: true,
      })
    }
  }

  const { rows: newsCount } = await db.query(`SELECT COUNT(*) as c FROM news_items`)
  if (parseInt(newsCount[0].c, 10) === 0 && newsItems.length > 0) {
    console.log('[CMS] Seeding news items…')
    for (const n of newsItems) {
      await createNewsItem({
        slug: n.slug,
        title: n.title,
        description: n.description,
        content: normaliseContent(n.content ?? []),
        category: n.category,
        categoryColor: n.categoryColor,
        coverImage: n.coverImage,
        published: true,
      })
    }
  }
}
