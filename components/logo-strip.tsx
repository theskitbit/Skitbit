'use client'

export function LogoStrip() {
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
          <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" opacity="0.5" />
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
          <path d="M3 12l4-8 4 5 3-3 7 11H3z" opacity="0.6" />
          <path d="M3 12l4-4 4 4-4 4-4-4zm14-4l4 4-4 4-4-4 4-4z" />
        </svg>
      ),
    },
    {
      label: 'SUPLIFUL',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
          <path d="M12 6C8.69 6 6 8.69 6 12s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" opacity="0.5" />
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
  ]

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-10">

          {/* Headline */}
          <p className="text-sm text-foreground/50">
            <span className="font-semibold text-foreground/70">Trusted by D2C brands to improve conversions</span>
            {' '}across beauty, wellness,
            <br />
            and e-commerce.
          </p>

          {/* Logo row */}
          <div className="flex items-center justify-center gap-10 lg:gap-16 flex-wrap">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center gap-2 opacity-30 hover:opacity-70 transition-opacity duration-300"
              >
                <span className="shrink-0">{logo.icon}</span>
                <span className="text-sm font-semibold tracking-tight whitespace-nowrap">
                  {logo.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
