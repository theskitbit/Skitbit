'use client'

import { useEffect, useRef } from 'react'

interface CounterProps {
  from: number
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  delay?: number
}

export function Counter({
  from,
  to,
  suffix = '',
  prefix = '',
  duration = 2.5,
  delay = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current && ref.current) {
          hasStarted.current = true
          const element = ref.current
          const finalValue = to
          const startTime = Date.now()
          const delayMs = delay * 1000
          const durationMs = duration * 1000

          const animate = () => {
            const now = Date.now()
            const elapsed = now - startTime - delayMs

            if (elapsed < 0) {
              requestAnimationFrame(animate)
              return
            }

            const progress = Math.min(elapsed / durationMs, 1)
            const value = Math.floor(from + (finalValue - from) * progress)

            element.textContent = value.toString()

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { rootMargin: '-100px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [from, to, duration, delay])

  return (
    <span>
      {prefix}
      <span ref={ref}>{from}</span>
      {suffix}
    </span>
  )
}