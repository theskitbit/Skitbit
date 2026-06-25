'use client'

import Link from 'next/link'
import { useContactOverlay } from './contact-overlay'

export function KulinHeader() {
  const { open } = useContactOverlay()

  return (
    <header className="fixed top-0 w-full z-50 bg-blue-100 border-b-4 border-yellow-400">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-yellow-400">
          KULIN
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm font-bold text-black hover:opacity-70 transition">
            About Kulin
          </Link>
          <Link href="#calculator" className="text-sm font-bold text-black hover:opacity-70 transition">
            Calculator
          </Link>
        </div>

        {/* CTA Button */}
        <button
          onClick={open}
          className="px-4 py-2 bg-yellow-400 text-black font-bold text-sm rounded-none hover:opacity-90 transition"
        >
          Connect w. Kulin
        </button>
      </nav>
    </header>
  )
}
