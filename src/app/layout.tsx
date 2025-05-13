import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cristina Duarte | Fotógrafa Profissional em Retratos e Eventos",
  description:
    "Cristina Duarte é uma fotógrafa especializada em retratos artísticos e cobertura de eventos. Atendendo com sensibilidade e olhar único, transforma momentos em memórias inesquecíveis.",
  keywords: [
    "fotógrafa",
    "Cristina Duarte",
    "retratos profissionais",
    "fotografia de eventos",
    "ensaio fotográfico",
    "fotógrafa em [sua cidade]",
    "book fotográfico",
    "fotógrafa feminina",
  ],
  openGraph: {
    title: "Cristina Duarte | Fotógrafa Profissional",
    description:
      "Retratos artísticos e fotografia de eventos com sensibilidade e profissionalismo. Conheça o trabalho de Cristina Duarte.",
    type: "website",
    images: [
      {
        url: "/images/fotografa.png",
        alt: "Cristina Duarte - Fotógrafa Profissional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristina Duarte | Fotógrafa Profissional",
    description:
      "Fotografia com olhar sensível para retratos e eventos inesquecíveis. Veja o portfólio completo.",
    images: ["/images/fotografa.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
