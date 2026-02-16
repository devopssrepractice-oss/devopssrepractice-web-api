'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="border-t border-accent2/20 py-16 bg-gradient-to-b from-transparent to-secondary/30">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            whileHover={{ y: -3 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent2 to-accent3 rounded-lg flex items-center justify-center">
                <span className="text-primary font-black">DR</span>
              </div>
              <div>
                <p className="font-black text-white">DevOps SRE</p>
                <p className="text-xs text-accent2">Practice</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Enterprise DevOps and SRE solutions for modern organizations.
            </p>
          </motion.div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              {['Blog', 'News', 'Services', 'Docs'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Services' ? '/services' : '/' + item.toLowerCase()}
                    className="text-slate-400 hover:text-accent2 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {['About', 'Team', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={'/' + item.toLowerCase()}
                    className="text-slate-400 hover:text-accent2 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-bold text-white mb-6">Connect</h4>
            <div className="flex gap-3 mb-8">
              {['LinkedIn', 'Twitter', 'GitHub'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg bg-accent2/10 border border-accent2/20 flex items-center justify-center text-accent2 hover:bg-accent2/20 transition-all text-sm font-bold"
                >
                  {social.charAt(0)}
                </motion.a>
              ))}
            </div>
            <div className="space-y-2 text-xs text-slate-500">
              <Link href="#" className="block hover:text-accent2 transition">
                Privacy Policy
              </Link>
              <Link href="#" className="block hover:text-accent2 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div className="border-t border-accent2/10 pt-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-500 text-sm"
        >
          <p>
            &copy; {new Date().getFullYear()} DevOps SRE Practice. Crafted with{' '}
            <span className="text-accent2">❤</span> for engineers.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
