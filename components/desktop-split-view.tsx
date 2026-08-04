'use client'

import { useState, useEffect } from 'react'

interface DesktopSplitViewProps {
  onClose: () => void
}

const videoIds = [
  'H1h5dHpp1Nw', 'HXARcSSdfMU', 'fd8zraQ1JdE', 'ARQyF2FA3Ec',
  'dEZfHADlFtw', 'wuyfdfKO6Rc', 'VakkmhtrUA0', 'o8DoIg9yNGk'
]

export function DesktopSplitView({ onClose }: DesktopSplitViewProps) {
  const [active, setActive] = useState(videoIds[0])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL CARD */}
        <div className="bg-card rounded-2xl shadow-xl flex overflow-hidden h-[85vh]">

          {/* LEFT - VIDEO */}
          <div className="flex-[7] flex items-center justify-center bg-foreground/5 p-4">
            <div className="h-full aspect-[9/16] max-h-[75vh] rounded-xl overflow-hidden bg-black">
              <iframe
                key={active}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${active}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=${active}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex-[3] border-l border-border flex flex-col bg-background">

            {/* HEADER (FIXED) */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
              <p className="text-xs text-foreground/70 font-medium">
                More Videos
              </p>

              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:opacity-80 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* SCROLLABLE GRID */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-3">
                {videoIds.map((id) => {
                  const isActive = active === id

                  return (
                    <button
                      key={id}
                      onClick={() => setActive(id)}
                      className="relative aspect-[9/16] rounded-lg overflow-hidden bg-muted"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                        className="w-full h-full object-cover"
                      />

                      {/* Play icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-background flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-foreground ml-[2px]">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Active */}
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}