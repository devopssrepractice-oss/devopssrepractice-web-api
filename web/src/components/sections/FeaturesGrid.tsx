'use client'

import { motion } from 'framer-motion'

const features = [
  {
    id: 1,
    title: 'Infrastructure as Code',
    description: 'Automate infrastructure provisioning and management using declarative code.',
    icon: '⚙️',
    accent: 'accent',
  },
  {
    id: 2,
    title: 'Container Orchestration',
    description: 'Scale applications with Kubernetes and advanced container management.',
    icon: '📦',
    accent: 'accent2',
  },
  {
    id: 3,
    title: 'CI/CD Pipelines',
    description: 'Deliver code changes reliably and automatically to production.',
    icon: '🚀',
    accent: 'accent3',
  },
  {
    id: 4,
    title: 'Observability',
    description: 'Monitor, trace, and log your entire infrastructure stack.',
    icon: '📊',
    accent: 'accent',
  },
  {
    id: 5,
    title: 'Security & Policy',
    description: 'Enforce compliance and security policies across your systems.',
    icon: '🔒',
    accent: 'accent5',
  },
  {
    id: 6,
    title: 'Incident Recovery',
    description: 'Build resilient systems with automated incident response.',
    icon: '🛡️',
    accent: 'accent4',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function FeaturesGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-0 right-20 w-80 h-80 bg-accent3/10 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-block mb-4 px-4 py-2 glass rounded-full border border-accent2/40">
            <span className="text-xs uppercase tracking-widest text-accent2 font-semibold">Why Choose Us</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Enterprise-Grade
            <br />
            <span className="gradient-text">DevOps Solutions</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive tools and expertise to scale your infrastructure with confidence
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: `0 25px 50px -12px rgba(6, 182, 212, 0.15)`,
              }}
              className={`group relative p-8 rounded-2xl glass border border-accent2/20 overflow-hidden hover:border-accent2/50 transition-all duration-300 cursor-pointer`}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br from-accent2/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              {/* Card content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="text-5xl mb-4 w-16 h-16 rounded-xl bg-gradient-to-br from-accent2/20 to-transparent flex items-center justify-center group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow indicator */}
                <motion.svg
                  className="w-5 h-5 text-accent2 inline-block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </div>

              {/* Border glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  border: '2px solid transparent',
                  backgroundImage: 'linear-gradient(135deg, rgba(6, 182, 212, 0.5) 0%, rgba(132, 204, 22, 0.2) 50%, rgba(6, 182, 212, 0) 100%)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
