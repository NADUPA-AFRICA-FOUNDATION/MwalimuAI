import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLoading() {
  return (
    <div className="space-y-7">
      {/* Welcome banner */}
      <Skeleton className="h-40 w-full rounded-2xl" />

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>

      {/* Continue learning */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-36 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
      </div>

      {/* Quick actions */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-28 rounded" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Streak */}
      <Skeleton className="h-28 rounded-2xl" />
    </div>
  )
}
