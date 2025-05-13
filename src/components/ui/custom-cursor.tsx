"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface CustomCursorProps {
  mousePosition: { x: number; y: number }
}

export default function CustomCursor({ mousePosition }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cursorRef.current && cursorDotRef.current) {
      // smooth effect
      gsap.to(cursorRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.5,
        ease: "power2.out",
      })

      // Center dot with 0 smooth
      gsap.to(cursorDotRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.1,
        ease: "power1.out",
      })
    }
  }, [mousePosition])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-12 h-12 rounded-full border-2 border-white opacity-70 pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x - 24}px, ${mousePosition.y - 24}px)`,
        }}
      ></div>
      <div
        ref={cursorDotRef}
        className="fixed w-3 h-3 rounded-full bg-white opacity-90 pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x - 6}px, ${mousePosition.y - 6}px)`,
        }}
      ></div>
    </>
  )
}
