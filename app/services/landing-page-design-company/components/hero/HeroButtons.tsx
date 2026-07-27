'use client'

import { useLandingContact } from '../../landing-contact'

export function HeroButtons() {
  const { open } = useLandingContact()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={open}
          className="inline-flex h-14 w-full items-center justify-center bg-[#E5FF00] px-8 text-base font-bold tracking-wide text-neutral-900 transition-colors hover:bg-[#d4ec00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 sm:w-fit"
        >
          Book a call &rarr;
        </button>
      </div>
      
      <div className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
        Reply within 24h · No pitch on call #1
      </div>
    </div>
  )
}