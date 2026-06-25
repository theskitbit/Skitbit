'use client'

/* eslint-disable @next/next/no-img-element */

import { CreativeManagementForm } from '@/components/creative-management-form'
import {
  Check,
  CircleMinus,
  Handshake,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Network,
  PenTool,
  Radar,
  SmilePlus,
  Store,
} from 'lucide-react'
import { useState } from 'react'
import type { ComponentType, CSSProperties, ReactNode } from 'react'

type SliderItem = {
  src: string
  alt: string
}

type IconService = {
  title: string
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>
}


type CaseStudyProof = {
  value: string
  label: string
}

type CaseStudy = {
  number: string
  title: string
  problem: string
  lookedFine: string
  broken: string
  changed: string
  proof: CaseStudyProof[]
}

const BRAND_BLUE = '#b4c3d1'
const HERO_BLUE = '#b7c6d3'
const ACID = '#e3ff00'

const topSlider: SliderItem[] = [
  {
    src: '/images/Performance/409192025_339895605436685_3323936257367230990_n.jpg',
    alt: 'Performance creative project image 1',
  },
  {
    src: '/images/Performance/596284758_1030463365901840_5807054344332866793_n.jpg',
    alt: 'Performance creative project image 2',
  },
  {
    src: '/images/Performance/616067467_25509509108675897_4521992326289623542_n.jpg',
    alt: 'Performance creative project image 3',
  },
  {
    src: '/images/Performance/632025866_1221856753421360_4519545831609540723_n.jpg',
    alt: 'Performance creative project image 4',
  },
]

const bottomSlider: SliderItem[] = [
  {
    src: '/images/Performance/647177615_1917063232505117_165214121451966689_n.jpg',
    alt: 'Performance creative project image 5',
  },
  {
    src: '/images/Performance/660309491_1356059123030974_1464627561360688563_n.jpg',
    alt: 'Performance creative project image 6',
  },
  {
    src: '/images/Performance/689849928_4879799438913686_3902056144121162553_n.jpg',
    alt: 'Performance creative project image 7',
  },
  {
    src: '/images/Performance/692602816_2082638388963050_4892050403600326125_n.jpg',
    alt: 'Performance creative project image 8',
  },
]

const iconServices: IconService[] = [
  { title: 'Paid Social Advertising', Icon: MessageSquare },
  { title: 'Google Ads (Google Search, Shopping, YouTube)', Icon: Store },
  { title: 'Email & SMS Marketing', Icon: Network },
  { title: 'Performance Creative', Icon: PenTool },
  { title: 'Digital Strategy & Execution', Icon: Radar },
]

const blackServices = [
  {
    title: 'Paid Social Advertising',
    description:
      'With a holistic approach to our Paid Ads, we look at how they can lift your performance across all channels. We design a clear plan for scaling your account, plan which channels best relate to your brand, audience, and product - from Facebook, Instagram and TikTok to LinkedIn and Pinterest. Our work makes sure your paid channels are working their hardest for your brand.',
  },
  {
    title: 'Google Ads',
    description:
      "Don't sleep on Google Ads where your brand needs to be. We'll strategize the right placement for your ads across these main channels. Then we'll roll out your ads, monitor your ROAS, and tweak like a caffeinated Chihuahua until you're where you need to be.",
  },
  {
    title: 'Email & SMS Marketing',
    description:
      'We handle every aspect of your email and SMS programs to help you capture more qualified contacts, nurture more sales and retain more loyal customers that accelerate your lifetime value (LTV). Our goal is to help you continue profiting from your hard won customers.',
  },
  {
    title: 'Performance Creative',
    description:
      "What's a great digital strategy without great creative? Spoiler: it doesn't exist. Every campaign we create for your DTC brand is built on high-performing creatives, including striking visuals and videos, compelling customer reviews, UGC, and more.",
  },
  {
    title: 'Influencer Marketing',
    description:
      'Authentic branded content, made easy. We develop and execute influencer and user-generated-content marketing strategies based on your brand goals, helping you navigate the creator economy by connecting you with top social influencers, micro-influencers and creators.',
  },
]

const processSteps = [
  ['STEP 0', 'You decide you love us and MUST work with us. (It’s mutual.)'],
  ['STEP 1', 'We do an audit to figure out where we can have the biggest impact.'],
  [
    'STEP 2',
    'We build a roadmap that drives us to those goals (with offroad tires in the trunk just in case life happens).',
  ],
  ['STEP 3', 'Together, we build a flexible strategy and start drafting creatives.'],
  ['STEP 4', 'We lock in your ads, load ‘em into the platforms we’ve chosen, and pull the trigger.'],
  [
    'STEP 5',
    'You concentrate on serving all your new customers while we review performance, adjust as needed, and keep crushing it.',
  ],
]

const proofCards = [
  {
    Icon: LayoutDashboard,
    title: 'Super detailed, real-time Google Data Studio dashboards.',
    description:
      'We can pull out insights on your business and audience you probably didn’t even know existed. Yes, thank you, we’re thrilling at parties.',
  },
  {
    Icon: LineChart,
    title: 'Regular, detailed review of performance results.',
    description:
      'To get where you want to go, you need to know where you’ve been. We’re constantly reviewing key metrics and KPIs to ensure we’re progressing every single month.',
  },
  {
    Icon: Handshake,
    title: 'True Partnership',
    description:
      'We’ve found that our most rewarding and successful engagements happen when we work as an extension of your team.',
  },
]

const testimonials = [
  {
    quote:
      'We’ve been so happy with Skitbit & the results that we’ve expanded our scope with them. We love working with Skitbit and only wish we’d found them sooner.',
    name: 'Kevin Lee, Co-founder',
    company: 'Immi',
  },
  {
    quote:
      'You are rockstars and anyone would be lucky to have you on their accounts. I know we are.',
    name: 'Nicholas Broadley, Director of Growth',
    company: 'Pela Case',
  },
  {
    quote:
      'Keeping ahead of trends and dispensing strategic wisdom in a space as wild and fast-moving as DTC isn’t easy, even if Skitbit makes it look that way.',
    name: 'DTC Magazine',
    company: 'Top 50 Most Influential People in DTC',
  },
]

const rightFit = [
  'You’re running a DTC brand that makes amazing products, and you’re ready to focus on profitable scale',
  'You love it when your creative collaborators are TRULY partners',
  'You’re interested in a true partner that takes a holistic approach to growing your brand',
  'Your store’s monthly revenue is above $100k and you want to continue growing',
]

const wrongFit = [
  'You’ve lost passion for your products (if you ever had it) or you’re angling for a quick buck',
  'You don’t want human experts with ideas and plans - you want a joyless algorithm',
  'You micro-manage or second-guess the experts you hire',
  'You glorify hustle culture and have been burned out for so long, they call you the Great Fire of London',
]


const caseStudies: CaseStudy[] = [
  {
    number: '01',
    title: 'ROAS looked incredible. New customer growth did not.',
    problem:
      'Meta looked like the brand’s strongest channel because platform-reported ROAS was high.',
    lookedFine:
      'Dynamic product ads and warm-audience campaigns were returning impressive numbers.',
    broken:
      'The account was harvesting existing demand. Very little budget and creative effort was building a reliable new-customer engine.',
    changed:
      'We shifted focus to prospecting concepts, new-customer creative tests and performance reporting that separated demand capture from demand creation.',
    proof: [
      {
        value: '41%',
        label: 'Revenue from first-time buyers · previously 23%',
      },
      {
        value: '1.8x',
        label: 'New-customer ROAS · previously 1.2x',
      },
      {
        value: '$46',
        label: 'First-purchase CPA · previously $59',
      },
    ],
  },
  {
    number: '02',
    title: 'Ads worked before. Then every small change hurt performance.',
    problem:
      'A brand with earlier winning ads began seeing unstable results and rising acquisition costs.',
    lookedFine:
      'The team was still producing fresh-looking ads and had old winners inside the account.',
    broken:
      'They were changing visuals without learning what hook, angle, offer or format actually moved performance.',
    changed:
      'We created a structured testing system around concepts, hooks, formats and iterations so each new ad answered a clear question.',
    proof: [
      {
        value: '$38',
        label: 'Prospecting CPA · previously $52',
      },
      {
        value: '1.7%',
        label: 'Outbound CTR · previously 1.1%',
      },
      {
        value: '6',
        label: 'New profitable concepts found in 45 days',
      },
    ],
  },
  {
    number: '03',
    title: 'The ads got the click. The product page lost the sale.',
    problem:
      'Paid traffic was arriving, but visitors were dropping before purchase.',
    lookedFine:
      'Engagement and clicks suggested the ads were doing their job.',
    broken:
      'The post-click experience was weaker than the ad promise. The product visuals and page clarity were leaking premium trust.',
    changed:
      'We aligned paid creative and PDP presentation, creating a clearer and more consistent product journey from scroll to checkout.',
    proof: [
      {
        value: '3.0%',
        label: 'Purchase conversion rate · previously 0.9%',
      },
      {
        value: '$320',
        label: 'Average order value · previously $190',
      },
      {
        value: '5.7x',
        label: 'ROAS · previously 3.0x',
      },
    ],
  },
  {
    number: '04',
    title: 'The team made more ads. Revenue was still stuck.',
    problem:
      'Creative output was increasing, but monthly growth had plateaued.',
    lookedFine:
      'There was ad spend, frequent production and regular campaign activity.',
    broken:
      'The brand had output without a learning loop. Nobody knew which message or customer angle deserved the next budget increase.',
    changed:
      'We organised testing by hook, angle, offer and format, then used winning signals to guide the next creative batch.',
    proof: [
      {
        value: '$142K',
        label: 'Monthly revenue · previously $109K',
      },
      {
        value: '3.6x',
        label: 'Blended MER · previously 2.8x',
      },
      {
        value: '5',
        label: 'Scalable creative winners found in 60 days',
      },
    ],
  },
]
function LowHighlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-[4px] left-[-5px] z-0 h-[20px] w-[calc(100%+10px)] bg-[var(--acid)] max-md:h-[14px]" />
    </span>
  )
}

function BlueUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-[3px] left-[-3px] z-0 h-[16px] w-[calc(100%+6px)] bg-[var(--brand-blue)] max-md:h-[9px]" />
    </span>
  )
}

function WhiteUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-[8px] left-[-8px] z-0 h-[29px] w-[calc(100%+16px)] bg-white max-md:bottom-[3px] max-md:h-[13px]" />
    </span>
  )
}

function StepHighlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-[5px] left-[-4px] z-0 h-[18px] w-[calc(100%+8px)] bg-white max-md:bottom-[4px] max-md:h-[11px]" />
    </span>
  )
}

function InlineAcid({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-[1px] left-[-3px] z-0 h-[12px] w-[calc(100%+6px)] bg-[var(--acid)]" />
    </span>
  )
}

function Button({
  children,
  onClick,
  variant = 'acid',
  full = false,
  className = '',
}: {
  children: ReactNode
  onClick: () => void
  variant?: 'acid' | 'black'
  full?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center font-black leading-none transition hover:-translate-y-0.5 active:translate-y-0',
        variant === 'acid' ? 'bg-[var(--acid)] text-black' : 'bg-black text-white',
        full ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function SliderRow({
  items,
  direction,
}: {
  items: SliderItem[]
  direction: 'ltr' | 'rtl'
}) {
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div className="h-[126px] overflow-hidden sm:h-[190px] lg:h-[236px]">
      <div
        className={[
          'flex h-full w-max gap-[5px] lg:gap-[7px]',
          direction === 'ltr' ? 'marquee-ltr' : 'marquee-rtl',
        ].join(' ')}
      >
        {repeated.map((item, index) => (
          <img
            key={`${item.src}-${index}`}
            src={item.src}
            alt={item.alt}
            draggable={false}
            className="block h-full w-auto max-w-none shrink-0 select-none object-cover"
          />
        ))}
      </div>
    </div>
  )
}

function ServiceIcon({ Icon }: { Icon: IconService['Icon'] }) {
  return (
    <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full border border-black bg-white md:h-[88px] md:w-[88px]">
      <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full border-[3px] border-black md:h-[70px] md:w-[70px]">
        <Icon
          className="h-[38px] w-[38px] text-black md:h-[34px] md:w-[34px]"
          strokeWidth={1.7}
        />
      </div>
    </div>
  )
}

function ProofIcon({
  Icon,
}: {
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>
}) {
  return (
    <div className="mx-auto flex h-[118px] w-[118px] items-center justify-center rounded-full bg-black max-md:h-[116px] max-md:w-[116px]">
      <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full border border-white max-md:h-[94px] max-md:w-[94px]">
        <Icon
          className="h-[58px] w-[58px] text-white max-md:h-[56px] max-md:w-[56px]"
          strokeWidth={1.45}
        />
      </div>
    </div>
  )
}


function CaseStudyCard({
  study,
  index,
  onOpen,
}: {
  study: CaseStudy
  index: number
  onOpen: () => void
}) {
  return (
   <article className="case-study-card overflow-hidden border border-black bg-white">
      <div className="h-[12px] w-full bg-[var(--acid)] md:h-[14px]" />

      <div className="px-[19px] pb-[22px] pt-[20px] md:px-[42px] md:pb-[38px] md:pt-[32px]">
        <div className="flex items-center justify-between gap-5 border-b border-black/10 pb-[18px] md:pb-[24px]">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45 md:text-[11px]">
            Case {study.number}
          </p>

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45 md:text-[11px]">
            Performance Creative
          </p>
        </div>

        <div className="mt-[23px] grid gap-[25px] md:mt-[32px] lg:grid-cols-[minmax(365px,0.83fr)_minmax(540px,1.17fr)] lg:gap-[58px]">
          <div className="flex flex-col">
            <h3 className="max-w-[505px] text-[34px] font-black leading-[0.99] tracking-[-0.065em] text-black md:text-[52px] lg:text-[56px]">
              {study.title}
            </h3>

            <div className="mt-[25px] max-w-[490px] border-l-[5px] border-[var(--acid)] pl-[15px] md:mt-[34px] md:pl-[19px]">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40 md:text-[11px]">
                The problem
              </p>

              <p className="mt-[8px] text-[15px] font-medium leading-[1.48] tracking-[-0.025em] text-black/80 md:text-[17px]">
                {study.problem}
              </p>
            </div>

            <Button
              onClick={onOpen}
              className="mt-[27px] w-full px-[20px] py-[16px] text-[15px] md:mt-[38px] md:w-fit md:px-[26px] md:py-[17px] md:text-[16px]"
            >
              Discuss your problem
            </Button>
          </div>

          <div>
            <div className="grid overflow-hidden border border-black/10 md:grid-cols-3">
              <div className="border-b border-black/10 p-[17px] md:min-h-[190px] md:border-b-0 md:border-r md:p-[20px]">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40 md:text-[11px]">
                  01 / Looked fine
                </p>

                <p className="mt-[11px] text-[14px] font-medium leading-[1.48] tracking-[-0.025em] text-black/78 md:text-[15px]">
                  {study.lookedFine}
                </p>
              </div>

              <div className="border-b border-black/10 p-[17px] md:min-h-[190px] md:border-b-0 md:border-r md:p-[20px]">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40 md:text-[11px]">
                  02 / Was broken
                </p>

                <p className="mt-[11px] text-[14px] font-medium leading-[1.48] tracking-[-0.025em] text-black/78 md:text-[15px]">
                  {study.broken}
                </p>
              </div>

              <div className="p-[17px] md:min-h-[190px] md:p-[20px]">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40 md:text-[11px]">
                  03 / Changed
                </p>

                <p className="mt-[11px] text-[14px] font-medium leading-[1.48] tracking-[-0.025em] text-black/78 md:text-[15px]">
                  {study.changed}
                </p>
              </div>
            </div>

            <div className="mt-[16px] bg-black px-[17px] pb-[20px] pt-[16px] text-white md:mt-[18px] md:px-[21px] md:pb-[22px] md:pt-[18px]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--acid)] md:text-[11px]">
                Proof of impact
              </p>

              <div className="mt-[18px] grid grid-cols-1 gap-[22px] sm:grid-cols-3 sm:gap-[14px] md:gap-[18px]">
                {study.proof.map((metric) => (
                  <div key={metric.label} className="min-w-0">
                    <p className="whitespace-nowrap text-[32px] font-black leading-none tracking-[-0.065em] text-white sm:text-[clamp(25px,2.15vw,34px)] xl:text-[37px]">
                      {metric.value}
                    </p>

                    <p className="mt-[9px] max-w-[160px] text-[10px] font-medium leading-[1.35] text-white/65 md:text-[11px]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function CaseStudyStack({ onOpen }: { onOpen: () => void }) {
  return (
    <section
      id="case-studies"
      className="select-on-white scroll-mt-[86px] bg-white px-[13px] pb-[110px] pt-[66px] md:px-[24px] md:pb-[150px] md:pt-[102px]"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-[44px] md:mb-[66px]">
          <p className="inline-block bg-[var(--acid)] px-[11px] py-[5px] text-[10px] font-black uppercase tracking-[0.18em] text-black md:text-[11px]">
            Case Studies
          </p>

          <div className="mt-[20px] grid gap-[17px] md:mt-[27px] md:grid-cols-[minmax(430px,0.9fr)_minmax(420px,1.1fr)] md:items-end md:gap-[70px]">
            <h2 className="text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-black md:text-[68px]">
              The problem
              <br />
              <LowHighlight>comes first.</LowHighlight>
            </h2>

            <p className="max-w-[540px] text-[16px] font-medium leading-[1.5] tracking-[-0.03em] text-black/62 md:pb-[8px] md:text-[20px]">
              What seemed healthy, what was actually holding growth back, and what had to change.
            </p>
          </div>
        </div>

        <div className="case-study-stack">
          {caseStudies.map((study, index) => (
            <div
              key={study.number}
              className="case-study-slot"
              style={
                {
                  '--stack-order': index,
                  zIndex: index + 1,
                } as CSSProperties
              }
            >
              <CaseStudyCard
                study={study}
                index={index}
                onOpen={onOpen}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialButton({
  direction,
  onClick,
}: {
  direction: 'previous' | 'next'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'previous' ? 'Previous testimonial' : 'Next testimonial'}
      onClick={onClick}
      className="relative z-20 flex h-[62px] w-[62px] shrink-0 cursor-pointer items-center justify-center border-[3px] border-[var(--acid)] bg-[var(--acid)] text-[22px] font-black leading-none shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 active:translate-y-0 max-md:h-[56px] max-md:w-[56px]"
    >
      ⊙⊙
    </button>
  )
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const active = testimonials[index]

  function previous() {
    setIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1))
  }

  function next() {
    setIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1))
  }

  return (
    <section className="select-on-white relative isolate z-[60] bg-white px-[24px] pb-[82px] pt-[8px] max-md:px-[13px] max-md:pb-[58px]">
      <div className="mx-auto h-px max-w-[1160px] bg-black" />

      <div className="mx-auto max-w-[980px] pt-[56px] text-center md:pt-[70px]">
        <div
          className="flex min-h-[380px] items-center justify-center md:min-h-[320px]"
          aria-live="polite"
          aria-atomic="true"
        >
          <blockquote className="mx-auto max-w-[760px] text-[48px] font-normal leading-[1.22] tracking-[-0.06em] text-black max-md:max-w-[335px] max-md:text-[32px]">
            “{active.quote}”
          </blockquote>
        </div>

        <div className="mx-auto mt-[24px] flex max-w-[980px] items-center justify-between md:mt-[34px]">
          <TestimonialButton direction="previous" onClick={previous} />

          <p className="max-w-[260px] text-center text-[16px] font-medium leading-[1.5] tracking-[-0.025em] text-black max-md:max-w-[180px] max-md:text-[15px]">
            {active.name}
            <br />
            {active.company}
          </p>

          <TestimonialButton direction="next" onClick={next} />
        </div>
      </div>
    </section>
  )
}

export default function PerformanceCreativeManagementPage() {
  const [isCreativeFormOpen, setIsCreativeFormOpen] = useState(false)

  function open() {
    setIsCreativeFormOpen(true)
  }

  return (
    <main
      className="kulin-page min-h-screen overflow-x-hidden bg-white text-black"
      style={
        {
          '--brand-blue': BRAND_BLUE,
          '--hero-blue': HERO_BLUE,
          '--acid': ACID,
        } as CSSProperties
      }
    >
      <style jsx global>{`
        @font-face {
          font-family: 'DazzedBold';
          src: url('/fonts/DazzedBold.woff2') format('woff2');
          font-style: normal;
          font-weight: 700;
          font-display: swap;
        }

        .kulin-page {
          font-family: Arial, Helvetica, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .kulin-page .font-black {
          font-family: 'DazzedBold', Arial, Helvetica, sans-serif;
          font-weight: 700;
        }

        .select-on-acid::selection,
        .select-on-acid *::selection {
          background: #000;
          color: var(--acid);
        }

        .select-on-black::selection,
        .select-on-black *::selection {
          background: var(--acid);
          color: #000;
        }

        .select-on-blue::selection,
        .select-on-blue *::selection {
          background: #000;
          color: var(--acid);
        }

        .select-on-white::selection,
        .select-on-white *::selection {
          background: #000;
          color: var(--acid);
        }

        .keep-selection-normal::selection,
        .keep-selection-normal *::selection {
          background: transparent;
          color: inherit;
        }

        @keyframes marqueeLTR {
          from {
            transform: translate3d(-25%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes marqueeRTL {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-25%, 0, 0);
          }
        }

        .marquee-ltr {
          animation: marqueeLTR 20s linear infinite;
          will-change: transform;
        }

        .marquee-rtl {
          animation: marqueeRTL 20s linear infinite;
          will-change: transform;
        }

                .case-study-stack {
          position: relative;
        }

        .case-study-slot {
          position: sticky;
          top: calc(82px + (var(--stack-order) * 14px));
          margin-bottom: 18vh;
        }

        .case-study-slot:last-child {
          margin-bottom: 0;
        }

        .case-study-card {
          position: relative;
          transform-origin: center top;
          box-shadow:
            0 -1px 0 rgba(0, 0, 0, 0.04),
            0 12px 32px rgba(0, 0, 0, 0.06);
        }

        @media (max-width: 767px) {
          .marquee-ltr,
          .marquee-rtl {
            animation-duration: 10s;
          }

          .case-study-slot {
            position: relative;
            top: auto;
            margin-bottom: 18px;
          }

          .case-study-card {
            box-shadow: 0 8px 22px rgba(0, 0, 0, 0.05);
          }
        }
      `}</style>

      {/* PERFORMANCE PAGE HEADER */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-black/[0.06] bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a
            href="/"
            className="text-lg font-medium tracking-tight text-black transition-opacity hover:opacity-65"
          >
            SKITBIT<span className="text-xs">®</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            <a
              href="#about"
              className="text-sm text-black transition hover:text-black/50"
            >
              About
            </a>

            <a
              href="#services"
              className="text-sm text-black transition hover:text-black/50"
            >
              Services
            </a>

            <a
              href="#case-studies"
              className="text-sm text-black transition hover:text-black/50"
            >
              Case studies
            </a>

            <a
              href="#process"
              className="text-sm text-black transition hover:text-black/50"
            >
              How it works
            </a>
          </div>

          <button
            type="button"
            onClick={open}
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-80"
          >
            Contact Us
          </button>
        </nav>
      </header>

      {/* HERO + CREATIVE GALLERY */}
      <section className="mx-[24px] mt-[86px] overflow-hidden bg-[var(--acid)] max-md:mx-[13px] max-md:mt-[76px]">
        <div className="mx-auto flex max-w-[1360px] flex-col items-center px-[22px] pb-[58px] pt-[76px] text-center md:px-[54px] md:pb-[76px] md:pt-[92px]">
          <h1 className="max-w-[1120px] text-balance text-[52px] font-black leading-[0.96] tracking-[-0.075em] text-black sm:text-[68px] md:text-[92px] lg:text-[108px]">
            Turn ad spend
            <br />
            into new customers.
          </h1>

          <p className="mt-[28px] max-w-[590px] text-[17px] font-medium leading-[1.48] tracking-[-0.035em] text-black/68 md:mt-[34px] md:text-[21px]">
            Paid ads and performance creative for D2C brands ready to grow beyond recycled demand.
          </p>

          <div className="mt-[38px] flex flex-col items-center gap-[19px] sm:flex-row md:mt-[46px]">
            <Button
              variant="black"
              onClick={open}
              className="px-[32px] py-[18px] text-[16px] md:px-[38px] md:py-[21px] md:text-[19px]"
            >
              Work with Skitbit
            </Button>

            <a
              href="#case-studies"
              className="inline-flex items-center justify-center px-[8px] py-[12px] text-[16px] font-black tracking-[-0.035em] text-black transition hover:opacity-55 md:text-[18px]"
            >
              See the work&nbsp; ↗
            </a>
          </div>
        </div>
      </section>
      {/* LOOPING IMAGE SLIDER */}
      <section className="mt-[18px] overflow-hidden bg-white max-md:mt-[10px]">
        <SliderRow items={topSlider} direction="ltr" />
        <div className="h-[5px] lg:h-[7px]" />
        <SliderRow items={bottomSlider} direction="rtl" />
      </section>

      {/* PRESS LINE */}
      <section className="select-on-white bg-white px-[12px] py-[24px] text-center md:py-[34px]">
        <p className="mx-auto max-w-[340px] text-[23px] font-normal leading-[1.28] tracking-[-0.045em] text-black md:max-w-none md:text-[31px]">
          <span className="block md:inline">Top</span>{' '}
          <span className="relative inline-block whitespace-nowrap">
            <span className="relative z-10">50 Most Influential Thought</span>
            <span className="absolute bottom-[3px] left-[-3px] z-0 h-[13px] w-[calc(100%+6px)] bg-[var(--acid)] md:h-[16px]" />
          </span>{' '}
          <span className="block md:inline">Leaders in DTC</span>
        </p>

        <p className="mt-[13px] text-[17px] font-black leading-none tracking-[-0.035em] text-black md:text-[14px]">
          DTC Magazine, 2021
        </p>
      </section>

      {/* ABOUT / LOGOS / CARDS / QUOTE */}
      <section
        id="about"
        className="mx-[12px] bg-[var(--brand-blue)] px-[8px] pb-[86px] pt-[70px] md:mx-[24px] md:px-6 md:pb-[120px] md:pt-[104px]"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center">
            <p className="mx-auto inline-block bg-white px-[10px] py-[2px] text-[18px] font-black leading-none tracking-[-0.04em] text-black md:text-[15px]">
              You&apos;re in good company.
            </p>
          </div>

          <div className="mx-auto mt-[36px] grid max-w-[270px] grid-cols-2 items-center gap-x-[36px] gap-y-[30px] text-center md:mt-[64px] md:max-w-[1080px] md:grid-cols-6 md:gap-x-[58px] md:gap-y-0">
            {[
              {
                name: 'põla',
                className: 'text-[39px] font-black tracking-[-0.04em] md:text-[42px]',
              },
              {
                name: 'mini moo',
                className: 'text-[19px] font-black leading-[0.9] tracking-[-0.03em] md:text-[17px]',
              },
              {
                name: 'Beardbrand',
                className: 'text-[22px] font-medium tracking-[-0.04em] md:text-[27px]',
              },
              {
                name: 'Only Curls',
                className: 'font-serif text-[21px] italic font-medium tracking-[-0.04em] md:text-[25px]',
              },
              {
                name: 'BENCHMADE',
                className: 'font-serif text-[13px] font-black tracking-[0.22em] md:text-[16px]',
              },
              {
                name: 'THORN↗',
                className: 'text-[30px] font-medium tracking-[-0.03em] md:text-[38px]',
              },
            ].map((logo) => (
              <div
                key={logo.name}
                className="flex min-h-[34px] items-center justify-center text-black md:min-h-[52px]"
              >
                <span className={logo.className}>{logo.name}</span>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-[58px] grid max-w-[1140px] grid-cols-1 items-stretch gap-[10px] md:mt-[64px] md:grid-cols-[544px_544px] md:gap-[52px]">
            {/* ACID CARD */}
            <div className="select-on-acid relative min-h-[478px] w-full overflow-visible bg-[var(--acid)] px-[24px] py-[43px] md:h-[620px] md:max-w-[544px] md:px-[40px] md:py-[52px]">
              <div className="absolute right-[-48px] top-[78px] z-20 flex h-[112px] w-[112px] items-center justify-center rounded-full border border-black bg-white md:right-[38px] md:top-[32px] md:h-[86px] md:w-[86px]">
                <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-[3px] border-black md:h-[70px] md:w-[70px]">
                  <SmilePlus
                    className="h-[56px] w-[56px] text-black md:h-[42px] md:w-[42px]"
                    strokeWidth={2.1}
                  />
                </div>
              </div>

              <p className="text-[31px] font-black leading-[1.05] tracking-[-0.045em] text-black md:text-[30px] md:tracking-[-0.055em]">
                Hi, we&apos;re Skitbit.
                <br />
                <span className="text-[31px] font-normal italic tracking-[-0.045em] md:text-[28px] md:tracking-[-0.055em]">
                  Skit • bit
                </span>
              </p>

<p className="mt-[96px] max-w-[248px] text-[23px] font-normal leading-[1.23] tracking-[-0.05em] text-black md:mt-[166px] md:max-w-[455px] md:pr-8 md:text-[40px] md:leading-[1.05] md:tracking-[-0.075em]">
  We&apos;re brand builders who love performance, helping D2C brands grow with better ads, stronger creative and smarter growth decisions.
</p>
            </div>

            {/* WHITE CARD */}
            <div className="h-auto w-full bg-white px-[24px] py-[36px] md:h-[620px] md:max-w-[544px] md:px-[41px] md:py-[50px]">
              <div className="space-y-[31px] md:space-y-[34px]">
                <div>
                  <h2 className="text-[28px] font-black leading-[1.04] tracking-[-0.045em] text-black md:text-[31px] md:leading-none md:tracking-[-0.055em]">
                    Why performance marketing?
                  </h2>

                  <p className="mt-[15px] max-w-[420px] text-[18px] font-medium leading-[1.24] tracking-[-0.045em] text-black md:mt-[20px] md:max-w-[470px] md:text-[17px] md:leading-[1.53] md:tracking-[-0.045em]">
                    Call it a complex, but the pressure of performance drives us. We love finding the perfect mix of
                    media buying, storytelling and digital marketing - not just the ROI of a single channel - to achieve
                    sustainable growth.
                  </p>
                </div>

                <div>
                  <h2 className="text-[28px] font-black leading-[1.04] tracking-[-0.045em] text-black md:text-[31px] md:leading-none md:tracking-[-0.055em]">
                    Why brand-first?
                  </h2>

                  <p className="mt-[15px] max-w-[420px] text-[18px] font-medium leading-[1.24] tracking-[-0.045em] text-black md:mt-[20px] md:max-w-[470px] md:text-[17px] md:leading-[1.53] md:tracking-[-0.045em]">
                    We&apos;ve seen too many great companies, products, and services weakened with poor creative and brand
                    experiences. Performance weakens when the brand feels forgettable. We build creative that earns attention, trust and the purchase.
                  </p>
                </div>

                <div>
                  <h2 className="text-[28px] font-black leading-[1.04] tracking-[-0.045em] text-black md:text-[31px] md:leading-none md:tracking-[-0.055em]">
                    Why us?
                  </h2>

                  <p className="mt-[15px] max-w-[420px] text-[18px] font-medium leading-[1.24] tracking-[-0.045em] text-black md:mt-[20px] md:max-w-[470px] md:text-[17px] md:leading-[1.53] md:tracking-[-0.045em]">
                    One partner for creative, testing and growth decisions. Faster learning, fewer handoffs and reporting you can actually use.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BLUE TESTIMONIAL */}
          <figure className="select-on-blue relative mx-auto mt-[84px] max-w-[1080px] px-[10px] pb-[8px] pt-[28px] text-center md:mt-[96px] md:pb-[10px] md:pt-[42px]">
            <div className="pointer-events-none absolute right-[8px] top-[-4px] flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[var(--acid)] md:right-[110px] md:top-[-12px]">
              <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full border-[3px] border-black text-[31px] font-black leading-none">
                ☞
              </div>
            </div>

            <blockquote className="mx-auto max-w-[900px] text-[32px] font-normal leading-[1.34] tracking-[-0.06em] text-black md:max-w-[760px] md:text-[58px] md:leading-[1.3]">
              “You are rockstars and anyone would be lucky to have you on their accounts. I know we are.”
            </blockquote>

            <figcaption className="mx-auto mt-[28px] max-w-[280px] text-[16px] font-black leading-[1.2] tracking-[-0.04em] text-black md:mt-[34px] md:max-w-none md:text-[20px]">
              Nicholas Broadley, Director of Growth, Pela Case
            </figcaption>
          </figure>
        </div>
      </section>
      
      {/* BLACK DETAIL */}
      <section className="mx-[24px] mt-[34px] bg-white pb-[34px] max-md:mx-[14px]">
        <div className="min-h-[730px] bg-black px-6 pb-[90px] pt-[86px] text-white">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid grid-cols-[540px_580px] gap-[118px] max-xl:grid-cols-2 max-xl:gap-16 max-lg:grid-cols-1 max-lg:gap-10">
              <h2 className="keep-selection-normal max-w-[530px] text-[64px] font-black leading-[1.08] tracking-[-0.07em] text-[var(--acid)] max-xl:text-[58px] max-md:text-[44px]">
                Brand-first performance marketing with a smile.
              </h2>

              <p className="select-on-black max-w-[520px] pt-[2px] text-[39px] font-normal leading-[1.06] tracking-[-0.065em] text-white max-xl:text-[34px] max-md:text-[26px]">
                Obsessed with growing your brand? So are we. Here are some of the areas we&apos;ll focus on when you work
                with Skitbit.
              </p>
            </div>

            <div className="mt-[62px] h-px w-full bg-white/90" />

            <div className="mt-[38px] grid grid-cols-[540px_580px] gap-x-[118px] gap-y-[42px] max-xl:grid-cols-2 max-xl:gap-x-16 max-lg:grid-cols-1">
              {blackServices.map((service) => (
                <article key={service.title} className="select-on-black max-w-[560px]">
                  <h3 className="text-[27px] font-black leading-none tracking-[-0.045em] text-white max-md:text-[22px]">
                    {service.title}
                  </h3>

                  <p className="mt-[13px] text-[17px] font-medium leading-[1.42] tracking-[-0.055em] text-white max-md:text-[14px]">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CASE STUDIES / VERTICAL STACK */}
      <CaseStudyStack onOpen={open} />

      {/* SCROLLING TESTIMONIALS */}
      <TestimonialCarousel />

      {/* FIT + CTA */}
      <section className="mx-[24px] bg-[var(--brand-blue)] px-6 pb-[72px] pt-[78px] max-md:mx-[13px] max-md:px-[10px] max-md:pt-[56px]">
        <h2 className="mx-auto max-w-[760px] text-center text-[32px] font-black leading-[1.16] tracking-[-0.04em] max-md:max-w-[340px] max-md:text-[30px]">
          Skitbit works with brand-forward DTC brands that are both established or ready to scale.
        </h2>

        <div className="mx-auto mt-[62px] grid max-w-[980px] grid-cols-2 gap-[48px] max-md:grid-cols-1 max-md:gap-[20px]">
          <div className="border-t-[22px] border-[var(--acid)] bg-white px-[36px] py-[36px] max-md:px-[22px] max-md:py-[32px]">
            <h3 className="text-[28px] font-black leading-[1.1] tracking-[-0.045em] max-md:text-[30px]">
              We&apos;re the <InlineAcid>right</InlineAcid> fit if...
            </h3>

            <div className="mt-[28px] space-y-[30px]">
              {rightFit.map((item) => (
                <div key={item} className="flex gap-[14px]">
                  <Check className="mt-[2px] h-[20px] w-[20px] shrink-0 rounded-full border border-black p-[2px]" />
                  <p className="text-[15px] font-medium leading-[1.55] tracking-[-0.02em] max-md:text-[18px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-[22px] border-black bg-white px-[36px] py-[36px] max-md:px-[22px] max-md:py-[32px]">
            <h3 className="text-[28px] font-black leading-[1.1] tracking-[-0.045em] max-md:text-[30px]">
              We&apos;re <InlineAcid>NOT</InlineAcid> the right fit if...
            </h3>

            <div className="mt-[28px] space-y-[30px]">
              {wrongFit.map((item) => (
                <div key={item} className="flex gap-[14px]">
                  <CircleMinus className="mt-[2px] h-[20px] w-[20px] shrink-0" />
                  <p className="text-[15px] font-medium leading-[1.55] tracking-[-0.02em] max-md:text-[18px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-[44px] max-w-[980px] text-center">
          <Button
            onClick={open}
            full
            className="px-[20px] py-[15px] text-[15px] md:w-auto"
          >
            Right fit? Reach out!
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white px-6 pb-[44px] pt-[38px] max-md:pb-[54px] max-md:pt-[34px]">
        <div className="mx-auto grid max-w-[1520px] grid-cols-7 items-center gap-6 text-center text-[26px] font-medium tracking-[-0.04em] max-md:flex max-md:flex-col max-md:items-center max-md:gap-[26px] max-md:text-[21px]">
          <a href="/" className="hover:underline">
            About
          </a>

          <button
            type="button"
            onClick={open}
            className="font-medium hover:underline"
          >
            Connect
          </button>

          <a href="/blog" className="hover:underline">
            Blog
          </a>

          <div className="text-center max-md:order-last max-md:mt-[18px]">
            <div className="text-[58px] font-black leading-none tracking-[-0.08em] text-[var(--brand-blue)] max-md:text-[66px]">
              SKITBIT
            </div>

            <div className="mt-2 text-[18px] font-medium text-black/45 max-md:text-[20px]">
              © Skitbit Co 2026
            </div>
          </div>

          <a href="#" className="hover:underline">
            Oddit
          </a>

          <a href="https://twitter.com" className="hover:underline">
            Twitter
          </a>

          <a href="https://www.linkedin.com" className="hover:underline">
            LinkedIn
          </a>
        </div>
      </footer>

      {/* PERFORMANCE CREATIVE MANAGEMENT FORM OVERLAY */}
      {isCreativeFormOpen && (
  <CreativeManagementForm onClose={() => setIsCreativeFormOpen(false)} />
)}
    </main>
  )
}