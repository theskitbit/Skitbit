'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

type Step = 1 | 2 | 3 | 4 | 5 | 'complete';

interface FormData {
  brandType: string;
  currentNeeds: string;
  timeline: string;
  productDescription: string;
  name: string;
  email: string;
  whatsapp: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const chipVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export default function LeadForm() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    brandType: '',
    currentNeeds: '',
    timeline: '',
    productDescription: '',
    name: '',
    email: '',
    whatsapp: '',
  });

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!formData.brandType;
      case 2:
        return !!formData.currentNeeds;
      case 3:
        return !!formData.timeline;
      case 4:
        return !!formData.productDescription;
      case 5:
        return !!formData.name && !!formData.email;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) return;

    if (currentStep === 5) {
      setCurrentStep('complete');
    } else if (currentStep !== 'complete') {
      setCurrentStep((prev) => (prev as number) + 1 as Step);
    }
  };

  const handleBack = () => {
    if (currentStep !== 'complete') {
      setCurrentStep((prev) => {
        if (prev === 1) return 1;
        return (prev as number) - 1 as Step;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNext();
  };

  const progress = currentStep === 'complete' ? 100 : ((currentStep as number) / 5) * 100;

  return (
    <section className="w-full bg-gradient-to-b from-dark-surface-primary to-dark-surface-secondary py-20">
      <div className="mx-auto flex max-w-xl flex-col items-center px-4">
        {/* Progress Bar */}
        <div className="mb-12 w-full">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-dark-text-tertiary">
              {currentStep === 'complete' ? 'Complete' : `Step ${currentStep} of 5`}
            </span>
          </div>
          <motion.div
            className="h-1 w-full overflow-hidden rounded-full bg-dark-surface-tertiary"
            initial={false}
          >
            <motion.div
              className="h-full bg-accent-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-dark-text-primary mb-2">
                What kind of brand are you?
              </motion.h2>
              <motion.p variants={itemVariants} className="mb-8 text-sm text-dark-text-tertiary">
                Select one
              </motion.p>
              <motion.div variants={containerVariants} className="space-y-3">
                {['D2C (Shopify brand)', 'Amazon-first brand', 'Both', 'Just starting out'].map((option) => (
                  <motion.button
                    key={option}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial="initial"
                    className={`w-full rounded-full px-6 py-3 text-sm font-medium transition-all ${
                      formData.brandType === option
                        ? 'bg-accent-500 text-white'
                        : 'border border-dark-border bg-dark-surface-secondary text-dark-text-primary hover:border-accent-500/50'
                    }`}
                    onClick={() => setFormData({ ...formData, brandType: option })}
                  >
                    {option}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-dark-text-primary mb-2">
                What are you working on right now?
              </motion.h2>
              <motion.p variants={itemVariants} className="mb-8 text-sm text-dark-text-tertiary">
                Select one
              </motion.p>
              <motion.div variants={containerVariants} className="space-y-3">
                {['Launching a new product', 'Improving existing listings', 'Need ongoing content for ads', 'Just exploring'].map(
                  (option) => (
                    <motion.button
                      key={option}
                      variants={itemVariants}
                      whileHover="hover"
                      whileTap="tap"
                      initial="initial"
                      className={`w-full rounded-full px-6 py-3 text-sm font-medium transition-all ${
                        formData.currentNeeds === option
                          ? 'bg-accent-500 text-white'
                          : 'border border-dark-border bg-dark-surface-secondary text-dark-text-primary hover:border-accent-500/50'
                      }`}
                      onClick={() => setFormData({ ...formData, currentNeeds: option })}
                    >
                      {option}
                    </motion.button>
                  )
                )}
              </motion.div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-dark-text-primary mb-2">
                When do you need this?
              </motion.h2>
              <motion.p variants={itemVariants} className="mb-8 text-sm text-dark-text-tertiary">
                Select one
              </motion.p>
              <motion.div variants={containerVariants} className="space-y-3">
                {['Within 2 weeks', 'This month', 'No fixed timeline'].map((option) => (
                  <motion.button
                    key={option}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial="initial"
                    className={`w-full rounded-full px-6 py-3 text-sm font-medium transition-all ${
                      formData.timeline === option
                        ? 'bg-accent-500 text-white'
                        : 'border border-dark-border bg-dark-surface-secondary text-dark-text-primary hover:border-accent-500/50'
                    }`}
                    onClick={() => setFormData({ ...formData, timeline: option })}
                  >
                    {option}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-dark-text-primary mb-2">
                What product should we create visuals for?
              </motion.h2>
              <motion.p variants={itemVariants} className="mb-8 text-sm text-dark-text-tertiary">
                One line is enough
              </motion.p>
              <motion.input
                variants={itemVariants}
                type="text"
                placeholder="e.g. Ashwagandha capsules bottle, 60 count"
                value={formData.productDescription}
                onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                className="w-full rounded-full border border-dark-border bg-dark-surface-secondary px-6 py-3 text-sm text-dark-text-primary placeholder-dark-text-tertiary focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/20 transition-all"
              />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.form
              key="step5"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="w-full space-y-6"
            >
              <div>
                <motion.h2 variants={itemVariants} className="text-2xl font-bold text-dark-text-primary mb-2">
                  How can we reach you?
                </motion.h2>
              </div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-medium text-accent-400">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-full border border-dark-border bg-dark-surface-secondary px-6 py-3 text-sm text-dark-text-primary placeholder-dark-text-tertiary focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/20 transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-medium text-accent-400">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-full border border-dark-border bg-dark-surface-secondary px-6 py-3 text-sm text-dark-text-primary placeholder-dark-text-tertiary focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/20 transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-medium text-dark-text-tertiary">WhatsApp number (optional)</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full rounded-full border border-dark-border bg-dark-surface-secondary px-6 py-3 text-sm text-dark-text-primary placeholder-dark-text-tertiary focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/20 transition-all"
                />
              </motion.div>
            </motion.form>
          )}

          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center text-center"
            >
              <motion.div
                variants={itemVariants}
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/20"
              >
                <CheckCircle2 className="h-8 w-8 text-accent-400" />
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-dark-text-primary mb-3">
                Got it.
              </motion.h2>
              <motion.p variants={itemVariants} className="text-sm text-dark-text-tertiary mb-8">
                We&apos;ll review this and get back to you shortly.
              </motion.p>
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-full bg-accent-500 px-6 py-3 text-sm font-medium text-white hover:bg-accent-600 transition-colors"
              >
                Done
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep !== 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex w-full gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2 rounded-full border border-dark-border bg-dark-surface-secondary px-6 py-3 text-sm font-medium text-dark-text-primary transition-all hover:border-dark-text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={!isStepValid()}
              className="ml-auto flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
