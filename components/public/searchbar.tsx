"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SearchBar({ artigosIniciais }: { artigosIniciais: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<any[]>([]);

    useEffect(()=> {
        if(searchTerm.trim() === "") {
            setResults([]);
            return;
        }

        const filtered = artigosIniciais.filter(artigo =>
            artigo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artigo.summary?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filtered);
    }, [searchTerm, artigosIniciais]);
    
    return (
        <section className={`flex flex-col w-full items-center justify-center bg-[#162B3F] transition-all duration-500 ease-in-out ${results.length > 0 ? 'py-12 min-h-[50vh]' : 'h-[30vh]'}`}>
            
            {/* Barra de Pesquisa */}
            <div className='relative w-[50vw]'>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Digite o termo que deseja pesquisar' 
                    className='h-[8vh] w-full bg-[#FFFFFF] text-[#000000] text-center border-[#F1863D] border-[0.15rem] rounded-[2rem] focus:outline-none px-12'
                />
                <div className='absolute inset-y-0 right-5 flex items-center pointer-events-none'>
                    <Image 
                        src="/lupa.svg" 
                        alt="Search Icon" 
                        width={25} 
                        height={25} 
                    />
                </div>
            </div>

            {/* Resultados (Só aparecem se houver busca) */}
            {searchTerm.length > 0 && (
                <div className='mt-8 w-[80%] animate-fadeIn'>
                    <p className='text-white text-[1.2rem] mb-6 text-center'>
                        {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                    </p>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {results.map(item => (
                            <Link 
                                key={item.id} 
                                href={item.medium_url} 
                                target="_blank"
                                className='bg-white/10 hover:bg-white/20 p-4 rounded-xl flex items-center gap-4 transition-colors'
                            >
                                <div className='relative h-16 w-16 flex-shrink-0'>
                                    <Image 
                                        src={item.image_url || "/heteronimos.png"} 
                                        fill 
                                        alt="" 
                                        className='object-cover rounded-md'
                                    />
                                </div>
                                <div className='flex flex-col overflow-hidden'>
                                    <h4 className='text-white font-bold truncate'>{item.title}</h4>
                                    <p className='text-gray-300 text-xs line-clamp-1'>{item.summary}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}