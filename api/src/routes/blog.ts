import { Router, Request, Response } from 'express'

const router = Router()

// Mock blog data - will be replaced with Contentful integration
const mockBlogPosts = [
  {
    id: '1',
    slug: 'getting-started-with-devops',
    title: 'Getting Started with DevOps',
    excerpt: 'Learn the fundamentals of DevOps practices and automation.',
    publishedDate: new Date('2024-01-15'),
  },
  {
    id: '2',
    slug: 'kubernetes-best-practices',
    title: 'Kubernetes Best Practices',
    excerpt: 'Discover best practices for running containerized applications.',
    publishedDate: new Date('2024-02-10'),
  },
]

// Get all blog posts
router.get('/', (req: Request, res: Response) => {
  try {
    const posts = mockBlogPosts.sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    )
    res.json({ success: true, data: posts })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch posts' })
  }
})

// Get blog post by slug
router.get('/:slug', (req: Request, res: Response) => {
  try {
    const post = mockBlogPosts.find((p) => p.slug === req.params.slug)

    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' })
    }

    res.json({
      success: true,
      data: {
        ...post,
        content: `This is the full content for ${post.title}...`,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch post' })
  }
})

export { router as blogRouter }
