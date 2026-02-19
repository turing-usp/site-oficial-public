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
            <div className="flex w-full max-w-6xl h-[60vh] bg-[#162B3F] rounded-2xl p-8 gap-8 items-center">
                <button onClick={() => setCurrentIndex(currentIndex === 0 ? eventos.length - 1 : currentIndex - 1)} className='text-[#F1863D] text-[2rem]'>&#10094;</button>
                <div className="w-[40%] aspect-video rounded-lg border-2 border-[#F1863D] overflow-hidden">
                    <Image
                        src={eventoAtual.imagem}
                        alt={eventoAtual.nome}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-4 w-[60%] ">
                    <p className="text-[#FFFFFF] text-[1.4rem] font-bold mb-4">{eventoAtual.nome}</p>
                    <div className="flex-1 overflow-y-auto">
                        <p className="text-[#FFFFFF] text-[1rem] text-justify">{eventoAtual.descricao}</p>
                    </div>
                </div>
                <button onClick={() => setCurrentIndex(currentIndex === eventos.length - 1 ? 0 : currentIndex + 1)} className='text-[#F1863D] text-[2rem]'>&#10095;</button>
            </div>
        );
    }

