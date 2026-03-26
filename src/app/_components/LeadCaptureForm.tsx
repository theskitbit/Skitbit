"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, ChevronLeft } from "lucide-react"

const brandTypes = ["D2C (Shopify brand)", "Amazon-first brand", "Both", "Just starting out"]
const projectTypes = ["Launching a new product","Improving existing listings","Need ongoing content for ads","Just exploring"]
const timelines = ["Within 2 weeks", "This month", "No fixed timeline"]

function ChipButton({ label, isSelected, onClick }: any) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.05 }}
      animate={{
        scale: isSelected ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`px-4 py-2 rounded-full text-sm border transition ${
        isSelected
          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
          : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
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
Product: ${product}`

    window.open(`https://wa.me/919XXXXXXXXX?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-black text-white rounded-2xl p-8 shadow-2xl border border-white/10">

      {/* Progress */}
      <div className="mb-6 text-sm text-white/50">
        Step {step} of {total}
      </div>

      <div className="h-1 bg-white/10 rounded mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          animate={{ width: `${(step / total) * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
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
              <motion.input
                whileFocus={{ scale: 1.01 }}
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. Ashwagandha bottle OR product link"
                className="w-full p-3 rounded bg-white/5 border border-white/10 text-white placeholder:text-white/40"
              />
            </>
          )}

          {step === 5 && !submitted && (
            <>
              <h2 className="text-xl mb-4">How can we reach you?</h2>

              {[{v:name,set:setName,p:"Your name"},
                {v:email,set:setEmail,p:"Email"},
                {v:whatsapp,set:setWhatsapp,p:"WhatsApp (optional)"}].map((f,i)=>(
                <motion.input
                  key={i}
                  whileFocus={{ scale: 1.01 }}
                  value={f.v}
                  onChange={(e)=>f.set(e.target.value)}
                  placeholder={f.p}
                  className="w-full p-3 mb-3 rounded bg-white/5 border border-white/10 text-white placeholder:text-white/40"
                />
              ))}
            </>
          )}

          {step === 5 && submitted && (
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-center">
              <h2 className="text-xl mb-4">Got it.</h2>
              <p className="text-white/50 mb-6">We’ll get back to you shortly.</p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={openWhatsApp}
                className="w-full mb-3 p-3 bg-blue-600 rounded hover:bg-blue-700"
              >
                Continue on WhatsApp
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => location.reload()}
                className="w-full p-3 bg-white/10 rounded hover:bg-white/20"
              >
                Done
              </motion.button>
            </motion.div>
          )}

        </motion.div>
      </AnimatePresence>

      {!submitted && (
        <div className="flex justify-between mt-8">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setStep(step - 1)} disabled={step === 1}>
            <ChevronLeft />
          </motion.button>

          {step < total ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Next <ChevronRight />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleSubmit}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit <Check />
            </motion.button>
          )}
        </div>
      )}
    </div>
  )
}