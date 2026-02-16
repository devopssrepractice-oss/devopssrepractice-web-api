import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News | DevOps SRE Practice',
  description: 'Latest news and updates about DevOps and SRE industry.',
}

export default function NewsPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4">News</h1>
        <p className="text-lg text-slate-400 mb-12">
          Latest news and updates from the DevOps and SRE industry
        </p>
        
        <div className="space-y-8">
          {/* News items will be fetched from Contentful later */}
          <div className="p-6 bg-secondary rounded-lg border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-2">Coming soon...</h3>
            <p className="text-slate-400">News updates will be managed through Contentful</p>
          </div>
        </div>
      </div>
    </div>
  )
}
