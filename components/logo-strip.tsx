'use client';

import type { ReactNode } from 'react';

const logos = [
  {
    label: 'Messika Paris',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4.5 7v10L12 22l7.5-5V7L12 2zm0 2.5l5.5 3.67v7.66L12 19.5l-5.5-3.67V8.17L12 4.5z" />
      </svg>
    ),
  },
  {
    label: 'HerFantasyBox',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" opacity="0.45" />
        <path d="M3 3h4v4H3V3zm10 0h4v4h-4V3zM3 13h4v4H3v-4zm10 0h4v4h-4v-4z" />
      </svg>
    ),
  },
  {
    label: 'PALLADIO Beauty',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 2a8 8 0 110 16A8 8 0 0112 4zm0 2a6 6 0 100 12A6 6 0 0012 6zm0 2a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
  },
  {
    label: 'SKINNY.rx',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 12l4-8 4 5 3-3 7 11H3z" opacity="0.55" />
        <path d="M3 12l4-4 4 4-4 4-4-4zm14-4l4 4-4 4-4-4 4-4z" />
      </svg>
    ),
  },
  {
    label: 'SUPLIFUL',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
        <path d="M12 6C8.69 6 6 8.69 6 12s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" opacity="0.45" />
      </svg>
    ),
  },
  {
    label: 'Persona Cosmetics',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    ),
  },
  {
    label: 'Victorinox',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    label: 'TRUMP WATCHES',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    label: 'POLICE WATCHES',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    label: 'Skyborne',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    ),
  },
  {
    label: 'Supliful',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
      </svg>
    ),
  },
  {
    label: 'The Man Company',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1.41 1.41L12 4.83l-1.41-1.41L12 2zm0 20l1.41-1.41L12 19.17l-1.41 1.41L12 22zM4.83 12l1.41 1.41L4.83 14.82l-1.41-1.41L4.83 12zm14.34 0l1.41 1.41L19.17 14.82l-1.41-1.41L19.17 12z" />
      </svg>
    ),
  },
];

function LogoMark({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <div className="group flex shrink-0 items-center gap-2.5 px-7 py-5 text-foreground/42 transition-colors duration-300 hover:text-foreground/75">
      <span className="flex h-5 w-5 items-center justify-center text-foreground/35 transition-colors duration-300 group-hover:text-primary">
        {icon}
      </span>

      {/* 🔥 SEO FIX: Brand names are now H3 tags */}
      <h3 className="whitespace-nowrap text-sm font-semibold tracking-[-0.02em] m-0">
        {label}
      </h3>
    </div>
  );
}

export function LogoStrip() {
  return (
    <section
      className="relative overflow-hidden bg-background py-12 sm:py-14 lg:py-16"
      aria-label="Trusted by D2C brands"
    >
      <style>{`
        @keyframes skitbit-logo-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .skitbit-logo-marquee { animation: skitbit-logo-marquee 40s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .skitbit-logo-marquee { animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* 🔥 SEO FIX: The trust statement is now your section's H2 */}
          <h2 className="text-sm leading-relaxed text-foreground/55 sm:text-base m-0">
            <span className="font-semibold text-foreground/75">
              Trusted by D2C brands
            </span>{' '}
            to improve product visuals across beauty, wellness, and e-commerce.
          </h2>
        </div>

        {/* Full-bleed logo rail */}
        <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden border-y border-foreground/10 bg-foreground/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

          {/* Looping rail for all screens */}
          <div className="overflow-hidden">
            <div className="skitbit-logo-marquee flex w-max divide-x divide-foreground/10">
              {[...logos, ...logos].map((logo, index) => (
                <LogoMark
                  key={`${logo.label}-${index}`}
                  label={logo.label}
                  icon={logo.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}