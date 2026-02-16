import { BlogPost, ContentBlock, NewsItem } from '../types'

// -----------------------------------------------------------------
// Contentful CMS Service
// -----------------------------------------------------------------
// Requires these env vars:
//   CONTENTFUL_SPACE_ID
//   CONTENTFUL_ACCESS_TOKEN
//   CONTENTFUL_PREVIEW_TOKEN   (optional – for draft content)
//   CONTENTFUL_ENVIRONMENT     (optional – defaults to 'master')
//
// Expected Contentful Content Types:
//   blogPost  – fields: title, slug, excerpt, content (Rich Text or Long Text), tag, tagColor, readTime, publishedDate
//   newsItem  – fields: title, description, category, categoryColor, date
// -----------------------------------------------------------------

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master'

const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`
const PREVIEW_URL = `https://preview.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`

/** Check whether Contentful is configured */
export function isContentfulConfigured(): boolean {
  return Boolean(SPACE_ID && ACCESS_TOKEN)
}

interface ContentfulSys {
  id: string
  createdAt: string
  updatedAt: string
}

interface ContentfulEntry<T> {
  sys: ContentfulSys
  fields: T
}

interface ContentfulResponse<T> {
  items: ContentfulEntry<T>[]
  total: number
}

async function fetchEntries<T>(
  contentType: string,
  params: Record<string, string> = {},
  preview = false
): Promise<ContentfulEntry<T>[]> {
  if (!isContentfulConfigured()) return []

  const url = new URL(`${preview ? PREVIEW_URL : BASE_URL}/entries`)
  url.searchParams.set('content_type', contentType)
  url.searchParams.set('access_token', (preview ? PREVIEW_TOKEN : ACCESS_TOKEN) || '')
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    console.error(`Contentful fetch failed: ${res.status} ${res.statusText}`)
    return []
  }

  const data = (await res.json()) as ContentfulResponse<T>
  return data.items
}

// --------------- Blog Posts ---------------

interface ContentfulBlogFields {
  title: string
  slug: string
  excerpt: string
  content: string  // stored as stringified JSON array or newline-separated paragraphs
  tag: string
  tagColor: string
  readTime: string
  publishedDate: string
}

function mapBlogEntry(entry: ContentfulEntry<ContentfulBlogFields>): BlogPost {
  const f = entry.fields
  let contentArray: string[] = []
  try {
    contentArray = JSON.parse(f.content)
  } catch {
    contentArray = f.content.split('\n\n').filter(Boolean)
  }

  return {
    id: entry.sys.id,
    slug: f.slug,
    title: f.title,
    excerpt: f.excerpt,
    publishedDate: f.publishedDate,
    readTime: f.readTime,
    tag: f.tag,
    tagColor: f.tagColor,
    content: contentArray.map((s): ContentBlock => ({ type: 'paragraph', content: s })),
  }
}

export async function getContentfulBlogPosts(): Promise<BlogPost[]> {
  const entries = await fetchEntries<ContentfulBlogFields>('blogPost', {
    order: '-fields.publishedDate',
  })
  return entries.map(mapBlogEntry)
}

export async function getContentfulBlogPost(slug: string): Promise<BlogPost | null> {
  const entries = await fetchEntries<ContentfulBlogFields>('blogPost', {
    'fields.slug': slug,
    limit: '1',
  })
  return entries.length ? mapBlogEntry(entries[0]) : null
}

// --------------- News Items ---------------

interface ContentfulNewsFields {
  title: string
  description: string
  category: string
  categoryColor: string
  date: string
}

function mapNewsEntry(entry: ContentfulEntry<ContentfulNewsFields>): NewsItem {
  const f = entry.fields
  return {
    id: entry.sys.id,
    slug: `news-${entry.sys.id}`,
    date: f.date,
    category: f.category,
    categoryColor: f.categoryColor,
    title: f.title,
    description: f.description,
  }
}

export async function getContentfulNewsItems(): Promise<NewsItem[]> {
  const entries = await fetchEntries<ContentfulNewsFields>('newsItem', {
    order: '-fields.date',
  })
  return entries.map(mapNewsEntry)
}

// --------------- Webhook (for rebuild triggers) ---------------

export function verifyContentfulWebhook(
  secret: string,
  headerSecret: string | undefined
): boolean {
  if (!secret || !headerSecret) return false
  return secret === headerSecret
}
