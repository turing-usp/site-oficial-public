"use client";

import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOverBlue, setIsOverBlue] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 10);

            const blueSection = document.getElementById('secao azul');
            if (blueSection) {
                const rect = blueSection.getBoundingClientRect();
                // Se o topo da seção azul chegar no topo da tela (ou perto dele)
                setIsOverBlue(rect.top <= 60 && rect.bottom >= 60);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('scroll', handleScroll); }
    }, []);

    const getNavbarBg = () => {
        if (!isScrolled) return 'bg-transparent';
        if (isOverBlue) return 'bg-blue/30 backdrop-blur-md shadow-sm';
        return 'bg-white/30 backdrop-blur-md shadow-sm';
    }

    return (
        <nav className={`flex flex-row justify-between items-center bg-transparent sticky top-0 left-0 w-full z-50
            ${getNavbarBg()}
            `}>
            <div className='flex mx-[5%] my-[1%] justify-between w-[90%] items-center'>
                <div className='flex justify-center'>
                    <Link href="/" className='flex items-center'>
                        <Image
                            src="/logo.svg"
                            alt=""
                            width={50}
                            height={50}
                        />
                        <p className='text-[1rem] text-[#F1863D]' style={{ fontFamily: 'var(--font-orbitron)' }}>turing.usp</p>
                    </Link>
                    <div className='flex items-center ml-[15%] gap-[1rem]'>
                        <Link href ="/projetos" className={`text-[1rem] text-[#000000] ${isOverBlue ? 'text-[#F1863D] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#F1863D]'}`}>PROJETOS</Link>
                        <Link href ="/equipe" className={`text-[1rem] text-[#000000] ${isOverBlue ? 'text-[#F1863D] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#F1863D]'}`}>EQUIPE</Link>
                        <Link href ="/turing-talks" className={`text-[1rem] text-[#000000] whitespace-nowrap ${isOverBlue ? 'text-[#F1863D] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#F1863D]'}`}>TURING TALKS</Link>
                        <Link href ="/contato" className={`text-[1rem] text-[#000000] ${isOverBlue ? 'text-[#F1863D] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#F1863D]'}`}>CONTATO</Link>
                    </div>
                </div>
                <div className='flex gap-[1rem]'>
                    <a href="/cadastre-se"><button className={`text-[1rem] text-[#000000] border border-[#162B3F] w-[9rem] h-[2rem] rounded rounded-[2rem] hover:bg-[#162B3F] hover:text-[#FFFFFF] hover:scale-103 transition-transform duration-500 cursor-pointer ${isOverBlue ? 'border-[#F1863D] text-[#F1863D] hover:bg-[#F1863D]' : 'border-[#162B3F]'}`}>CADASTRE-SE</button></a>
                    <a href="/login"><button className={`text-[1rem] text-[#FFFFFF] bg-[#162B3F] w-[9rem] h-[2rem] rounded rounded-[2rem] hover:scale-103 transition-transform duration-300 cursor-pointer ${isOverBlue ? 'bg-[#F1863D] hover:bg-[#F1863D]' : ''}`}>LOGIN</button></a>
                </div>
            </div>
        </nav>
    );
}