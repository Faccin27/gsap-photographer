"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import AbstractBackground from "@/components/ui/abstract-background";
import SectionHeading from "@/components/ui/section-heading";
import Button from "@/components/ui/button";

// Importar dinamicamente para evitar problemas de SSR
const PanoramaViewer = dynamic(
  () => import("@/components/ui/panorama-viewer"),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[500px] w-full bg-black/40 rounded-2xl overflow-hidden flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold">360°</span>
          </div>
        </div>
      </div>
    ),
  }
);

export default function PanoramaSection() {
  const panoramas = [
    "/images/tour.jpg",
  ];

  const [currentPanoramaIndex, setCurrentPanoramaIndex] = useState(0);

  const features = [
    "Tours virtuais para imóveis e espaços comerciais",
    "Documentação de eventos em formato panorâmico",
    "Experiências interativas para websites e redes sociais",
    "Conteúdo compatível com óculos de realidade virtual",
  ];

  const nextPanorama = () => {
    setCurrentPanoramaIndex((prev) => (prev + 1) % panoramas.length);
  };

  const prevPanorama = () => {
    setCurrentPanoramaIndex(
      (prev) => (prev - 1 + panoramas.length) % panoramas.length
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
      <AbstractBackground pattern="default" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="Fotografia 360°"
          subtitle="Explore uma nova dimensão de fotografia com experiências imersivas em 360 graus"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl font-bold text-white mb-6 text-shadow">
              Experiência Imersiva
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Além da fotografia tradicional, ofereço serviços de captura em 360
              graus que permitem uma experiência completamente imersiva. Ideal
              para imóveis, eventos, turismo virtual e muito mais.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  </div>
                  <p className="text-white/80">{feature}</p>
                </li>
              ))}
            </ul>

            <Button href="/visualizacao-360" variant="outline">
              Explorar Visualizações 360°
            </Button>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* Visualizador 360° */}
              <PanoramaViewer
                imageUrl={panoramas[currentPanoramaIndex]}
                height={500}
                className="w-full"
              />
            </div>

            <p className="text-center text-white/70 mt-4 text-sm">
              Use o mouse para navegar ou clique nos botões para mudar de
              panorama
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
