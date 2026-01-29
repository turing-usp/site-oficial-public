import Navbar from '@/components/navbar';
import Image from 'next/image';
import Footer from '@/components/footer';
import Link from 'next/link';

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
            <div className='relative mx-[5%] items-center justify-center'>
                <input type="text" placeholder='Digite o termo que deseja pesquisar' className='h-[8vh] w-[50vw] bg-[#FFFFFF] text-[#000000] text-center border-[#F1863D] border-[0.15rem] rounded-[2rem] focus:outline-none'></input>
                <Link href="/turing-talks/search">
                    <Image 
                        src="/lupa.svg"
                        alt="Search Icon"
                        width={30}
                        height={30}
                        className='absolute top-3 right-3 cursor-pointer'
                    />
                </Link>
            </div>
        </div>
        <div className='hidden h-auto min-h-[30vh] w-[100%] items-center justify-center bg-[#162B3F]'>
            <div className='relative mx-[5%] items-center justify-center'>
                {/* Função que retorna valores da pesquisa */}
                <p className='text-[#000000] text-[1.2rem]'>X Resultados encontrados</p>
            </div>
        </div>
        <div className='flex w-[100%] h-auto'>
            <div className='flex flex-col mx-[5%] my-[5%]'>
                <p className='text-[#000000] text-[2rem] font-bold mb-[2%]'>ÚLTIMOS <span style={{fontFamily: 'var(--font-irish-grover)'}}>TALKS:</span></p>
                <div className='flex h-[30vh] w-[100%] object-contain justify-between'>
                    <Image
                        src="/heteronimos.png"
                        alt="Notícia 1"
                        width={400}
                        height={300}
                        className='h-[15vh] w-auto flex-1 mt-[2%] object-contain'
                    />
                    <div className='flex flex-col flex-1'>
                        <p className='text-[#000000] text-[1.2rem] font-bold mb-[1%]'>HETERÔNIMOS: A NOVA FERRAMENTA DE IA QUE VAI REVOLUCIONAR A CRIAÇÃO DE CONTEÚDO</p>
                        <p className='text-[#000000] text-[1rem] mb-[1%] w-[40vw]'>Descubra como a mais recente inovação em inteligência artificial está transformando a maneira como criamos conteúdo. Com a ferramenta Heterônimos, desenvolvida por nossa equipe de especialistas, você poderá gerar textos, imagens e vídeos de alta qualidade com apenas alguns cliques. Saiba mais sobre essa tecnologia revolucionária e como ela pode beneficiar você e sua empresa.</p>
                        <div className='flex mt-auto items-center gap-[5%]'>
                            <Image
                                src="/chefe.jpeg"
                                alt="Author Icon"
                                width={20}
                                height={20}
                                className='h-[1.8rem] rounded-full w-[1.8rem] mr-[1%]'
                            />
                            <p className='text-[#000000] text-[0.9rem]'>Kauã Fillipe</p>
                            <p className='text-[#000000] text-[0.9rem]'>14 de abril de 2025</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex w-[100%] h-auto'>
            <div className='flex flex-col mx-[5%] my-[5%]'>
                <div className='grid grid-cols-3 gap-[5%]'>
                    {/* Aqui a gente adiciona o map depois */}
                    <div className='flex flex-col flex-1'>
                        {/* Aqui os ítens*/}
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Footer/>
        </div>
    </main>
    );
}