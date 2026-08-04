'use client';

import { useEffect, useRef } from 'react';
import { useContactOverlay } from './contact-overlay';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { open } = useContactOverlay();

  const handleContactClick = () => {
    open();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen pt-20 lg:pt-28 pb-20 bg-background flex items-center" aria-label="Hero section - 3D product rendering services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* RIGHT */}
          <div className="order-1 lg:order-2 relative h-[380px] sm:h-[500px] lg:h-[580px] w-full rounded-3xl overflow-hidden bg-foreground/5">
            <video
              ref={videoRef}
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b0f3222371106db366a14ca1c29cef55-1b1EWVSa4w3FL2zslcaCGYTy9vcxjF-0YkHnlZBQFKYZuihXkFkByPFzQzM3c.mp4"
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />

            <div className="absolute top-10 right-8 bg-foreground text-background px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default">
              Ad Creatives
            </div>
            <div className="absolute bottom-20 right-6 bg-foreground text-background px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default">
              E-commerce
            </div>
            <div className="absolute bottom-10 left-8 bg-foreground text-background px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default">
              Social
            </div>
          </div>

          {/* LEFT */}
          <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6">

            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-[13px] font-medium text-foreground/70">
                • For D2C brands running paid ads »
              </span>

              <h1 className="text-[42px] sm:text-[56px] lg:text-[64px] font-medium tracking-[-0.045em] leading-[0.95] text-foreground max-w-[720px]">
                Your Creatives<br />
                Are Costing<br />
                You sales.
              </h1>
            </div>

            <p className="text-base text-foreground/60 max-w-sm leading-relaxed">
              Turn your product into scroll-stopping creatives that actually drive clicks, conversions, and sales — across ads, PDPs, and social.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              {/* Contact button with micro interaction & Meta Pixel Tracking */}
              <button
                onClick={handleContactClick}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full flex items-center gap-2 justify-center text-sm transition-all duration-300 hover:scale-105"
              >
                Fix My Creatives
                <span>→</span>
              </button>

              <button className="px-6 py-3 bg-muted text-foreground font-semibold rounded-full flex items-center gap-2 justify-center text-sm transition-all duration-300 hover:scale-105">
                See How It Works
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
