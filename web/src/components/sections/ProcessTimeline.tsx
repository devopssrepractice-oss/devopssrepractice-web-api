'use client';

import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/Animations';
import { AbstractWaveGraphic, GeoShape, IncidentTimelineGraphic } from '@/components/graphics/AbstractGraphics';

const steps = [
  {
    number: '01',
    title: 'Discovery & Assessment',
    description: 'We audit your current infrastructure, identify bottlenecks, and map out a transformation roadmap.',
    border: 'border-primary-500',
    bg: 'bg-primary-50',
    accent: 'text-primary-600',
    iconBg: 'bg-primary-100',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Architecture & Design',
    description: 'Build cloud-native architectures with resilience, security and scalability baked in from day one.',
    border: 'border-emerald-500',
    bg: 'bg-emerald-50',
    accent: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Implementation & Automation',
    description: 'Hands-on buildout with IaC, CI/CD pipelines, monitoring stacks and security guardrails.',
    border: 'border-amber-500',
    bg: 'bg-amber-50',
    accent: 'text-amber-600',
    iconBg: 'bg-amber-100',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 5.07m-5.1 5.1h11.31M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Operate & Optimise',
    description: 'Ongoing managed services, incident response, cost optimisation and continuous improvement.',
    border: 'border-rose-500',
    bg: 'bg-rose-50',
    accent: 'text-rose-600',
    iconBg: 'bg-rose-100',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
      </svg>
    ),
  },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="py-24 section-gray relative overflow-hidden">
      {/* Decorative wave */}
      <div className="absolute top-0 left-0 right-0 text-primary-500 opacity-[0.04]">
        <AbstractWaveGraphic className="w-full h-40" />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 text-primary-300/10">
        <GeoShape shape="cross" size={64} />
      </div>
      <div className="absolute bottom-16 left-16 text-emerald-300/10">
        <GeoShape shape="diamond" size={48} />
      </div>
      {/* Incident timeline decoration */}
      <div className="absolute bottom-4 right-0 text-primary-500 opacity-[0.05] hidden lg:block">
        <IncidentTimelineGraphic className="w-[320px] h-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-4">
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              A Proven Path to <span className="gradient-text">Reliability</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Four focused phases that take you from assessment to fully
              managed, production-grade infrastructure.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            let cardClass = 'card-modern-emerald';
            if (index === 0) cardClass = 'card-modern-emerald';
            if (index === 1) cardClass = 'card-modern-emerald';
            if (index === 2) cardClass = 'card-modern-amber';
            if (index === 3) cardClass = 'card-modern-pink';

            return (
            <StaggerItem key={step.number}>
              <motion.div
                className={`relative bg-white h-full ${cardClass} overflow-hidden`}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {/* Step number badge */}
                <div className={`${step.bg} ${step.accent} inline-flex w-12 h-12 rounded-lg flex items-center justify-center text-base font-bold mb-6 mb-5`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`${step.iconBg} ${step.accent} w-12 h-12 rounded-lg flex items-center justify-center mb-5 inline-flex`}>
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-3 w-6">
                    <svg className="w-6 h-6 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                )}
              </motion.div>
            </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
