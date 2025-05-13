"use client"

import MainLayout from "@/components/layout/main-layout"
import AboutSection from "@/components/sections/about-section"
import CategoriesSection from "@/components/sections/categories-section"
import HeroSection from "@/components/sections/hero-section"


export default function Home() {
  return (
    <MainLayout>
        <HeroSection />
        <CategoriesSection />
        <AboutSection />
    </MainLayout>
  )
}
