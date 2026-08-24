'use client'

import type React from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { workItems } from '@/lib/work-data'

const FIREWORK_MODULE_SCRIPT = 'https://asset.fwcdn3.com/js/module/fwn.js'
const FIREWORK_LEGACY_SCRIPT = 'https://asset.fwcdn3.com/js/fwn.js'

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'fw-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        widget_config_id?: string
        autoplay?: string
        loop?: string
        muted?: string
      }
    }
  }
}

export function FireworkWidget() {

  return (
    <section className="w-full pb-12 sm:pb-14 lg:pb-16">
      <Script src={FIREWORK_MODULE_SCRIPT} strategy="afterInteractive" type="module" />
      <Script src={FIREWORK_LEGACY_SCRIPT} strategy="afterInteractive" noModule />
      <style jsx global>{`
        fw-widget { display: block !important; width: 100% !important; min-height: 400px !important; height: 100% !important; }
        fw-widget > div, fw-widget iframe { width: 100% !important; height: 100% !important; }
      `}</style>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our 3D Product Rendering Portfolio</h2>
          <Link href="/works" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-foreground/15 bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:scale-[1.03] hover:border-foreground/30 hover:bg-foreground/5 focus:outline-none focus-ring active:scale-[0.98]">View All</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {workItems.map((item) => (
            <Link
              key={item.id}
              href={`/works#${item.id}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-muted"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(event) => {
                  event.currentTarget.src = '/images/Mousse-care-cheek-handy.webp'
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                <span className="flex size-12 items-center justify-center rounded-full bg-background/90 text-foreground">▶</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
