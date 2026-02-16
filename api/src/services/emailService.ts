import nodemailer from 'nodemailer'

interface ContactEmailData {
  senderEmail: string
  senderName: string
  message: string
}

export async function sendContactEmail(data: ContactEmailData) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP credentials not configured. Email not sent.')
    return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER, // Send to yourself
    subject: `New Contact Form Submission from ${data.senderName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.senderName}</p>
      <p><strong>Email:</strong> ${data.senderEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Email sent from ${data.senderEmail}`)
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}
