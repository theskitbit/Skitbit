'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

export function Advantages() {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { rootMargin: '-100px 0px', threshold: 0 }
    )

    observer.observe(node)
    return () => observer.unobserve(node)
  }, [])

  const advantages = [
    {
      number: '01',
      title: 'Scale Creatives Without Losing Quality',
      description: 'Produce consistent, high-performing visuals across ads, PDPs, and social — without reshoots or bottlenecks.',
    },
    {
      number: '02',
      title: 'Go From Idea to Live Ads in Days',
      description: 'Launch new creatives faster, test quicker, and iterate without production delays.',
    },
    {
      number: '03',
      title: 'Designed to Drive Clicks and Conversions',
      description: 'Every visual is crafted to stop scroll, increase engagement, and improve campaign performance.',
    },
  ]

  const images = [
    { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201-8n2tGgLJIw1EKivKZO6gCtrqbCJPBx.png', alt: 'Colorful spray bottle product line' },
    { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%202-YIMIMke0V2JZsGTlyobKk4FaL2wT6g.png', alt: 'good water hydration product' },
    { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%203-mBusnbvTq4x0FJtenNMmDlAjxghtaz.png', alt: 'Professional tech tools visualization' },
  ]

  return (
    <section id="advantages" className="py-16 lg:py-24 bg-background" ref={ref} aria-label="Advantages section - benefits of 3D product rendering">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Desktop ── */}
        <div className="hidden lg:flex lg:flex-row gap-16 items-start">

          {/* Left column */}
          <div className="flex flex-col w-[300px] shrink-0 self-stretch">
            <span className="inline-block text-xs font-medium text-foreground border border-border rounded-full px-4 py-1.5 w-fit">
              Why This Works
            </span>

            <div className="flex flex-col gap-5 mt-[8rem]">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden"
                  style={{ width: '280px', height: '155px' }}
                >
                  <div className="absolute inset-0 hover:scale-105 transition-transform duration-500">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col flex-1">
            <h2 className="text-5xl lg:text-[3.1rem] font-bold tracking-tight leading-[1.1] text-foreground mb-14">
              Why Brands Switch to Performance-Driven Creatives
            </h2>

            <div className="flex flex-col">
              {advantages.map((item, i) => (
                <div
                  key={item.number}
                  className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {i !== 0 && <div className="border-t border-border" />}
                  <div className="py-8">
                    <div className="flex items-baseline gap-6 mb-3">
                      <span className="text-sm font-medium text-muted-foreground/50 w-8 shrink-0">
                        {item.number}
                      </span>
                      <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-14">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile / Tablet ── */}
        <div className="lg:hidden flex flex-col gap-10">
          <div className="text-center">
            <span className="inline-block text-xs font-medium text-foreground border border-border rounded-full px-4 py-1.5 mb-6">
              Why This Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-foreground">
              Why Brands Switch to Performance-Driven Creatives
            </h2>
          </div>

          {advantages.map((item, i) => (
            <div
              key={item.number}
              className={`flex flex-col transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-5 group hover:shadow-lg transition-all duration-300">
                <Image src={images[i].src} alt={item.title} fill className="object-cover hover:scale-105 transition-transform duration-300" unoptimized />
              </div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-sm font-medium text-muted-foreground/50">{item.number}</span>
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-9">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
