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
                    <Link href ="" className='text-[1rem] text-[#000000] hover:text-[#F1863D]'>EQUIPES</Link>
                    <Link href ="" className='text-[1rem] text-[#000000] hover:text-[#F1863D]'>CONTATO</Link>
                </div>
            </div>
            <div className='flex gap-[1rem]'>
                <button className='text-[1rem] text-[#000000] border border-[#162B3F] w-[9rem] h-[2rem] rounded rounded-[2rem] hover:bg-[#162B3F] hover:text-[#FFFFFF]'>CADASTRE-SE</button>
                <button className='text-[1rem] text-[#FFFFFF] bg-[#162B3F] w-[9rem] h-[2rem] rounded rounded-[2rem]'>LOGIN</button>
            </div>
        </nav>
    );
}