export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="h-4 w-24 bg-slate-200 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-10 w-80 bg-slate-200 rounded-lg mx-auto mb-3 animate-pulse" />
          <div className="h-5 w-64 bg-slate-100 rounded-lg mx-auto animate-pulse" />
        </div>
        {/* Card skeletons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
              <div className="h-4 w-16 bg-slate-200 rounded-full animate-pulse" />
              <div className="h-6 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-slate-100 rounded animate-pulse" />
              </div>
              <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
