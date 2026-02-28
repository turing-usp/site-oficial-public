import type { Metadata } from "next";
import { Orbitron,Inter,Irish_Grover, DynaPuff, Shrikhand } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/public/navbar";
import Footer from "@/components/public/footer";

const OrbitronFont = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700"],
});

const InterFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
});

const IrishGroverFont = Irish_Grover({
  subsets: ["latin"],
  variable: "--font-irish-grover",
  weight: ["400"],
});

const Dynapuff = DynaPuff({
  subsets: ["latin"],
  variable: "--font-dynapuff",
  weight: ["400", "700"],
});

const ShrikhandFont = Shrikhand({
  subsets: ["latin"],
  variable: "--font-shrikhand",
  weight: ["400"],
});


export const metadata: Metadata = {
  title: "Turing USP",
  description: "Turing USP é o maior grupo de inteligência artificial da melhor faculdade da América Latina, a Universidade de São Paulo. Nosso objetivo é democratizar o acesso ao conhecimento em inteligência artificial, promovendo a educação e a pesquisa nessa área. Oferecemos uma variedade de recursos, incluindo cursos, workshops, projetos de pesquisa e eventos para estudantes e entusiastas de IA. Junte-se a nós para explorar o fascinante mundo da inteligência artificial e contribuir para o avanço dessa tecnologia revolucionária.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${OrbitronFont.variable} ${InterFont.variable} ${IrishGroverFont.variable} ${Dynapuff.variable} ${ShrikhandFont.variable} antialiased`}
      >
        <div className='fixed top-0 left-0 right-0 z-50'>
          <Navbar/>
        </div>
        {children}
        <div>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
