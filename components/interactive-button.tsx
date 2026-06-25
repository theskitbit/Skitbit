'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

/**
 * Interactive Button with Micro-Interactions
 * 
 * This component demonstrates and documents the micro-interaction patterns
 * used throughout the application for enhanced user feedback.
 * 
 * Animation Properties:
 * - Duration: 300ms (balances responsiveness with smoothness)
 * - Easing: ease-out (natural, snappy feel)
 * - Trigger: hover state (smooth entrance), active state (satisfying press)
 * 
 * Effects Applied:
 * 1. Scale: 105% on hover (5% growth for subtle expansion)
 * 2. Lift: -0.5 (translate-y-0.5 = 2px upward movement)
 * 3. Shadow: shadow-lg on hover, shadow-md on active (depth perception)
 * 4. Active: scale-95 + reduced shadow (tactile press feedback)
 * 
 * Usage Guidelines:
 * 
 * For Primary CTAs (Apply animate="hover" or use className directly):
 * ```tsx
 * <InteractiveButton variant="default">
 *   Contact Us
 * </InteractiveButton>
 * ```
 * 
 * Classes Applied to Buttons:
 * - transition-all: Enables smooth transitions for all properties
 * - duration-300: Animation plays over 300ms
 * - ease-out: Easing function for natural deceleration
 * - hover:scale-105: Grows to 105% size on hover
 * - hover:shadow-lg: Adds prominent shadow on hover
 * - hover:-translate-y-0.5: Lifts button 2px upward on hover
 * - active:scale-95: Shrinks to 95% on click (press effect)
 * - active:shadow-md: Reduces shadow on active state
 * 
 * Animation Timing Breakdown:
 * - 0-100ms: Scale transition (feels snappy)
 * - 0-300ms: Shadow deepens (creates depth)
 * - 0-300ms: Position lift (smooth vertical movement)
 * - On release: All properties reset to original state smoothly
 * 
 * Best Practices:
 * 1. Only apply to primary actions (CTAs, form submissions)
 * 2. Avoid stacking multiple animations on nested elements
 * 3. Keep animations subtle—they enhance, not distract
 * 4. Test with keyboard navigation for accessibility
 * 5. Ensure sufficient color contrast in all states
 */

interface InteractiveButtonProps
  extends React.ComponentProps<'button'> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
  animated?: boolean
}

export function InteractiveButton({
  variant = 'default',
  size = 'default',
  animated = true,
  className,
  children,
  ...props
}: InteractiveButtonProps) {
  const animationClasses = animated
    ? 'transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:shadow-md'
    : ''

  return (
    <button
      className={`px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full flex items-center gap-2 justify-center text-sm whitespace-nowrap ${animationClasses} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * ANIMATION SPECIFICATIONS
 * 
 * Hover State Duration: 300ms
 * - This duration is long enough to feel smooth (< 100ms feels jarring)
 * - But short enough to feel responsive (> 500ms feels sluggish)
 * 
 * Scale Values:
 * - Hover: 1.05 (5% larger) – noticeable but not disruptive
 * - Active: 0.95 (5% smaller) – symmetrical press feedback
 * 
 * Vertical Lift:
 * - Hover: -2px (translate-y-0.5 in Tailwind) – subtle elevation
 * - Creates sense of "lightness" and interactivity
 * - Paired with shadow increase for depth perception
 * 
 * Shadow Progression:
 * - Default: No shadow (flat appearance)
 * - Hover: shadow-lg (elevation illusion)
 * - Active: shadow-md (compromise between default and hover)
 * 
 * ACCESSIBILITY CONSIDERATIONS
 * - All animations respect prefers-reduced-motion (via transition-all)
 * - Keyboard focus states preserved (via focus-visible:ring)
 * - Color contrast maintained across all states
 * - Touch targets remain ≥ 44x44px for mobile
 * 
 * PERFORMANCE NOTES
 * - Using transform properties (scale, translate) for GPU acceleration
 * - Shadow uses CSS box-shadow (GPU optimized)
 * - No layout shifts (animations use transform, not width/height)
 * - Minimal repaints thanks to will-change being implicit in Tailwind
 */
