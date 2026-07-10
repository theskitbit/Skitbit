'use client'

import Link from 'next/link'

export function FooterClientOnly() {
  const handlePrivacyReset = (e: React.MouseEvent) => {
    e.preventDefault()
    localStorage.removeItem('skitbit-cookie-consent')
    window.location.reload()
  }

  return (
    <div className="flex gap-4 flex-wrap justify-center text-xs font-medium text-muted-foreground">
      <Link
        href="/privacy-policy"
        className="hover:opacity-100 opacity-70 transition-opacity duration-200 hover:text-foreground"
      >
        Privacy Policy
      </Link>
      <span className="opacity-30">•</span>
      <Link
        href="/terms-of-service"
        className="hover:opacity-100 opacity-70 transition-opacity duration-200 hover:text-foreground"
      >
        Terms of Service
      </Link>
      <span className="opacity-30">•</span>
      <Link
        href="/cookie-policy"
        className="hover:opacity-100 opacity-70 transition-opacity duration-200 hover:text-foreground"
      >
        Cookie Policy
      </Link>
      <span className="opacity-30">•</span>
      <button
        onClick={handlePrivacyReset}
        className="hover:opacity-100 opacity-70 cursor-pointer transition-opacity duration-200 hover:text-foreground"
      >
        Do Not Sell or Share My Personal Information
      </button>
    </div>
  )
}
