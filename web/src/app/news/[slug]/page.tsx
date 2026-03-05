'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CodeBlock from '@/components/common/CodeBlock';
import { FadeIn } from '@/components/motion/Animations';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ContentBlock {
  type: 'paragraph' | 'heading' | 'code' | 'image' | 'quote' | 'list';
  content: string;
  language?: string;
  level?: 2 | 3;
  url?: string;
  caption?: string;
  items?: string[];
}

interface NewsItem {
  id: string;
  slug: string;
  date: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  coverImage?: string;
  content?: ContentBlock[];
}

function normaliseContent(raw: any[]): ContentBlock[] {
  if (!raw?.length) return [];
  return raw.map((item) =>
    typeof item === 'string' ? { type: 'paragraph' as const, content: item } : (item as ContentBlock)
  );
}

// Fallback data
const fallbackItems: Record<string, NewsItem> = {
  'kubernetes-managed-service-launch': {
    id: '1', slug: 'kubernetes-managed-service-launch',
    date: '2024-12-18', category: 'Announcement',
    categoryColor: 'bg-primary-100 text-primary-700',
    title: 'DevOps SRE Practice Launches New Kubernetes Managed Service',
    description: "We're excited to announce our fully managed Kubernetes service, offering production-grade clusters with 24/7 SRE support and 99.99% uptime SLA.",
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80',
    content: [
      { type: 'paragraph', content: "We're thrilled to announce the launch of our fully managed Kubernetes service. This offering brings enterprise-grade container orchestration to organizations of all sizes." },
      { type: 'heading', content: "What's Included", level: 2 },
      { type: 'list', content: 'Key features:', items: ['Production-grade multi-zone clusters', '24/7 SRE monitoring and incident response', '99.99% uptime SLA', 'Automated upgrades and security patching', 'Integrated observability stack'] },
      { type: 'quote', content: 'Our goal is to let engineering teams focus on shipping features while we handle the infrastructure reliability.' },
    ],
  },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function CategoryIcon({ category }: { category: string }) {
  const common = 'w-5 h-5';
  switch (category.toLowerCase()) {
    case 'announcement':
      return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" /></svg>;
    case 'partnership':
      return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
    case 'event':
      return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
    case 'case study':
      return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
    case 'open source':
      return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>;
    default:
      return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>;
  }
}

/** Render a single ContentBlock */
function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-slate-600 leading-relaxed mb-6 text-lg">{block.content}</p>;
    case 'heading':
      return block.level === 3
        ? <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">{block.content}</h3>
        : <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">{block.content}</h2>;
    case 'code':
      return <CodeBlock code={block.content} language={block.language} />;
    case 'image':
      return (
        <figure className="my-8">
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <img src={block.url || block.content} alt={block.caption || ''} className="w-full object-cover" />
          </div>
          {block.caption && <figcaption className="text-center text-sm text-slate-400 mt-3 italic">{block.caption}</figcaption>}
        </figure>
      );
    case 'quote':
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-primary-400 bg-primary-50/30 py-4 pr-6 rounded-r-xl">
          <p className="text-lg italic text-slate-700 leading-relaxed">{block.content}</p>
        </blockquote>
      );
    case 'list':
      return (
        <div className="my-6">
          {block.content && <p className="font-semibold text-slate-800 mb-3">{block.content}</p>}
          <ul className="space-y-2">
            {(block.items || []).map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600">
                <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return <p className="text-slate-600 mb-6">{block.content}</p>;
  }
}

/** Share buttons */
function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Share</span>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="p-2 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 transition-colors" title="Share on X">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="p-2 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors" title="Share on LinkedIn">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <button onClick={copyLink}
        className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Copy link">
        {copied ? (
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L5.25 9.75" /></svg>
        )}
      </button>
    </div>
  );
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setReadProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/news/${params.slug}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          const d = json.data;
          setItem({
            ...d,
            content: normaliseContent(d.content || []),
          });
        } else {
          // Try fallback
          const fb = fallbackItems[params.slug];
          if (fb) setItem(fb);
        }
      })
      .catch(() => {
        const fb = fallbackItems[params.slug];
        if (fb) setItem(fb);
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-20 max-w-3xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-100 rounded w-1/2" />
            <div className="h-64 bg-slate-100 rounded-xl mt-8" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!item) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-20 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">News Item Not Found</h1>
          <p className="text-slate-500 mb-8">The news item you're looking for doesn't exist or has been removed.</p>
          <Link href="/news" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
            &larr; Back to News
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const blocks = item.content || [];
  const hasContent = blocks.length > 0 && blocks.some((b) => b.content.trim());

  return (
    <>
      <Header />

      {/* Reading progress bar */}
      {hasContent && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
            style={{ width: `${readProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      <main>
        {/* Header section */}
        <section className="relative pt-32 pb-12 hero-gradient overflow-hidden">
          <div className="absolute bottom-10 left-[10%] w-48 h-48 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
            <FadeIn direction="up" delay={0.1}>
              <Link href="/news" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors mb-6 group">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to News
              </Link>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${item.categoryColor}`}>
                  <CategoryIcon category={item.category} />
                  {item.category}
                </span>
                <time className="text-sm text-slate-400">{formatDate(item.date)}</time>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                {item.title}
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <p className="text-lg text-slate-500 leading-relaxed mb-6">{item.description}</p>
              <ShareButtons title={item.title} />
            </FadeIn>
          </div>
        </section>

        {/* Cover image */}
        {item.coverImage && (
          <FadeIn direction="up" delay={0.5}>
            <div className="max-w-4xl mx-auto px-6 lg:px-8 -mt-4 mb-8">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                <img src={item.coverImage} alt={item.title} className="w-full max-h-[500px] object-cover" />
              </div>
            </div>
          </FadeIn>
        )}

        {/* Content body */}
        {hasContent && (
          <section className="py-8 pb-20 bg-white">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <FadeIn direction="up" delay={0.3}>
                <article className="prose-custom">
                  {blocks.map((block, i) => (
                    <BlockRenderer key={i} block={block} />
                  ))}
                </article>

                {/* Bottom share */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <ShareButtons title={item.title} />
                  <Link href="/news" className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
                    &larr; More News
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
