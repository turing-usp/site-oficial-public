import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className='flex-row '>
            <div className='flex'>
                <Link href="/" className='flex items-center'>
                    <Image
                        src="/logo.svg"
                        alt=""
                        width={40}
                        height={40}
                    />
                    <p className='text-[1.5rem] text-[#F1863D]' style={{ fontFamily: 'var(--font-orbitron)' }}>turing.usp</p>
                </Link>
            </div>
        </nav>
    );
}