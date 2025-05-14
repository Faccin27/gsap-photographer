"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface DistortedHeadingProps {
  title: string
  center?: boolean
  size?: "small" | "medium" | "large"
}

export default function DistortedHeading({ title, center = true, size = "large" }: DistortedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (headingRef.current) {
      const heading = headingRef.current

      // Create a scroll trigger for the heading
      ScrollTrigger.create({
        trigger: heading,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            heading,
            {
              opacity: 0,
              y: 30,
              skewX: 5,
              filter: "blur(10px)",
            },
            {
              opacity: 1,
              y: 0,
              skewX: 0,
              filter: "blur(0px)",
              duration: 1,
              ease: "power3.out",
            },
          )
        },
        once: true,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === headingRef.current) {
          trigger.kill()
        }
      })
    }
  }, [title])

  const sizeClasses = {
    small: "text-2xl md:text-3xl",
    medium: "text-3xl md:text-4xl",
    large: "text-4xl md:text-5xl",
  }

  return (
    <h2
      ref={headingRef}
      className={`font-bold tracking-tight text-white ${sizeClasses[size]} ${center ? "text-center" : ""} opacity-0`}
    >
      {title}
    </h2>
  )
}
