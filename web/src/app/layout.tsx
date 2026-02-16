import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'

export const metadata: Metadata = {
  title: 'DevOps & SRE Expertise | DevOps SRE Practice',
  description: 'Learn and implement modern DevOps and SRE practices. Expert consulting, training, and guidance.',
  openGraph: {
    title: 'DevOps & SRE Expertise | DevOps SRE Practice',
    description: 'Learn and implement modern DevOps and SRE practices.',
    url: 'https://devopssrepractice.com',
    siteName: 'DevOps SRE Practice',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </head>
      <body className="min-h-screen bg-primary text-slate-200">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
