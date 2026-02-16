'use client'

import { motion } from 'framer-motion'

const processes = [
  {
    num: '01',
    title: 'Discovery',
    description: 'Understand your infrastructure, goals, and challenges',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'Design',
    description: 'architect scalable solutions for your needs',
    icon: '🎨',
  },
  {
    num: '03',
    title: 'Implementation',
    description: 'Deploy and configure with minimal disruption',
    icon: '⚙️',
  },
  {
    num: '04',
    title: 'Optimize',
    description: 'Fine-tune performance and cost efficiency',
    icon: '📈',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function ProcessTimeline() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background elements */}
      <motion.div
        className="absolute left-0 top-1/2 w-96 h-96 bg-accent4/10 rounded-full blur-3xl"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div className="inline-block mb-4 px-4 py-2 glass rounded-full border border-accent2/40">
            <span className="text-xs uppercase tracking-widest text-accent2 font-semibold">Our Process</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Your Path to DevOps
            <br />
            <span className="gradient-text">Excellence</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-2"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {processes.map((process, index) => (
            <motion.div key={process.num} variants={itemVariants} className="relative">
              {/* Card */}
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative p-8 rounded-2xl glass border border-accent2/20 h-full transition-all duration-300 group ${
                  index === processes.length - 1 ? '' : 'lg:pr-12'
                }`}
              >
                {/* Step number badge */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                  className={`absolute -top-6 -left-6 w-16 h-16 rounded-full flex items-center justify-center font-black text-lg text-primary
                    ${index === 0 ? 'bg-accent' : index === 1 ? 'bg-accent3' : index === 2 ? 'bg-accent5' : 'bg-accent2'}
                  `}
                >
                  {process.num}
                </motion.div>

                {/* Icon */}
                <div className="text-4xl mb-6 mt-4">{process.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent2 transition">
                  {process.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {process.description}
                </p>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    border: '2px solid transparent',
                    backgroundImage: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, transparent 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                  }}
                />
              </motion.div>

              {/* Connector line (hidden on mobile) */}
              {index < processes.length - 1 && (
                <motion.svg
                  className={`hidden lg:block absolute top-1/2 ${index % 2 === 0 ? 'right-0 transform translate-x-6' : 'left-0 transform -translate-x-6'}`}
                  width="60"
                  height="4"
                  viewBox="0 0 60 4"
                  style={{ marginTop: '-2px' }}
                >
                  <motion.line
                    x1="0"
                    y1="2"
                    x2="60"
                    y2="2"
                    stroke="rgb(6, 182, 212)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: index * 0.2, duration: 1 }}
                    viewport={{ once: true }}
                  />
                </motion.svg>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-accent to-accent2 text-white font-bold rounded-lg shadow-glow-cyan transition-all duration-300"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
