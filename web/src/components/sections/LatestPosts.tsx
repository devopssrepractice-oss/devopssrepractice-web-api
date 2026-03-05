'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/Animations';
import { GeoShape } from '@/components/graphics/AbstractGraphics';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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
}

const fallbackPosts: BlogPost[] = [
  {
    id: '1', slug: 'kubernetes-production-best-practices',
    title: 'Kubernetes in Production: 10 Best Practices',
    excerpt: 'Battle-tested practices for running Kubernetes in production environments at scale.',
    publishedDate: '2024-12-15', readTime: '8 min read',
    tag: 'Kubernetes', tagColor: 'bg-primary-100 text-primary-700',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
  },
  {
    id: '2', slug: 'terraform-modules-at-scale',
    title: 'Terraform Modules at Scale: A Practical Guide',
    excerpt: 'How to structure, version, and share Terraform modules across teams.',
    publishedDate: '2024-12-10', readTime: '6 min read',
    tag: 'Infrastructure', tagColor: 'bg-emerald-100 text-emerald-700',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
  },
  {
    id: '3', slug: 'zero-downtime-deployments',
    title: 'Zero-Downtime Deployments with Blue-Green & Canary',
    excerpt: 'Strategies for deploying without affecting your users, with real examples.',
    publishedDate: '2024-12-05', readTime: '7 min read',
    tag: 'CI/CD', tagColor: 'bg-amber-100 text-amber-700',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function LatestPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);

  useEffect(() => {
    fetch(`${API_URL}/api/blog?limit=3`)
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data?.length) setPosts(d.data.slice(0, 3)); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-16 right-10 text-primary-300/10">
        <GeoShape shape="ring" size={100} />
      </div>
      <div className="absolute bottom-20 left-8 text-emerald-300/10">
        <GeoShape shape="hexagon" size={64} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-4">
                From the Blog
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Latest <span className="gradient-text">Insights</span>
              </h2>
              <p className="text-slate-500 text-lg mt-2 max-w-lg">
                Deep dives into DevOps, SRE, and cloud-native engineering.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary-200 text-primary-600 text-sm font-semibold hover:bg-primary-50 transition-colors"
            >
              View All Posts
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <motion.div whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Cover image */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <svg className="w-12 h-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${post.tagColor}`}>{post.tag}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span>{formatDate(post.publishedDate)}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center text-sm font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile CTA */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-10 text-center md:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors"
            >
              View All Posts
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
