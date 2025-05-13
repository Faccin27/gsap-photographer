"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface DistortedHeadingProps {
  title: string
  className?: string
  color?: string
  size?: "small" | "medium" | "large"
  center?: boolean
}

export default function DistortedHeading({
  title,
  className = "",
  color = "text-white",
  size = "large",
  center = true,
}: DistortedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!headingRef.current) return

    // Create individual spans for each letter
    const text = headingRef.current
    const letters = text.innerText.split("")
    text.innerHTML = ""

    letters.forEach((letter, index) => {
      const span = document.createElement("span")
      span.innerText = letter
      span.className = "inline-block transform transition-transform duration-300"
      span.style.display = letter === " " ? "inline" : "inline-block"
      span.style.transformOrigin = "center center"
      text.appendChild(span)
    })

    // Apply random rotation and skew to each letter
    const spans = text.querySelectorAll("span")
    spans.forEach((span) => {
      const randomRotate = Math.random() * 10 - 5 // -5 to 5 degrees
      const randomSkewX = Math.random() * 10 - 5 // -5 to 5 degrees
      const randomSkewY = Math.random() * 6 - 3 // -3 to 3 degrees
      const randomY = Math.random() * 6 - 3 // -3 to 3 pixels

      gsap.set(span, {
        rotation: randomRotate,
        skewX: randomSkewX,
        skewY: randomSkewY,
        y: randomY,
      })
    })

    // Add hover effect to the entire heading
    text.addEventListener("mouseenter", () => {
      spans.forEach((span) => {
        gsap.to(span, {
          rotation: 0,
          skewX: 0,
          skewY: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        })
      })
    })

    text.addEventListener("mouseleave", () => {
      spans.forEach((span) => {
        const randomRotate = Math.random() * 10 - 5
        const randomSkewX = Math.random() * 10 - 5
        const randomSkewY = Math.random() * 6 - 3
        const randomY = Math.random() * 6 - 3

        gsap.to(span, {
          rotation: randomRotate,
          skewX: randomSkewX,
          skewY: randomSkewY,
          y: randomY,
          duration: 0.4,
          ease: "power2.out",
        })
      })
    })
  }, [title])

  const sizeClasses = {
    small: "text-3xl md:text-4xl",
    medium: "text-4xl md:text-5xl",
    large: "text-5xl md:text-6xl",
  }

  return (
    <h2
      ref={headingRef}
      className={`font-bold tracking-tight ${color} ${sizeClasses[size]} ${center ? "text-center" : ""} ${className}`}
    >
      {title}
    </h2>
  )
}
