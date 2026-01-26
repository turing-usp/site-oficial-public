import Navbar from '@/components/navbar';
import Image from 'next/image';
import Footer from '@/components/footer';

export default function TuringTalks(){
    const backgroundWords = [
        { text: 'MACHINE LEARNING', color: '#F1863D', size: '1.3rem', top: '25%', left: '35%', opacity: 0.2 },
        { text: 'INOVAÇÃO', color: '#EBB84A', size: '1.5rem', top: '35%', left: '50%', opacity: 0.2 },
        { text: 'FUTURO', color: '#008FF8', size: '2rem', top: '80%', left: '20%', opacity: 0.15 },
        { text: 'ORDENAÇÃO', color: '#F1863D', size: '1rem', top: '60%', left: '48%', opacity: 0.2 },
        { text: 'CIÊNCIA', color: '#EBB84A', size: '1.2rem', top: '20%', left: '8%', opacity: 0.3 },
        { text: 'PROGRAMAÇÃO', color: '#008FF8', size: '2rem', top: '75%', left: '70%', opacity: 0.1 },
        { text: 'DESCOBERTA', color: '#F1863D', size: '1.5rem', top: '20%', left: '70%', opacity: 0.2 },
        { text: 'CRIATIVIDADE', color: '#EBB84A', size: '2rem', top: '90%', left: '55%', opacity: 0.1 },
        { text: 'REDES NEURAIS', color: '#008FF8', size: '1.2rem', top: '80%', left: '45%', opacity: 0.2 },
        { text: 'DEEP LEARNING', color: '#F1863D', size: '1.5rem', top: '90%', left: '5%', opacity: 0.3 },
        { text: 'COMP. VISUAL', color: '#008FF8', size: '1.8rem', top: '46%', left: '45%', opacity: 0.15 },
        { text: 'QUANT', color: '#EBB84A', size: '1.3rem', top: '65%', left: '90%', opacity: 0.4 },
        { text: 'APRENDIZADO POR REFORÇO', color: '#F1863D', size: '1.7rem', top: '12%', left: '27%', opacity: 0.1 },
        { text: 'DATA SCIENCE', color: '#EBB84A', size: '1.4rem', top: '15%', left: '85%', opacity: 0.2 },
        { text: 'PROJETOS', color: '#EBB84A', size: '1.6rem', top: '60%', left: '7%', opacity: 0.25 },
        { text: 'NLP', color: '#F1863D', size: '1.8rem', top: '30%', left: '85%', opacity: 0.2 },
    ];

    return(
    <main>
        <div className='fixed top-0 left-0 right-0 z-10'>
            <Navbar/>
        </div>
        <div className='relative h-[100vh] w-[100%]'>
            <div className='flex h-full w-full items-center justify-between z-5'>
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
            <div className='flex mx-[5%] object-contain z-0'>
                {backgroundWords.map(({ text, color, size, top, left, opacity }) => (
                    <p
                        key={`${text}-${top}-${left}`}
                        className='absolute font-bold'
                        style={{
                            color,
                            fontFamily: 'var(--font-irish-grover)',
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
        <div className='flex h-[30vh] w-[100%] items-center justify-center bg-[#162B3F]'>

        </div>
        <div>
            <Footer/>
        </div>
    </main>
    );
}