import { Router, Request, Response } from 'express'
import { verifyContentfulWebhook } from '../services/contentfulService'

const router = Router()

const WEBHOOK_SECRET = process.env.CONTENTFUL_WEBHOOK_SECRET || ''

/**
 * POST /api/webhooks/contentful
 *
 * Contentful sends a webhook on content publish/unpublish.
 * This endpoint validates the shared secret and can trigger
 * a frontend rebuild (e.g. via Vercel Deploy Hook or
 * GitHub Actions repository_dispatch).
 */
router.post('/contentful', async (req: Request, res: Response) => {
  try {
    const headerSecret = req.headers['x-contentful-webhook-secret'] as string | undefined

    if (!verifyContentfulWebhook(WEBHOOK_SECRET, headerSecret)) {
      return res.status(401).json({ error: 'Invalid webhook secret' })
    }

    const topic = req.headers['x-contentful-topic'] as string
    console.log(`[Contentful Webhook] Topic: ${topic}`)

    // Trigger frontend rebuild if configured
    const rebuildUrl = process.env.REBUILD_HOOK_URL
    if (rebuildUrl) {
      await fetch(rebuildUrl, { method: 'POST' })
      console.log('[Contentful Webhook] Rebuild triggered')
    }

    res.json({ success: true, message: 'Webhook processed' })
  } catch (error) {
    console.error('[Contentful Webhook] Error:', error)
    res.status(500).json({ error: 'Webhook processing failed' })
  }
})

export { router as webhookRouter }
