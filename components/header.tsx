import Link from 'next/link'
import { HeaderClientOnly } from './header-client'

export function Header() {
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
            className="text-sm text-foreground hover:text-muted-foreground transition"
          >
            Our Work
          </Link>
          
          <Link href="/pricing" className="text-sm text-foreground hover:text-muted-foreground transition">
            Pricing
          </Link>
        </div>

        <HeaderClientOnly />
      </nav>
    </header>
  )
}
