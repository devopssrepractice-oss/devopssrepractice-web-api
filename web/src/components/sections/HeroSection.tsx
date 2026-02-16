'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function HeroSection() {
  return (
    <motion.section
      className="relative w-full pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-accent2/20 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent4/20 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="px-4 py-2 glass rounded-full border border-accent2/40 flex items-center gap-2">
            <div className="w-2 h-2 bg-accent3 rounded-full animate-pulse" />
            <span className="text-sm text-accent2">Enterprise-Grade DevOps Solutions</span>
          </div>
        </motion.div>
        {/* Main Content */}
        <div className="text-center">
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter"
          >
            <span className="text-white">Transform Your</span>
            <br />
            <motion.span
              className="gradient-text inline-block"
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              DevOps
            </motion.span>
            <span className="text-white"> & SRE</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Cutting-edge infrastructure automation, containerization, and observability solutions
            for modern organizations. Scale with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-accent to-accent2 text-white font-bold rounded-lg shadow-glow-cyan transition-all duration-300"
            >
              Start Your Journey
              <span className="ml-2 inline-block">→</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: '#84cc16' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-accent2/50 text-accent2 font-bold rounded-lg hover:bg-accent2/5 transition-all duration-300"
            >
              Explore Solutions
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-6 mt-20 max-w-2xl mx-auto"
        >
          {[{ num: '500+', label: 'Happy Teams' }, { num: '99.9%', label: 'Uptime SLA' }, { num: '5M+', label: 'Deployments' }].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-lg border border-accent2/20 text-center"
            >
              <div className="text-3xl font-black text-accent2 mb-2">{stat.num}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center justify-center mt-16"
      >
        <span className="text-xs text-accent2/60 uppercase tracking-widest mb-3">Scroll to explore</span>
        <motion.svg
          className="w-5 h-5 text-accent2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.div>
    </motion.section>
  )
}
