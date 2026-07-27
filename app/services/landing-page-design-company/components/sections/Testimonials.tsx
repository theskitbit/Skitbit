'use client'

import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

interface Testimonial {
  author: string
  role: string
  logo: string
  content: string
  avatar: string
  rating: number
}

// Updated data to match the screenshot provided
const testimonials: Testimonial[] = [
  {
    logo: 'Wellbeing Nutrition',
    content: 'One of the pages we have made with TLPC team has resulted into 44% increase in conversion rate',
    author: 'Vatsala Singh',
    role: 'AVP, Wellbeing Nutrition',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vatsala',
    rating: 5,
  },
  {
    logo: 'ZEROHARM',
    content: 'The strategic approach they brought to the project resulted in a revenue jump by 35%',
    author: 'Sachin Darbarwar',
    role: 'Founder ZeroHarm',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sachin',
    rating: 5,
  },
  {
    logo: 'HealthFab',
    content: 'The improved user experience has led to higher engagement and a more satisfied customer base.',
    author: 'Sourav',
    role: 'Co-founder, Healthfab',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sourav',
    rating: 5,
  },
  {
    logo: 'the basics',
    content: 'Our customers are more engaged, and our sales have never been better.',
    author: 'Suchita A Mukerji',
    role: 'Founder - The Basic Women',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suchita',
    rating: 5,
  },
  {
    logo: 'itokri',
    content: 'The changes they implemented led to a significant increase in performance metrics.',
    author: 'Nitin Pamnani',
    role: 'Founder, Itokri',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nitin',
    rating: 5,
  },
]

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="h-5 w-5 text-[#E5FF00]"
          fill="currentColor"
          stroke="#171717"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  // Duplicate the array to create a seamless infinite scrolling loop
  const marqueeItems = [...testimonials, ...testimonials]

  return (
    <section className="bg-[#F4F4F0] py-24 text-neutral-900 md:py-32">
      {/* Self-contained CSS for the marquee animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <Container className="mb-16 md:mb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex -space-x-3">
              {testimonials.slice(0, 4).map((t, i) => (
                <img
                  key={i}
                  src={t.avatar}
                  alt={t.author}
                  className="h-12 w-12 rounded-full border-2 border-neutral-900 bg-[#F4F4F0] object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
          <h2 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl lg:text-[56px]">
            1000+ Happy Clients
          </h2>
          <p className="text-base text-neutral-500">
            Trusted by thousands of people
          </p>
        </motion.div>
      </Container>

      {/* Full-width Marquee Slider */}
      <div className="w-full overflow-hidden border-y border-neutral-900/30">
        <div className="flex w-fit animate-scroll">
          {marqueeItems.map((testimonial, idx) => (
            <div
              key={idx}
              className="flex w-[340px] shrink-0 flex-col border-r border-neutral-900/30 md:w-[420px]"
            >
              {/* Logo Section */}
              <div className="flex h-24 items-center justify-center border-b border-neutral-900/30 px-8">
                {/* Fallback to text if actual SVG logos are not provided yet */}
                <span className="text-xl font-bold tracking-tight text-neutral-800">
                  {testimonial.logo}
                </span>
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col items-center justify-between gap-8 p-8 md:p-10">
                <StarRating />

                <p className="text-center text-base font-medium leading-relaxed text-neutral-900 md:text-lg">
                  {testimonial.content}
                </p>

                <div className="mt-4 flex flex-col items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-14 w-14 rounded-full border border-neutral-900/20 object-cover"
                    loading="lazy"
                  />
                  <div className="text-center">
                    <div className="font-semibold text-neutral-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}