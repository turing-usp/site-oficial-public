import Navbar from '../components/navbar';
import Image from 'next/image';

export default function Home() {
    return (
        <main>
            <div className='fixed top-0 left-0 right-0 z-10'>
                <Navbar/>
            </div>
            <div className='h-[100vh] flex flex-row z-0 items-center'>
                <div className='ml-[5%] mr-[5%] flex flex-col w-[45%] items-center justify-center h-[100%]'>
                    <p className='text-[#000000] text-[4rem] text-center font-bold'>CONSTRUINDO O FUTURO DA <span className='text-[#F1863D]'>IA</span></p>
                    <p className='mt-[5%] text-[#000000] text-center text-[1.5rem]'>Desde 2015 o Turing é o maior grupo voltado a inteligência artificial da USP</p>
                </div>
                <div className='absolute bg-gradient-to-b from-[#EBB84A] to-[#F1863D] w-[40%] h-[100%] top-0 right-0'>
                   
                </div>
                <Image
                    src="/processadorini.svg"
                    alt="Processador"
                    width={100}
                    height={100}
                    className='w-[75vh] h-auto object-contain relative z-20'
                />
            </div>
        </main>
    );
}