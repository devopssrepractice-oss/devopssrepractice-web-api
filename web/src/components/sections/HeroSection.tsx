'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, Floating } from '@/components/motion/Animations';
import { AbstractGridGraphic, GeoShape, PipelineGraphic, OrbitGraphic } from '@/components/graphics/AbstractGraphics';

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

          {/* Right: Dashboard mockup with animation */}
          <FadeIn direction="left" delay={0.3}>
            <div className="relative hidden lg:block">
              <motion.div
                className="relative bg-white rounded-3xl shadow-card p-6 border border-slate-100"
                whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-300" />
                  <div className="w-3 h-3 rounded-full bg-amber-300" />
                  <div className="w-3 h-3 rounded-full bg-emerald-300" />
                  <div className="ml-3 flex-1 h-7 rounded-lg bg-slate-50 flex items-center px-3">
                    <span className="text-[10px] text-slate-400 font-mono">dashboard.devopssre.io</span>
                  </div>
                </div>

                {/* Metrics cards */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Deployments', value: '847', change: '+12.5%', bg: 'bg-primary-50', text: 'text-primary-600' },
                    { label: 'Uptime', value: '99.99%', change: 'SLA met', bg: 'bg-emerald-50', text: 'text-emerald-600' },
                    { label: 'MTTR', value: '<5m', change: '-40%', bg: 'bg-amber-50', text: 'text-amber-600' },
                  ].map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      className={`${metric.bg} rounded-xl p-3.5`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                    >
                      <div className={`text-[10px] ${metric.text} font-semibold mb-1`}>{metric.label}</div>
                      <div className="text-xl font-bold text-slate-900">{metric.value}</div>
                      <div className="text-[10px] text-emerald-600 mt-0.5">{metric.change}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart */}
                <div className="bg-slate-50 rounded-xl p-4 h-28 flex items-end gap-1.5">
                  {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 92].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-primary-500 to-primary-300"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1.2 + i * 0.06, duration: 0.6, ease: 'easeOut' }}
                    />
                  ))}
                </div>

                {/* Pipeline status */}
                <div className="mt-3 space-y-1.5">
                  {[
                    { name: 'prod-deploy', status: 'success', time: '2m 14s' },
                    { name: 'staging-test', status: 'success', time: '4m 32s' },
                    { name: 'security-scan', status: 'running', time: '1m 08s' },
                  ].map((pipe, i) => (
                    <motion.div
                      key={pipe.name}
                      className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 + i * 0.1, duration: 0.4 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          pipe.status === 'success' ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'
                        }`} />
                        <span className="text-[11px] font-mono text-slate-600">{pipe.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{pipe.time}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating decorative elements */}
              <Floating duration={5} distance={8} className="absolute -top-6 -right-6">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl rotate-12 shadow-sm" />
              </Floating>
              <Floating duration={6} delay={1.5} distance={10} className="absolute -bottom-4 -left-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full shadow-sm" />
              </Floating>

              {/* Orbit decoration */}
              <div className="absolute -right-16 -bottom-16 text-primary-400">
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
