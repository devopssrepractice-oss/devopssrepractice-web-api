'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 bg-accent5/10 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-2xl mx-auto relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-block mb-4 px-4 py-2 glass rounded-full border border-accent2/40">
            <span className="text-xs uppercase tracking-widest text-accent2 font-semibold">Get In Touch</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Transform
            <br />
            <span className="gradient-text">Your DevOps?</span>
          </h2>
          <p className="text-lg text-slate-400">
            Let's discuss your infrastructure challenges and how we can help you scale.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <motion.div
              whileFocus={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
            >
              <label htmlFor="name" className="block text-sm font-bold text-white mb-3">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-secondary/80 border border-accent2/30 rounded-lg focus:border-accent2 focus:outline-none transition-all duration-300 text-white placeholder-slate-500"
                placeholder="Your name"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              whileFocus={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
            >
              <label htmlFor="email" className="block text-sm font-bold text-white mb-3">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-secondary/80 border border-accent2/30 rounded-lg focus:border-accent2 focus:outline-none transition-all duration-300 text-white placeholder-slate-500"
                placeholder="your@email.com"
              />
            </motion.div>
          </div>

          {/* Message Textarea */}
          <motion.div
            whileFocus={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
          >
            <label htmlFor="message" className="block text-sm font-bold text-white mb-3">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-secondary/80 border border-accent2/30 rounded-lg focus:border-accent2 focus:outline-none transition-all duration-300 text-white placeholder-slate-500 resize-none"
              placeholder="Tell us about your infrastructure challenges..."
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-gradient-to-r from-accent to-accent2 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-glow-cyan"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block mr-2"
                >
                  ⟳
                </motion.span>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </motion.button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-500/20 border border-accent3/50 rounded-lg text-accent3 font-medium text-center"
            >
              ✓ Thank you! We'll get back to you within 24 hours.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-accent5/20 border border-accent5/50 rounded-lg text-accent5 font-medium text-center"
            >
              ✗ Failed to send message. Please try again.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
}
