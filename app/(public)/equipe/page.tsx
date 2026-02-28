import Image from "next/image";
import Botoes from "@/components/public/btnequipe";
import { lerdadospublicos,lerdadoshistoricos } from "@/lib/auth-actions";

export default async function Equipe(){

    const { data: equipe, error } = await lerdadospublicos();
    const { data: historico, error: errorHistorico } = await lerdadoshistoricos();

    return(
        <>
            <div className="relative flex flex-col md:flex-row min-h-fit md:h-auto md:mt-20 xl:mt-0 xl:h-[100vh] w-full items-center justify-center pt-[10vh] md:pt-0 xl:pt-[20vh] pb-10 overflow-hidden">
                        <div className="flex flex-1 items-center justify-center relative self-center order-2 md:order-1 mt-10 md:mt-0">
                            <Image
                                src="/Elipse.svg"
                                alt="imagem elipse"
                                width={600}
                                height={600}
                                className="absolute left-0 h-[100vh] opacity-0 md:opacity-100 md:h-[13.6rem] lg:h-[18rem]  xl:h-[70vh] w-auto"
                            />
                            <Image 
                                src="/capacete.svg"
                                alt="imagem capacete"
                                width={600}
                                height={600}
                                className="relative md:absolute left-0 h-[20vh] md:h-[8rem] lg:h-[11rem] xl:h-[40vh] w-auto translate-y-0"
                            />
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center self-center order-1 md:order-2">
                            <p className="text-[0.9rem] md:text-[1.2rem] lg:text-[1.5rem] text-[#766F6F] font-bold">NOSSA EQUIPE</p>
                            <p className="text-[#000000] text-[2rem] md:text-[3rem] lg:text-[4rem] text-center font-bold leading-tight px-4 md:px-0">CONSTRUTORES DO FUTURO</p>
                            <p className="mt-[5%] md:mt-0 text-[#000000] text-center text-[0.9rem] md:text-[1.2rem] lg:text-[1.5rem] leading-tight px-4 md:px-0">Conheça a nossa equipe que ajuda a construir e aplicar conceitos importantes para o aprendizado da Inteligência artificial.</p>
                        </div>
                        <div className="hidden md:flex flex-1 items-center relative self-center order-3">
                            <Image
                                src="/Elipse.svg"
                                alt="imagem elipse"
                                width={600}
                                height={600}
                                className="absolute rotate-180 right-0 md:h-[13.6rem] lg:h-[18rem] xl:h-[70vh] w-auto"
                            />
                            <Image 
                                src="/solda.svg"
                                alt="imagem solda"
                                width={600}
                                height={600}
                                className="absolute right-0 h-[35vh] md:h-[7rem] lg:h-[9.5rem] xl:h-[40vh] w-auto"
                            />
                        </div>
            </div>
            <div>
                <Botoes equipe={equipe ?? []} historico={historico ?? []} />
            </div>
        </>
    );
}