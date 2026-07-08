'use client';

import {
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent,
} from 'react';
import Link from 'next/link';
import { useContactOverlay } from './contact-overlay';

type HeroCardStyle = CSSProperties & {
  '--mx'?: string;
  '--my'?: string;
  '--rx'?: string;
  '--ry'?: string;
};

const auditItems = [
  { label: 'Hook', sub: 'Make them look.', width: '84%' },
  { label: 'Clarity', sub: 'Make it obvious.', width: '95%' },
  { label: 'Trust', sub: 'Make it real.', width: '88%' },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const { open } = useContactOverlay();

  const handleContactClick = () => open();

  const handleCardMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
      card.style.setProperty('--ry', `${((x / rect.width) - 0.5) * 7}deg`);
      card.style.setProperty('--rx', `${((y / rect.height) - 0.5) * -7}deg`);
    });
  };

  const handleCardMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }

    let isInView = false;

    const playVideo = () => {
      if (!document.hidden && isInView) video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        isInView ? playVideo() : video.pause();
      },
      { threshold: 0.25 }
    );

    const handleVisibilityChange = () => {
      document.hidden ? video.pause() : playVideo();
    };

    observer.observe(video);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.unobserve(video);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background pb-14 pt-24 sm:pt-28 lg:pb-24 lg:pt-32"
      aria-label="Hero section - creative strategy and product visuals for D2C brands"
    >
      <style>{`
        @keyframes skitbit-scan {
          0% { transform: translateY(-120%); opacity: 0; }
          18% { opacity: 0.18; }
          70% { opacity: 0.1; }
          100% { transform: translateY(120%); opacity: 0; }
        }
        @keyframes skitbit-float-a {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -6px, 0); }
        }
        @keyframes skitbit-shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(160%); }
        }
        .skitbit-scan-line { animation: skitbit-scan 5s ease-in-out infinite; }
        .skitbit-float-a { animation: skitbit-float-a 5.8s ease-in-out infinite; }
        .skitbit-button-shimmer { animation: skitbit-shimmer 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .skitbit-scan-line,
          .skitbit-float-a,
          .skitbit-button-shimmer { animation: none !important; }
        }
      `}</style>

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-18%] top-[18%] h-[460px] w-[460px] rounded-full bg-primary/8 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20%] right-[-12%] h-[560px] w-[560px] rounded-full bg-foreground/4 blur-2xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-11 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">

          {/* LEFT */}
          <div className="order-1 flex flex-col justify-center">
            <div className="max-w-2xl">
              <h1 className="mt-0 max-w-[820px] text-[43px] font-medium leading-[0.9] tracking-[-0.065em] text-foreground sm:text-[60px] md:text-[70px] lg:text-[78px] xl:text-[88px] m-0">
                Stop explaining.<br />{' '}Show it in 3D.
              </h1>

              <p className="mt-6 max-w-[530px] text-base leading-relaxed text-foreground/60 sm:text-lg m-0">
                Your 3D production department. We deliver high-end campaign creatives so your team can focus on rollout.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="btn-primary rounded-full group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:opacity-90 focus:outline-none focus-ring active:scale-[0.98] sm:w-auto"
                >
                  <span
                    aria-hidden="true"
                    className="skitbit-button-shimmer pointer-events-none absolute inset-y-0 -left-16 w-12 rotate-12 bg-white/35 blur-md"
                  />
                  <span className="relative z-10">Fix My Creatives</span>
                  <span
                    aria-hidden="true"
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>

                {/* Secondary 'Our Work' button - Now routes to the /work page */}
                <Link
                  href="/work"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground/15 bg-transparent px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:scale-[1.03] hover:border-foreground/30 hover:bg-foreground/5 focus:outline-none focus-ring active:scale-[0.98] sm:w-auto"
                >
                  Our Work
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-2">
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ '--mx': '50%', '--my': '50%', '--rx': '0deg', '--ry': '0deg' } as HeroCardStyle}
              className="relative mx-auto w-full max-w-[680px] transition-transform duration-300 ease-out lg:ml-auto"
            >
              <div
                className="relative rounded-3xl bg-background p-1.5 shadow-[0_28px_90px_rgba(0,0,0,0.12)] ring-1 ring-foreground/10 sm:p-2"
                style={{
                  transform: 'perspective(1300px) rotateX(var(--rx)) rotateY(var(--ry))',
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 hover:opacity-100"
                  style={{
                    background: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.5), transparent 32%)',
                  }}
                />

                <div className="relative overflow-hidden rounded-3xl bg-foreground/5">
                  <div className="relative h-[470px] w-full sm:h-[530px] lg:h-[610px]">
                    <video
                      ref={videoRef}
                      src="https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/_HerovideoMainpage%20%281%29.mp4"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-background/5"
                    />

                    <div
                      aria-hidden="true"
                      className="skitbit-scan-line pointer-events-none absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
                    />
                    <div className="hidden sm:block">
                      <div className="skitbit-float-a absolute bottom-[188px] left-7 rounded-sm bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
                        Social
                      </div>
                      <div className="skitbit-float-a absolute bottom-[188px] right-7 rounded-sm bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
                        E-commerce
                      </div>
                    </div>

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-[48%] bg-gradient-to-t from-background/35 via-background/12 to-transparent"
                    />

                    <div className="absolute bottom-4 left-4 right-4 overflow-hidden rounded-3xl bg-background p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] ring-1 ring-foreground/10 sm:bottom-7 sm:left-7 sm:right-7 sm:p-6">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                      />

                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="mb-2 inline-flex items-center gap-2 rounded-sm bg-muted px-3 py-1.5 ring-1 ring-foreground/5 sm:mb-3">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/50 sm:text-[11px]">
                              Visual Audit
                            </span>
                          </div>
                          <h2 className="max-w-[420px] text-[20px] font-semibold leading-[1.12] tracking-[-0.04em] text-foreground sm:text-[28px] m-0">
                            They aren't reading your copy.
                          </h2>
                        </div>

                        <span className="shrink-0 rounded-sm bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm sm:px-4 sm:py-2 sm:text-sm">
                          Free
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
                        {auditItems.map((item) => (
                          <div
                            key={item.label}
                            className="card-base rounded-2xl min-w-0 p-3 sm:p-4"
                          >
                            <h3 className="truncate text-[13px] font-semibold leading-none text-foreground sm:text-[17px] m-0">
                              {item.label}
                            </h3>
                            <p className="mt-1 truncate text-[10px] leading-none text-foreground/50 sm:mt-2 sm:text-[13px] m-0">
                              {item.sub}
                            </p>
                            <div className="mt-3 h-1.5 overflow-hidden rounded-sm bg-foreground/10 sm:mt-4 sm:h-2">
                              <div
                                className="h-full rounded-sm bg-primary"
                                style={{ width: item.width }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-7 left-1/2 h-14 w-[84%] -translate-x-1/2 rounded-full bg-foreground/10 blur-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}