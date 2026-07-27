'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { useState } from 'react'

export function Calculator() {
  const [spend, setSpend] = useState(35000)
  const [roas, setRoas] = useState(5)
  const [lift, setLift] = useState(20)

  // Calculations
  const currentRevenue = spend * roas
  const beforeRevenue = currentRevenue * 0.01 // simplified
  const afterRevenue = currentRevenue * (1 + lift / 100)
  const monthlyGain = afterRevenue - beforeRevenue
  const yearlyGain = monthlyGain * 12

  return (
    <section className="bg-background py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">Do the math</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Move the sliders. The only section on this site that makes you do work. The numbers
            move. Your decision gets easier.
          </p>
        </motion.div>

        {/* Calculator Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 border-2 border-border p-8"
        >
          {/* Left side - Sliders */}
          <div className="space-y-8">
            {/* Monthly Ad Spend */}
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">
                MONTHLY AD SPEND
              </label>
              <input
                type="range"
                min="5000"
                max="235000"
                value={spend}
                onChange={(e) => setSpend(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm mt-2">
                <span>$5.9K</span>
                <span className="text-blue-accent font-bold">${(spend / 1000).toFixed(1)}K</span>
                <span>$235.3K</span>
              </div>
            </div>

            {/* ROAS */}
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">
                ROAS
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={roas}
                onChange={(e) => setRoas(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm mt-2">
                <span>1x</span>
                <span className="text-blue-accent font-bold">{roas}x</span>
                <span>20K</span>
              </div>
            </div>

            {/* Lift */}
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">
                OUR PROMISE ON LIFT
              </label>
              <input
                type="range"
                min="20"
                max="120"
                value={lift}
                onChange={(e) => setLift(Number(e.target.value))}
                className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm mt-2">
                <span>+20%</span>
                <span className="text-blue-600 font-bold">+{lift}%</span>
                <span>+120%</span>
              </div>
            </div>
          </div>

          {/* Right side - Results */}
          <div className="flex flex-col justify-center">
            <div className="text-sm font-mono text-muted-foreground mb-2">
              EXTRA REVENUE / MONTH
            </div>
            <div className="text-5xl md:text-6xl font-black text-blue-accent mb-8">
              +${(monthlyGain / 1000).toFixed(1)}K
            </div>

            <div className="space-y-6 border-t border-border pt-6">
              <div>
                <div className="text-xs font-mono text-muted-foreground">
                  BEFORE · REV / MONTH
                </div>
                <p className="text-2xl font-bold text-foreground">
                  ${(beforeRevenue / 1000).toFixed(1)}K
                </p>
              </div>
              <div>
                <div className="text-xs font-mono text-muted-foreground">
                  AFTER · REV / MONTH
                </div>
                <p className="text-2xl font-bold text-foreground">
                  ${(afterRevenue / 1000).toFixed(1)}K
                </p>
              </div>
              <div>
                <div className="text-xs font-mono text-muted-foreground">
                  12-MONTH NET GAIN
                </div>
                <p className="text-2xl font-bold text-foreground">
                  ${(yearlyGain / 1000).toFixed(1)}K
                </p>
              </div>
            </div>

            {/* Yellow highlight box */}
            <div className="mt-8 bg-accent p-4 text-sm font-bold text-accent-foreground">
              Verdict: Payback under a quarter. This is what we exist for. Book the call.
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
