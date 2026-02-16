'use client';

import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, Floating } from '@/components/motion/Animations';
import {
  UptimeRingGraphic,
  MetricsChartGraphic,
  IncidentTimelineGraphic,
  ComplianceCheckGraphic,
  DataShieldGraphic,
  NetworkTopologyGraphic,
  GeoShape,
} from '@/components/graphics/AbstractGraphics';

export default function SREMetrics() {
  return (
    <section className="py-24 section-gray relative overflow-hidden">
      {/* Decorative floating shapes */}
      <Floating duration={6} distance={10} className="absolute top-16 right-[8%] text-primary-300/10 hidden lg:block">
        <GeoShape shape="hexagon" size={56} />
      </Floating>
      <Floating duration={7} delay={2} distance={8} className="absolute bottom-24 left-[5%] text-emerald-300/10 hidden lg:block">
        <GeoShape shape="ring" size={72} />
      </Floating>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              SRE Metrics That Matter
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Reliability <span className="gradient-text">At a Glance</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              We measure what matters — uptime, deployment velocity, incident
              response, and security posture — so your infrastructure performs at its best.
            </p>
          </div>
        </FadeIn>

        {/* ── Top row: Uptime Ring + Deployment Chart ─────────── */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Uptime Ring Card */}
          <StaggerItem>
            <motion.div
              className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-8 h-full"
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
              transition={{ duration: 0.25 }}
            >
              <UptimeRingGraphic className="w-40 h-40 text-primary-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Service Uptime</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Our clients average 99.99% uptime backed by SLO-driven alerting,
                  auto-failover, and multi-region redundancy.
                </p>
                <div className="flex gap-6">
                  {[
                    { value: '99.99%', label: 'Uptime SLA' },
                    { value: '<5 min', label: 'MTTR' },
                    { value: '24/7', label: 'Monitoring' },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <motion.div
                        className="text-lg font-bold text-slate-900"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                      >
                        {m.value}
                      </motion.div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </StaggerItem>

          {/* Deployment Frequency Card */}
          <StaggerItem>
            <motion.div
              className="bg-white rounded-2xl border border-slate-200 p-8 h-full"
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg font-bold text-slate-900 mb-1">Deployment Frequency</h3>
              <p className="text-sm text-slate-500 mb-4">Continuous delivery cadence across client environments over 12 months.</p>
              <MetricsChartGraphic className="w-full h-40 text-primary-500" />
              <div className="flex justify-between mt-4 px-2">
                {[
                  { value: '847', label: 'This Month' },
                  { value: '+12.5%', label: 'Change' },
                  { value: '98.6%', label: 'Success Rate' },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <motion.div
                      className="text-sm font-bold text-slate-900"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {m.value}
                    </motion.div>
                    <div className="text-[10px] text-slate-400 font-medium">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>

        {/* ── Bottom row: Incident Timeline + Security + Network ─ */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Incident Response Timeline */}
          <StaggerItem>
            <motion.div
              className="bg-white rounded-2xl border border-slate-200 p-6 h-full"
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-base font-bold text-slate-900 mb-1">Incident Response</h3>
              <p className="text-xs text-slate-500 mb-3">Detect → Triage → Mitigate → Resolve</p>
              <IncidentTimelineGraphic className="w-full h-28 text-primary-500" />
              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                P1 incidents resolved in under 5 minutes
              </div>
            </motion.div>
          </StaggerItem>

          {/* Security & Compliance */}
          <StaggerItem>
            <motion.div
              className="bg-white rounded-2xl border border-slate-200 p-6 h-full"
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-base font-bold text-slate-900 mb-1">Security Posture</h3>
              <p className="text-xs text-slate-500 mb-2">Automated compliance checks across all environments</p>
              <ComplianceCheckGraphic className="w-full h-40 text-primary-500" />
            </motion.div>
          </StaggerItem>

          {/* Network Topology / Microservices */}
          <StaggerItem>
            <motion.div
              className="bg-white rounded-2xl border border-slate-200 p-6 h-full flex flex-col items-center"
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-base font-bold text-slate-900 mb-1 self-start">Service Mesh</h3>
              <p className="text-xs text-slate-500 mb-3 self-start">Live topology of microservice traffic flow</p>
              <NetworkTopologyGraphic className="w-36 h-36 text-primary-500" />
              <div className="mt-3 grid grid-cols-3 gap-3 w-full">
                {[
                  { v: '42', l: 'Services' },
                  { v: '99.9%', l: 'Health' },
                  { v: '<2ms', l: 'Latency' },
                ].map((m) => (
                  <div key={m.l} className="text-center">
                    <motion.div
                      className="text-sm font-bold text-slate-900"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {m.v}
                    </motion.div>
                    <div className="text-[10px] text-slate-400">{m.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
