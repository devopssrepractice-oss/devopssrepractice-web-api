'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/Animations';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const ITEMS_PER_PAGE = 6;

interface NewsItem {
  id: string;
  slug: string;
  date: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Category icons
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

// Fallback data when API is unavailable
const fallbackNews: NewsItem[] = [
  { id: '1', slug: 'kubernetes-managed-service-launch', date: '2024-12-18', category: 'Announcement', title: 'DevOps SRE Practice Launches New Kubernetes Managed Service', description: "We're excited to announce our fully managed Kubernetes service, offering production-grade clusters with 24/7 SRE support and 99.99% uptime SLA.", categoryColor: 'bg-primary-100 text-primary-700' },
  { id: '2', slug: 'hashicorp-enterprise-terraform-partnership', date: '2024-12-10', category: 'Partnership', title: 'Strategic Partnership with HashiCorp for Enterprise Terraform', description: 'Our new partnership brings enterprise-grade Terraform Cloud features to all our IaC projects, including enhanced security and governance.', categoryColor: 'bg-emerald-100 text-emerald-700' },
  { id: '3', slug: 'kubecon-na-2024-zero-downtime-talk', date: '2024-11-25', category: 'Event', title: 'Speaking at KubeCon NA 2024: "Zero-Downtime Migrations at Scale"', description: 'Our Principal SRE will present battle-tested strategies for migrating production workloads to Kubernetes with zero downtime.', categoryColor: 'bg-amber-100 text-amber-700' },
  { id: '4', slug: 'mttr-reduction-fortune-500-case-study', date: '2024-11-15', category: 'Case Study', title: 'How We Reduced MTTR by 80% for a Fortune 500 Retailer', description: 'By implementing automated incident response, chaos engineering, and improved observability, we dramatically reduced incident resolution times.', categoryColor: 'bg-cyan-100 text-cyan-700' },
  { id: '5', slug: 'sre-toolkit-open-source-release', date: '2024-11-01', category: 'Open Source', title: 'Introducing SRE Toolkit: Open Source Reliability Tools', description: "We're open-sourcing our internal SRE toolkit including SLO calculators, runbook automation, and incident management helpers.", categoryColor: 'bg-purple-100 text-purple-700' },
  { id: '6', slug: '200-cicd-pipelines-retrospective', date: '2024-10-20', category: 'Milestone', title: '200+ CI/CD Pipelines Deployed: A Retrospective', description: "Reflecting on our journey of building over 200 production CI/CD pipelines, the patterns we've seen, and lessons learned along the way.", categoryColor: 'bg-pink-100 text-pink-700' },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatRelative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
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

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(fallbackNews);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: ITEMS_PER_PAGE, total: fallbackNews.length, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  const fetchNews = useCallback((page: number) => {
    setLoading(true);
    fetch(`${API_URL}/api/news?page=${page}&limit=${ITEMS_PER_PAGE}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.length) {
          setNewsItems(json.data);
          if (json.pagination) setPagination(json.pagination);
        }
      })
      .catch(() => { /* use fallback */ })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchNews(1); }, [fetchNews]);

  const handlePageChange = (page: number) => {
    fetchNews(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 hero-gradient overflow-hidden">
          <div className="absolute bottom-10 left-[10%] w-48 h-48 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <FadeIn direction="up" delay={0.1}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                  </svg>
                  News
                </span>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                  Latest <span className="gradient-text">Updates</span>
                </h1>
              </FadeIn>
              <FadeIn direction="up" delay={0.35}>
                <p className="text-lg text-slate-500 leading-relaxed">
                  Announcements, milestones, and stories from the DevOps SRE Practice team.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* News feed — timeline-style */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* Latest highlight */}
                {pagination.page === 1 && newsItems[0] && (
                  <FadeIn direction="up" delay={0.1}>
                    <motion.article
                      className="mb-8 bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-100 shadow-sm"
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                          <CategoryIcon category={newsItems[0].category} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${newsItems[0].categoryColor}`}>{newsItems[0].category}</span>
                            <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2.5 py-1 rounded-full">Latest</span>
                            <span className="text-xs text-slate-400">{formatRelative(newsItems[0].date)}</span>
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-snug">
                            <Link href={`/news/${newsItems[0].slug}`} className="hover:text-primary-600 transition-colors">
                              {newsItems[0].title}
                            </Link>
                          </h2>
                          <p className="text-slate-600 leading-relaxed">{newsItems[0].description}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-slate-400">{formatDate(newsItems[0].date)}</span>
                            <Link href={`/news/${newsItems[0].slug}`} className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                              Read more &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </FadeIn>
                )}

                {/* Rest of items — timeline list */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />

                  <StaggerContainer className="space-y-4">
                    {(pagination.page === 1 ? newsItems.slice(1) : newsItems).map((item) => (
                      <StaggerItem key={item.id}>
                        <motion.article
                          className="relative md:pl-16 group"
                          whileHover={{ x: 4, transition: { duration: 0.15 } }}
                        >
                          {/* Timeline dot */}
                          <div className="absolute left-[18px] top-6 w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover:border-primary-500 transition-colors hidden md:block" />

                          <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 flex items-center justify-center flex-shrink-0 transition-colors">
                                <CategoryIcon category={item.category} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${item.categoryColor}`}>{item.category}</span>
                                  <span className="text-xs text-slate-400">{formatRelative(item.date)}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                                  <Link href={`/news/${item.slug}`} className="hover:text-primary-600 transition-colors">
                                    {item.title}
                                  </Link>
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                                <div className="mt-3 flex items-center justify-between">
                                  <span className="text-xs text-slate-400">{formatDate(item.date)}</span>
                                  <Link href={`/news/${item.slug}`} className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors">
                                    Read more &rarr;
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>

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
