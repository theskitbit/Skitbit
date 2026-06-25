'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/image'

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-4 mt-8 text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-6 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-3 mt-5 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mb-2 mt-4 text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base mb-4 leading-relaxed text-foreground">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-foreground space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-foreground space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }

      return (
        <div className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Content image'}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-200 px-2 py-1 rounded font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noreferrer' : undefined}
          className="text-primary hover:underline"
        >
          {children}
        </a>
      )
    },
  },
}

interface PortableTextRendererProps {
  content: any
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return <PortableText value={content} components={components} />
}
