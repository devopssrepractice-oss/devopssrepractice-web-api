'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, ScaleIn, Floating } from '@/components/motion/Animations';
import { OrbitGraphic, GeoShape, AbstractWaveGraphic } from '@/components/graphics/AbstractGraphics';

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 text-white opacity-[0.06]">
        <AbstractWaveGraphic className="w-full h-32" />
      </div>

      <div className="absolute top-10 left-10 text-white">
        <OrbitGraphic className="w-48 h-48 opacity-10" />
      </div>
      <div className="absolute bottom-10 right-10 text-white">
        <OrbitGraphic className="w-36 h-36 opacity-10" />
      </div>

      <Floating duration={6} distance={12} className="absolute top-20 right-[15%] text-white/10">
        <GeoShape shape="hexagon" size={48} />
      </Floating>
      <Floating duration={8} delay={2} distance={8} className="absolute bottom-24 left-[10%] text-white/10">
        <GeoShape shape="diamond" size={32} />
      </Floating>
      <Floating duration={5} delay={1} distance={10} className="absolute top-[40%] left-[25%] text-white/10">
        <GeoShape shape="ring" size={40} />
      </Floating>

      {/* Gradient overlay circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-800/50 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <FadeIn direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-6 backdrop-blur-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Ready to Transform?
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Let&apos;s Build Something
            <br />
            Exceptional Together
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.35}>
          <p className="text-lg text-primary-100 leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you need a full infrastructure overhaul or targeted SRE
            improvements, our team is ready to help you achieve production
            excellence.
          </p>
        </FadeIn>

        <ScaleIn delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/about#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary-700 font-bold text-base hover:bg-primary-50 transition-all duration-200 shadow-xl shadow-primary-900/25"
              >
                Start a Conversation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              >
                Read Our Blog
              </Link>
            </motion.div>
          </div>
        </ScaleIn>

        {/* Trust badges */}
        <FadeIn direction="up" delay={0.7}>
          <div className="mt-14 flex flex-wrap justify-center gap-8">
            {[
              { label: 'AWS Advanced Partner', icon: 'M' },
              { label: 'SOC 2 Compliant', icon: 'S' },
              { label: 'ISO 27001', icon: 'I' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-primary-200">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                  {badge.icon}
                </div>
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
