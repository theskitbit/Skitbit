'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import type { WorkItem } from '@/lib/sanity/client'

const IMAGE_SIZES = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'

export function WorkCard({ item, isOpening = false }: { item: WorkItem; isOpening?: boolean }) {
  const [isHovering, setIsHovering] = useState(false)
  const isVideo = item.type === 'animation'

  const Metadata = () => (
    <div className="mt-3 space-y-2">
      <h2 className="text-sm font-semibold text-foreground">{item.title}</h2>
      <p className="text-xs text-foreground/60 line-clamp-2">{item.description}</p>
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-foreground/70 uppercase">{item.fidelityTag}</span>
        {item.industries.map((industry) => (
          <span key={industry} className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-700 uppercase">{industry}</span>
        ))}
      </div>
    </div>
  )

  const media = (
    <div className="relative h-full w-full">
      {(!isVideo || !isHovering) && (
        <Image src={item.posterUrl || item.mediaUrl} alt={item.title} fill sizes={IMAGE_SIZES} className="object-cover" />
      )}
      {isVideo && isHovering && (
        <video src={item.mediaUrl} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
      )}
    </div>
  )

  return (
    <div className="break-inside-avoid mb-4">
      <div
        onMouseEnter={() => isVideo && setIsHovering(true)}
        onMouseLeave={() => isVideo && setIsHovering(false)}
        className={`relative w-full overflow-hidden rounded-lg ${isVideo ? 'bg-foreground/5' : 'bg-muted'}`}
        style={{ aspectRatio: isVideo ? '9 / 16' : '4 / 5' }}
      >
        {media}
        {isVideo && !isHovering && <div className="absolute top-3 right-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"><Play className="h-4 w-4 fill-foreground text-foreground" /></div>}
        {isOpening && <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/35 backdrop-blur-[2px]" role="status" aria-live="polite"><span className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg">Opening project…</span></div>}
        <div className="absolute bottom-3 left-3 z-10 inline-flex items-center rounded-full bg-foreground/90 px-3 py-1.5 text-[10px] font-semibold uppercase text-background">{item.formatTag}</div>
      </div>
      <Metadata />
    </div>
  )
}
