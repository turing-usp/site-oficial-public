'use client';

import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/public/searchbar';
import { useState, useEffect } from 'react';

interface Artigo {
    medium_id: string;
    title: string;
    summary: string;
    author: string;
    published_at: string;
    image_url: string;
    medium_url: string;
}

interface TuringTalksClientProps {
    artigos: Artigo[];
}

const backgroundWords = [
    { text: 'MACHINE LEARNING', color: '#F1863D', size: '1.3rem', top: '25%', left: '35%', opacity: 0.2},
    { text: 'INOVAÇÃO', color: '#EBB84A', size: '1.5rem', top: '35%', left: '45%', opacity: 0.2 },
    { text: 'FUTURO', color: '#008FF8', size: '2rem', top: '80%', left: '20%', opacity: 0.15},
    { text: 'ORDENAÇÃO', color: '#F1863D', size: '1rem', top: '60%', left: '42%', opacity: 0.2},
    { text: 'CIÊNCIA', color: '#EBB84A', size: '1.2rem', top: '20%', left: '8%', opacity: 0.3},
    { text: 'PROGRAMAÇÃO', color: '#008FF8', size: '2rem', top: '75%', left: '70%', opacity: 0.1},
    { text: 'DESCOBERTA', color: '#F1863D', size: '1.5rem', top: '20%', left: '70%', opacity: 0.2},
    { text: 'CRIATIVIDADE', color: '#EBB84A', size: '2rem', top: '90%', left: '55%', opacity: 0.1},
    { text: 'REDES NEURAIS', color: '#008FF8', size: '1.2rem', top: '80%', left: '45%', opacity: 0.2},
    { text: 'DEEP LEARNING', color: '#F1863D', size: '1.5rem', top: '90%', left: '5%', opacity: 0.3},
    { text: 'COMP. VISUAL', color: '#008FF8', size: '1.8rem', top: '46%', left: '40%', opacity: 0.15},
    { text: 'QUANT', color: '#EBB84A', size: '1.3rem', top: '65%', left: '90%', opacity: 0.4},
    { text: 'APRENDIZADO POR REFORÇO', color: '#F1863D', size: '1.7rem', top: '12%', left: '27%', opacity: 0.1},
    { text: 'DATA SCIENCE', color: '#EBB84A', size: '1.4rem', top: '15%', left: '85%', opacity: 0.2},
    { text: 'PROJETOS', color: '#EBB84A', size: '1.6rem', top: '75%', left: '7%', opacity: 0.25},
    { text: 'NLP', color: '#F1863D', size: '1.8rem', top: '30%', left: '85%', opacity: 0.2},
];

const backgroundWordsMobile = [
    { text: 'MACHINE LEARNING', color: '#F1863D', size: '1.3rem', top: '10%', left: '35%', opacity: 0.2 },
    { text: 'INOVAÇÃO', color: '#EBB84A', size: '1.5rem', top: '15%', left: '10%', opacity: 0.2 },
    { text: 'FUTURO', color: '#008FF8', size: '1rem', top: '20%', left: '70%', opacity: 0.15 },
    { text: 'ORDENAÇÃO', color: '#F1863D', size: '1rem', top: '80%', left: '5%', opacity: 0.2 },
    { text: 'CIÊNCIA', color: '#EBB84A', size: '1.2rem', top: '50%', left: '70%', opacity: 0.3 },
    { text: 'PROGRAMAÇÃO', color: '#008FF8', size: '1.5rem', top: '85%', left: '40%', opacity: 0.1 },
    { text: 'DESCOBERTA', color: '#F1863D', size: '0.8rem', top: '52%', left: '5%', opacity: 0.2 },
    { text: 'NLP', color: '#008FF8', size: '1.5rem', top: '35%', left: '2%', opacity: 0.15 },
    { text: 'CRIATIVIDADE', color: '#EBB84A', size: '2rem', top: '90%', left: '10%', opacity: 0.1},
    { text: 'DS', color: '#008FF8', size: '1rem', top: '63%', left: '15%', opacity: 0.2 },
    { text: 'QUANT', color: '#F1863D', size: '0.8rem', top: '60%', left: '70%', opacity: 0.4 },
    { text: 'RL', color: '#EBB84A', size: '1.6rem', top: '70%', left: '80%', opacity: 0.25},
]

const backgroundWordstablets = [
    { text: 'MACHINE LEARNING', color: '#F1863D', size: '1.3rem', top: '20%', left: '35%', opacity: 0.2},
    { text: 'INOVAÇÃO', color: '#EBB84A', size: '1.5rem', top: '15%', left: '10%', opacity: 0.2 },
    { text: 'FUTURO', color: '#008FF8', size: '1rem', top: '20%', left: '75%', opacity: 0.15 },
    { text: 'ORDENAÇÃO', color: '#F1863D', size: '1rem', top: '80%', left: '5%', opacity: 0.2 },
    { text: 'CIÊNCIA', color: '#EBB84A', size: '1.2rem', top: '10%', left: '50%', opacity: 0.3 },
    { text: 'PROGRAMAÇÃO', color: '#008FF8', size: '1.5rem', top: '85%', left: '40%', opacity: 0.1 },
    { text: 'DESCOBERTA', color: '#F1863D', size: '0.8rem', top: '52%', left: '5%', opacity: 0.2 },
    { text: 'NLP', color: '#008FF8', size: '1.5rem', top: '35%', left: '2%', opacity: 0.15 },
    { text: 'CRIATIVIDADE', color: '#EBB84A', size: '2rem', top: '90%', left: '10%', opacity: 0.1},
    { text: 'DS', color: '#008FF8', size: '1rem', top: '63%', left: '15%', opacity: 0.2 },
    { text: 'QUANT', color: '#F1863D', size: '0.8rem', top: '70%', left: '50%', opacity: 0.4 },
    { text: 'RL', color: '#EBB84A', size: '1.6rem', top: '50%', left: '50%', opacity: 0.25},
    { text: 'COMP. VISUAL', color: '#F1863D', size: '1.4rem', top: '70%', left: '80%', opacity: 0.15}
]


export default function TuringTalksClient({ artigos }: TuringTalksClientProps) {
    const [filteredWords, setFilteredWords] = useState<typeof backgroundWords>([]);

    useEffect(() => {
        // Detecta se é mobile
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        
        const filtered = isMobile ? backgroundWordsMobile : isTablet ? backgroundWordstablets : backgroundWords;
        setFilteredWords(filtered);
    }, []);

    return (
        <main>
            <div className='relative h-[100vh] w-[100%]'>
                <div className='flex h-full w-full items-center justify-between z-5'>
                    <div className='flex flex-col landscape:flex-row md:flex-row mx-[5%] object-contain'>
                        <Image
                            src="/ttalks.svg"
                            alt="Turing Talks Image"
                            width={600}
                            height={600}
                            className='h-[14rem] md:h-[15rem] lg:h-[20rem] xl:h-[50vh] w-auto object-contain'
                        />
                        <div className='flex flex-1 flex-col justify-center items-center'>
                            <p className='text-[#000000] text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold leading-tight' style={{ fontFamily: 'var(--font-shrikhand)' }}>TURING</p>
                            <p className='text-[#000000] text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold mb-[5%] leading-tight' style={{ fontFamily: 'var(--font-shrikhand)' }}>TALKS</p>
                            <p className='text-[#000000] text-[0.9rem] md:text-[1.2rem] mx-[20%] mb-[5%] text-center'>Conheça mais sobre assuntos de tecnologia e inovação produzidos pela nossa própria equipe!</p>
                        </div>
                    </div>
                </div>
                <div className='flex mx-[5%] object-contain z-0'>
                    {filteredWords.map(({ text, color, size, top, left, opacity }) => (
                        <p
                            key={`${text}-${top}-${left}`}
                            className='absolute font-bold'
                            style={{
                                color,
                                fontFamily: 'var(--font-shrikhand)',
                                fontSize: size,
                                top,
                                left,
                                opacity,
                            }}
                        >
                            {text}
                        </p>
                    ))}
                </div>
            </div>
            <SearchBar artigosIniciais={artigos || []} />
            <div className='flex w-[100%] h-auto'>
                <div className='flex flex-col mx-[5%] mt-[3%] mb-[1%]'>
                    <p className='text-[#000000] text-[2rem] font-bold mb-[2%]' style={{ fontFamily: 'var(--font-shrikhand)' }}>ÚLTIMOS TALKS:</p>
                </div>
            </div>
            {artigos && artigos.length > 0 && (
                <div className='flex w-full px-[5%] mb-12'>
                    <Link 
                        href={artigos[0].medium_url} 
                        target="_blank" 
                        className="group flex flex-col md:flex-row w-full gap-8 overflow-hidden transition-all"
                    >
                        <div className="relative w-full md:w-[40%] h-[35vh]">
                            <Image
                                src={artigos[0].image_url || "/heteronimos.png"}
                                alt={artigos[0].title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-center p-6 flex-1">
                            <span className="text-[#F1863D] font-bold text-xs mb-2 uppercase tracking-widest">Destaque</span>
                            <h2 className="text-[2rem] font-bold text-black leading-tight mb-4">
                                {artigos[0].title}
                            </h2>
                            <p className="text-gray-600 line-clamp-3 mb-6">
                                {artigos[0].summary}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-black opacity-60">
                                <p>{artigos[0].author}</p>
                                <p>•</p>
                                <p>{new Date(artigos[0].published_at).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</p>
                            </div>
                        </div>
                    </Link>
                </div>  
            )}
            <div className='pb-40 md:py-0 flex flex-col w-[100%] h-auto'>
                <div className='flex flex-col mx-[5%]'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-[2%]'>
                        {artigos?.slice(1, 7).map((artigo) => (
                            <Link
                                href={artigo.medium_url}
                                key={artigo.medium_id}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col group"
                            >
                                <Image
                                    src={artigo.image_url || "/heteronimos.png"}
                                    alt={artigo.title}
                                    width={400}
                                    height={300}
                                    className="h-[15vh] object-cover rounded-lg transition-transform group-hover:scale-105"
                                />
                                <p className="text-[1.1rem] font-bold mt-2 text-black">
                                    {artigo.title}
                                </p>
                                <p className="text-sm mt-1 text-black line-clamp-3">
                                    {artigo.summary}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-black opacity-70">
                                    <p>{artigo.author}</p>
                                    <p>•</p>
                                    <p>
                                        {new Date(artigo.published_at).toLocaleDateString("pt-BR", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
