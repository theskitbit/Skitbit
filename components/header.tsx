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
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">

        <Link href="/" className="text-lg font-medium tracking-tight text-foreground">
          SKITBIT<span className="text-xs">®</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <Link href="/#about" className="text-sm text-foreground hover:text-muted-foreground transition">
            About
          </Link>
          
          <Link 
            href="/works" 
            onClick={handleWorkClick}
            className={`text-sm transition cursor-pointer ${
              pathname === '/works' 
                ? 'text-foreground font-medium underline underline-offset-4 decoration-2' 
                // Removed the /80 opacity and matched the hover state of the other links
                : 'text-foreground hover:text-muted-foreground'
            }`}
          >
            Our Work
          </Link>
          
          <Link href="/pricing" className="text-sm text-foreground hover:text-muted-foreground transition">
            Pricing
          </Link>
        </div>

        <button 
          onClick={handleContactClick} 
          className="bg-primary text-primary-foreground border border-primary px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition shadow-sm"
        >
          Contact Us
        </button>

      </nav>
    </header>
  )
}