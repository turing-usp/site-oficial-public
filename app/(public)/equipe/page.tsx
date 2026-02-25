import Image from "next/image";
import Botoes from "@/components/public/btnequipe";
import { lerdadospublicos,lerdadoshistoricos } from "@/lib/auth-actions";

export default async function Equipe(){

    const { data: equipe, error } = await lerdadospublicos();
    const { data: historico, error: errorHistorico } = await lerdadoshistoricos();

    return(
        <>
            <div className="relative flex min-h-fit md:h-[100vh] w-full items-start justify-center pt-[20vh] pb-10 overflow-hidden">
                        <div className="flex flex-1 items-center relative self-center">
                            <Image
                                src="/Elipse.svg"
                                alt="imagem elipse"
                                width={600}
                                height={600}
                                className="absolute left-0 h-[100vh] opacity-0 md:opacity-100 md:h-[70vh] w-auto"
                            />
                            <Image 
                                src="/Capacete.svg"
                                alt="imagem capacete"
                                width={600}
                                height={600}
                                className="absolute left-0 h-[50vh] md:h-[40vh] w-auto"
                            />
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center self-center">
                            <p className="text-[1.5rem] text-[#766F6F] font-bold">NOSSA EQUIPE</p>
                            <p className="text-[#000000] text-[2.2rem] md:text-[4rem] text-center font-bold leading-tight px-4 md:px-0">CONSTRUTORES DO FUTURO</p>
                            <p className="mt-[5%] md:mt-0 text-[#000000] text-center text-[1.2rem] md:text-[1.5rem] leading-tight px-4 md:px-0">Conheça a nossa equipe que ajuda a construir e aplicar conceitos importantes para o aprendizado da Inteligência artificial.</p>
                        </div>
                        <div className="flex flex-1 items-center relative self-center">
                            <Image
                                src="/Elipse.svg"
                                alt="imagem elipse"
                                width={600}
                                height={600}
                                className="absolute rotate-180 right-0 h-[100vh] opacity-0 md:opacity-100 md:h-[70vh] w-auto"
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
                <Botoes equipe={equipe ?? []} historico={historico ?? []} />
            </div>
        </>
    );
}