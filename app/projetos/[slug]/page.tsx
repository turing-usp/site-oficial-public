import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import { projetosSimulados, Projeto } from "@/data/projetosDara";
import { notFound } from "next/navigation";

type ProjetoSlugProps = {
    params: Promise<{
        slug: string;
    }>;
};

if (!projetosSimulados) {
    throw new Error("Nenhum projeto encontrado");
}

// Página server component que lê o slug da rota dinâmica
export default async function ProjetoSlug({ params }: ProjetoSlugProps) {
    const { slug } = await params;
    
    const projeto: Projeto | undefined = projetosSimulados.find(
        (item) => item.slug === slug
    );

    if (!projeto) {
        notFound();
    }

    return (
        <div>
            <div className='fixed top-0 left-0 right-0 z-10'>
                <Navbar/>
            </div>
            <div className="flex flex-row h-[100vh] w-[100%]">
                
            </div>
            <div>
                <Footer />
            </div>
             
        </div>
    )
}