"use client"

import { useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AbstractBackground from "@/components/ui/abstract-background"
import SectionHeading from "@/components/ui/section-heading"

export default function AboutSection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.set(".about-item", { opacity: 1 })

    // Animate about items
    gsap.fromTo(
      ".about-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
        },
        onComplete: () => {
          gsap.set(".about-item", { clearProps: "all" })
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const achievements = [
    {
      number: "15+",
      title: "Anos de Experiência",
      description:
        "Mais de uma década e meia capturando momentos especiais e criando memórias inesquecíveis através da fotografia.",
      bgColor: "rgba(147, 51, 234, 0.3)", 
      borderColor: "rgba(147, 51, 234, 0.5)", 
    },
    {
      number: "1000+",
      title: "Eventos Realizados",
      description:
        "Experiência em mais de mil eventos, incluindo casamentos, editoriais de moda, ensaios corporativos e projetos artísticos.",
      bgColor: "rgba(236, 72, 153, 0.3)", 
      borderColor: "rgba(236, 72, 153, 0.5)", 
    },
    {
      number: "20+",
      title: "Prêmios Recebidos",
      description:
        "Reconhecida com mais de vinte prêmios nacionais e internacionais por excelência em fotografia artística e comercial.",
      bgColor: "rgba(59, 130, 246, 0.3)",
      borderColor: "rgba(59, 130, 246, 0.5)", 
    },
    {
      number: "100%",
      title: "Satisfação Garantida",
      description:
        "Comprometimento total com a qualidade e satisfação do cliente, garantindo resultados que superam expectativas.",
      bgColor: "rgba(20, 184, 166, 0.3)", 
      borderColor: "rgba(20, 184, 166, 0.5)", 
    },
  ]

  return (
    <section id="especialidades" className="about-section py-20 bg-black relative">
      <AbstractBackground pattern="diagonal" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Por que me contratar?"
            subtitle="Conheça um pouco sobre minha trajetória e o que me torna a escolha ideal para capturar seus momentos especiais"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] overflow-hidden rounded-2xl">
              <Image src="/images/fotografa.png" alt="Fotografa" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-bold text-white mb-2 text-shadow">Cristina Duarte</h3>
                <p className="text-white text-shadow-sm">Fotógrafa profissional</p>
              </div>
            </div>

            <div className="space-y-8">
              {achievements.map((item, index) => (
                <div key={index} className="about-item opacity-100" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="flex items-start">
                    <div
                      className="min-w-[120px]  py-2 rounded-full mr-4 flex items-center justify-center border"
                      style={{
                        backgroundColor: item.bgColor,
                        borderColor: item.borderColor,
                      }}
                    >
                      <span className="text-xl font-bold text-white">{item.number}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-white/80">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
