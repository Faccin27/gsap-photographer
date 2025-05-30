"use client"

import MainLayout from "@/components/layout/main-layout"
import AboutSection from "@/components/sections/about-section"
import CategoriesSection from "@/components/sections/categories-section"
import FooterSection from "@/components/sections/footer-section"
import GallerySection from "@/components/sections/gallery-section"
import HeroSection from "@/components/sections/hero-section"
import PanoramaSection from "@/components/sections/panorama-section"
import SocialSection from "@/components/sections/social-section"


export default function Home() {
  return (
    <MainLayout>
        <HeroSection />
        <CategoriesSection />
        <AboutSection />
        <PanoramaSection />
        <GallerySection />
        <SocialSection />
        <FooterSection />
    </MainLayout>
  )
}
