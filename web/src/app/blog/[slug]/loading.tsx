export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Back link skeleton */}
        <div className="h-4 w-24 bg-slate-200 rounded-full mb-8 animate-pulse" />
        {/* Tag skeleton */}
        <div className="h-5 w-20 bg-slate-200 rounded-full mb-4 animate-pulse" />
        {/* Title skeleton */}
        <div className="space-y-3 mb-6">
          <div className="h-10 w-full bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-10 w-2/3 bg-slate-200 rounded-lg animate-pulse" />
        </div>
        {/* Meta skeleton */}
        <div className="flex gap-4 mb-12">
          <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
          <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
        </div>
        {/* Content skeleton */}
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-11/12 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-slate-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
