import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-12rem)]">
        {/* Conversations list skeleton */}
        <Card className="lg:col-span-1 p-4">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>
        </Card>

        {/* Chat area skeleton */}
        <Card className="lg:col-span-2 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <p className="text-muted-foreground">Carregando conversas...</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
