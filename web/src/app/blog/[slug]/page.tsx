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

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  tag: string;
  tagColor: string;
  coverImage?: string;
  content?: ContentBlock[];
}

/** Normalise legacy string[] content into ContentBlock[] */
function normaliseContent(raw: any[]): ContentBlock[] {
  if (!raw?.length) return [];
  return raw.map((item) =>
    typeof item === 'string' ? { type: 'paragraph' as const, content: item } : (item as ContentBlock)
  );
}

// Fallback data
const fallbackPosts: Record<string, BlogPost> = {
  'kubernetes-production-best-practices': {
    id: '1', slug: 'kubernetes-production-best-practices',
    title: 'Kubernetes in Production: 10 Best Practices You Need to Know',
    excerpt: 'Battle-tested practices for running Kubernetes in production.',
    publishedDate: '2024-12-15', readTime: '8 min read',
    tag: 'Kubernetes', tagColor: 'bg-primary-100 text-primary-700',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80',
    content: [
      { type: 'paragraph', content: 'Running Kubernetes in production requires careful planning, operational maturity, and a solid understanding of the platform.' },
      { type: 'heading', content: 'Namespace Isolation', level: 2 },
      { type: 'paragraph', content: 'Separate your workloads by team, environment, or application using namespaces with resource quotas and limit ranges.' },
      { type: 'code', content: 'apiVersion: v1\nkind: ResourceQuota\nmetadata:\n  name: team-quota\nspec:\n  hard:\n    requests.cpu: "4"\n    requests.memory: 8Gi', language: 'yaml' },
      { type: 'heading', content: 'Health Checks', level: 2 },
      { type: 'paragraph', content: 'Implement readiness and liveness probes on every pod. Readiness probes prevent traffic from reaching pods that are not ready to serve.' },
      { type: 'quote', content: 'The difference between a good Kubernetes setup and a great one is observability.' },
      { type: 'list', content: 'Key Practices', items: ['Set resource requests and limits on every pod', 'Use Pod Disruption Budgets', 'Adopt GitOps with ArgoCD or Flux', 'Enable HPA and Cluster Autoscaler', 'Practice chaos engineering'] },
    ],
  },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
function ShareButtons({ title, slug }: { title: string; slug: string }) {
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
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <button onClick={copyLink}
        className={`p-2 rounded-lg transition-colors ${copied ? 'text-green-600 bg-green-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`} title="Copy link">
        {copied ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.5 8.813" /></svg>
        )}
      </button>
    </div>
  );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(fallbackPosts[params.slug] ?? null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/blog/${params.slug}`)
      .then((res) => {
        if (!res.ok) { setNotFound(!fallbackPosts[params.slug]); return null; }
        return res.json();
      })
      .then((json) => {
        if (json?.success && json.data) {
          const d = json.data;
          setPost({ ...d, content: normaliseContent(d.content ?? []) });
        }
      })
      .catch(() => { /* use fallback */ })
      .finally(() => setLoading(false));
  }, [params.slug]);

  // Reading progress
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setReadProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            <p className="text-sm text-slate-400 font-medium">Loading post…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-20 min-h-screen">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Post Not Found</h1>
            <p className="text-slate-500 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
        <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-150 ease-out" style={{ width: `${readProgress}%` }} />
      </div>

      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 hero-gradient overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
            <FadeIn direction="up" delay={0.1}>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors mb-8">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                Back to Blog
              </Link>
            </FadeIn>
            <FadeIn direction="up" delay={0.15}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${post.tagColor}`}>{post.tag}</span>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">{post.title}</h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.25}>
              {post.excerpt && <p className="text-lg text-slate-500 mb-6">{post.excerpt}</p>}
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>{formatDate(post.publishedDate)}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{post.readTime}</span>
                </div>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Cover image */}
        {post.coverImage && (
          <section className="relative -mt-4 mb-0">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <FadeIn direction="up" delay={0.35}>
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                  <img src={post.coverImage} alt={post.title} className="w-full h-64 md:h-80 lg:h-96 object-cover" />
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <FadeIn direction="up" delay={0.1}>
              <article>
                {(post.content ?? []).map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </article>
            </FadeIn>

            {/* Share + nav */}
            <FadeIn direction="up" delay={0.2}>
              <div className="mt-16 pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <ShareButtons title={post.title} slug={post.slug} />
                </div>
                <div className="flex items-center justify-between">
                  <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    All Posts
                  </Link>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/about#contact" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors">
                      Get in Touch
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
