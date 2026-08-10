'use client';

import Link from 'next/link';
import { useContactOverlay } from './contact-overlay';

export function Hero() {
  const { open } = useContactOverlay();

  return (
    <section aria-label="Skitbit introduction" className="w-full border-b border-border bg-background pb-0 pt-[48px]">
      <div className="relative mx-auto grid min-h-[629px] w-full max-w-[964px] lg:max-w-7xl grid-cols-1 border-x border-border lg:grid-cols-2">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-px -translate-x-1/2 bg-border lg:block" />

        <div className="flex items-end px-8 pb-8 pt-16 sm:px-12 lg:px-6 lg:pb-8 xl:px-6">
          <div className="w-full max-w-[500px]">
            <h1 className="m-0 max-w-[490px] text-[54px] font-medium leading-[0.9] tracking-[-0.065em] text-foreground sm:text-[64px] lg:text-[66px] xl:text-[66px]">
              <span className="block">Stop</span>
              <span className="block">explaining.</span>
              <span className="block">Show it in 3D.</span>
            </h1>

            <p className="mt-6 max-w-[430px] text-[15px] leading-[1.45] text-muted-foreground sm:text-[16px]">
              Your on-demand 3D production partner for product launches, paid media, ecommerce &amp; brand campaigns.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={open} className="btn-primary inline-flex h-11 cursor-pointer items-center justify-center rounded-full px-7 text-[15px] font-medium lg:min-w-[176px]">
                Partner with Us
              </button>
              <Link href="/works" className="btn-ghost inline-flex h-11 items-center justify-center rounded-full px-7 text-[15px] font-medium lg:min-w-[128px]">
                Our Work
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden bg-muted lg:min-h-0">
          <video src="https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/_HerovideoMainpage%20%281%29.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Colorful 3D product visualization" className="absolute inset-0 block h-full w-full object-cover object-center" />
        </div>
      </div>
    </section>
  );
}
