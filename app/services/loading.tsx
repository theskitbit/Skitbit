import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16" aria-busy="true"><Skeleton className="h-14 w-2/3 max-w-xl" /><Skeleton className="h-5 w-full max-w-2xl" /><div className="grid gap-5 md:grid-cols-2">{Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-48 rounded-xl" />)}</div></main>
}
