'use client';

import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero3DStudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen w-full bg-surface-primary dark:bg-dark-surface-primary overflow-hidden">
      {/* Background gradient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-500/5 blur-[150px]" />
      </div>

      <motion.div
        className="relative z-10 px-6 md:px-12 lg:px-24 py-12 md:py-20 lg:py-28"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Desktop: 2-column grid */}
        <div className="hidden lg:grid grid-cols-2 gap-16 items-center max-w-7xl mx-auto min-h-[calc(100vh-var(--header-height)-120px)]">
          {/* Left Column */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            {/* Headline */}
            <div>
              <motion.h1
                variants={itemVariants}
                className="text-7xl lg:text-8xl font-medium text-text-primary dark:text-dark-text-primary leading-none tracking-tight text-balance mb-6"
              >
                We turn products into high-end cinema
              </motion.h1>

              {/* Subheader */}
              <motion.p
                variants={itemVariants}
                className="text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed max-w-lg"
              >
                Elevate your brand with stunning 3D animations and visual storytelling that captivates and converts.
              </motion.p>
            </div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <button
                className="group relative px-8 py-4 bg-accent-500 text-text-on-accent-primary dark:text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(147,51,234,0.3)]"
                onClick={() => console.log('Get a quote clicked')}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get a Quote
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Vertical Video Container */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-start"
          >
            <div className="relative w-full max-w-xs aspect-video lg:aspect-[9/16] rounded-3xl overflow-hidden border border-border dark:border-dark-border bg-grayscale-900 dark:bg-grayscale-800">
              {/* Video placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-grayscale-800 to-grayscale-950 dark:from-grayscale-950 dark:to-black" />

              {/* Glassmorphism overlay for play button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    if (videoRef.current) {
                      isPlaying ? videoRef.current.pause() : videoRef.current.play();
                    }
                  }}
                  className="backdrop-blur-md bg-black/30 hover:bg-black/50 p-4 rounded-full transition-all duration-300 border border-white/20"
                >
                  <Play className="w-8 h-8 text-white fill-white" />
                </motion.button>
              </div>

              {/* Video element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                loop
              >
                <source src="" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="lg:hidden flex flex-col gap-8 max-w-3xl mx-auto">
          {/* Mobile Navigation & Headline */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl font-medium text-text-primary dark:text-dark-text-primary leading-tight tracking-tight text-balance"
            >
              We turn products into high-end cinema
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed"
            >
              Elevate your brand with stunning 3D animations and visual storytelling that captivates and converts.
            </motion.p>
          </motion.div>

          {/* Mobile: Vertical Video (65vh) */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="relative w-full h-[65vh] rounded-3xl overflow-hidden border border-border dark:border-dark-border bg-grayscale-900 dark:bg-grayscale-800">
              {/* Video placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-grayscale-800 to-grayscale-950 dark:from-grayscale-950 dark:to-black" />

              {/* Glassmorphism overlay for play button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    if (videoRef.current) {
                      isPlaying ? videoRef.current.pause() : videoRef.current.play();
                    }
                  }}
                  className="backdrop-blur-md bg-black/30 hover:bg-black/50 p-3 sm:p-4 rounded-full transition-all duration-300 border border-white/20"
                >
                  <Play className="w-6 sm:w-8 h-6 sm:h-8 text-white fill-white" />
                </motion.button>
              </div>

              {/* Video element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                loop
              >
                <source src="" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          {/* Mobile: CTA Button */}
          <motion.div variants={itemVariants}>
            <button
              className="group relative w-full px-8 py-4 bg-accent-500 text-text-on-accent-primary dark:text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(147,51,234,0.3)]"
              onClick={() => console.log('Get a quote clicked')}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get a Quote
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Social Proof Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 mt-24 md:mt-32 px-6 md:px-12 lg:px-24 py-16 md:py-20 border-t border-border dark:border-dark-border"
      >
        <div className="max-w-7xl mx-auto">
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-text-secondary dark:text-dark-text-secondary text-center mb-12 tracking-wide font-medium"
          >
            Join 25+ companies already growing with our 3D solutions
          </motion.p>

          {/* Scrollable logo row */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex gap-12 md:gap-16 whitespace-nowrap"
            >
              {/* Logo placeholders - will be replaced with actual logos */}
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-12 px-8 rounded-lg bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border text-text-tertiary dark:text-dark-text-tertiary font-medium text-sm shrink-0"
                >
                  Brand {index}
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex items-center justify-center h-12 px-8 rounded-lg bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border text-text-tertiary dark:text-dark-text-tertiary font-medium text-sm shrink-0"
                >
                  Brand {index}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </section>
  );
}
