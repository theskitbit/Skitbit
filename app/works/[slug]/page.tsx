import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { groq } from 'next-sanity'
import { client, type WorkItem } from '@/lib/sanity/client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const WORK_ITEM_QUERY = groq`*[_type == "workItem" && slug.current == $slug][0]{
  _id,
  title,
  description,
  type,
  mediaUrl,
  posterUrl,
  formatTag,
  industries,
  fidelityTag,
  slug
}`

async function getWorkItem(slug: string) {
  return client.fetch<WorkItem | null>(WORK_ITEM_QUERY, { slug })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getWorkItem(slug)

  if (!project) return { title: 'Project not found | SKITBIT' }

  return {
    title: `${project.title} | SKITBIT`,
    description: project.description,
    alternates: { canonical: `https://theskitbit.com/works/${project.slug.current}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: `https://theskitbit.com/works/${project.slug.current}`,
      images: project.posterUrl || project.mediaUrl ? [{ url: project.posterUrl || project.mediaUrl }] : undefined,
    },
  }
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getWorkItem(slug)

  if (!project) notFound()

  const isVideo = project.type === 'animation'

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <article className="w-full border-b border-border bg-background pb-0 pt-[48px]">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <div className="relative mx-4 grid min-h-[629px] w-[calc(100%-2rem)] grid-cols-1 border-x border-border lg:mx-0 lg:w-full lg:grid-cols-2">
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-px -translate-x-1/2 bg-border lg:block" />
            <header className="flex items-end border-b border-border px-8 pb-8 pt-16 sm:px-12 lg:border-b-0 lg:px-6 lg:pb-8 xl:px-6">
              <div className="w-full max-w-[500px]">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Selected work</p>
                <h1 className="m-0 max-w-[490px] text-[54px] font-regular leading-[0.9] tracking-[-0.065em] text-foreground sm:text-[64px] lg:text-[66px] xl:text-[66px]">{project.title}</h1>
                <p className="mt-6 max-w-[430px] text-[15px] leading-[1.45] text-muted-foreground sm:text-[16px]">{project.description}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {[project.formatTag, project.fidelityTag, ...project.industries].map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">{tag}</span>
                  ))}
                </div>
              </div>
            </header>
            <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden border-b border-border bg-background p-6 lg:min-h-0 lg:border-b-0 lg:p-10">
              <div className={`w-full max-w-[560px] overflow-hidden rounded-[1.5rem] border border-border bg-muted/30 p-2 shadow-xl shadow-foreground/10 backdrop-blur-xl ${isVideo ? 'aspect-[9/16]' : 'aspect-square'}`}>
                {isVideo ? (
                  <video src={project.mediaUrl} poster={project.posterUrl} controls playsInline className="h-full w-full rounded-[1.1rem] object-cover" />
                ) : (
                  <img src={project.mediaUrl} alt={project.title} className="h-full w-full rounded-[1.1rem] object-cover" />
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
