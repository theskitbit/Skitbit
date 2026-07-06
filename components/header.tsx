// components/header.tsx
'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useContactOverlay } from './contact-overlay'

export function Header() {
  const { open } = useContactOverlay()
  const router = useRouter()
  const pathname = usePathname()

  const handleContactClick = () => {
    open();
  };

  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Route directly to your new dedicated works page
    router.push('/works');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#F9F9F6]/80 backdrop-blur-md border-b border-gray-200/50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">

        <Link href="/" className="text-lg font-medium tracking-tight text-[#0A192F]">
          SKITBIT<span className="text-xs">®</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <Link href="/#about" className="text-sm text-[#0A192F] hover:text-gray-500 transition">
            About
          </Link>
          
          {/* Points to your clean dedicated /works page route */}
          <Link 
            href="/works" 
            onClick={handleWorkClick}
            className={`text-sm font-medium transition cursor-pointer ${
              pathname === '/works' 
                ? 'text-[#0A192F] underline underline-offset-4 decoration-2' 
                : 'text-[#0A192F]/80 hover:text-[#0A192F]'
            }`}
          >
            Our Work
          </Link>
          
          <Link href="/pricing" className="text-sm text-[#0A192F] hover:text-gray-500 transition">
            Pricing
          </Link>
        </div>

        <button 
          onClick={handleContactClick} 
          className="bg-[#D9FF00] text-[#0A192F] border border-[#D9FF00] px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition shadow-sm"
        >
          Contact Us
        </button>

      </nav>
    </header>
  )
}