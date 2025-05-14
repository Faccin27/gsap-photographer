"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useIsMobile } from "@/hooks/use-mobile"

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const smoothWrapperRef = useRef<HTMLDivElement>(null)
  const smoothContentRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

    if (isMobile) {
      document.body.classList.remove("smooth-scroll")
      return
    }

    document.body.classList.add("smooth-scroll")

    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: smoothContentRef.current,
      smooth: 1.2, 
      effects: true, 
      normalizeScroll: true, 
      ignoreMobileResize: true,
      smoothTouch: 0, 
      ease: "power2.out", 
    })

    ScrollTrigger.refresh()

    return () => {
      smoother && smoother.kill()
      document.body.classList.remove("smooth-scroll")
    }
  }, [isMobile])

  return (
    <div ref={smoothWrapperRef} className="smooth-wrapper overflow-hidden">
      <div ref={smoothContentRef} className="smooth-content">
        {children}
      </div>
    </div>
  )
}
