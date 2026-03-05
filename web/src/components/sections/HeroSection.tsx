'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, Floating } from '@/components/motion/Animations';
import { AbstractGridGraphic, GeoShape, PipelineGraphic, OrbitGraphic, DevOpsWorkflowGraphic } from '@/components/graphics/AbstractGraphics';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-gradient min-h-[90vh] flex items-center">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-[5%] w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl" />

      {/* Floating geometric shapes */}
      <Floating duration={5} distance={10} className="absolute top-28 right-[20%] text-primary-400/30">
        <GeoShape shape="hexagon" size={48} />
      </Floating>
      <Floating duration={6} delay={1} distance={8} className="absolute bottom-40 left-[8%] text-emerald-400/20">
        <GeoShape shape="diamond" size={36} />
      </Floating>
      <Floating duration={7} delay={2} distance={14} className="absolute top-[60%] right-[5%] text-primary-300/20">
        <GeoShape shape="triangle" size={32} />
      </Floating>
      <Floating duration={4} delay={0.5} distance={6} className="absolute top-[15%] left-[15%] text-amber-400/20">
        <GeoShape shape="cross" size={28} />
      </Floating>

      {/* Abstract grid background */}
      <div className="absolute top-10 left-[60%] text-primary-500">
        <AbstractGridGraphic className="w-60 h-60 opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <FadeIn direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-8">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                Reliable Infrastructure at Scale
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Engineering{' '}
                <span className="gradient-text">Solutions</span>
                <br />
                for Ambitious Ideas.
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.35}>
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg mb-10">
                We transform bold concepts into reality through innovative
                engineering, precision, and scalable solutions designed to
                fuel growth and success.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.5}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary-600 text-white font-semibold text-base hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5"
                >
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-slate-200 text-slate-700 font-semibold text-base hover:border-primary-200 hover:text-primary-700 hover:bg-primary-50/50 transition-all duration-200"
                >
                  Explore Blog
                </Link>
              </div>
            </FadeIn>

            {/* Trust indicators */}
            <FadeIn direction="up" delay={0.65}>
              <div className="mt-14 flex items-center gap-8">
                {[
                  { value: '99.99%', label: 'Uptime SLA' },
                  { value: '200+', label: 'Pipelines' },
                  { value: '<5min', label: 'MTTR' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-400 font-medium mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Professional DevOps Workflow Infographic */}
          <FadeIn direction="left" delay={0.3}>
            <div className="relative hidden lg:flex items-center justify-center">
              <motion.div
                className="relative bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl p-12 border-2 border-emerald-200 shadow-xl max-w-lg"
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(22, 163, 74, 0.15)' }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-emerald-700 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className="text-lg font-bold mb-2">DevOps Pipeline</h3>
                  <p className="text-sm opacity-75">Automated workflow from code to production</p>
                </motion.div>

                <div className="bg-white/60 rounded-xl p-6 border border-emerald-100/50">
                  <DevOpsWorkflowGraphic className="w-full h-40 text-emerald-600" />
                </div>

                {/* Stats below workflow */}
                <motion.div
                  className="mt-8 grid grid-cols-3 gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  {[
                    { label: 'Deployment', value: '< 5 min', icon: '⚡' },
                    { label: 'Success Rate', value: '99.9%', icon: '✓' },
                    { label: 'Daily Builds', value: '200+', icon: '📦' },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className="bg-white/70 rounded-lg p-3 text-center border border-emerald-100 hover:border-emerald-300 transition-all"
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-xs text-emerald-600 font-semibold">{stat.label}</div>
                      <div className="text-sm font-bold text-emerald-900">{stat.value}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Floating decorative elements */}
              <Floating duration={5} distance={8} className="absolute -top-6 -right-6">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl rotate-12 shadow-sm" />
              </Floating>
              <Floating duration={6} delay={1.5} distance={10} className="absolute -bottom-4 -left-4">
                <div className="w-10 h-10 bg-emerald-200 rounded-full shadow-sm" />
              </Floating>

              {/* Orbit decoration */}
              <div className="absolute -right-16 -bottom-16 text-emerald-400">
                <OrbitGraphic className="w-36 h-36 opacity-30" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Pipeline visualization at bottom */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-primary-500 hidden lg:block">
        <PipelineGraphic className="w-[350px] h-[100px] opacity-30" />
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80V40C360 0 720 60 1080 40C1260 30 1380 50 1440 60V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
