'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/motion/Animations';
import { AbstractCircuitGraphic, GeoShape, AbstractWaveGraphic } from '@/components/graphics/AbstractGraphics';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const values = [
  {
    title: 'Reliability First',
    description: 'Every decision starts with reliability. We build systems that handle failure gracefully and recover automatically.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: 'icon-green',
  },
  {
    title: 'Automate Everything',
    description: 'If it can be automated, it should be. We eliminate toil and free your team to focus on innovation.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: 'icon-amber',
  },
  {
    title: 'Measure & Improve',
    description: 'Data-driven decisions with SLOs, error budgets, and continuous feedback loops. What gets measured gets improved.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    color: 'icon-green',
  },
  {
    title: 'Open Source First',
    description: 'We believe in open source. Our solutions leverage battle-tested tools and we actively contribute back to the community.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.06.359.148.708.27 1.044" />
      </svg>
    ),
    color: 'icon-cyan',
  },
];

const team = [
  { name: 'Alex Chen', role: 'Principal SRE', specialty: 'Kubernetes & Cloud Architecture' },
  { name: 'Sarah Mitchell', role: 'DevOps Lead', specialty: 'CI/CD & GitOps' },
  { name: 'Raj Patel', role: 'Platform Engineer', specialty: 'Terraform & IaC' },
  { name: 'Emily Davis', role: 'Security Engineer', specialty: 'DevSecOps & Compliance' },
];

const teamColors = ['bg-primary-100 text-primary-600', 'bg-emerald-100 text-emerald-600', 'bg-amber-100 text-amber-600', 'bg-pink-100 text-pink-600'];

export default function AboutPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormStatus('loading');
    setFormError('');
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: unknown) {
      setFormStatus('error');
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
          <div className="absolute top-20 right-[15%] w-48 h-48 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-[5%] text-primary-400 opacity-[0.06]">
            <AbstractCircuitGraphic className="w-64 h-64" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <FadeIn direction="up" delay={0.1}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                  About Us
                </span>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                  We Live and Breathe <span className="gradient-text">Reliability</span>
                </h1>
              </FadeIn>
              <FadeIn direction="up" delay={0.35}>
                <p className="text-lg text-slate-500 leading-relaxed">
                  A team of passionate engineers obsessed with building infrastructure
                  that scales, self-heals, and never lets you down.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-10 right-10 text-primary-300/10">
            <GeoShape shape="ring" size={80} />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Our Core <span className="gradient-text">Values</span>
                </h2>
                <p className="text-slate-500 text-lg max-w-xl mx-auto">
                  The principles that guide every decision and every line of code we write.
                </p>
              </div>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <motion.div
                    className="card-feature group"
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <div className={`icon-circle ${value.color} mb-5`}>
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 section-gray relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 text-primary-500 opacity-[0.03]">
            <AbstractWaveGraphic className="w-full h-32" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Meet the <span className="gradient-text">Team</span>
                </h2>
                <p className="text-slate-500 text-lg max-w-xl mx-auto">
                  Senior engineers with decades of combined experience in building and operating large-scale systems.
                </p>
              </div>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <StaggerItem key={member.name}>
                  <motion.div
                    className="bg-white rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-slate-100 h-full"
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <div className={`w-20 h-20 rounded-2xl ${teamColors[i]} flex items-center justify-center text-2xl font-bold mx-auto mb-5`}>
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-primary-600 text-sm font-semibold mb-2">{member.role}</p>
                    <p className="text-slate-400 text-xs">{member.specialty}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <FadeIn direction="up">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Get in <span className="gradient-text">Touch</span>
                  </h2>
                  <p className="text-slate-500 text-lg">
                    Ready to level up your infrastructure? Drop us a line.
                  </p>
                </div>
              </FadeIn>
              <ScaleIn delay={0.2}>
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-card border border-slate-100">
                  {formStatus === 'success' ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                      <p className="text-slate-500 mb-6">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                      <button
                        type="button"
                        onClick={() => setFormStatus('idle')}
                        className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <>
                      {formStatus === 'error' && (
                        <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                          {formError}
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            minLength={2}
                            value={formData.name}
                            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>
                      <div className="mb-5">
                        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                        <textarea
                          id="contact-message"
                          rows={5}
                          required
                          minLength={10}
                          value={formData.message}
                          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full px-6 py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all duration-200 shadow-md shadow-primary-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                      </motion.button>
                    </>
                  )}
                </form>
              </ScaleIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
