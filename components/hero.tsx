'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useContactOverlay } from './contact-overlay';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { open } = useContactOverlay();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) {
      video.pause();
      return;
    }

    let isInView = false;

    const playVideo = () => {
      if (!document.hidden && isInView) {
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) {
          playVideo();
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        playVideo();
      }
    };

    observer.observe(video);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.unobserve(video);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section
      aria-label="Skitbit introduction"
      className="relative w-full bg-background py-0"
    >
      {/* Editorial Grid Container */}
      <div
        className="
          relative
          mx-auto
          grid
          w-full
          max-w-[1280px]
          grid-cols-1
          items-center
          border-x
          border-t
          border-b
          border-border
          lg:grid-cols-2
        "
      >
        {/* Center Vertical Divider Line */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-1/2
            z-20
            hidden
            w-px
            -translate-x-1/2
            bg-border
            lg:block
          "
        />

        {/* Left Column: Copy & CTAs */}
        <div
          className="
            relative
            flex
            flex-col
            justify-center
            px-8
            py-16
            sm:px-12
            lg:px-16
            lg:py-20
          "
        >
          <div className="w-full max-w-[520px]">
            <h1
              className="
                m-0
                text-foreground
                font-semibold
                tracking-tight
                text-[52px]
                sm:text-[64px]
                lg:text-[72px]
                xl:text-[80px]
                leading-[0.95]
              "
            >
              <span className="block">Stop</span>
              <span className="block">explaining.</span>
              <span className="block">Show it in 3D.</span>
            </h1>

            <p
              className="
                m-0
                mt-6
                max-w-[460px]
                text-[16px]
                font-normal
                leading-relaxed
                text-foreground/70
                sm:text-[17px]
              "
            >
              Your on-demand 3D production partner for product launches,
              paid media, ecommerce &amp; brand campaigns.
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                gap-4
                sm:flex-row
              "
            >
              <button
                type="button"
                onClick={() => open()}
                className="btn-primary rounded-full inline-flex items-center justify-center cursor-pointer shadow-sm"
              >
                Partner with Us
              </button>

              <Link
                href="/works"
                className="btn-ghost rounded-full inline-flex items-center justify-center font-semibold text-sm"
              >
                Our Work
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: 4:3 Portrait Aspect Ratio Video Panel */}
        <div
          className="
            relative
            w-full
            overflow-hidden
            bg-muted
            aspect-[4/3]
            sm:aspect-[4/3]
            lg:aspect-[3/4]
          "
        >
          <video
            ref={videoRef}
            src="https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/_HerovideoMainpage%20%281%29.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            className="
              pointer-events-none
              absolute
              inset-0
              block
              h-full
              w-full
              select-none
              object-cover
              object-center
            "
          />
        </div>
      </div>
    </section>
  );
}