import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabaseclient";
import Botoes from "@/components/btnequipe";

export default async function Equipe(){
    const {data,error} = await supabase
    .from('equipe_ativa')
    .select('*');

    if (error) {
        console.error("Erro ao buscar dados da equipe:", error);
    }

    const equipe = data || [];

    return(
        <>
            <div className="fixed top-0 left-0 right-0 z-10">
                <Navbar/>
            </div>
            <div className="relative flex h-[100vh] w-[100%] items-center justify-center">
                        <div className="flex flex-1 items-center relative">
                            <Image
                                src="/Elipse.svg"
                                alt="imagem elipse"
                                width={600}
                                height={600}
                                className="absolute left-0 h-[70vh] w-auto"
                            />
                            <Image 
                                src="/Capacete.svg"
                                alt="imagem capacete"
                                width={600}
                                height={600}
                                className="absolute left-0 h-[40vh] w-auto"
                            />
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center">
                            <p className="text-[1.5rem] text-[#766F6F] font-bold">NOSSA EQUIPE</p>
                            <p className="text-[4rem] font-bold text-[#000000] text-center">CONSTRUTORES DO FUTURO</p>
                            <p className="text-[1.5rem] text-[#000000] text-center">Conheça a nossa equipe que ajuda a construir e aplicar conceitos importantes para o aprendizado da Inteligência artificial.</p>
                        </div>
                        <div className="flex flex-1 items-center relative">
                            <Image
                                src="/Elipse.svg"
                                alt="imagem elipse"
                                width={600}
                                height={600}
                                className="absolute rotate-180 right-0 h-[70vh] w-auto"
                            />
                            <Image 
                                src="/solda.svg"
                                alt="imagem solda"
                                width={600}
                                height={600}
                                className="absolute right-0 h-[35vh] w-auto"
                            />
                        </div>
            </div>
            <div>
                <Botoes equipe={equipe} />
            </div>
            <div>
                <Footer/>
            </div>

        </>
    );
}