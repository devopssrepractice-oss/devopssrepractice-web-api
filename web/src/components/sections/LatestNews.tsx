'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/Animations';
import { GeoShape } from '@/components/graphics/AbstractGraphics';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const categoryColors: Record<string, string> = {
  'Product Update': 'bg-primary-100 text-primary-700',
  Partnership: 'bg-emerald-100 text-emerald-700',
  'Industry Recognition': 'bg-amber-100 text-amber-700',
  'Case Study': 'bg-purple-100 text-purple-700',
  'Company News': 'bg-rose-100 text-rose-700',
  Community: 'bg-cyan-100 text-cyan-700',
};

const fallbackNews: NewsItem[] = [
  {
    id: '1', slug: 'kubernetes-cost-optimizer-launch',
    title: 'Launching Our Kubernetes Cost Optimiser Platform',
    description: 'A new tool that analyses cluster resource usage and recommends right-sizing changes.',
    date: '2024-12-18', category: 'Product Update',
  },
  {
    id: '2', slug: 'aws-advanced-partner',
    title: 'Achieved AWS Advanced Partner Status',
    description: 'Proud to announce our elevation to AWS Advanced Consulting Partner.',
    date: '2024-12-12', category: 'Partnership',
  },
  {
    id: '3', slug: 'sre-excellence-award-2024',
    title: 'Named "SRE Team of the Year" at CloudOps Summit',
    description: 'Recognised for outstanding contributions to reliability engineering practices.',
    date: '2024-12-08', category: 'Industry Recognition',
  },
  {
    id: '4', slug: 'fintech-case-study',
    title: 'How We Cut Cloud Costs by 40% for a Top Fintech',
    description: 'FinOps strategies that saved over $2M annually without sacrificing performance.',
    date: '2024-12-01', category: 'Case Study',
  },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);

  useEffect(() => {
    fetch(`${API_URL}/api/news?limit=4`)
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data?.length) setNews(d.data.slice(0, 4)); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 section-gray relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-12 left-8 text-primary-300/10">
        <GeoShape shape="cross" size={72} />
      </div>
      <div className="absolute bottom-16 right-12 text-emerald-300/10">
        <GeoShape shape="diamond" size={56} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Latest News
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                What&apos;s <span className="gradient-text">Happening</span>
              </h2>
              <p className="text-slate-500 text-lg mt-2 max-w-lg">
                Company updates, partnerships, and industry recognition.
              </p>
            </div>
            <Link
              href="/news"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-emerald-200 text-emerald-600 text-sm font-semibold hover:bg-emerald-50 transition-colors"
            >
              All News
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {news.map((item) => {
            const catColor = categoryColors[item.category] || 'bg-slate-100 text-slate-700';
            return (
              <StaggerItem key={item.slug}>
                <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <Link
                    href={`/news/${item.slug}`}
                    className="group flex gap-5 bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Date block */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-bold text-primary-600 uppercase leading-none">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-xl font-bold text-slate-800 leading-tight">
                        {new Date(item.date).getDate()}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${catColor}`}>{item.category}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-1">{item.description}</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Mobile CTA */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-10 text-center md:hidden">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
            >
              View All News
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
