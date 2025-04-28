import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-[240px]">
        {/* Top navbar skeleton */}
        <div className="h-14 border-b bg-white px-4 sm:px-6 flex items-center justify-between">
          <Skeleton className="h-8 w-40" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="p-4 sm:p-6">
          {/* Top section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-36" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-9 w-32" />
          </div>

          {/* Scheme details card skeleton */}
          <div className="border rounded-lg shadow-sm p-6 mb-6">
            <div className="mb-4">
              <Skeleton className="h-7 w-40 mb-2" />
              <Skeleton className="h-5 w-24" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Left column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-20 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-36 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array(8)
                      .fill(null)
                      .map((_, index) => (
                        <div key={index} className="space-y-2">
                          <Skeleton className="h-5 w-20" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                      ))}
                  </div>
                  <div className="mt-6">
                    <Skeleton className="h-5 w-12 mb-2" />
                    <div className="flex flex-wrap gap-2">
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <Skeleton key={index} className="h-6 w-20" />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
