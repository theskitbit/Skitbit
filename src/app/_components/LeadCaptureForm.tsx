"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"


const brandTypes = ["D2C (Shopify brand)", "Amazon-first brand", "Both", "Just starting out"]
const projectTypes = ["Launching a new product","Improving existing listings","Need ongoing content for ads","Just exploring"]
const timelines = ["Within 2 weeks", "This month", "No fixed timeline"]

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
}

function ChipButton({ label, isSelected, onClick }: any) {
  return (
    <motion.button
      onClick={onClick}
      layout
      initial={false}
      animate={{
        backgroundColor: isSelected ? "#1e3a5f" : "rgba(39,39,42,0.5)",
      }}
      whileHover={{
        backgroundColor: isSelected ? "#1e3a5f" : "rgba(39,39,42,0.8)",
      }}
      whileTap={{
        backgroundColor: isSelected ? "#152943" : "rgba(39,39,42,0.9)",
      }}
      transition={{ ...transitionProps, backgroundColor: { duration: 0.1 } }}
      className={`inline-flex items-center px-4 py-2 rounded-full text-base font-medium whitespace-nowrap overflow-hidden ring-1 ring-inset ${
        isSelected ? "text-blue-400 ring-white/10" : "text-zinc-400 ring-white/5"
      }`}
    >
      <motion.div
        className="relative flex items-center"
        animate={{
          width: isSelected ? "auto" : "100%",
          paddingRight: isSelected ? "1.5rem" : "0",
        }}
        transition={{ duration: 0.3 }}
      >
        <span>{label}</span>

        <AnimatePresence>
          {isSelected && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={transitionProps}
              className="absolute right-0"
            >
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={1.5} />
              </div>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
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

  const next = () => step < total && setStep(step + 1)
  const back = () => step > 1 && setStep(step - 1)

  const submit = () => {
    console.log({ brand, project, timeline, product, name, email, whatsapp })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-[540px]">

        {/* Progress */}
        <div className="mb-12">
          <div className="text-zinc-500 text-sm mb-3">
            Step {step} of {total}
          </div>

          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / total) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          >

            {step === 1 && (
              <>
                <h1 className="text-xl font-semibold mb-4">What kind of brand are you?</h1>
                <p className="text-zinc-400 mb-12">Select one</p>
                <motion.div className="flex flex-wrap gap-3" layout transition={transitionProps}>
                  {brandTypes.map((b) => (
                    <ChipButton key={b} label={b} isSelected={brand === b} onClick={() => setBrand(b)} />
                  ))}
                </motion.div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-xl font-semibold mb-4">What are you working on right now?</h1>
                <p className="text-zinc-400 mb-12">Select one</p>
                <motion.div className="flex flex-wrap gap-3" layout transition={transitionProps}>
                  {projectTypes.map((p) => (
                    <ChipButton key={p} label={p} isSelected={project === p} onClick={() => setProject(p)} />
                  ))}
                </motion.div>
              </>
            )}

            {step === 3 && (
              <>
                <h1 className="text-xl font-semibold mb-4">When do you need this?</h1>
                <p className="text-zinc-400 mb-12">Select one</p>
                <motion.div className="flex flex-wrap gap-3" layout transition={transitionProps}>
                  {timelines.map((t) => (
                    <ChipButton key={t} label={t} isSelected={timeline === t} onClick={() => setTimeline(t)} />
                  ))}
                </motion.div>
              </>
            )}

            {step === 4 && (
              <>
                <h1 className="text-xl font-semibold mb-4">What product should we create visuals for?</h1>
                <p className="text-zinc-400 mb-12">One line is enough</p>
                <input
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="e.g. Ashwagandha capsules bottle, 60 count"
                  className="w-full px-4 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
              </>
            )}

            {step === 5 && !submitted && (
              <>
                <h1 className="text-xl font-semibold mb-4">How can we reach you?</h1>
                <div className="space-y-5">
                  {[{v:name,set:setName,p:"Your name"},
                    {v:email,set:setEmail,p:"Email"},
                    {v:whatsapp,set:setWhatsapp,p:"WhatsApp (optional)"}].map((f,i)=>(
                    <input
                      key={i}
                      value={f.v}
                      onChange={(e)=>f.set(e.target.value)}
                      placeholder={f.p}
                      className="w-full px-4 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    />
                  ))}
                </div>
              </>
            )}

            {step === 5 && submitted && (
              <div className="text-center">
                <h1 className="text-xl font-semibold mb-4">Got it.</h1>
                <p className="text-zinc-400 mb-6">We’ll get back to you shortly.</p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {!submitted && (
          <div className="mt-12 flex justify-between">
            <button onClick={back} disabled={step===1} className="text-zinc-400">
              ←
            </button>

            {step < total ? (
              <button onClick={next} disabled={!canNext()} className="bg-blue-500 px-4 py-2 rounded">
                Next →
              </button>
            ) : (
              <button onClick={submit} className="bg-blue-500 px-4 py-2 rounded">
                Submit ✓
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}