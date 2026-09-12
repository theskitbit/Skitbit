'use client'

import { useEffect, useRef, useState } from "react"
import { parse as parseOpenType } from "opentype.js"
import { useContactOverlay } from "./contact-overlay"

const DEFAULT_FONT_URL = "https://raw.githubusercontent.com/google/fonts/main/ofl/shadowsintolight/ShadowsIntoLight.ttf"

type Geometry = {
  full: string
  contours: string[]
  x: number
  y: number
  w: number
  h: number
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function loadOpentype(): Promise<any> {
  return Promise.resolve({ parse: parseOpenType })
}

const fontCache = new Map<string, Promise<any>>()

function loadFont(url: string): Promise<any> {
  let pending = fontCache.get(url)
  if (!pending) {
    pending = Promise.all([
      loadOpentype(),
      fetch(url).then((res) => {
        if (!res.ok) throw new Error(`Font request failed: ${res.status}`)
        return res.arrayBuffer()
      }),
    ]).then(([lib, buffer]) => lib.parse(buffer))
    fontCache.set(url, pending)
  }
  return pending
}

const EM = 100

interface HandwritingTextProps {
  words: string[]
  interval?: number
  fontUrl?: string
  duration?: number
  delay?: number
  strokeWidth?: number
  fill?: boolean
  height?: string
  className?: string
}

function HandwritingText({
  words,
  interval = 3200,
  fontUrl = DEFAULT_FONT_URL,
  duration = 1.5,
  delay = 0.05,
  strokeWidth = 1.6,
  fill = true,
  height = "1.15em",
  className,
}: HandwritingTextProps) {
  const [index, setIndex] = useState(0)
  const current = words[index % words.length]

  const [font, setFont] = useState<any>(null)
  const [geom, setGeom] = useState<Geometry | null>(null)
  const [drawn, setDrawn] = useState(false)
  const [lengths, setLengths] = useState<number[]>([])
  const pathRefs = useRef<(SVGPathElement | null)[]>([])

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => i + 1), interval)
    return () => clearInterval(id)
  }, [interval])

  useEffect(() => {
    let cancelled = false
    loadFont(fontUrl)
      .then((f) => { if (!cancelled) setFont(f) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [fontUrl])

  useEffect(() => {
    if (!font || !current) return
    const path = font.getPath(current, 0, EM, EM)
    const box = path.getBoundingBox()
    const pad = EM * 0.12
    const full = path.toPathData(2)
    setGeom({
      full,
      contours: full.split(/(?=M)/).filter((d: string) => d.trim().length > 1),
      x: box.x1 - pad,
      y: box.y1 - pad,
      w: box.x2 - box.x1 + pad * 2,
      h: box.y2 - box.y1 + pad * 2,
    })
    setDrawn(false)
    setLengths([])
  }, [font, current])

  useEffect(() => {
    if (!geom) return undefined
    setLengths(
      pathRefs.current
        .slice(0, geom.contours.length)
        .map((el) => (el ? el.getTotalLength() : 0)),
    )
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setDrawn(true)),
    )
    return () => cancelAnimationFrame(id)
  }, [geom])

  if (!geom) {
    return <span className={className}>{current}</span>
  }

  const count = Math.max(1, geom.contours.length)

  return (
    <svg
      key={current}
      viewBox={`${geom.x} ${geom.y} ${geom.w} ${geom.h}`}
      role="img"
      aria-label={current}
      className={["inline-block", className].filter(Boolean).join(" ")}
      style={{
        height,
        width: `calc(${height} * ${(geom.w / geom.h).toFixed(4)})`,
        overflow: "visible",
      }}
    >
      {fill && (
        <path
          d={geom.full}
          fill="currentColor"
          stroke="none"
          style={{
            opacity: drawn ? 1 : 0,
            transition: drawn
              ? `opacity 0.45s ease-out ${(delay + duration * 0.72).toFixed(3)}s`
              : "none",
          }}
        />
      )}
      {geom.contours.map((d, i) => {
        const length = lengths[i] || 0
        const each = (duration / count) * 2.4
        const start = delay + (i / count) * duration
        return (
          <path
            key={i}
            ref={(el) => { pathRefs.current[i] = el }}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: length || 1,
              strokeDashoffset: drawn ? 0 : length || 1,
              transition: drawn
                ? `stroke-dashoffset ${each.toFixed(3)}s ease-out ${start.toFixed(3)}s`
                : "none",
            }}
          />
        )
      })}
    </svg>
  )
}

export function CTA() {
  const { open } = useContactOverlay()

  return (
    <section
      id="contact"
      className="border-t border-border bg-background py-24 sm:py-28 lg:py-32"
      aria-label="Call to action - get your first 3D product concept"
    >
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <h2 className="mx-auto m-0 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
          Scale Your E-commerce Sales{' '}
          <HandwritingText
            words={["Today.", "Instantly.", "Without Photoshoots."]}
            className="text-foreground"
            height="0.95em"
          />
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
          High-performing product creatives built to increase clicks, conversions, and sales. Delivered in days, not weeks — no photoshoots, no delays.
        </p>

        <div className="mt-10 flex justify-center sm:mt-11">
          <button
            type="button"
            onClick={open}
            data-tooltip="Get a reply in 60secs" data-tooltip-position="below"
            aria-label="Get in touch — Get a reply in 60secs"
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 transition-all duration-300 hover:scale-[1.03] hover:opacity-90 focus:outline-none focus-ring active:scale-[0.98]"
          >
            Get Your First Concept
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
