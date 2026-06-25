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
    
    // If we are already on the homepage, scroll smoothly straight to the element
    if (pathname === '/') {
      const element = document.getElementById('work');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If we are on a secondary page (like /pricing), navigate home first with the hash
      router.push('/#work');
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">

        <Link href="/" className="text-lg font-medium tracking-tight text-foreground">
          SKITBIT<span className="text-xs">®</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <Link href="/#about" className="text-sm text-foreground hover:text-muted-foreground transition">
            About
          </Link>
          
          {/* Managed via manual javascript smooth scroll trigger */}
          <a 
            href="#work" 
            onClick={handleWorkClick}
            className="text-sm text-foreground hover:text-muted-foreground transition cursor-pointer"
          >
            Our Work
          </a>
          
          <Link href="/pricing" className="text-sm text-foreground hover:text-muted-foreground transition">
            Pricing
          </Link>
        </div>

        <button onClick={handleContactClick} className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
          Contact Us
        </button>

      </nav>
    </header>
  )
}