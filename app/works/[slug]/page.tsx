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
      <article className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-20">
          <header className="lg:sticky lg:top-28">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Selected work</p>
            <h1 className="max-w-2xl text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">{project.title}</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/65">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[project.formatTag, project.fidelityTag, ...project.industries].map((tag) => (
                <span key={tag} className="rounded-full border border-foreground/15 bg-foreground/[0.06] px-3 py-1.5 text-xs font-medium text-foreground/75 backdrop-blur-md">{tag}</span>
              ))}
            </div>
          </header>

          <div className={`overflow-hidden rounded-[1.5rem] border border-foreground/15 bg-foreground/[0.06] p-2 shadow-xl shadow-foreground/10 backdrop-blur-xl ${isVideo ? 'aspect-[9/16]' : 'aspect-square'}`}>
            {isVideo ? (
              <video src={project.mediaUrl} poster={project.posterUrl} controls playsInline className="h-full w-full rounded-[1.1rem] object-cover" />
            ) : (
              <img src={project.mediaUrl} alt={project.title} className="h-full w-full rounded-[1.1rem] object-cover" />
            )}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
