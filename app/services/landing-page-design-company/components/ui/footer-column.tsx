import { ReactNode } from 'react'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumnProps {
  title?: string
  children?: ReactNode
  links?: FooterLink[]
  isBrand?: boolean
}

export function FooterColumn({
  title,
  children,
  links,
  isBrand = false,
}: FooterColumnProps) {
  if (isBrand) {
    return (
      <div>
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-300" />
          The Landing Page Company
        </h3>
        {children}
      </div>
    )
  }

  return (
    <div>
      {title && (
        <h4 className="font-mono text-xs mb-4 uppercase text-gray-500">
          {title}
        </h4>
      )}
      {links ? (
        <ul className="space-y-2 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-yellow-300 transition"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        children
      )}
    </div>
  )
}
