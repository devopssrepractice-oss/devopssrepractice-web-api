import { Router, Request, Response } from 'express'
import { NewsItem } from '../types'
import {
  isContentfulConfigured,
  getContentfulNewsItems,
} from '../services/contentfulService'
import { getPublishedNewsItems, getPublishedNewsItem } from '../services/cmsService'
import { isDbConfigured } from '../services/database'

const router = Router()

// Mock news data — used as fallback when no DB/CMS is configured
const newsItems: NewsItem[] = [
  {
    id: '1',
    slug: 'kubernetes-managed-service-launch',
    date: '2024-12-18',
    category: 'Announcement',
    categoryColor: 'bg-primary-100 text-primary-700',
    title: 'DevOps SRE Practice Launches New Kubernetes Managed Service',
    description:
      "We're excited to announce our fully managed Kubernetes service, offering production-grade clusters with 24/7 SRE support and 99.99% uptime SLA.",
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80',
    content: [
      { type: 'paragraph', content: "We're thrilled to announce the launch of our fully managed Kubernetes service. This offering brings enterprise-grade container orchestration to organizations of all sizes, backed by our experienced SRE team." },
      { type: 'heading', content: 'What\'s Included', level: 2 },
      { type: 'list', content: 'Key features of the managed service:', items: ['Production-grade multi-zone clusters', '24/7 SRE monitoring and incident response', '99.99% uptime SLA with financial backing', 'Automated upgrades and security patching', 'Integrated observability stack (Prometheus, Grafana, Loki)'] },
      { type: 'heading', content: 'Getting Started', level: 2 },
      { type: 'paragraph', content: 'Onboarding is streamlined — our team handles the initial cluster provisioning, network configuration, and security hardening. Most customers are production-ready within 48 hours.' },
      { type: 'code', content: '# Quick cluster health check\nkubectl get nodes -o wide\nkubectl top nodes\nkubectl get pods --all-namespaces | grep -v Running', language: 'bash' },
      { type: 'quote', content: 'Our goal is to let engineering teams focus on shipping features while we handle the infrastructure reliability.' },
    ],
  },
  {
    id: '2',
    slug: 'hashicorp-enterprise-terraform-partnership',
    date: '2024-12-10',
    category: 'Partnership',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    title: 'Strategic Partnership with HashiCorp for Enterprise Terraform',
    description:
      'Our new partnership brings enterprise-grade Terraform Cloud features to all our IaC projects, including enhanced security and governance.',
    content: [
      { type: 'paragraph', content: 'We are proud to announce a strategic partnership with HashiCorp that elevates our Infrastructure as Code capabilities. All IaC projects now benefit from enterprise-grade Terraform Cloud features.' },
      { type: 'heading', content: 'Partnership Benefits', level: 2 },
      { type: 'list', content: 'What this means for our clients:', items: ['Terraform Cloud Business tier for all projects', 'Sentinel policy-as-code for compliance enforcement', 'Private module registry for reusable infrastructure', 'SSO integration and team management', 'Audit logging and drift detection'] },
      { type: 'quote', content: 'Infrastructure as Code is the foundation of reliable operations. This partnership ensures our clients have best-in-class tooling.' },
    ],
  },
  {
    id: '3',
    slug: 'kubecon-na-2024-zero-downtime-talk',
    date: '2024-11-25',
    category: 'Event',
    categoryColor: 'bg-amber-100 text-amber-700',
    title: 'Speaking at KubeCon NA 2024: "Zero-Downtime Migrations at Scale"',
    description:
      'Our Principal SRE will present battle-tested strategies for migrating production workloads to Kubernetes with zero downtime.',
    content: [
      { type: 'paragraph', content: 'We are excited to share that our Principal SRE has been selected to present at KubeCon North America 2024. The talk covers real-world strategies for migrating legacy workloads to Kubernetes without service interruptions.' },
      { type: 'heading', content: 'Talk Outline', level: 2 },
      { type: 'list', content: 'Key topics covered:', items: ['Blue-green and canary migration patterns', 'Traffic shadowing for validation', 'Database migration strategies', 'Rollback automation and circuit breakers', 'Lessons from 50+ enterprise migrations'] },
      { type: 'heading', content: 'Event Details', level: 2 },
      { type: 'paragraph', content: 'KubeCon NA 2024 takes place in Salt Lake City, Utah. The talk is scheduled for the main stage on Day 2. Recordings will be available on the CNCF YouTube channel shortly after.' },
    ],
  },
  {
    id: '4',
    slug: 'mttr-reduction-fortune-500-case-study',
    date: '2024-11-15',
    category: 'Case Study',
    categoryColor: 'bg-cyan-100 text-cyan-700',
    title: 'How We Reduced MTTR by 80% for a Fortune 500 Retailer',
    description:
      'By implementing automated incident response, chaos engineering, and improved observability, we dramatically reduced incident resolution times.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    content: [
      { type: 'paragraph', content: 'When a Fortune 500 retailer approached us, their mean time to recovery (MTTR) averaged 4+ hours per incident. Within six months, we brought it down to under 45 minutes — an 80% reduction.' },
      { type: 'heading', content: 'The Challenge', level: 2 },
      { type: 'paragraph', content: 'The retailer had a sprawling microservices architecture with limited observability. Incident response was manual, with engineers spending most of their time just identifying which service was affected.' },
      { type: 'heading', content: 'Our Approach', level: 2 },
      { type: 'list', content: 'Key initiatives:', items: ['Deployed OpenTelemetry across 200+ services for distributed tracing', 'Built automated runbooks with PagerDuty and custom tooling', 'Introduced chaos engineering using Litmus and Gremlin', 'Created SLO-based alerting to reduce noise by 70%', 'Established weekly game days for incident response drills'] },
      { type: 'code', content: '# SLO definition example\napiVersion: sloth.slok.dev/v1\nkind: PrometheusServiceLevel\nmetadata:\n  name: checkout-availability\nspec:\n  service: checkout\n  labels:\n    team: platform\n  slos:\n    - name: requests-availability\n      objective: 99.9\n      sli:\n        events:\n          error_query: sum(rate(http_requests_total{service=\"checkout\",code=~\"5..\"}[5m]))\n          total_query: sum(rate(http_requests_total{service=\"checkout\"}[5m]))', language: 'yaml' },
      { type: 'quote', content: 'The biggest win was cultural — teams went from dreading on-call to feeling empowered and confident during incidents.' },
    ],
  },
  {
    id: '5',
    slug: 'sre-toolkit-open-source-release',
    date: '2024-11-01',
    category: 'Open Source',
    categoryColor: 'bg-purple-100 text-purple-700',
    title: 'Introducing SRE Toolkit: Open Source Reliability Tools',
    description:
      "We're open-sourcing our internal SRE toolkit including SLO calculators, runbook automation, and incident management helpers.",
    content: [
      { type: 'paragraph', content: "Today we're open-sourcing a collection of tools we've built and refined over years of SRE practice. The SRE Toolkit is designed to help teams adopt reliability engineering patterns quickly and effectively." },
      { type: 'heading', content: 'What\'s in the Toolkit', level: 2 },
      { type: 'list', content: 'Available tools:', items: ['SLO Calculator — define and track Service Level Objectives', 'Runbook Engine — automated runbook execution with approval gates', 'Incident Commander — structured incident management workflow', 'Error Budget Reporter — automated SLO compliance reporting', 'Toil Tracker — measure and reduce operational toil'] },
      { type: 'code', content: '# Install the SRE Toolkit CLI\nnpm install -g @sre-practice/toolkit\n\n# Initialize in your project\nsre-toolkit init\n\n# Calculate error budget burn rate\nsre-toolkit slo burn-rate --service api --window 30d', language: 'bash' },
      { type: 'paragraph', content: 'The toolkit is available on GitHub under the Apache 2.0 license. We welcome contributions and feedback from the community.' },
    ],
  },
  {
    id: '6',
    slug: '200-cicd-pipelines-retrospective',
    date: '2024-10-20',
    category: 'Milestone',
    categoryColor: 'bg-pink-100 text-pink-700',
    title: '200+ CI/CD Pipelines Deployed: A Retrospective',
    description:
      "Reflecting on our journey of building over 200 production CI/CD pipelines, the patterns we've seen, and lessons learned along the way.",
    content: [
      { type: 'paragraph', content: "We recently crossed a significant milestone — over 200 CI/CD pipelines deployed for clients across diverse industries. Here's what we've learned." },
      { type: 'heading', content: 'Patterns That Emerged', level: 2 },
      { type: 'list', content: 'Common patterns across successful pipelines:', items: ['Trunk-based development with short-lived feature branches', 'Automated security scanning at every stage', 'Infrastructure provisioning as part of the pipeline', 'Progressive delivery with feature flags', 'Comprehensive test pyramids (unit → integration → e2e)'] },
      { type: 'heading', content: 'Common Mistakes', level: 2 },
      { type: 'list', content: 'Anti-patterns to avoid:', items: ['Long-running pipelines without parallelization', 'Manual approval gates for every deployment', 'Ignoring flaky tests instead of fixing them', 'Not versioning pipeline definitions', 'Relying on snowflake build agents'] },
      { type: 'quote', content: 'The best CI/CD pipeline is one that developers trust. If they routinely bypass it, no amount of tooling will help.' },
    ],
  },
]

/** Paginate an array and return { data, pagination } */
function paginate<T>(items: T[], page: number, limit: number) {
  const total = items.length
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  return {
    data: items.slice(start, start + limit),
    pagination: { page, limit, total, totalPages },
  }
}

// Get all news items
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1)
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 6))

    let allItems: NewsItem[] = []
    let source = 'mock'

    // 1. Try own database first
    if (isDbConfigured()) {
      const dbItems = await getPublishedNewsItems()
      if (dbItems.length) {
        allItems = dbItems
        source = 'database'
      }
    }

    // 2. Try Contentful
    if (!allItems.length && isContentfulConfigured()) {
      const cmsItems = await getContentfulNewsItems()
      if (cmsItems.length) {
        allItems = cmsItems
        source = 'contentful'
      }
    }

    // 3. Fallback to mock data
    if (!allItems.length) {
      allItems = [...newsItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    const result = paginate(allItems, page, limit)
    res.json({ success: true, ...result, source })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch news' })
  }
})

// Get a single news item by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    let item: NewsItem | null = null
    let source = 'mock'

    // 1. Try own database
    if (isDbConfigured()) {
      const dbItem = await getPublishedNewsItem(slug)
      if (dbItem) {
        item = dbItem
        source = 'database'
      }
    }

    // 2. Fallback to mock data
    if (!item) {
      const mock = newsItems.find((n) => n.slug === slug)
      if (mock) {
        item = mock
        source = 'mock'
      }
    }

    if (!item) {
      return res.status(404).json({ success: false, error: 'News item not found' })
    }

    res.json({ success: true, data: item, source })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch news item' })
  }
})

// Export mock data for seeding
export { newsItems as mockNewsItems }
export { router as newsRouter }
