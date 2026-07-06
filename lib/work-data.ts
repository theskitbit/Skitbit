// lib/work-data.ts
//
// Single source of truth for /work page.
// Add new pieces here — grid, filters, and tags populate automatically.
//
// type: 'animation' -> 9:16 video, autoplays on hover (desktop) / in-view (mobile)
// type: 'render'    -> 4:5 still image
//
// industry: free-text tag. Whatever you type here becomes a filter chip.
// poster: required for animations (shown before video loads + as fallback frame)

export type WorkType = 'animation' | 'render'

export interface WorkItem {
  id: string
  type: WorkType
  industry: string
  src: string
  poster?: string
  alt: string
}

export const workItems: WorkItem[] = [
  {
    id: 'palladio-serum-hero',
    type: 'render',
    industry: 'Beauty',
    src: 'https://your-cdn.com/palladio-serum-hero.jpg',
    alt: 'Palladio serum bottle render',
  },
  {
    id: 'skinnyrx-launch-anim',
    type: 'animation',
    industry: 'Wellness',
    src: 'https://your-cdn.com/skinnyrx-launch.mp4',
    poster: 'https://your-cdn.com/skinnyrx-launch-poster.jpg',
    alt: 'SkinnyRx launch animation',
  },
  {
    id: 'herfantasybox-gift-set',
    type: 'render',
    industry: 'Beauty',
    src: 'https://your-cdn.com/herfantasybox-gift.jpg',
    alt: 'HerFantasyBox gift set render',
  },
  {
    id: 'messika-ring-rotation',
    type: 'animation',
    industry: 'Jewelry',
    src: 'https://your-cdn.com/messika-ring.mp4',
    poster: 'https://your-cdn.com/messika-ring-poster.jpg',
    alt: 'Messika ring 360 rotation',
  },
  // Add more below — same shape, unique id.
]