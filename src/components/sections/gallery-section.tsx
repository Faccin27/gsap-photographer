"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AbstractBackground from "@/components/ui/abstract-background";
import SectionHeading from "@/components/ui/section-heading";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function GallerySection() {
  const galleryRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(".gallery-item", { opacity: 1 });

    if (galleryRef.current) {
      gsap.fromTo(
        ".gallery-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
          onComplete: () => {
            gsap.set(".gallery-item", { clearProps: "all" });
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const galleryItems = [
    {
      id: 1,
      title: "Mateus e Natália",
      type: "Casamento",
      image: "/images/casamentog.jpg",
    },
    {
      id: 2,
      title: "Editorial Vogue",
      type: "Moda",
      image: "/images/vogue.jpg",
    },
    {
      id: 3,
      title: "Corporativo Tech",
      type: "Empresarial",
      image: "/images/empresa.jpg",
    },
    {
      id: 4,
      title: "Festa de 15 Anos",
      type: "Eventos",
      image: "/images/aniversario.jpg",
    },
    {
      id: 5,
      title: "Ensaio Família Silva",
      type: "Família",
      image: "/images/familia.jpg",
    },
    {
      id: 6,
      title: "Natureza Viva",
      type: "Paisagem",
      image: "/images/paisagem.jpg",
    },
  ];

  return (
    <section
      ref={galleryRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative"
    >
      <AbstractBackground pattern="diagonal" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="Galeria"
          subtitle="Uma seleção dos meus melhores trabalhos"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="gallery-item group relative overflow-hidden rounded-xl opacity-100"
            >
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={`${item.title} - ${item.type}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="transform translate-y-0 group-hover:translate-y-[-10px] transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-purple-500/80 text-white text-xs font-medium rounded-full mb-2">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1 text-shadow">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ID: {item.id} • Clique para ver mais detalhes
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href={`/projeto/${item.id}`}
                    key={item.id}
                    className="gallery-item group relative overflow-hidden rounded-xl opacity-100 py-6"
                  >
                  <span className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 border border-white/20">
                    Ver Projeto
                  </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button href="/galeria" variant="outline">
            Ver Galeria Completa
          </Button>
        </div>
      </div>
    </section>
  );
}
