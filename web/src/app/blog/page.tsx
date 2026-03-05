'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/Animations';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const POSTS_PER_PAGE = 6;

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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Fallback data when API is unavailable
const fallbackPosts: BlogPost[] = [
  {
    id: '1', slug: 'kubernetes-production-best-practices',
    title: 'Kubernetes in Production: 10 Best Practices You Need to Know',
    excerpt: 'Running Kubernetes in production requires careful planning. Here are the battle-tested practices we use for every production cluster.',
    publishedDate: '2024-12-15', readTime: '8 min read', tag: 'Kubernetes', tagColor: 'bg-primary-100 text-primary-700',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
  },
  {
    id: '2', slug: 'gitops-argocd-guide',
    title: 'GitOps with ArgoCD: A Complete Implementation Guide',
    excerpt: 'Implement declarative, version-controlled infrastructure and application deployments with ArgoCD and GitOps principles.',
    publishedDate: '2024-12-08', readTime: '12 min read', tag: 'GitOps', tagColor: 'bg-purple-100 text-purple-700',
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop',
  },
  {
    id: '3', slug: 'terraform-modules-at-scale',
    title: 'Scaling Terraform: Module Architecture for Large Organizations',
    excerpt: 'How to structure Terraform modules, workspaces, and state management for teams managing hundreds of cloud resources.',
    publishedDate: '2024-11-28', readTime: '10 min read', tag: 'IaC', tagColor: 'bg-emerald-100 text-emerald-700',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
  },
  {
    id: '4', slug: 'slo-error-budgets',
    title: 'SLOs and Error Budgets: The SRE Approach to Reliability',
    excerpt: 'Define meaningful Service Level Objectives, calculate error budgets, and use them to make data-driven reliability decisions.',
    publishedDate: '2024-11-20', readTime: '7 min read', tag: 'SRE', tagColor: 'bg-amber-100 text-amber-700',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  },
  {
    id: '5', slug: 'observability-opentelemetry',
    title: 'Building an Observability Stack with OpenTelemetry',
    excerpt: 'Unified metrics, logs, and traces with OpenTelemetry. A practical guide to instrumenting your services for full observability.',
    publishedDate: '2024-11-12', readTime: '15 min read', tag: 'Observability', tagColor: 'bg-pink-100 text-pink-700',
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop',
  },
  {
    id: '6', slug: 'github-actions-advanced',
    title: 'Advanced GitHub Actions: Custom Runners, Matrices & Reusable Workflows',
    excerpt: 'Go beyond basic CI/CD with self-hosted runners, build matrices, composite actions, and reusable workflow patterns.',
    publishedDate: '2024-11-05', readTime: '9 min read', tag: 'CI/CD', tagColor: 'bg-cyan-100 text-cyan-700',
    coverImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop',
  },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function PaginationControls({ pagination, onPageChange }: { pagination: Pagination; onPageChange: (p: number) => void }) {
  if (pagination.totalPages <= 1) return null;
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button disabled={pagination.page <= 1} onClick={() => onPageChange(pagination.page - 1)}
        className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
      </button>
      {pages.map((p) => (
        <button key={p} onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${p === pagination.page ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}>
          {p}
        </button>
      ))}
      <button disabled={pagination.page >= pagination.totalPages} onClick={() => onPageChange(pagination.page + 1)}
        className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
      </button>
    </div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: POSTS_PER_PAGE, total: fallbackPosts.length, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback((page: number) => {
    setLoading(true);
    fetch(`${API_URL}/api/blog?page=${page}&limit=${POSTS_PER_PAGE}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.length) {
          setPosts(json.data);
          if (json.pagination) setPagination(json.pagination);
        }
      })
      .catch(() => { /* use fallback */ })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchPosts(1); }, [fetchPosts]);

  const handlePageChange = (page: number) => {
    fetchPosts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featured = posts[0];
  const rest = posts.length > 1 ? posts.slice(1) : [];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 hero-gradient overflow-hidden">
          <div className="absolute top-20 right-[10%] w-48 h-48 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <FadeIn direction="up" delay={0.1}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  Blog
                </span>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                  Engineering <span className="gradient-text">Insights</span>
                </h1>
              </FadeIn>
              <FadeIn direction="up" delay={0.35}>
                <p className="text-lg text-slate-500 leading-relaxed">
                  Deep dives into DevOps, SRE, and cloud-native engineering.
                  Written by practitioners, for practitioners.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Featured post */}
        {pagination.page === 1 && featured && (
          <section className="py-10 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <FadeIn direction="up" delay={0.1}>
                <Link href={`/blog/${featured.slug}`} className="block group">
                  <motion.div
                    className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-100 hover:shadow-card-hover transition-shadow duration-300"
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${featured.tagColor}`}>{featured.tag}</span>
                          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full">Featured</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">{featured.title}</h2>
                        <p className="text-slate-500 leading-relaxed mb-4">{featured.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>{formatDate(featured.publishedDate)}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>{featured.readTime}</span>
                        </div>
                      </div>
                      <div className="w-full md:w-80 h-48 md:h-auto relative">
                        {featured.coverImage ? (
                          <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                            <svg className="w-16 h-16 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            </div>
          </section>
        )}

        {/* Post grid */}
        <section className="py-16 section-gray relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(pagination.page === 1 ? rest : posts).map((post) => (
                    <StaggerItem key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="block group h-full">
                        <motion.div
                          className="bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-slate-100"
                          whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >
                          {/* Card cover image */}
                          <div className="relative h-44 overflow-hidden">
                            {post.coverImage ? (
                              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                                </svg>
                              </div>
                            )}
                            <div className="absolute top-3 left-3">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${post.tagColor}`}>{post.tag}</span>
                            </div>
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors leading-snug">{post.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-3 border-t border-slate-100">
                              <span>{formatDate(post.publishedDate)}</span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
                <PaginationControls pagination={pagination} onPageChange={handlePageChange} />
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
