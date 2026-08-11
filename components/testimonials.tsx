'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { animate, motion, useMotionValue } from 'framer-motion'

type Testimonial = {
  name: string
  image: string
  category: string
  role: string
  headline: string
  text: string
}

const TESTIMONIALS: Testimonial[] = [
  { name: 'Farooq Abraham', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Skyborne-p4ezaqFZ5OfdsvHpwahK8hQpOCamyf.png', category: 'SKYBORNE', role: 'Founder', headline: 'Endless assets. Zero reshoots.', text: 'We went from struggling with creatives to a full pipeline of high-performing assets for ads, PDPs, and social.' },
  { name: 'MESSIKA Paris', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Messika-qejIUYic4Yr2Ll5RU7os9DNNdgGIqJ.png', category: 'Luxury jewellery', role: 'Luxury brand', headline: 'Perfect brand consistency.', text: 'The biggest win was consistency. Every product and every campaign finally looks like one cohesive brand.' },
  { name: 'Joe Niehaus', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Skinny.rx-8WN3MckWWMQPMDKhdXo8iASOv4vQKK.png', category: 'Skinny.Rx', role: 'Growth Manager', headline: 'No more photoshoot delays.', text: 'Faster launches, better creatives, and no dependency on shoots. This changed how we produce content.' },
  { name: 'Wilder Polycarpe', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HerFantasyBox-B6XxTEH5jYtYcPFtMaxBWX2xIarg4t.png', category: 'HerFantasyBox', role: 'Co-founder', headline: 'One streamlined workflow.', text: 'Our team saves so much time now. What used to take multiple vendors is handled in one streamlined process.' },
  { name: 'Nadine Schürmann', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plan%20B-pZTphn7CFyGcxlfnSqeXbfzbouJQZI.png', category: 'Plan B Cosmetics', role: 'Founder', headline: 'Flawless execution.', text: 'They did everything according to my ideas, responded to every request, and I would book the service again.' },
  { name: 'Angelica Angulo', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Palladio-4gVgAm7yrCStetxUP88iEXM1CTtJkY.png', category: 'PALLADIO Beauty', role: 'Social Media Manager', headline: 'Precision and creativity.', text: 'They took our idea and turned it into a wonderful project with great precision and creativity.' },
]

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const dragStartRef = useRef(0)
  const loopWidth = TESTIMONIALS.length * (typeof window !== 'undefined' && window.innerWidth < 640 ? 344 : 444)
  const maxDragDistance = typeof window !== 'undefined' && window.innerWidth < 640 ? 300 : 380
  const resume = () => {
    animationRef.current?.stop()
    const current = x.get()
    animationRef.current = animate(x, current - loopWidth, {
      ease: 'linear', duration: Math.max(0.1, (loopWidth + current) / 38), repeat: Infinity, repeatType: 'loop', repeatDelay: 0,
    })
  }
  const pause = () => animationRef.current?.stop()

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) resume()
    return () => animationRef.current?.stop()
  }, [loopWidth])

  return (
    <section id="testimonials" className="overflow-hidden bg-background py-16 lg:py-28">
      <div className="mx-auto mb-12 w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <span className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground">Client Proof</span>
        <h2 className="mt-6 text-[34px] font-bold leading-tight tracking-[-0.055em] text-foreground sm:text-[44px] lg:text-[50px]">Client Success &amp; Performance</h2>
      </div>
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]" ref={trackRef}>
        <motion.div
          className="flex shrink-0 gap-6 py-4"
          style={{ x }}
          drag="x"
          dragMomentum={false}
          dragElastic={0.05}
          onDragStart={() => {
            pause()
            dragStartRef.current = x.get()
          }}
          onDrag={(_, info) => {
            const next = dragStartRef.current + info.offset.x
            const capped = Math.max(dragStartRef.current - maxDragDistance, Math.min(dragStartRef.current + maxDragDistance, next))
            x.set(capped)
          }}
          onDragEnd={() => {
            const capped = Math.max(dragStartRef.current - maxDragDistance, Math.min(dragStartRef.current + maxDragDistance, x.get()))
            animate(x, capped, { type: 'spring', stiffness: 420, damping: 34, mass: 0.7 }).then(() => resume())
          }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, index) => (
            <article key={`${item.name}-${index}`} className="flex w-[320px] shrink-0 cursor-grab flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 active:cursor-grabbing sm:w-[420px] sm:p-8">
              <div><div className="mb-6 flex items-start justify-between gap-4"><h3 className="text-xl font-bold tracking-tight text-foreground">“{item.headline}”</h3><span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold text-foreground">5 <span className="text-amber-500">★</span></span></div><p className="mb-8 text-base leading-relaxed text-muted-foreground">“{item.text}”</p></div>
              <div className="flex items-center justify-between border-t border-border/40 pt-6"><div className="flex items-center gap-3.5"><div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border/40 bg-muted"><Image src={item.image} alt={item.name} fill sizes="44px" className="object-cover" loading="lazy" /></div><div><div className="text-sm font-semibold text-foreground">{item.name}</div><div className="mt-0.5 text-xs text-muted-foreground">{item.role}</div></div></div><div className="text-xs font-medium text-muted-foreground">{item.category}</div></div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
