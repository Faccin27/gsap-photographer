import AbstractBackground from "@/components/ui/abstract-background"
import Link from "next/link"

export default function FooterSection() {
  return (
    <footer className="bg-black text-white py-16 relative">
      {/* Abstract background with lines */}
      <AbstractBackground pattern="default" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <h3 className="text-3xl font-bold mb-6 text-white">Cristina Duarte</h3>
        <p className="mb-8 text-lg text-gray-300">Fotografia profissional</p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
        <p className="text-gray-500">© {new Date().getFullYear()} Desenvolvido por<Link href='https://faccindev.pro' target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:opacity-80"> FaccinDev</Link>. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
