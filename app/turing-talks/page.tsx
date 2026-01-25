import Link from 'next/link';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import Footer from '@/components/footer';

export default function TuringTalks(){
    return(
    <main>
        <div className='fixed top-0 left-0 right-0 z-10'>
            <Navbar/>
        </div>
        <div className='flex h-[100vh] w-[100%] items-center justify-between'>
         <div className='flex mx-[5%] object-contain'>
            <Image
                src="/ttalks.svg"
                alt="Turing Talks Image"
                width={600}
                height={600}
                className='flex-1 h-[50vh] w-auto object-contain'
            />
            <div className='flex flex-1 flex-col justify-center items-center'>
                <p className='text-[#000000] text-[4rem] font-bold'>TURING</p>
                <p className='text-[#000000] text-[4rem] font-bold mb-[5%]' style={{fontFamily: 'var(--font-irish-grover)'}}>TALKS</p>
                <p className='text-[#000000] text-[1.2rem] mx-[20%] mb-[5%] text-center'>Conheça mais sobre assuntos de tecnologia e inovação produzidos pela nossa própria equipe!</p>
            </div>
         </div>
        </div>
        <div>
            <Footer/>
        </div>
    </main>
    );
}