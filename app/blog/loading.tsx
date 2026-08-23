import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16" aria-busy="true"><Skeleton className="h-14 w-2/3 max-w-lg" /><Skeleton className="h-5 w-full max-w-2xl" /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="flex flex-col gap-3"><Skeleton className="h-56 rounded-xl" /><Skeleton className="h-6 w-4/5" /><Skeleton className="h-4 w-full" /></div>)}</div></main>
}
