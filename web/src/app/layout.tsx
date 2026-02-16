import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devopssrepractice.com'),
  title: 'DevOps SRE Practice | Modern Infrastructure & Reliability',
  description:
    'Expert DevOps and Site Reliability Engineering services. We build resilient, scalable infrastructure with CI/CD, Kubernetes, observability, and cloud-native solutions.',
  openGraph: {
    title: 'DevOps SRE Practice | Modern Infrastructure & Reliability',
    description:
      'Expert DevOps and Site Reliability Engineering services. CI/CD, Kubernetes, observability, and cloud-native solutions.',
    url: 'https://devopssrepractice.com',
    siteName: 'DevOps SRE Practice',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevOps SRE Practice',
    description:
      'Expert DevOps and SRE services. Resilient, scalable infrastructure.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-800 min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
