"use client";

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOverBlue, setIsOverBlue] = useState(false);
    const [isAberto, setIsAberto] = useState(false);

    // 1. Criamos a referência para a Navbar ou o menu mobile
    const navRef = useRef<HTMLElement>(null);

    // Seu useEffect original de Scroll (mantido)
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 10);

            const blueSection = document.getElementById('secao azul');
            if (blueSection) {
                const rect = blueSection.getBoundingClientRect();
                setIsOverBlue(rect.top <= 60 && rect.bottom >= 60);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('scroll', handleScroll); }
    }, []);

    // 2. Novo useEffect para detectar clique fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Se o menu estiver aberto e o clique for fora da navRef, fecha o menu
            if (isAberto && navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsAberto(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAberto]); // Depende do estado isAberto

    const getNavbarBg = () => {
        if (!isScrolled) return 'bg-transparent';
        if (isOverBlue) return 'bg-blue/30 backdrop-blur-md shadow-sm';
        return 'bg-white/30 backdrop-blur-md shadow-sm';
    }

    return (
        <nav className={`flex flex-row justify-between items-center bg-transparent sticky top-0 left-0 w-full z-50
            ${getNavbarBg()}
            `} ref={navRef}>
            <div className='flex px-[5%] py-[1%] justify-between w-full items-center'>
                <div className='flex justify-center gap-4'>
                    <Link href='/' className='flex items-center'>
                        <Image
                            src="/logo.svg"
                            alt=''
                            width={50}
                            height={50}
                        />
                        <p className='text-[1rem] text-[#F1863D]' style={{ fontFamily: 'var(--font-orbitron)' }}>turing.usp</p>    
                    </Link>
                    <div className="hidden xl:flex items-center gap-4">
                        <Link href ="/projetos" className={`text-[1rem] text-[#000000] ${isOverBlue ? 'text-[#F1863D] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#F1863D]'}`}>PROJETOS</Link>
                        <Link href="/equipe" className={`text-[1rem] text-[#000000] ${isOverBlue ? 'text-[#F1863D] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#F1863D]'}`}>EQUIPE</Link>
                        <Link href="/turing-talks" className={`text-[1rem] text-[#000000] ${isOverBlue ? 'text-[#F1863D] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#F1863D]'}`}>TURING TALKS</Link>
                        <Link href="/eventos" className={`text-[1rem] text-[#000000] ${isOverBlue ? 'text-[#F1863D] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#F1863D]'}`}>EVENTOS</Link>
                        <Link href="/contato" className={`text-[1rem] text-[#000000] ${isOverBlue ? 'text-[#F1863D] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#F1863D]'}`}>CONTATO</Link>
                    </div>
                </div>
                    <div className='hidden xl:flex gap-[1rem]'>
                        <a href="/cadastre-se"><button className={`text-[1rem] text-[#000000] border border-[#162B3F] w-[9rem] h-[2rem] rounded rounded-[2rem] hover:bg-[#162B3F] hover:text-[#FFFFFF] hover:scale-103 transition-transform duration-500 cursor-pointer ${isOverBlue ? 'border-[#F1863D] text-[#F1863D] hover:bg-[#F1863D]' : 'border-[#162B3F]'}`}>CADASTRE-SE</button></a>
                        <a href="/login"><button className={`text-[1rem] text-[#FFFFFF] bg-[#162B3F] w-[9rem] h-[2rem] rounded rounded-[2rem] hover:scale-103 transition-transform duration-300 cursor-pointer ${isOverBlue ? 'bg-[#F1863D] hover:bg-[#F1863D]' : ''}`}>LOGIN</button></a>
                    </div>

                    <button className="xl:hidden p-2"
                    onClick={() => setIsAberto(!isAberto)}>
                        <div className={`w-6 h-0.5 bg-[#F1863D] mb-1 transition-transform duration-300 ${isAberto ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-[#F1863D] mb-1 transition-opacity duration-300 ${isAberto ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-[#F1863D] transition-transform duration-300 ${isAberto ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                    </button>
            </div>

            <div className={`xl:hidden absolute top-full left-0 w-full bg-white flex-col items-center gap-4 py-4 shadow-md ${isAberto ? 'flex' : 'hidden'}`}>
                <Link href="/projetos" className={"text-[#000000] text-[1rem] md:text-[1.2rem] lg:text-[1.4rem] "} onClick={() => setIsAberto(false)}>PROJETOS</Link>
                <Link href="/equipe" className={"text-[#000000] text-[1rem] md:text-[1.2rem] lg:text-[1.4rem] "} onClick={() => setIsAberto(false)}>EQUIPE</Link>
                <Link href="/turing-talks" className={"text-[#000000] text-[1rem] md:text-[1.2rem] lg:text-[1.4rem] "} onClick={() => setIsAberto(false)}>TURING TALKS</Link>
                <Link href="/eventos" className={"text-[#000000] text-[1rem] md:text-[1.2rem] lg:text-[1.4rem] "} onClick={() => setIsAberto(false)}>EVENTOS</Link>
                <Link href="/contato" className={"text-[#000000] text-[1rem] md:text-[1.2rem] lg:text-[1.4rem] "} onClick={() => setIsAberto(false)}>CONTATO</Link>
                <Link href="/cadastre-se" className={"text-[#F1863D] text-[1rem] md:text-[1.2rem] lg:text-[1.4rem]"} onClick={() => setIsAberto(false)}>CADASTRE-SE</Link>
                <Link href="/login" className={"text-[#F1863D]"} onClick={() => setIsAberto(false)}>LOGIN</Link>
            </div>
        </nav>
    );
}