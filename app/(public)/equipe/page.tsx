import Image from "next/image";
import Botoes from "@/components/public/btnequipe";
import { lerdadospublicos } from "@/lib/auth-actions";

export default async function Equipe(){

    const { data: equipe, error } = await lerdadospublicos();

    return(
        <>
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
                <Botoes equipe={equipe ?? []} />
            </div>
        </>
    );
}