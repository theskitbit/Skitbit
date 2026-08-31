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
  seoTitle,
  seoDescription,
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

  const title = project.seoTitle || `${project.title} | SKITBIT`
  const description = project.seoDescription || project.description
  const canonical = `https://theskitbit.com/works/${project.slug.current}`
  const image = project.posterUrl || (project.type === 'render' ? project.mediaUrl : undefined)

  return {
    title,
    description,
    metadataBase: new URL('https://theskitbit.com'),
    alternates: { canonical },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-video-preview': -1 },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      siteName: 'Skitbit',
      images: image ? [{ url: image, alt: project.title }] : undefined,
    },
    twitter: { card: 'summary_large_image', title, description, images: image ? [image] : undefined },
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
            <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden border-b border-border bg-muted lg:min-h-0 lg:border-b-0">
              <div className={`relative h-full min-h-[520px] w-full overflow-hidden ${isVideo ? 'aspect-[9/16] lg:aspect-auto' : 'aspect-square lg:aspect-auto'}`}>
                {isVideo ? (
                  <video src={project.mediaUrl} poster={project.posterUrl} controls playsInline className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <img src={project.mediaUrl} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
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
