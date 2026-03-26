"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, ChevronLeft } from "lucide-react"

const brandTypes = ["D2C (Shopify brand)", "Amazon-first brand", "Both", "Just starting out"]

const projectTypes = [
  "Launching a new product",
  "Improving existing listings",
  "Need ongoing content for ads",
  "Just exploring",
]

const timelines = ["Within 2 weeks", "This month", "No fixed timeline"]

function ChipButton({
  label,
  isSelected,
  onClick,
}: {
  label: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      className={`px-4 py-2 rounded-full text-sm border transition ${
        isSelected
          ? "bg-primary text-primary-foreground border-transparent"
          : "bg-surface-secondary dark:bg-dark-surface-secondary border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary hover:opacity-80"
      }`}
    >
      {label}
    </motion.button>
  )
}

export default function LeadCaptureForm() {
  const [step, setStep] = useState(1)

  const [brand, setBrand] = useState("")
  const [project, setProject] = useState("")
  const [timeline, setTimeline] = useState("")
  const [product, setProduct] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  const [submitted, setSubmitted] = useState(false)

  const total = 5

  const canNext = () => {
    if (step === 1) return brand
    if (step === 2) return project
    if (step === 3) return timeline
    if (step === 4) return product.trim()
    if (step === 5) return name.trim() && email.trim()
    return false
  }

  const handleSubmit = () => {
    console.log({ brand, project, timeline, product, name, email, whatsapp })
    setSubmitted(true)
  }

  const openWhatsApp = () => {
    const msg = `Hey, just submitted a request:

Brand: ${brand}
Need: ${project}
Timeline: ${timeline}
Product: ${product}

Would love to take this forward.`

    const encoded = encodeURIComponent(msg)
    window.open(`https://wa.me/919XXXXXXXXX?text=${encoded}`, "_blank")
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-surface-primary dark:bg-dark-surface-primary border border-border dark:border-dark-border rounded-2xl p-8 shadow-sm text-text-primary dark:text-dark-text-primary">
      
      {/* Progress */}
      <div className="mb-6 text-sm text-text-secondary dark:text-dark-text-secondary">
        Step {step} of {total}
      </div>

      <div className="h-1 bg-border dark:bg-dark-border rounded mb-8">
        <motion.div
          className="h-full bg-primary rounded"
          animate={{ width: `${(step / total) * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >

          {step === 1 && (
            <>
              <h2 className="text-xl mb-4">What kind of brand are you?</h2>
              <div className="flex flex-wrap gap-2">
                {brandTypes.map((b) => (
                  <ChipButton key={b} label={b} isSelected={brand === b} onClick={() => setBrand(b)} />
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl mb-4">What are you working on right now?</h2>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((p) => (
                  <ChipButton key={p} label={p} isSelected={project === p} onClick={() => setProject(p)} />
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl mb-4">When do you need this?</h2>
              <div className="flex flex-wrap gap-2">
                {timelines.map((t) => (
                  <ChipButton key={t} label={t} isSelected={timeline === t} onClick={() => setTimeline(t)} />
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-xl mb-4">What product should we create visuals for?</h2>
              <input
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. Ashwagandha bottle OR product link"
                className="w-full p-3 rounded bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary"
              />
            </>
          )}

          {step === 5 && !submitted && (
            <>
              <h2 className="text-xl mb-4">How can we reach you?</h2>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full p-3 mb-3 rounded bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 mb-3 rounded bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary"
              />

              <input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="WhatsApp (optional)"
                className="w-full p-3 rounded bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary"
              />
            </>
          )}

          {step === 5 && submitted && (
            <div className="text-center">
              <h2 className="text-xl mb-4">Got it.</h2>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                We’ll get back to you shortly.
              </p>

              <button
                onClick={openWhatsApp}
                className="w-full mb-3 p-3 bg-primary text-primary-foreground hover:opacity-90 rounded"
              >
                Continue on WhatsApp
              </button>

              <button
                onClick={() => location.reload()}
                className="w-full p-3 bg-surface-secondary border border-border dark:border-dark-border rounded"
              >
                Done
              </button>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {!submitted && (
        <div className="flex justify-between mt-8">
          <button onClick={() => setStep(step - 1)} disabled={step === 1}>
            <ChevronLeft />
          </button>

          {step < total ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90"
            >
              Next <ChevronRight />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90"
            >
              Submit <Check />
            </button>
          )}
        </div>
      )}
    </div>
  )
}