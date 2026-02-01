import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className='flex flex-row mt-[1%] mr-[5%] ml-[5%] justify-between items-center bg-transparent'>
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
                    <Link href ="/" className='text-[1rem] text-[#000000] hover:text-[#F1863D]'>INÍCIO</Link>
                    <Link href ="/projetos" className='text-[1rem] text-[#000000] hover:text-[#F1863D]'>PROJETOS</Link>
                    <Link href ="/equipe" className='text-[1rem] text-[#000000] hover:text-[#F1863D]'>EQUIPE</Link>
                    <Link href ="/turing-talks" className='text-[1rem] text-[#000000] hover:text-[#F1863D] whitespace-nowrap'>TURING TALKS</Link>
                    <Link href ="" className='text-[1rem] text-[#000000] hover:text-[#F1863D]'>CONTATO</Link>
                </div>
            </div>
            <div className='flex gap-[1rem]'>
                <a href="/cadastre-se"><button className='text-[1rem] text-[#000000] border border-[#162B3F] w-[9rem] h-[2rem] rounded rounded-[2rem] hover:bg-[#162B3F] hover:text-[#FFFFFF] hover:scale-103 transition-transform duration-500 cursor-pointer'>CADASTRE-SE</button></a>
                <a href="/login"><button className='text-[1rem] text-[#FFFFFF] bg-[#162B3F] w-[9rem] h-[2rem] rounded rounded-[2rem] hover:scale-103 transition-transform duration-300 cursor-pointer'>LOGIN</button></a>
            </div>
        </nav>
    );
}