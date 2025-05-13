"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Instagram, Facebook, Mail, Phone } from "lucide-react"
import AbstractBackground from "@/components/ui/abstract-background"
import SectionHeading from "@/components/ui/section-heading"

export default function SocialSection() {
  const socialRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.set(".social-item", { opacity: 1 })

    if (socialRef.current) {
      gsap.fromTo(
        ".social-item",
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 80%",
          },
          onComplete: () => {
            gsap.set(".social-item", { clearProps: "all" })
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="w-10 h-10" />,
      url: "https://instagram.com/gui.faccin",
      gradient: "linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(219, 39, 119, 0.5))",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-10 h-10" />,
      url: "https://facebook.com/",
      gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(29, 78, 216, 0.5))", 
    },
    {
      name: "WhatsApp",
      icon: <Phone className="w-10 h-10" />,
      url: "https://wa.me/5549999215720",
      gradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.5), rgba(21, 128, 61, 0.5))", 
    },
    {
      name: "Email",
      icon: <Mail className="w-10 h-10" />,
      url: "mailto:contato@gfaccin27@gmail.com",
      gradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.5), rgba(219, 39, 119, 0.5))", 
    },
  ]

  return (
    <section ref={socialRef} className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
      <AbstractBackground pattern="waves" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading title="Redes Sociais" subtitle="Acompanhe meu trabalho e entre em contato" />

        <div className="flex flex-wrap justify-center gap-8">
          {socialLinks.map((social, index) => (
            <Link key={index} href={social.url} className="social-item group opacity-100">
              <div
                className="w-24 h-24 flex items-center justify-center rounded-2xl text-white shadow-lg transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 border border-white/20 backdrop-blur-sm"
                style={{
                  background: social.gradient,
                  opacity: 1,
                }}
              >
                {social.icon}
              </div>
              <p className="text-center mt-4 font-medium text-white">{social.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
