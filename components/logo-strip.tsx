'use client';

const logos = [
  {
    label: 'Mahina co',
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Mahina_Logo_330x.avif',
  },
  {
    label: 'Hexagon',
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/hexagon_logo_new_115x.avif',
  },
  {
    label: 'Croc',
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Croc.png',
  },
  {
    label: 'NEEMANS',
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Neemans.png',
  },
  {
    label: 'HerFantasyBox',
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/617125239_878849164517476_9136886998112773274_naa.png',
  },
  {
    label: 'Supliful',
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/supliful-logo.png',
  },
  {
    label: 'SKINNY.rx',
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Skinny%20rx.png',
  },
  {
    label: 'The Man Company',
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/themancompany',
  },
  {
    label: 'Gruns',
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/gruns%20Logo.webp',
  },
  {
    label: 'PALLADIO Beauty',
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/blob-2026-08-04%20at%204.52.24%20PM.png',
  },
  {
    label: 'Shake Up Cosmetics',
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Shakeup.png',
  },
];


function LogoMark({ label, src }: { label: string; src: string }) {
  return (
    <div className="group flex shrink-0 items-center px-7 py-5 opacity-100 transition-all duration-300 sm:grayscale sm:opacity-45 sm:hover:grayscale-0 sm:hover:opacity-90">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        title={label}
        className="h-6 w-auto max-w-[120px] object-contain sm:h-7"
        loading="lazy"
      />
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
        /* Mobile: 25% faster than desktop (40s / 1.25 = 32s) */
        @media (max-width: 639px) {
          .skitbit-logo-marquee { animation-duration: 32s; }
        }
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
                  src={logo.src}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}