import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | DevOps SRE Practice',
  description: 'Read our latest articles and insights on DevOps and SRE practices.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
        <p className="text-lg text-slate-400 mb-12">
          Latest insights and articles on DevOps and SRE practices
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog cards will be fetched from Contentful later */}
          <div className="p-6 bg-secondary rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-2">Coming soon...</h3>
            <p className="text-slate-400">Blog posts will be managed through Contentful</p>
          </div>
        </div>
      </div>
    </div>
  )
}
