'use client'

import Link from 'next/link'

const oldWay = [
  'Expensive physical shoots for every new campaign',
  'Weeks lost to studios, samples, reshoots, and logistics',
  'Inconsistent lighting and product presentation across channels',
]

const skitbitWay = [
  'An agile 3D pipeline that keeps your creative queue moving',
  'Perfect brand consistency across every product and variation',
  'Rapid ad iteration built for performance marketing and testing',
]

export function WhatWeOffer() {
  return (
    <section id="services" className="border-t border-border bg-background py-24 sm:py-28" aria-label="The old way versus the Skitbit way">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">A better creative operating system</p>
          <h2 className="m-0 text-4xl font-medium leading-[0.98] tracking-[-0.055em] text-foreground sm:text-5xl lg:text-6xl">
            Stop buying one-off content. Build a pipeline that compounds.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-muted/30 p-7 sm:p-9">
            <p className="mb-8 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">The old way</p>
            <ul className="m-0 space-y-5 p-0" role="list">
              {oldWay.map((item) => (
                <li key={item} className="flex gap-4 border-t border-border pt-5 text-lg leading-snug text-muted-foreground">
                  <span aria-hidden="true" className="mt-1 text-muted-foreground">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-foreground/15 bg-foreground p-7 text-background shadow-2xl sm:p-9">
            <p className="mb-8 text-sm font-medium uppercase tracking-[0.16em] text-background/60">The Skitbit way</p>
            <ul className="m-0 space-y-5 p-0" role="list">
              {skitbitWay.map((item) => (
                <li key={item} className="flex gap-4 border-t border-background/20 pt-5 text-lg leading-snug text-background/90">
                  <span aria-hidden="true" className="mt-1 text-background">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-background/70 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:p-7">
          <p className="m-0 max-w-xl text-base leading-relaxed text-muted-foreground">
            One monthly retainer. Fresh 3D concepts, product visuals, and ad variations ready when your growth team needs them.
          </p>
          <Link href="/pricing" className="btn-ghost inline-flex h-11 shrink-0 items-center justify-center rounded-full px-6 text-sm font-medium">
            See Retainer Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
