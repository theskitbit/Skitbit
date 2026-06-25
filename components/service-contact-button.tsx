"use client"

import type { ReactNode } from "react"
import { useContactOverlay } from "@/components/contact-overlay"

type ServiceContactButtonProps = {
  children: ReactNode
  variant?: "primary" | "dark" | "light"
  className?: string
}

export function ServiceContactButton({
  children,
  variant = "primary",
  className = "",
}: ServiceContactButtonProps) {
  const { open } = useContactOverlay()

  const variantClass =
    variant === "dark"
      ? "bg-foreground text-background"
      : variant === "light"
        ? "bg-background text-foreground"
        : "bg-primary text-primary-foreground"

  return (
    <button
      type="button"
      onClick={open}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:opacity-90 hover:shadow-lg active:scale-95",
        variantClass,
        className,
      ].join(" ")}
    >
      {children}
    </button>
  )
}