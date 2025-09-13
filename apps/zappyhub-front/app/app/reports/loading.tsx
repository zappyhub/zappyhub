import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-48" />
      </div>

      {/* Filters skeleton */}
      <Card className="p-6">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </Card>

      {/* Charts skeleton */}
      <div className="grid gap-6">
        <Card className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex items-center justify-center h-80">
            <LoadingSpinner size="lg" />
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          </Card>
          <Card className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
