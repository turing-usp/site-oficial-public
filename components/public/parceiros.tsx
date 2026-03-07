"use client";
import Image from 'next/image';
import { useState,useEffect, useRef } from 'react';

export default function Parceiros() {
    const parceiros = [
        {
            nome: "Sanfran Law Innovation Lab ",
            imagem: "sanfranlab.svg",
            href: "https://sflawinnovationlab.com.br/"
        }
    ]
    // Vamos criar a estrutura de carrossel para os parceiros, usando o mesmo estilo do carrossel de depoimentos
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isWide, setIsWide] = useState(false);
    const step = 3;
    const maxIndex = Math.max(0, parceiros.length - 1);
    const mostrarControles = parceiros.length > step;
    const showControls = mostrarControles && isWide;

    useEffect(() => {
        const media = window.matchMedia('(min-width: 1280px)');
        const update = () => setIsWide(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    const nextParceiro = () => {
        setCurrentIndex((prev) => {
            const next = prev + step;
            return next > maxIndex ? 0 : next;
        });
    };

    const prevParceiro = () => {
        setCurrentIndex((prev) => {
            const next = prev - step;
            return next < 0 ? maxIndex : next;
        });
    };

    const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Efeito para trocar o parceiro a cada 8 segundos (desktop)
    useEffect(() => {
        if (!mostrarControles) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = prev + step;
                return next > maxIndex ? 0 : next;
            });
        }, 12000);
        return () => clearInterval(interval);
    }, [mostrarControles, maxIndex, step]);

    // Reseta scroll para o início sempre que o carrossel vira "desktop" (XL)
    useEffect(() => {
        if (!showControls) return;
        const container = scrollRef.current;
        if (!container) return;
        container.scrollLeft = 0;
        setCurrentIndex(0);
    }, [showControls]);

    // Quando o índice muda, faz o scroll interno do container (desktop)
    useEffect(() => {
        if (!showControls) return;
        const container = scrollRef.current;
        const target = cardRefs.current[currentIndex];
        if (!container || !target) return;

        // Usa getBoundingClientRect para calcular posição relativa ao container
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const targetLeft = targetRect.left - containerRect.left + container.scrollLeft;
        container.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }, [currentIndex, showControls]);

    return (
        <div className='flex flex-col min-h-[30dvh] h-auto w-full'>
            <p className='text-[#000000] text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold flex mx-[5%] mt-[5%] mb-[2%]'>PARCEIROS</p>
            <div className={`flex flex-row items-center mx-[5%] ${mostrarControles ? 'justify-between' : 'justify-center'}`}>
                {showControls && (
                    <button 
                        onClick={prevParceiro} 
                        className='hidden xl:flex text-[#F1863D] text-[1.5rem] md:text-[2rem] hover:scale-110 transition-transform'
                    >
                        &#10094;
                    </button>
                )}

                {/* Container de Itens */}
                <div
                    ref={scrollRef}
                    className={`
                        flex flex-row flex-nowrap gap-3 md:gap-[5%] transition-all duration-500 ease-in-out
                        overflow-x-auto xl:overflow-x-hidden scroll-smooth
                        snap-x snap-mandatory xl:snap-none
                        no-scrollbar pb-4
                        ${mostrarControles ? '' : 'justify-center w-full'}
                    `}
                >
                    {parceiros.map((parceiro, index) => (
                        <a 
                            ref={(el) => { cardRefs.current[index] = el; }}
                            key={index} 
                            href={parceiro.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`
                                snap-start flex-none bg-white border border-gray-100 shadow-sm hover:shadow-xl rounded-[1rem] p-4 h-[17rem]
                                w-full w-[100%] md:w-[50%] lg:w-[33%]
                                ${!mostrarControles ? 'max-w-[350px]' : ''}
                            `}
                        >
                            <Image
                                src={parceiro.imagem}
                                alt={parceiro.nome}
                                width={800}
                                height={800}
                                className='w-full h-[9rem] object-contain border p-[1%] z-10'
                            />
                            <h3 className='text-black text-[0.8rem] md:text-[1.2rem] font-bold uppercase mt-2 text-center'>
                                {parceiro.nome}
                            </h3>
                        </a>
                    ))}
                </div>
                {showControls && (
                    <button 
                        onClick={nextParceiro} 
                        className='hidden xl:flex text-[#F1863D] text-[1.5rem] md:text-[2rem] hover:scale-110 transition-transform'
                    >
                        &#10095;
                    </button>
                )}
            </div>
        </div>
    );
}