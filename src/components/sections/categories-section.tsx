"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import AbstractBackground from "@/components/ui/abstract-background"
import SectionHeading from "@/components/ui/section-heading"

export default function CategoriesSection() {
  const categoriesRef = useRef(null)
  const horizontalRef = useRef(null)
  const sectionsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    // Get the smoother instance if it exists
    const smoother = ScrollSmoother.get()

    // If smoother exists, tell it to ignore this section completely
    if (smoother && categoriesRef.current) {
      // This prevents ScrollSmoother from affecting this section
      smoother.effects(categoriesRef.current, { speed: 0 })
    }

    // Horizontal scroll for categories
    if (horizontalRef.current && categoriesRef.current) {
      const sections = sectionsRef.current
      const container = horizontalRef.current

      // Calculate total width of all sections
      const totalWidth = sections.reduce((width, section) => {
        return width + section.offsetWidth
      }, 0)

      // Set the width in container
      gsap.set(container, { width: totalWidth })

      // Create the horizontal scroll animation with a separate timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top top",
          end: () => `+=${totalWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Add the horizontal movement to the timeline
      tl.to(container, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        duration: 1,
      })

      return () => {
        // Clean up
        tl.scrollTrigger?.kill()
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === categoriesRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  const categories = [
    {
      id: "01",
      title: "Moda",
      image: "/images/moda.png",
      description:
        "Fotografia de moda que captura a essência e a beleza das roupas, acessórios e modelos. Trabalho com marcas e estilistas para criar imagens que destacam seus produtos de forma única e impactante.",
    },
    {
      id: "02",
      title: "Casamentos",
      image: "/images/casamento.png",
      description:
        "Capturo a magia e a emoção do seu dia especial com um olhar artístico e atento aos detalhes. Cada fotografia conta uma história, preservando memórias que durarão para sempre.",
    },
    {
      id: "03",
      title: "Paisagens",
      image: "/images/paisagem.png",
      description:
        "Através das minhas lentes, capturo a grandiosidade e a beleza da natureza. Minhas fotografias de paisagens transmitem a serenidade e a majestade dos cenários naturais.",
    },
    {
      id: "04",
      title: "Retratos",
      image: "/images/retrato.png",
      description:
        "Cada pessoa tem uma história única para contar. Meus retratos capturam a essência e a personalidade de cada indivíduo, criando imagens autênticas e emocionantes.",
    },
  ]

  return (
    <section id="especialidades" ref={categoriesRef} className="bg-black py-20 overflow-hidden">
      {/* Abstract background with lines */}
      <AbstractBackground pattern="waves" />

      <div className="container mx-auto px-4 mb-12 relative z-10">
        <div className="categories-header">
          <SectionHeading
            title="Especialidades"
            subtitle="Explore os diversos estilos e categorias de fotografia que ofereço"
          />
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div ref={horizontalRef} className="flex items-start">
          {categories.map((category, index) => (
            <div
              key={category.id}
              ref={addToRefs}
              className="min-w-[100vw] h-[70vh] flex flex-col items-center justify-center px-4 sm:px-10"
            >
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="w-full md:w-1/2 relative h-[30vh] md:h-[50vh] overflow-hidden rounded-2xl group">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={`Fotografia de ${category.title}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30 opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
                    <span className="inline-block px-3 py-1 bg-purple-500 text-white text-sm font-medium rounded-full mb-3">
                      {category.id}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl md:text-5xl font-bold mb-3 md:mb-6 tracking-tight text-white">
                    {category.title}
                  </h3>
                  <div className="h-[20vh] md:h-auto overflow-y-auto md:overflow-visible pr-2 custom-scrollbar">
                    <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">{category.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
