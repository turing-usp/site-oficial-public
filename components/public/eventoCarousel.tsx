    "use client";
    import Image from 'next/image';
    import { useState, useEffect } from 'react';

    export default function EventoCarousel({eventos} : any){
        const [currentIndex, setCurrentIndex] = useState(0);
        // Função para pular para o próximo passo
        const nextEvento = () => {
            setCurrentIndex((prev) => (prev === eventos.length - 1 ? 0 : prev + 1)); // Prev é o índice atual do relato e relatos.legth é o número total de relatos, logo, se chegarmos no final dos relatos ele volta para o início
        };

        //Efeito para trocar o relato a cada 10 segundos
        useEffect(() => {
            const interval = setInterval(nextEvento, 10000);
            return () => clearInterval(interval);
        }, []);

        const eventoAtual = eventos[currentIndex];

        return (
            <div className="w-full max-w-6xl">
                <div className="flex flex-col md:hidden w-full bg-[#162B3F] rounded-2xl py-6">
                    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                        {eventos.map((evento: any, index: number) => (
                            <div 
                                key={index} 
                                className="min-w-full snap-center flex flex-col px-6 gap-4"
                            >
                                <div className="w-full aspect-video rounded-lg border-2 border-[#F1863D] overflow-hidden shrink-0">
                                    <Image
                                        src={evento.imagem}
                                        alt={evento.nome}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <p className="text-[#FFFFFF] text-[1.2rem] font-bold">{evento.nome}</p>
                                    <p className="text-[0.9rem] text-[#FFFFFF] text-justify">{evento.descricao}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots Indicadores */}
                    <div className="flex justify-center gap-2 mt-4">
                        {eventos.map((_: any, index: number) => (
                            <div 
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex ? 'w-6 bg-[#F1863D]' : 'w-2 bg-gray-500'
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="hidden md:flex py-8 px-5 h-auto lg:p-8 lg:flex-row lg:h-[60vh] w-full bg-[#162B3F] rounded-2xl gap-8 items-center">
                    <button onClick={() => setCurrentIndex(currentIndex === 0 ? eventos.length - 1 : currentIndex - 1)} className='text-[#F1863D] text-[2rem]'>&#10094;</button>
                    <div className="w-full h-[10rem] lg:w-[40%] aspect-video rounded-lg border-2 border-[#F1863D] overflow-hidden">
                        <Image
                            src={eventoAtual.imagem}
                            alt={eventoAtual.nome}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 lg:w-[60%] ">
                        <p className="text-[#FFFFFF] text-[1.4rem] font-bold mb-4">{eventoAtual.nome}</p>
                        <div className="flex flex-row flex-1 overflow-y-auto">
                            <p className="text-[0.9rem] lg:text-[1rem] text-[#FFFFFF] text-justify">{eventoAtual.descricao}</p>
                        </div>
                    </div>
                    <button onClick={() => setCurrentIndex(currentIndex === eventos.length - 1 ? 0 : currentIndex + 1)} className='text-[#F1863D] text-[2rem]'>&#10095;</button>
                </div>
            </div>
        );
    }

