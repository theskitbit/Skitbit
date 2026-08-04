'use client'

interface BreadcrumbItem {
  label: string
  href: string
  ariaLabel: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const defaultItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', ariaLabel: 'Go to home page' },
    { label: '3D Product Rendering', href: '#services', ariaLabel: 'View 3D rendering services' },
    { label: 'E-commerce Solutions', href: '#advantages', ariaLabel: 'View e-commerce advantages' },
  ]

  const breadcrumbs = items || defaultItems

  return (
    <nav
      className="hidden md:block py-4 px-6 bg-background/50 border-b border-border"
      aria-label="Breadcrumb navigation"
    >
      <ol className="flex items-center gap-2 max-w-7xl mx-auto text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <a
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label={item.ariaLabel}
            >
              {item.label}
            </a>
            {index < breadcrumbs.length - 1 && (
              <span className="text-muted-foreground/50" aria-hidden="true">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
