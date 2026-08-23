import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className="min-h-screen bg-background" aria-busy="true" aria-label="Loading page">
      <div className="border-b border-border px-5 py-4"><Skeleton className="mx-auto h-8 w-full max-w-7xl" /></div>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-12 w-2/3 max-w-xl" />
        <Skeleton className="h-5 w-full max-w-2xl" />
        <Skeleton className="h-80 w-full rounded-xl" />
        <div className="grid gap-4 md:grid-cols-3"><Skeleton className="h-48" /><Skeleton className="h-48" /><Skeleton className="h-48" /></div>
      </div>
    </main>
  )
}
