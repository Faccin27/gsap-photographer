"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  Calendar,
  Camera,
  Clock,
  MapPin,
  Share2,
  Heart,
} from "lucide-react";
import AbstractBackground from "@/components/ui/abstract-background";
import SectionHeading from "@/components/ui/section-heading";
import Button from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";

// Mock data - in a real application, this would come from a database
const projectsData = [
  {
    id: 1,
    title: "Mateus e Natália",
    type: "Casamento",
    image: "/images/casamentog.jpg",
    date: "12 de Março, 2023",
    location: "Jardim Botânico, Rio de Janeiro",
    duration: "8 horas",
    camera: "Sony Alpha A7 IV",
    description:
      "Um casamento inesquecível em um dos locais mais bonitos do Rio de Janeiro. Mateus e Natália celebraram seu amor rodeados de amigos e familiares em uma cerimônia ao ar livre seguida de uma recepção elegante.",
    story:
      "Conheci Mateus e Natália através de amigos em comum e desde o primeiro encontro para discutir o casamento, senti uma conexão especial com o casal. Eles queriam fotos que capturassem não apenas os momentos tradicionais, mas também a emoção genuína e a alegria do dia. Trabalhamos juntos para criar um plano que incluísse todos os momentos importantes sem interferir na naturalidade da celebração.",
    gallery: [
      "/images/casamentog.jpg",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    related: [2, 4, 5],
  },
  {
    id: 2,
    title: "Editorial Vogue",
    type: "Moda",
    image: "/images/vogue.jpg",
    date: "5 de Abril, 2023",
    location: "Estúdio Central, São Paulo",
    duration: "6 horas",
    camera: "Canon EOS R5",
    description:
      "Sessão editorial para a edição de primavera da Vogue Brasil, apresentando a nova coleção de um estilista emergente com peças que misturam elementos tradicionais brasileiros com alta costura contemporânea.",
    story:
      "Trabalhar com a equipe da Vogue foi uma experiência incrível. O conceito do editorial era 'Raízes Futuristas', explorando como elementos culturais brasileiros podem ser reinterpretados na moda contemporânea. Utilizamos iluminação dramática e composições ousadas para criar imagens impactantes que contassem essa história visual.",
    gallery: [
      "/images/vogue.jpg",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    related: [3, 6, 1],
  },
  {
    id: 3,
    title: "Corporativo Tech",
    type: "Empresarial",
    image: "/images/empresa.jpg",
    date: "18 de Janeiro, 2023",
    location: "Sede da TechFuture, São Paulo",
    duration: "4 horas",
    camera: "Nikon Z7 II",
    description:
      "Sessão fotográfica corporativa para a TechFuture, uma empresa de tecnologia em rápido crescimento. O objetivo era capturar a cultura dinâmica da empresa e criar conteúdo para seu site e materiais de marketing.",
    story:
      "A TechFuture queria se afastar das tradicionais fotos corporativas formais e mostrar o ambiente de trabalho colaborativo e inovador que cultivam. Passamos o dia fotografando reuniões reais, sessões de brainstorming e momentos espontâneos entre os funcionários, além de retratos individuais que refletissem a personalidade de cada membro da equipe.",
    gallery: [
      "/images/empresa.jpg",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    related: [2, 4, 6],
  },
  {
    id: 4,
    title: "Festa de 15 Anos",
    type: "Eventos",
    image: "/images/aniversario.jpg",
    date: "25 de Junho, 2023",
    location: "Espaço Celebration, Belo Horizonte",
    duration: "5 horas",
    camera: "Sony Alpha A7 III",
    description:
      "Celebração dos 15 anos de Mariana, uma festa temática inspirada em Paris com decoração sofisticada e momentos emocionantes entre família e amigos.",
    story:
      "Mariana sonhava com essa festa desde pequena e seus pais queriam garantir que cada momento fosse documentado com sensibilidade. Desde os preparativos até a última dança, estive presente para capturar não apenas os grandes momentos, mas também os pequenos detalhes e interações que tornam esses eventos tão especiais.",
    gallery: [
      "/images/aniversario.jpg",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    related: [1, 5, 3],
  },
  {
    id: 5,
    title: "Ensaio Família Silva",
    type: "Família",
    image: "/images/familia.jpg",
    date: "3 de Setembro, 2023",
    location: "Parque Ibirapuera, São Paulo",
    duration: "2 horas",
    camera: "Canon EOS R6",
    description:
      "Ensaio fotográfico ao ar livre com a família Silva, capturando momentos espontâneos e cheios de carinho entre pais e filhos em um final de tarde ensolarado.",
    story:
      "A família Silva queria fotos que refletissem sua personalidade descontraída e o forte vínculo que compartilham. Optamos por um ensaio ao ar livre, onde as crianças pudessem se sentir à vontade para brincar e interagir naturalmente. O resultado foi uma coleção de imagens autênticas que capturam perfeitamente a essência dessa família unida.",
    gallery: [
      "/images/familia.jpg",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    related: [4, 1, 6],
  },
  {
    id: 6,
    title: "Natureza Viva",
    type: "Paisagem",
    image: "/images/paisagem.jpg",
    date: "15 de Julho, 2023",
    location: "Chapada dos Veadeiros, Goiás",
    duration: "3 dias",
    camera: "Fujifilm GFX 100S",
    description:
      "Série fotográfica explorando as paisagens deslumbrantes da Chapada dos Veadeiros, com foco em cachoeiras, formações rochosas e o céu estrelado da região.",
    story:
      "Este projeto pessoal nasceu do meu amor pela natureza brasileira. Passei três dias acampando e explorando diferentes locais da Chapada dos Veadeiros, acordando antes do amanhecer e fotografando até o anoitecer para capturar a luz perfeita. As condições nem sempre foram fáceis, mas cada desafio valeu a pena quando vi as imagens finais.",
    gallery: [
      "/images/paisagem.jpg",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    related: [3, 5, 2],
  },
];

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const heroRef = useRef(null);
  const detailsRef = useRef(null);
  const galleryRef = useRef(null);
  const relatedRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Find the project based on the ID
    const projectId = Number.parseInt(params.id);
    const foundProject = projectsData.find((p) => p.id === projectId);

    if (foundProject) {
      setProject(foundProject);
      setSelectedImage(foundProject.image);

      // Get related projects
      const related = foundProject.related
        .map((id) => projectsData.find((p) => p.id === id))
        .filter(Boolean);

      setRelatedProjects(related as any[]);
    }

    // Animations
    const timeline = gsap.timeline();

    timeline.fromTo(
      ".hero-content",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    if (detailsRef.current) {
      gsap.fromTo(
        ".detail-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: detailsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (galleryRef.current) {
      gsap.fromTo(
        ".gallery-thumbnail",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (relatedRef.current) {
      gsap.fromTo(
        ".related-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: relatedRef.current,
            start: "top 80%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [params.id]);

  if (!project) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold mb-4">Projeto não encontrado</h1>
            <p className="mb-6">
              O projeto que você está procurando não existe ou foi removido.
            </p>
            <Link
              href="/"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Voltar para a galeria
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-[70vh] md:h-[80vh] overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          </div>

          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 relative z-10">
            <div className="hero-content max-w-3xl ">
              <Link
                href="/"
                className="inline-flex text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para a galeria
              </Link>

              <span className="inline-block px-3 ml-6  py-1 bg-purple-500/80 text-white text-xs font-medium rounded-full">
                {project.type}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {project.title}
              </h1>

              <p className="text-lg text-white/80 mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-white/70">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{project.date}</span>
                </div>

                <div className="flex items-center text-white/70">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{project.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section
          ref={detailsRef}
          className="py-20 bg-gradient-to-b from-black to-gray-900 relative"
        >
          <AbstractBackground pattern="cross" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6 detail-item">
                  Sobre este projeto
                </h2>
                <p className="text-white/80 mb-6 detail-item">
                  {project.story}
                </p>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="detail-item">
                    <h3 className="text-lg font-semibold mb-2 text-purple-400">
                      Duração
                    </h3>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-white/60" />
                      <span>{project.duration}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <h3 className="text-lg font-semibold mb-2 text-purple-400">
                      Equipamento
                    </h3>
                    <div className="flex items-center">
                      <Camera className="w-5 h-5 mr-2 text-white/60" />
                      <span>{project.camera}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8 detail-item">
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                  <Button variant="outline">
                    <Heart className="w-4 h-4 mr-2" />
                    Favoritar
                  </Button>
                </div>
              </div>

              <div className="detail-item">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={800}
                  className="rounded-xl shadow-2xl w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section ref={galleryRef} className="py-20 bg-gray-900 relative">
          <AbstractBackground pattern="diagonal" />

          <div className="container mx-auto px-4 relative z-10">
            <SectionHeading
              title="Galeria"
              subtitle="Explore mais imagens deste projeto"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {project.gallery.map((image: string, index: number) => (
                <div
                  key={index}
                  className="gallery-thumbnail relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Imagem ${index + 1}`}
                    fill
                    className={`object-cover transition-all duration-300 ${
                      selectedImage === image
                        ? "scale-105 border-2 border-purple-500"
                        : "hover:scale-105"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Projects */}
        <section
          ref={relatedRef}
          className="py-20 bg-gradient-to-b from-gray-900 to-black relative"
        >
          <AbstractBackground pattern="waves" />

          <div className="container mx-auto px-4 relative z-10">
            <SectionHeading
              title="Projetos Relacionados"
              subtitle="Confira outros trabalhos semelhantes"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((related, index) => (
                <Link
                  href={`/projeto/${related.id}`}
                  key={related.id}
                  className="related-item group relative overflow-hidden rounded-xl"
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={related.image || "/placeholder.svg"}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <div className="transform translate-y-0 group-hover:translate-y-[-10px] transition-transform duration-300">
                        <span className="inline-block px-3 py-1 bg-purple-500/80 text-white text-xs font-medium rounded-full mb-2">
                          {related.type}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {related.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button href="/" variant="outline">
                Ver Galeria Completa
              </Button>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
