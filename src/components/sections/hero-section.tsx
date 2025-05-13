"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ChevronDown } from "lucide-react"
import AbstractBackground from "@/components/ui/abstract-background"
import Button from "@/components/ui/button"

export default function HeroSection() {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById("especialidades")
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    // Guarantee tha elements are visible before animations
    gsap.set([".hero-title", ".hero-subtitle", ".scroll-indicator"], { opacity: 1 })

    const heroTl = gsap.timeline()

    // Animate the hero bkground
    heroTl.fromTo(
      ".hero-image",
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
    )

    // Animate the hero text
    heroTl.fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=1")

    heroTl.fromTo(
      ".hero-subtitle",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8",
    )

    // Animate the scroll indicator
    heroTl.fromTo(
      ".scroll-indicator",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5",
    )

    // bounce animation scroll indicator
    gsap.to(".scroll-indicator", {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    // guarante the timeline is completed
    heroTl.eventCallback("onComplete", () => {
      gsap.set([".hero-title", ".hero-subtitle", ".scroll-indicator"], { clearProps: "all" })
    })

    return () => {
      // Lclean animations when te component is unmounted
      heroTl.kill()
    }
  }, [])

  return (
    <section ref={heroRef} className="h-screen relative flex items-center justify-center overflow-hidden">
      {/* lines bkground */}
      <AbstractBackground pattern="default" />

      <div className="absolute inset-0 z-0 hero-image">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
      </div>

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-20 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-yellow-500/20 to-pink-500/20 opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-36 h-36 rounded-full bg-gradient-to-r from-blue-500/20 to-teal-500/20 opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div ref={textRef} className="container mx-auto px-4 z-10 text-center text-white relative">
        <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 tracking-tighter text-shadow opacity-100">
          Cristina Duarte
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed text-white text-shadow-sm opacity-100">
          Capturando momentos, criando memórias eternas através das lentes
        </p>
        <div className="flex justify-center space-x-4 hero-buttons">
          <Button href="#especialidades" variant="primary">
            Explorar trabalhos
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-100"
        onClick={scrollToCategories}
      >
        <p className="text-sm text-white font-medium mb-2">Rolar para baixo</p>
        <ChevronDown className="w-6 h-6 text-white animate-bounce" />
      </div>
    </section>
  )
}
