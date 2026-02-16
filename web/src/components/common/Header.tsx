'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 glass border-b border-accent2/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-accent2 to-accent3 rounded-lg flex items-center justify-center shadow-glow-cyan">
              <span className="text-primary font-black text-xs">DR</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-base leading-tight">DevOps</span>
              <span className="text-accent2 text-xs font-semibold">SRE Practice</span>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {['Home', 'Blog', 'News', 'About'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="px-4 py-2 rounded-lg text-slate-300 hover:text-accent2 hover:bg-accent2/10 transition-all duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-gradient-to-r from-accent to-accent2 text-white font-semibold rounded-lg hover:shadow-glow-cyan transition-all duration-300"
          >
            Contact Us
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
