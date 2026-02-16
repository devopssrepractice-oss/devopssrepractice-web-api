import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { sendContactEmail } from '../services/emailService'

const router = Router()

const contactSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, name, message } = contactSchema.parse(req.body)

    // Send email (optional - only if SMTP is configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await sendContactEmail({
        senderEmail: email,
        senderName: name,
        message,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      })
    }

    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to send message',
    })
  }
})

export { router as contactRouter }
