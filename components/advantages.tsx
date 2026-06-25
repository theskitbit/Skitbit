'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type CaseStudy = {
  number: string;
  category: string;
  title: string;
  problem: string;
  shift: string;
  outcome: string;
  image: {
    src: string;
    alt: string;
    position?: string;
  };
};

const caseStudies: CaseStudy[] = [
  {
    number: '01',
    category: 'Creative Scale',
    title: 'One product system. Multiple sales assets.',
    problem: 'Needed more product creatives without repeating expensive shoots.',
    shift: 'Built one render-led visual system for ads, PDPs, and social.',
    outcome: 'More usable creative assets from one product direction.',
    image: {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201-8n2tGgLJIw1EKivKZO6gCtrqbCJPBx.png',
      alt: 'Colorful spray bottle product visuals for e-commerce creative assets',
      position: 'center',
    },
  },
  {
    number: '02',
    category: 'Speed to Market',
    title: 'From product idea to live creatives in days.',
    problem: 'Strong campaign angles were ready, but production slowed testing.',
    shift: 'Created product visuals that could quickly become live ad assets.',
    outcome: 'Faster testing cycles with less production dependency.',
    image: {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%202-YIMIMke0V2JZsGTlyobKk4FaL2wT6g.png',
      alt: 'Hydration product visual designed for paid ads and product pages',
      position: 'center',
    },
  },
  {
    number: '03',
    category: 'Conversion Clarity',
    title: 'Premium visuals built around buyer decisions.',
    problem: 'The product looked premium, but the visuals did not explain value.',
    shift: 'Reframed the creative around use-case, clarity, and trust.',
    outcome: 'Better fit for ads, PDPs, social, and landing pages.',
    image: {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%203-mBusnbvTq4x0FJtenNMmDlAjxghtaz.png',
      alt: 'Premium technology product visual for performance creative campaigns',
      position: 'center 65%',
    },
  },
];

function CaseStudyCard({
  item,
  index,
  isInView,
}: {
  item: CaseStudy;
  index: number;
  isInView: boolean;
}) {
  const baseDelay = index * 140;

  return (
    <article
      style={{
        top: `${96 + index * 12}px`,
        transitionDelay: `${baseDelay}ms`,
      }}
      className={`mx-auto w-full max-w-[1100px] overflow-hidden rounded-[36px] border border-foreground/10 bg-background shadow-[0_22px_70px_rgba(0,0,0,0.055)] ring-1 ring-white/40 transition-all duration-700 ease-out lg:sticky ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
    >
      <div className="grid grid-cols-1 lg:min-h-[420px] lg:grid-cols-[1.5fr_1fr]">
        {/* Visual */}
        <div className="p-4 sm:p-5 lg:p-5">
          <div className="relative h-[270px] overflow-hidden rounded-[30px] bg-muted sm:h-[370px] lg:h-full">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={`object-cover transition-all duration-1000 ease-out ${isInView ? 'scale-100 opacity-100' : 'scale-[1.025] opacity-0'
                }`}
              style={{
                objectPosition: item.image.position ?? 'center',
                transitionDelay: `${baseDelay + 120}ms`,
              }}
              unoptimized
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/18 via-transparent to-transparent" />

            <div
              className={`absolute left-5 top-5 rounded-full border border-foreground/10 bg-background/88 px-4 py-2 text-xs font-semibold text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-700 ease-out ${isInView
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
                }`}
              style={{
                transitionDelay: `${baseDelay + 220}ms`,
              }}
            >
              {item.number} · {item.category}
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center px-8 pb-9 pt-4 sm:px-10 sm:pb-10 lg:px-10 lg:py-11 xl:px-12">
          <h3
            className={`max-w-[420px] text-[30px] font-bold leading-[1.02] tracking-[-0.055em] text-foreground transition-all duration-700 ease-out sm:text-[38px] lg:text-[40px] ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            style={{
              transitionDelay: `${baseDelay + 260}ms`,
            }}
          >
            {item.title}
          </h3>

          <div
            className={`relative mt-7 pl-5 transition-all duration-700 ease-out before:absolute before:left-0 before:top-1 before:h-[calc(100%-8px)] before:w-[2px] before:origin-top before:rounded-full before:bg-primary before:transition-transform before:duration-700 before:ease-out ${isInView
                ? 'translate-y-0 opacity-100 before:scale-y-100'
                : 'translate-y-5 opacity-0 before:scale-y-0'
              }`}
            style={{
              transitionDelay: `${baseDelay + 340}ms`,
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/75">
              Result
            </p>
            <p className="mt-2 max-w-[360px] text-[15px] font-semibold leading-relaxed text-foreground">
              {item.outcome}
            </p>
          </div>

          <div
            className={`mt-8 space-y-5 transition-all duration-700 ease-out ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            style={{
              transitionDelay: `${baseDelay + 420}ms`,
            }}
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/75">
                Problem
              </p>
              <p className="mt-2 max-w-[380px] text-sm leading-relaxed text-foreground/68">
                {item.problem}
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/75">
                What changed
              </p>
              <p className="mt-2 max-w-[380px] text-sm leading-relaxed text-foreground/68">
                {item.shift}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Advantages() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      {
        rootMargin: '-120px 0px',
        threshold: 0.08,
      }
    );

    observer.observe(node);

    return () => observer.unobserve(node);
  }, []);

  return (
    <section
      id="advantages"
      ref={ref}
      className="bg-background py-20 lg:py-28"
      aria-labelledby="case-study-stack-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div
          className={`mx-auto mb-12 max-w-[1100px] transition-all duration-700 ease-out lg:mb-14 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
        >
          <span className="inline-flex rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground">
            Short Case Studies
          </span>

          <h2
            id="case-study-stack-heading"
            className="mt-6 max-w-[620px] text-[34px] font-bold leading-[1] tracking-[-0.055em] text-foreground sm:text-[44px] lg:text-[50px]"
          >
            How product visuals become conversion assets
          </h2>
        </div>

        <div className="space-y-8 lg:space-y-10">
          {caseStudies.map((item, index) => (
            <CaseStudyCard
              key={item.number}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}