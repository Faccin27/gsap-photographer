"use client"

import { type ReactNode, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CustomCursor from "@/components/ui/custom-cursor"
import SmoothScroll from "@/components/ui/smooth-scroll"
import { useIsMobile } from "@/hooks/use-mobile"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate abstract lines for backgrounds
    gsap.to(".abstract-line", {
      strokeDashoffset: 0,
      duration: 4,
      ease: "power2.inOut",
      stagger: 0.2,
    })

    // Force ScrollTrigger refresh after a short delay to ensure proper initialization
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true)
    }, 200)

    return () => {
      clearTimeout(refreshTimeout)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <main className="overflow-x-hidden bg-[#00000080] text-white">
      <CustomCursor mousePosition={mousePosition} />
      {isMobile ? children : <SmoothScroll>{children}</SmoothScroll>}
    </main>
  )
}
