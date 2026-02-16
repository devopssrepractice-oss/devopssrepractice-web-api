import { Router, Request, Response } from 'express'
import { BlogPost, ContentBlock } from '../types'
import {
  isContentfulConfigured,
  getContentfulBlogPosts,
  getContentfulBlogPost,
} from '../services/contentfulService'
import { getPublishedBlogPosts, getPublishedBlogPost } from '../services/cmsService'
import { isDbConfigured } from '../services/database'

const router = Router()

// Full blog data — used as fallback when no DB/CMS is configured
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'kubernetes-production-best-practices',
    title: 'Kubernetes in Production: 10 Best Practices You Need to Know',
    excerpt:
      'Running Kubernetes in production requires careful planning. Here are the battle-tested practices we use for every production cluster.',
    publishedDate: '2024-12-15',
    readTime: '8 min read',
    tag: 'Kubernetes',
    tagColor: 'bg-blue-100 text-blue-700',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', content: 'Running Kubernetes in production requires careful planning, operational maturity, and a solid understanding of the platform. This guide covers the battle-tested practices we use for every production cluster.' },
      { type: 'heading', content: '1. Namespace Isolation', level: 2 },
      { type: 'paragraph', content: 'Namespace isolation is the first line of defence. Separate your workloads by team, environment, or application using namespaces with resource quotas and limit ranges. This prevents a rogue deployment from consuming all cluster resources.' },
      { type: 'code', content: 'apiVersion: v1\nkind: ResourceQuota\nmetadata:\n  name: team-quota\n  namespace: team-alpha\nspec:\n  hard:\n    requests.cpu: \"4\"\n    requests.memory: 8Gi\n    limits.cpu: \"8\"\n    limits.memory: 16Gi\n    pods: \"20\"', language: 'yaml' },
      { type: 'heading', content: '2. Resource Requests & Limits', level: 2 },
      { type: 'paragraph', content: 'Resource requests and limits should be set on every pod. Requests guarantee a minimum allocation, while limits cap maximum usage. Without these, the scheduler cannot make informed placement decisions and you risk noisy-neighbour issues.' },
      { type: 'heading', content: '3. Pod Disruption Budgets', level: 2 },
      { type: 'paragraph', content: 'Use Pod Disruption Budgets (PDBs) to tell Kubernetes how many pods can be unavailable during voluntary disruptions like node drains or cluster upgrades. This keeps your service available during maintenance windows.' },
      { type: 'heading', content: '4. Health Checks', level: 2 },
      { type: 'paragraph', content: 'Implement health checks with readiness and liveness probes. Readiness probes prevent traffic from reaching pods that are not ready to serve, while liveness probes restart pods stuck in a broken state.' },
      { type: 'code', content: 'readinessProbe:\n  httpGet:\n    path: /healthz\n    port: 8080\n  initialDelaySeconds: 5\n  periodSeconds: 10\nlivenessProbe:\n  httpGet:\n    path: /healthz\n    port: 8080\n  initialDelaySeconds: 15\n  periodSeconds: 20', language: 'yaml' },
      { type: 'heading', content: '5. GitOps for Deployments', level: 2 },
      { type: 'paragraph', content: 'Adopt GitOps with ArgoCD or Flux for declarative, auditable deployments. Every change goes through version control, giving you a full audit trail and easy rollback capabilities.' },
      { type: 'quote', content: 'GitOps is to infrastructure what version control was to application code — once you adopt it, you wonder how you ever lived without it.' },
      { type: 'heading', content: '6. Network Policies', level: 2 },
      { type: 'paragraph', content: 'Network policies are essential for zero-trust networking within your cluster. Define explicit ingress and egress rules to control which pods can communicate with each other.' },
      { type: 'list', content: 'Key autoscaling tools:', items: ['Horizontal Pod Autoscaler (HPA) for application-level scaling', 'Cluster Autoscaler for node-level scaling', 'KEDA for event-driven autoscaling', 'VPA for right-sizing resource requests'] },
      { type: 'paragraph', content: 'Centralise logging and monitoring from day one. Ship logs to a central platform, export metrics to Prometheus, and set up alerting based on SLOs rather than arbitrary thresholds.' },
      { type: 'paragraph', content: 'Finally, practice chaos engineering. Regularly test your failure modes with tools like Chaos Monkey or Litmus to validate that your resilience patterns actually work under pressure.' },
    ],
  },
  {
    id: '2',
    slug: 'gitops-argocd-guide',
    title: 'GitOps with ArgoCD: A Complete Implementation Guide',
    excerpt:
      'Implement declarative, version-controlled infrastructure and application deployments with ArgoCD and GitOps principles.',
    publishedDate: '2024-12-08',
    readTime: '12 min read',
    tag: 'GitOps',
    tagColor: 'bg-purple-100 text-purple-700',
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', content: 'GitOps is a paradigm where your Git repository is the single source of truth for your infrastructure and application deployments. ArgoCD is the leading GitOps operator for Kubernetes.' },
      { type: 'paragraph', content: 'The core principle is simple: declare your desired state in Git, and let ArgoCD continuously reconcile your cluster to match. If someone makes a manual change, ArgoCD detects the drift and can automatically correct it.' },
      { type: 'heading', content: 'Getting Started with ArgoCD', level: 2 },
      { type: 'code', content: 'kubectl create namespace argocd\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/ha/install.yaml', language: 'bash' },
      { type: 'paragraph', content: 'Organise your repositories with a clear structure. Separate application source code from deployment manifests. Use Helm charts or Kustomize overlays for environment-specific configuration.' },
      { type: 'paragraph', content: 'Application definitions in ArgoCD should use the App of Apps pattern for managing multiple services. This lets you bootstrap an entire environment from a single root application.' },
      { type: 'quote', content: 'With ArgoCD, every deployment becomes auditable, repeatable, and reversible. That is the promise of GitOps done right.' },
      { type: 'paragraph', content: 'Configure sync policies carefully. Auto-sync is convenient but can be risky if someone merges a broken manifest. Consider using auto-sync with self-heal but requiring manual sync for production.' },
    ],
  },
  {
    id: '3',
    slug: 'terraform-modules-at-scale',
    title: 'Scaling Terraform: Module Architecture for Large Organizations',
    excerpt:
      'How to structure Terraform modules, workspaces, and state management for teams managing hundreds of cloud resources.',
    publishedDate: '2024-11-28',
    readTime: '10 min read',
    tag: 'IaC',
    tagColor: 'bg-emerald-100 text-emerald-700',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', content: 'As your infrastructure grows, managing Terraform becomes increasingly complex. Module architecture is the key to maintaining sanity at scale.' },
      { type: 'paragraph', content: 'Structure your Terraform code into three layers: foundational modules (networking, IAM), platform modules (EKS, RDS, S3), and application modules that compose platform modules for specific services.' },
      { type: 'code', content: 'module \"vpc\" {\n  source  = \"./modules/networking/vpc\"\n  version = \"2.1.0\"\n\n  cidr_block = var.vpc_cidr\n  azs        = var.availability_zones\n  tags       = var.common_tags\n}', language: 'hcl' },
      { type: 'paragraph', content: 'Use remote state with locking. Terraform Cloud, S3+DynamoDB, or GCS backends all support state locking to prevent concurrent modifications. Never store state locally in production.' },
      { type: 'list', content: 'Best practices for modules:', items: ['Pin module versions using semantic versioning', 'Use variable validation blocks for early error catching', 'Implement automated Terraform in CI/CD pipelines', 'Use Atlantis or Terraform Cloud for automated plan/apply'] },
      { type: 'paragraph', content: 'Automate Terraform with CI/CD. Run plans on pull requests, require approval for applies, and store plan output as artifacts for audit trails.' },
    ],
  },
  {
    id: '4',
    slug: 'slo-error-budgets',
    title: 'SLOs and Error Budgets: The SRE Approach to Reliability',
    excerpt:
      'Define meaningful Service Level Objectives, calculate error budgets, and use them to make data-driven reliability decisions.',
    publishedDate: '2024-11-20',
    readTime: '7 min read',
    tag: 'SRE',
    tagColor: 'bg-amber-100 text-amber-700',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', content: 'Service Level Objectives (SLOs) are the cornerstone of Site Reliability Engineering. They define how reliable your service needs to be, not how reliable it can be.' },
      { type: 'paragraph', content: 'Start with Service Level Indicators (SLIs) — the metrics that matter to your users. Availability, latency, throughput, and error rate are the classic four.' },
      { type: 'heading', content: 'Understanding Error Budgets', level: 2 },
      { type: 'paragraph', content: 'The error budget is the difference between perfect and your SLO target. With a 99.9% SLO, your error budget is 0.1%. This is a quantified risk appetite that your team can spend on shipping features.' },
      { type: 'quote', content: 'When the error budget is healthy, move fast and ship features. When it is depleted, freeze feature releases and focus on reliability improvements.' },
      { type: 'list', content: 'Error budget policy tiers:', items: ['50% consumed — increase monitoring and alerting', '75% consumed — slow down releases', '100% consumed — implement a feature freeze', 'Quarterly review and SLO adjustment'] },
      { type: 'paragraph', content: 'Review SLOs quarterly. As your service evolves, your reliability targets should evolve too. Over-provisioning reliability wastes engineering effort; under-provisioning burns user trust.' },
    ],
  },
  {
    id: '5',
    slug: 'observability-opentelemetry',
    title: 'Building an Observability Stack with OpenTelemetry',
    excerpt:
      'Unified metrics, logs, and traces with OpenTelemetry. A practical guide to instrumenting your services for full observability.',
    publishedDate: '2024-11-12',
    readTime: '15 min read',
    tag: 'Observability',
    tagColor: 'bg-pink-100 text-pink-700',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', content: 'OpenTelemetry (OTel) is the CNCF project that provides a unified framework for collecting metrics, logs, and traces. It is vendor-neutral and rapidly becoming the industry standard.' },
      { type: 'heading', content: 'The Three Pillars', level: 2 },
      { type: 'paragraph', content: 'The three pillars of observability — metrics, logs, and traces — each tell a different part of the story. Metrics show trends, logs show details, and traces show request flow across services.' },
      { type: 'code', content: 'import { trace } from \"@opentelemetry/api\";\n\nconst tracer = trace.getTracer(\"my-service\");\n\nasync function handleRequest(req: Request) {\n  const span = tracer.startSpan(\"handleRequest\");\n  try {\n    // your logic here\n    span.setAttribute(\"user.id\", req.userId);\n  } finally {\n    span.end();\n  }\n}', language: 'typescript' },
      { type: 'paragraph', content: 'Deploy the OpenTelemetry Collector as your telemetry pipeline. It receives, processes, and exports telemetry data. Use it to filter, sample, enrich, and route data to your backends.' },
      { type: 'list', content: 'Recommended backend stack:', items: ['Prometheus + Grafana for metrics', 'Jaeger or Tempo for traces', 'Loki or Elasticsearch for logs', 'OpenTelemetry Collector for fan-out'] },
      { type: 'paragraph', content: 'Use span attributes to add business context to your traces. Tag spans with customer ID, feature flags, or deployment version to enable powerful query-time filtering.' },
    ],
  },
  {
    id: '6',
    slug: 'github-actions-advanced',
    title: 'Advanced GitHub Actions: Custom Runners, Matrices & Reusable Workflows',
    excerpt:
      'Go beyond basic CI/CD with self-hosted runners, build matrices, composite actions, and reusable workflow patterns.',
    publishedDate: '2024-11-05',
    readTime: '9 min read',
    tag: 'CI/CD',
    tagColor: 'bg-cyan-100 text-cyan-700',
    coverImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', content: 'GitHub Actions is more than just a simple CI tool. With custom runners, build matrices, and reusable workflows, you can build sophisticated automation pipelines.' },
      { type: 'heading', content: 'Build Matrices', level: 2 },
      { type: 'paragraph', content: 'Build matrices let you test across multiple configurations in parallel. Define a matrix of OS versions, language versions, and dependency versions to catch compatibility issues early.' },
      { type: 'code', content: 'strategy:\n  matrix:\n    os: [ubuntu-latest, macos-latest]\n    node: [18, 20, 22]\n    include:\n      - os: ubuntu-latest\n        node: 22\n        coverage: true', language: 'yaml' },
      { type: 'heading', content: 'Reusable Workflows', level: 2 },
      { type: 'paragraph', content: 'Reusable workflows (workflow_call) are the key to DRY CI/CD. Define your build, test, and deploy pipelines once and call them from any repository.' },
      { type: 'list', content: 'CI/CD best practices:', items: ['Use concurrency groups to prevent parallel conflicts', 'Implement path filters for targeted CI', 'Cache dependencies aggressively', 'Use composite actions for common patterns'] },
      { type: 'paragraph', content: 'Cache aggressively. Use actions/cache for dependency caches and docker/build-push-action with GitHub Container Registry for Docker layer caching.' },
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

// Get all blog posts (without content for listing)
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1)
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 6))

    let allPosts: Omit<BlogPost, 'content'>[] = []
    let source = 'mock'

    // 1. Try own database first
    if (isDbConfigured()) {
      const dbPosts = await getPublishedBlogPosts()
      if (dbPosts.length) {
        allPosts = dbPosts.map(({ content, ...rest }) => rest)
        source = 'database'
      }
    }

    // 2. Try Contentful
    if (!allPosts.length && isContentfulConfigured()) {
      const cmsPosts = await getContentfulBlogPosts()
      if (cmsPosts.length) {
        allPosts = cmsPosts.map(({ content, ...rest }) => rest)
        source = 'contentful'
      }
    }

    // 3. Fallback to mock data
    if (!allPosts.length) {
      allPosts = blogPosts
        .map(({ content, ...rest }) => rest)
        .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    }

    const result = paginate(allPosts, page, limit)
    res.json({ success: true, ...result, source })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch posts' })
  }
})

// Get blog post by slug (with full content)
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    // 1. Try own database first
    if (isDbConfigured()) {
      const dbPost = await getPublishedBlogPost(req.params.slug)
      if (dbPost) {
        return res.json({ success: true, data: dbPost, source: 'database' })
      }
    }

    // 2. Try Contentful
    if (isContentfulConfigured()) {
      const cmsPost = await getContentfulBlogPost(req.params.slug)
      if (cmsPost) {
        return res.json({ success: true, data: cmsPost, source: 'contentful' })
      }
    }

    // 3. Fallback to mock data
    const post = blogPosts.find((p) => p.slug === req.params.slug)

    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' })
    }

    res.json({ success: true, data: post, source: 'mock' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch post' })
  }
})

// Export mock data for seeding
export { blogPosts as mockBlogPosts }
export { router as blogRouter }
