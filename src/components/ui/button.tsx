"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

interface ButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: "primary" | "outline" | "ghost"
  icon?: boolean
  className?: string
}

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  icon = true,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full font-medium transition-all duration-300"

  const variantClasses = {
    primary: "bg-white text-black hover:bg-opacity-90",
    outline: "bg-white/10 backdrop-blur-md text-white border border-white/20",
    ghost: "bg-transparent text-white hover:bg-white/5",
  }

  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center">
        {children}
        {icon && <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-white group-hover:bg-transparent transition-colors duration-300 delay-100"></span>
      )}
    </>
  )

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {buttonContent}
    </button>
  )
}
