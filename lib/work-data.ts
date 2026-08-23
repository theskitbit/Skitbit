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
  // Added fields to support the UI in your design
  title: string
  description: string
  tags: string[]
}

export const workItems: WorkItem[] = [
  {
    id: 'liquid-gold-essence',
    type: 'render',
    industry: 'Wellness',
    src: '/images/Mousse-care-cheek-handy.webp',
    alt: 'Liquid Gold Essence fluid simulation',
    title: 'Liquid Gold Essence',
    description: 'A high-fidelity fluid simulation capturing the premium texture of luxury wellness oils.',
    tags: ['WELLNESS', '4K PRODUCTION']
  },
  {
    id: 'obsidian-chronograph',
    type: 'render',
    industry: 'Jewelry',
    src: '/images/Performance/409192025_339895605436685_3323936257367230990_n.jpg',
    alt: 'Obsidian Chronograph static render',
    title: 'Obsidian Chronograph',
    description: 'Static photorealistic render for high-end jewelry marketing, focusing on refraction and caustic light effects.',
    tags: ['JEWELRY', 'STILL LIFE']
  },
  {
    id: 'palladio-serum-hero',
    type: 'render',
    industry: 'Beauty',
    src: '/images/Performance/596284758_1030463365901840_5807054344332866793_n.jpg',
    alt: 'Palladio serum bottle render',
    title: 'Palladio Serum Hero',
    description: 'Clean, studio-lit render highlighting the sleek packaging and branding of Palladio cosmetics.',
    tags: ['BEAUTY', 'PRODUCT RENDER']
  },
  {
    id: 'herfantasybox-gift-set',
    type: 'render',
    industry: 'Beauty',
    src: '/images/Performance/616067467_25509509108675897_4521992326289623542_n.jpg',
    alt: 'HerFantasyBox gift set render',
    title: 'HerFantasyBox Gift Set',
    description: 'A vibrant lifestyle setup showcasing the complete gift set collection with dynamic lighting.',
    tags: ['BEAUTY', 'SET DESIGN']
  },
  {
    id: 'messika-ring-rotation',
    type: 'render',
    industry: 'Jewelry',
    src: '/images/Performance/632025866_1221856753421360_4519545831609540723_n.jpg',
    alt: 'Messika ring 360 rotation',
    title: 'Messika 360 Rotation',
    description: 'Seamless loop animation emphasizing the diamond cut and reflective metal materials.',
    tags: ['JEWELRY', 'PRODUCT ANIMATION']
  }
]
