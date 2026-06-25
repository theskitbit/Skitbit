/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { PortableText } from "@portabletext/react"
import type { PortableTextComponents } from "@portabletext/react"
import type { PortableTextBlock } from "sanity"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { client } from "@/lib/sanity/client"
import {
  BLOG_POST_QUERY,
  BLOG_SLUGS_QUERY,
  RELATED_BLOG_POSTS_QUERY,
} from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"

export const revalidate = 60
export const dynamicParams = true

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

type SanityImage = {
  asset?: {
    _ref?: string
    _type?: string
  }
  alt?: string
  caption?: string
}

type OverviewItem = {
  title?: string
  anchor?: string
}

interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  publishedAt?: string
  author?: string
  authorRole?: string
  authorBio?: string
  authorImage?: SanityImage
  categories?: string[]
  readTime?: number
  image?: SanityImage
  imageCaption?: string
  imageCredit?: string
  heroMediaType?: "image" | "youtube"
  youtubeUrl?: string
  overviewItems?: OverviewItem[]
  newsletterTitle?: string
  newsletterDescription?: string
  newsletterPlaceholder?: string
  newsletterButtonLabel?: string
  seoTitle?: string
  seoDescription?: string
  body?: PortableTextBlock[]
}

interface RelatedPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  publishedAt?: string
  categories?: string[]
  readTime?: number
  image?: SanityImage
  author?: string
}

function formatDate(date?: string) {
  if (!date) return "Recently published"

  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date))
  } catch {
    return "Recently published"
  }
}

function slugify(value?: string) {
  if (!value) return ""

  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function blockToText(block?: PortableTextBlock) {
  if (!block || !Array.isArray(block.children)) return ""

  return block.children
    .map((child) => {
      if (typeof child === "object" && child && "text" in child) {
        return String(child.text || "")
      }

      return ""
    })
    .join("")
}

function getImageUrl(image?: SanityImage, width = 1400, height = 900) {
  if (!image?.asset?._ref) return null

  try {
    return urlFor(image).width(width).height(height).url()
  } catch (error) {
    console.error("Failed to build Sanity image URL:", error)
    return null
  }
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null

  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace("www.", "")

    let videoId: string | null = null

    if (host === "youtu.be") {
      videoId = parsed.pathname.replace("/", "").split("/")[0]
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1]?.split("/")[0] || null
      } else {
        videoId = parsed.searchParams.get("v")
      }
    }

    if (!videoId) return null

    return `https://www.youtube.com/embed/${videoId}`
  } catch {
    return null
  }
}

function getInitials(name?: string) {
  if (!name) return "S"

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function getPostUrl(slug: string) {
  return `https://www.theskitbit.com/blog/${slug}`
}

function extractHeadings(body: PortableTextBlock[]) {
  return body
    .filter((block) => block?._type === "block")
    .filter((block) => block.style === "h2" || block.style === "h3")
    .map((block) => {
      const title = blockToText(block)

      return {
        title,
        anchor: slugify(title),
      }
    })
    .filter((item) => item.title && item.anchor)
    .slice(0, 6)
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
      {children}
    </span>
  )
}

function BlogBreadcrumbs({ post }: { post: BlogPost }) {
  const category = post.categories?.[0] || "Blog"

  return (
    <div className="border-y border-border bg-card/60 backdrop-blur">
      <div className="scrollbar-none mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto whitespace-nowrap px-4 py-3 text-xs font-semibold text-muted-foreground sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="shrink-0 transition hover:text-foreground">
          Home
        </Link>

        <span className="shrink-0">›</span>

        <Link href="/blog" className="shrink-0 transition hover:text-foreground">
          Blog
        </Link>

        <span className="shrink-0">›</span>

        <span className="shrink-0">{category}</span>

        <span className="shrink-0">›</span>

        <span className="min-w-0 truncate text-foreground">{post.title}</span>
      </div>
    </div>
  )
}

function AuthorAvatar({
  name,
  image,
  size = "large",
}: {
  name?: string
  image?: SanityImage
  size?: "small" | "large"
}) {
  const imageUrl = getImageUrl(image, 200, 200)
  const sizeClass =
    size === "small"
      ? "h-10 w-10 sm:h-11 sm:w-11"
      : "h-14 w-14 sm:h-16 sm:w-16"

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name || "Author"}
        className={`${sizeClass} shrink-0 rounded-full object-cover ring-1 ring-border`}
      />
    )
  }

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background ring-1 ring-border sm:text-sm`}
    >
      {getInitials(name)}
    </div>
  )
}

function HeroMedia({ post }: { post: BlogPost }) {
  const embedUrl =
    post.heroMediaType === "youtube"
      ? getYouTubeEmbedUrl(post.youtubeUrl)
      : null

  const imageUrl = getImageUrl(post.image, 1800, 1000)

  return (
    <section className="mx-auto mt-10 w-full max-w-[1540px] px-4 sm:mt-14 sm:px-6 lg:mt-20 lg:px-8">
      <div className="rounded-[1.35rem] border border-border bg-card p-2 shadow-[0_20px_70px_rgba(0,31,63,0.07)] sm:rounded-[2rem] sm:p-3 lg:p-4 lg:shadow-[0_34px_110px_rgba(0,31,63,0.08)]">
        <div className="relative aspect-[1/1] overflow-hidden rounded-[1.05rem] bg-muted sm:aspect-[16/10] sm:rounded-[1.5rem] lg:aspect-[16/9]">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={post.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={post.image?.alt || post.title}
                className="h-full w-full object-cover object-center"
              />

              {(post.imageCaption || post.imageCredit) && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/65 via-black/20 to-transparent px-4 py-4 text-[0.68rem] font-semibold leading-5 text-white sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-5 sm:text-xs lg:px-7">
                  <p className="max-w-xl">
                    {post.imageCaption || post.excerpt}
                  </p>

                  {post.imageCredit && (
                    <p className="shrink-0 text-white/90">
                      {post.imageCredit}
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(219,230,76,0.7),transparent_32%),linear-gradient(135deg,var(--secondary),var(--background))]">
              <div className="rounded-full border border-border bg-card/80 px-5 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur">
                Skitbit Insight
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ShareButton({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-sm font-bold text-foreground transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
    >
      {children}
    </a>
  )
}

function Sidebar({
  post,
  overviewItems,
}: {
  post: BlogPost
  overviewItems: OverviewItem[]
}) {
  const postUrl = getPostUrl(post.slug.current)
  const encodedUrl = encodeURIComponent(postUrl)
  const encodedTitle = encodeURIComponent(post.title)

  return (
    <aside className="w-full lg:sticky lg:top-24 lg:self-start">
      <div className="grid gap-5 sm:grid-cols-2 lg:block lg:space-y-8">
        <div className="rounded-[1.4rem] border border-border bg-card p-5 shadow-[0_18px_60px_rgba(0,31,63,0.05)] sm:p-6 lg:rounded-[1.75rem] lg:p-7 lg:shadow-[0_24px_80px_rgba(0,31,63,0.06)]">
          {overviewItems.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold tracking-[-0.055em] text-foreground">
                Overview
              </h2>

              <nav className="mt-5 space-y-3">
                {overviewItems.map((item) => (
                  <a
                    key={`${item.title}-${item.anchor}`}
                    href={`#${item.anchor}`}
                    className="block text-sm font-medium leading-6 text-foreground/80 transition hover:text-foreground"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>

              <div className="my-6 h-px bg-border lg:my-7" />
            </>
          )}

          <h3 className="text-base font-semibold text-foreground">
            Share this post
          </h3>

          <div className="mt-4 flex flex-wrap gap-3">
            <ShareButton
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              label="Share on Facebook"
            >
              f
            </ShareButton>

            <ShareButton
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              label="Share on X"
            >
              X
            </ShareButton>

            <ShareButton
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
              label="Share on LinkedIn"
            >
              in
            </ShareButton>

            <ShareButton
              href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
              label="Share on WhatsApp"
            >
              ☎
            </ShareButton>
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-border bg-card p-5 shadow-[0_18px_60px_rgba(0,31,63,0.05)] sm:p-6 lg:rounded-[1.75rem] lg:p-7 lg:shadow-[0_24px_80px_rgba(0,31,63,0.06)]">
          <p className="text-base font-semibold leading-7 text-foreground">
            {post.newsletterTitle ||
              "Get sharper ideas on 3D product visuals, CGI ads, and creative systems for premium D2C brands."}
          </p>

          {post.newsletterDescription && (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {post.newsletterDescription}
            </p>
          )}

          <form className="mt-6 flex flex-col gap-3 sm:mt-7 lg:flex-row">
            <input
              type="email"
              placeholder={post.newsletterPlaceholder || "name@email.com"}
              className="min-w-0 flex-1 rounded-xl border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring"
            />

            <button
              type="submit"
              className="rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
            >
              {post.newsletterButtonLabel || "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const image = value as SanityImage
      const imageUrl = getImageUrl(image, 1200, 800)

      if (!imageUrl) return null

      return (
        <figure className="my-8 sm:my-10">
          <img
            src={imageUrl}
            alt={image.alt || ""}
            className="w-full rounded-[1.1rem] border border-border object-cover shadow-[0_18px_60px_rgba(0,31,63,0.06)] sm:rounded-[1.5rem]"
          />

          {image.caption && (
            <figcaption className="mt-3 text-center text-xs font-medium text-muted-foreground">
              {image.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    callout: ({ value }) => {
      const callout = value as {
        title?: string
        body?: string
      }

      return (
        <aside className="my-8 rounded-[1.25rem] border border-border bg-secondary p-5 text-foreground sm:my-10 sm:rounded-[1.5rem] sm:p-7">
          {callout.title && (
            <h3 className="mb-3 text-xl font-semibold tracking-[-0.04em]">
              {callout.title}
            </h3>
          )}

          {callout.body && (
            <p className="text-base leading-8 text-foreground/80">
              {callout.body}
            </p>
          )}
        </aside>
      )
    },
  },

  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-base leading-8 text-foreground sm:mb-7 sm:text-[1.05rem]">
        {children}
      </p>
    ),

    h2: ({ children, value }) => {
      const id = slugify(blockToText(value as PortableTextBlock))

      return (
        <h2
          id={id}
          className="scroll-mt-28 pb-2 pt-7 text-2xl font-semibold leading-tight tracking-[-0.055em] text-foreground sm:scroll-mt-32 sm:pt-8 sm:text-4xl"
        >
          {children}
        </h2>
      )
    },

    h3: ({ children, value }) => {
      const id = slugify(blockToText(value as PortableTextBlock))

      return (
        <h3
          id={id}
          className="scroll-mt-28 pb-2 pt-6 text-xl font-semibold leading-tight tracking-[-0.045em] text-foreground sm:scroll-mt-32 sm:text-2xl"
        >
          {children}
        </h3>
      )
    },

    h4: ({ children }) => (
      <h4 className="pb-2 pt-5 text-lg font-semibold tracking-[-0.035em] text-foreground sm:text-xl">
        {children}
      </h4>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-8 rounded-[1.25rem] border border-border bg-secondary p-5 text-lg font-medium leading-8 tracking-[-0.035em] text-foreground sm:my-10 sm:rounded-[1.5rem] sm:p-7 sm:text-xl sm:leading-9">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-7 ml-5 list-disc space-y-3 text-base leading-8 text-foreground sm:mb-8 sm:ml-6 sm:text-[1.05rem]">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="mb-7 ml-5 list-decimal space-y-3 text-base leading-8 text-foreground sm:mb-8 sm:ml-6 sm:text-[1.05rem]">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="pl-1 sm:pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-1 sm:pl-2">{children}</li>,
  },

  marks: {
    link: ({ children, value }) => {
      const link = value as {
        href?: string
      }

      const href = link?.href || "#"
      const isExternal = href.startsWith("http")

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="break-words font-semibold text-accent underline underline-offset-4 transition hover:text-foreground"
        >
          {children}
        </a>
      )
    },

    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),

    em: ({ children }) => <em>{children}</em>,
  },
}

function AuthorBox({ post }: { post: BlogPost }) {
  return (
    <section className="mt-12 border-y border-border py-8 sm:mt-14 sm:py-10">
      <div className="flex flex-col gap-5 sm:flex-row">
        <AuthorAvatar name={post.author} image={post.authorImage} />

        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            About the Author
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-foreground">
            {post.author || "Skitbit Team"}
          </h2>

          {post.authorRole && (
            <p className="mt-1 text-sm font-semibold text-muted-foreground">
              {post.authorRole}
            </p>
          )}

          {post.authorBio && (
            <p className="mt-5 max-w-2xl text-sm leading-7 text-foreground/80">
              {post.authorBio}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (!Array.isArray(posts) || posts.length === 0) return null

  return (
    <section className="bg-card/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold text-muted-foreground">
          You may also like these
        </p>

        <h2 className="text-3xl font-semibold tracking-[-0.065em] text-foreground sm:text-4xl lg:text-5xl">
          Related Posts
        </h2>

        <div className="mt-8 grid gap-5 sm:mt-9 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {posts.map((post) => {
            const imageUrl = getImageUrl(post.image, 800, 600)

            return (
              <article
                key={post._id}
                className="group rounded-[1.4rem] border border-border bg-card p-3 shadow-[0_18px_60px_rgba(0,31,63,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(0,31,63,0.11)] sm:rounded-[1.65rem]"
              >
                <Link href={`/blog/${post.slug.current}`} className="block">
                  <div className="aspect-[1.28/1] overflow-hidden rounded-[1.15rem] bg-secondary sm:rounded-[1.3rem]">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={post.image?.alt || post.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(219,230,76,0.7),transparent_32%),linear-gradient(135deg,var(--secondary),var(--background))]">
                        <span className="rounded-full bg-card/80 px-4 py-2 text-xs font-semibold text-foreground">
                          Skitbit
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="px-2 pb-3 pt-5">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Pill>{post.categories?.[0] || "Insight"}</Pill>

                      <span className="text-xs font-semibold text-muted-foreground">
                        • {post.readTime || 7} min read
                      </span>
                    </div>

                    <h3 className="overflow-hidden text-xl font-semibold leading-[1.16] tracking-[-0.055em] text-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:text-2xl">
                      {post.title}
                    </h3>

                    <div className="mt-6 border-t border-border pt-5 sm:mt-7">
                      <div className="flex justify-between gap-5 text-xs text-muted-foreground">
                        <div>
                          <p>Written by</p>
                          <p className="mt-1 font-semibold text-foreground">
                            {post.author || "Skitbit Team"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p>Posted on</p>
                          <p className="mt-1 font-semibold text-foreground">
                            {formatDate(post.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(BLOG_SLUGS_QUERY)

    if (!Array.isArray(slugs)) return []

    return slugs
      .filter(Boolean)
      .map((slug) => ({
        slug,
      }))
  } catch (error) {
    console.error("Failed to generate blog static params:", error)
    return []
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  let post: BlogPost | null = null

  try {
    post = await client.fetch<BlogPost | null>(BLOG_POST_QUERY, { slug })
  } catch (error) {
    console.error("Failed to fetch blog metadata:", error)
  }

  if (!post) {
    return {
      title: "Blog Post | Skitbit",
    }
  }

  const title = post.seoTitle || `${post.title} | Skitbit`
  const description =
    post.seoDescription ||
    post.excerpt ||
    "Insights from Skitbit on 3D product rendering, product animation, creative strategy, and performance marketing."

  const imageUrl = getImageUrl(post.image, 1200, 630)

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${slug}`,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  let post: BlogPost | null = null

  try {
    post = await client.fetch<BlogPost | null>(BLOG_POST_QUERY, { slug })
  } catch (error) {
    console.error("Failed to fetch blog post:", error)
  }

  if (!post) {
    notFound()
  }

  let relatedPosts: RelatedPost[] = []

  try {
    relatedPosts = await client.fetch<RelatedPost[]>(
      RELATED_BLOG_POSTS_QUERY,
      {
        slug,
      }
    )
  } catch (error) {
    console.error("Failed to fetch related blog posts:", error)
    relatedPosts = []
  }

  const safeBody = Array.isArray(post.body) ? post.body : []
  const bodyHeadings = extractHeadings(safeBody)

  const manualOverviewItems =
    Array.isArray(post.overviewItems)
      ? post.overviewItems
          .filter((item) => item.title)
          .map((item) => ({
            title: item.title,
            anchor: slugify(item.anchor || item.title || ""),
          }))
      : []

  const overviewItems =
    manualOverviewItems.length > 0 ? manualOverviewItems : bodyHeadings

  const category = post.categories?.[0] || "Insight"

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <BlogBreadcrumbs post={post} />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_50%_0%,rgba(219,230,76,0.28),transparent_42%)] sm:h-[520px]" />

        <div className="relative mx-auto max-w-4xl px-4 pt-14 text-center sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:mb-7">
            <Pill>{category}</Pill>

            <span className="text-xs font-semibold text-muted-foreground">
              • {post.readTime || 7} min read
            </span>
          </div>

          <h1 className="text-balance text-[2.15rem] font-semibold leading-[1.07] tracking-[-0.075em] text-foreground sm:text-[3.2rem] lg:text-[4.1rem]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mx-auto mt-5 max-w-2xl text-balance text-sm leading-7 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8 lg:mt-8 lg:text-lg">
              {post.excerpt}
            </p>
          )}

          <div className="mx-auto mt-7 h-px max-w-3xl bg-border sm:mt-10" />

          <div className="mx-auto mt-6 grid max-w-3xl gap-5 text-left sm:mt-8 sm:grid-cols-3 sm:items-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <AuthorAvatar
                name={post.author}
                image={post.authorImage}
                size="small"
              />

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Written by</p>
                <p className="mt-1 truncate text-sm font-semibold text-foreground">
                  {post.author || "Skitbit Team"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Read Time</p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {post.readTime || 7} min read
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-xs text-muted-foreground">Posted on</p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {formatDate(post.publishedAt)}
              </p>
            </div>
          </div>
        </div>

        <HeroMedia post={post} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,760px)_minmax(300px,360px)] lg:items-start lg:justify-center lg:gap-14">
          <article className="min-w-0">
            {safeBody.length > 0 ? (
              <PortableText
                value={safeBody}
                components={portableTextComponents}
              />
            ) : (
              <div className="rounded-[1.25rem] border border-border bg-card p-5 sm:rounded-[1.5rem] sm:p-7">
                <p className="text-base leading-8 text-foreground">
                  {post.excerpt ||
                    "This post has been created in Sanity, but the article body is still empty."}
                </p>
              </div>
            )}

            <AuthorBox post={post} />

            {relatedPosts[0] && (
              <div className="mt-10 flex justify-start sm:mt-12 sm:justify-end">
                <Link
                  href={`/blog/${relatedPosts[0].slug.current}`}
                  className="group w-full max-w-sm rounded-[1.25rem] border border-border bg-card p-5 text-left shadow-[0_18px_60px_rgba(0,31,63,0.055)] transition hover:-translate-y-1 sm:text-right"
                >
                  <p className="text-sm font-semibold text-foreground">
                    Next Post <span className="ml-2">›</span>
                  </p>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground transition group-hover:text-foreground">
                    {relatedPosts[0].title}
                  </p>
                </Link>
              </div>
            )}
          </article>

          <Sidebar post={post} overviewItems={overviewItems} />
        </div>
      </section>

      <RelatedPosts posts={relatedPosts} />

      <Footer />
    </main>
  )
}