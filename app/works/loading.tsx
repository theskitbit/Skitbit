import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16" aria-busy="true"><Skeleton className="h-14 w-2/3 max-w-lg" /><Skeleton className="h-5 w-full max-w-2xl" /><div className="flex gap-3"><Skeleton className="h-10 w-28 rounded-full" /><Skeleton className="h-10 w-28 rounded-full" /><Skeleton className="h-10 w-28 rounded-full" /></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-72 rounded-xl" />)}</div></main>
}
