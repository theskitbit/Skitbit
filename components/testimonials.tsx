'use client'

import Image from 'next/image'

type Testimonial = {
  name: string
  image: string
  category: string
  role: string
  headline: string
  text: string
}

const testimonials: Testimonial[] = [
  {
    name: 'SKYBORNE',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Skyborne-p4ezaqFZ5OfdsvHpwahK8hQpOCamyf.png',
    category: 'Travel & carry',
    role: 'Premium D2C brand',
    headline: 'Endless assets. Zero reshoots.',
    text: 'We went from struggling with creatives to a full pipeline of high-performing assets for ads, PDPs, and social.',
  },
  {
    name: 'MESSIKA Paris',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Messika-qejIUYic4Yr2Ll5RU7os9DNNdgGIqJ.png',
    category: 'Luxury jewellery',
    role: 'Luxury brand',
    headline: 'Perfect brand consistency.',
    text: 'The biggest win was consistency. Every product and every campaign finally looks like one cohesive brand.',
  },
  {
    name: 'Skinny.rx',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Skinny.rx-8WN3MckWWMQPMDKhdXo8iASOv4vQKK.png',
    category: 'Wellness',
    role: 'Wellness brand',
    headline: 'No more photoshoot delays.',
    text: 'Faster launches, better creatives, and no dependency on shoots. This changed how we produce content.',
  },
  {
    name: 'HerFantasyBox',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HerFantasyBox-B6XxTEH5jYtYcPFtMaxBWX2xIarg4t.png',
    category: 'Womens Wellness',
    role: 'D2C brand',
    headline: 'One streamlined workflow.',
    text: 'Our team saves so much time now. What used to take multiple vendors is handled in one streamlined process.',
  },
  {
    name: 'PLAN B',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plan%20B-pZTphn7CFyGcxlfnSqeXbfzbouJQZI.png',
    category: 'Cosmetics brand',
    role: 'D2C brand',
    headline: 'Flawless execution.',
    text: 'They did everything according to my ideas, responded to every request, and I would book the service again.',
  },
  {
    name: 'PALLADIO',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Palladio-4gVgAm7yrCStetxUP88iEXM1CTtJkY.png',
    category: 'Beauty',
    role: 'Beauty brand',
    headline: 'Precision and creativity.',
    text: 'They took our idea and turned it into a wonderful project with great precision and creativity.',
  },
]

function RatingBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold text-foreground" role="img" aria-label="5 star rating">
      <span>5</span>
      <span className="text-amber-500">★</span>
    </div>
  )
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-background py-20 lg:py-28 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Header section left-aligned at global max-w-7xl width */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 mb-12 lg:mb-16">
        <div className="flex flex-col items-start text-left">
          <span className="inline-flex rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground">
            Client Proof
          </span>
          <h2
            id="testimonials-heading"
            className="mt-6 text-[34px] font-bold leading-tight tracking-[-0.055em] text-foreground sm:text-[44px] lg:text-[50px]"
          >
            Client Success & Performance
          </h2>
        </div>
      </div>

      {/* Infinite Scrolling Track (Right to Left) */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex gap-6 animate-marquee shrink-0 min-w-full py-4">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border/60 flex flex-col justify-between w-[380px] sm:w-[420px] shrink-0 hover:border-foreground/20 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start mb-6 gap-4">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    “{item.headline}”
                  </h3>
                  <RatingBadge />
                </div>

                <div className="mb-8">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/40 mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-muted border border-border/40">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {item.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground text-right">
                    {item.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  )
}