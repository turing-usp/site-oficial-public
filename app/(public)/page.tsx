import Image from 'next/image';
import Carousel from '../../components/public/carousel';
import OqueFazemos from '../../components/public/oquefazemos';
import Link from 'next/link';

export default function Home() {
    return (
        <main>
            <div className='h-[100vh] flex flex-col md:flex-row z-0 items-center'>
                <div className='ml-[5%] mr-[5%] flex flex-col w-full md:w-[45%] items-center justify-center h-[100%]'>
                    <p className='text-[#000000] text-[2.2rem] md:text-[4rem] text-center font-bold leading-tight px-4 md:px-0'>CONSTRUINDO O FUTURO DA <span className='text-[#F1863D]'>IA</span></p>
                    <p className='mt-[5%] text-[#000000] text-center text-[1.5rem] leading-tight px-4 md:px-0'>Desde 2015 o Turing é o maior grupo voltado a inteligência artificial da USP</p>
                </div>
                <div className='absolute bg-gradient-to-b from-[#EBB84A] to-[#F1863D] w-[40%] h-[100%] top-0 right-0 rounded-tl-[2rem] rounded-bl-[2rem] overflow-hidden hidden md:block'>
                   <Image 
                        src="/circuito.svg"
                        alt="Circuitos"
                        width={100}
                        height={100}
                        className='absolute w-[10vh] h-auto object-cover z-0 left-[10%] top-0 rotate-90 hidden md:block'
                   />
                    <Image 
                        src="/circuito.svg"
                        alt="Circuitos"
                        width={100}
                        height={100}
                        className='absolute w-[10vh] h-auto object-cover bottom-0 z-0 rotate-35 left-[8%] origin-left hidden md:block'
                   />
                   <Image 
                        src="/circuito.svg"
                        alt="Circuitos"
                        width={100}
                        height={100}
                        className='absolute w-[10vh] h-auto object-cover bottom-0 z-0 rotate-0 right-0 hidden md:block'
                   />
                   <Image 
                        src="/circuito.svg"
                        alt="Circuitos"
                        width={100}
                        height={100}
                        className='absolute w-[10vh] h-auto object-cover z-0 right-[7%] rotate-215 top-0 hidden md:block'
                   />
                </div>
                <Image
                    src="/processadorini.svg"
                    alt="Processador"
                    width={800}
                    height={800}
                    className='w-[60vw] mb-5 md:mb-0 md:w-[75vh] md:h-auto md:object-contain md:overflow-hidden md:object-contain md:relative md:z-0'
                />
            </div>
            <div className='flex flex-col md:flex-row items-center py-16 md:h-[100vh] z-0 relative'>
                <div className='ml-[5%] flex flex-col w-full md:w-[45%] items-center justify-center h-auto md:h-[100%] order-2 md:order-1'>
                    <Image
                        src="/fotointe2.jpeg"
                        alt=""
                        width={800}
                        height={800}
                        className='w-[85%] md:w-[55vh] h-auto border border-[#F1863D] border-[0.2rem] mb-[5%] mt-[5%] md:mt-0 rotate-354'
                    />
                    <Image
                        src="/fotointeg.jpg"
                        alt=""
                        width={800}
                        height={800}
                        className='w-[85%] md:w-[55vh] h-auto border border-[#F1863D] border-[0.2rem] rotate-6'
                    />
                </div>
                <div className='mr-[5%] flex flex-col w-full md:w-[45%] pb-10 md:pb-0 order-1 md:order-2'>
                    <p className='text-[#000000] text-[2.2rem] md:text-[3rem] font-bold ml-[5%] md:ml-0'>QUEM SOMOS</p>
                    <div className='w-[50%] h-[0.5vh] bg-[#F1863D] ml-[5%] md:ml-0'></div>
                    <p className='mt-[5%] text-[#000000]  text-[1rem] md:text-[1.5rem] text-justify ml-[5%] md:ml-0'>O Turing é um grupo de extensão da USP campus Butantã que foi fundado em 2015 por 5 amigos. Desde então é referência na pesquisa e produção do assunto.</p>
                    <p className='mt-[5%] text-[#000000] text-[1rem] md:text-[1.5rem] text-justify ml-[5%] md:ml-0'>O grupo tem como objeto de estudos diferentes áreas da inteligência artificial: Data Science, Processamento de Linguagem Natural, Computação visual, Aprendizado por reforço e finanças quantitativas.</p>
                    <div className='mt-[5%] self-center order-3 hidden md:block'>
                    <Link href="/equipe">
                        <button className='text-[#000000] bg-[#FFFFFF] border border-[#F1863D] w-[12rem] h-[3rem] mb-[5%] md:mb-0 rounded rounded-[2rem] hover:scale-103 transition-transform duration-300 cursor-pointer hover:bg-[#F1863D] hover:text-[#FFFFFF]'>CONHEÇA A EQUIPE</button>
                    </Link>
                </div>
                </div>
                <div className='mt-[5%] self-center order-3 md:hidden'>
                    <Link href="/equipe">
                        <button className='text-[#000000] bg-[#FFFFFF] border border-[#F1863D] w-[12rem] h-[3rem] mb-[5%] md:mb-0 rounded rounded-[2rem] hover:scale-103 transition-transform duration-300 cursor-pointer hover:bg-[#F1863D] hover:text-[#FFFFFF]'>CONHEÇA A EQUIPE</button>
                    </Link>
                </div>
                <Image 
                    src="/circuitoorange.svg"
                    alt="Circuitos"
                    width={100}
                    height={100}
                    className='absolute w-[8vh] h-auto object-cover z-0 rotate-90 top-0 hidden md:block'
                />
                <Image 
                    src="/circuitoorange.svg"
                    alt="Circuitos"
                    width={100}
                    height={100}
                    className='absolute w-[8vh] h-auto object-cover z-0 rotate-65 origin-left-bottom bottom-0 hidden md:block'
                />
                {/* <Image 
                    src="/circuitoorange.svg"
                    alt="Circuitos"
                    width={100}
                    height={100}
                    className='absolute w-[8vh] h-auto object-cover z-0 rotate-270 origin-right-top top-0 right-[7%] hidden md:h-auto md:w-[3rem] md:overflow-hidden lg:block'
                /> */}
            </div>
            <div id='secao azul' className='flex flex-col min-h-screen pb-16 z-0 relative bg-[#162B3F]'>
                <Image 
                    src="/circuito.svg"
                    alt="Circuitos"
                    width={100}
                    height={100}
                    className='left-[4%] absolute w-[10vh] h-auto object-cover z-0 origin-right-top top-10 rotate-90 hidden md:block'
                />
                <div className='flex justify-center mt-[5%]'>
                    <p className='text-[#FFFFFF] text-[2.2rem] md:text-[3rem] font-bold'>NOSSOS PILARES</p>
                </div>
                <div className='flex flex-col md:flex-row mr-[5%] ml-[5%] mt-[5%] gap-y-10 md:gap-[5%] md:gap-[10%] items-center md:justify-center'>
                   <div className='bg-[#FFFFFF] w-full md:flex-1 min-h-[420px] py-14 md:min-h-[320px] md:h-[60vh] max-w-[300px] md:max-w-[400px] flex flex-col items-center justify-center rounded-[1rem] hover:scale-105 transition-transform duration-500'>
                        <Image 
                            src="/ssd.svg"
                            alt="SSD"
                            width={800}
                            height={800}
                            className='w-[15vh] h-auto mb-[5%]'
                        />
                        <p className=' text-[#000000] text-[1.5rem] text-center mx-[10%] mb-[5%]'>PESQUISAR</p>
                        <p className=' text-[#000000] text-[1rem] mx-[10%] text-center md:text-justify'>Exploramos artigos científicos e descobertas para aplicarmos em necessidades do cotidiano.</p>
                   </div>
                   <div className='bg-[#FFFFFF] w-full md:flex-1 min-h-[420px] py-14 md:min-h-[320px] md:h-[60vh] max-w-[300px] md:max-w-[400px] flex flex-col items-center justify-center rounded-[1rem] hover:scale-105 transition-transform duration-500'>
                        <Image 
                            src="/processador.svg"
                            alt="Processador"
                            width={800}
                            height={800}
                            className='w-[22vh] h-auto mb-[5%]'
                        />
                        <p className=' text-[#000000] text-[1.5rem] text-center mx-[10%] mb-[5%]'>APLICAR</p>
                        <p className=' text-[#000000] text-[1rem] mx-[10%] text-center md:text-justify'>Transformamos teoria em código. Desenvolvemos modelos inéditos e aplicações robustas para diversos tipos de uso.</p>
                   </div>
                   <div className='bg-[#FFFFFF] w-full md:flex-1 min-h-[420px] py-14 md:min-h-[320px] md:h-[60vh] max-w-[300px] md:max-w-[400px] flex flex-col items-center justify-center rounded-[1rem] hover:scale-105 transition-transform duration-500'>
                        <Image 
                            src="/share.svg"
                            alt="Disseminar"
                            width={800}
                            height={800}
                            className='w-[20vh] h-auto mb-[5%]'
                        />
                        <p className=' text-[#000000] text-[1.5rem] text-center mx-[10%] mb-[5%]'>DISSEMINAR</p>
                        <p className=' text-[#000000] text-[1rem] mx-[10%] text-center md:text-justify'>Democratizamos o conhecimento técnico através de cursos, workshops e conteúdos abertos, conectando a USP à sociedade e ao mercado.</p>
                   </div>
                </div>
            </div>
            <div className='flex flex-col md:h-[100vh] z-0 items-center mt-[10%] md:mt-[5%] relative'>
                <p className='text-[#000000] text-[2.2rem] md:text-[3rem] font-bold'>RELATOS</p>
                <Image 
                    src="/background.svg"
                    alt="background"
                    width={800}
                    height={800}
                    className='relative w-[130vh] h-auto object-cover z-0 top-0 left-0 overflow-hidden hidden md:block'
                />
                <div className='relative md:absolute z-10 mt-[10%] w-[90%] md:w-[70%]'>
                    <Carousel/>
                </div>
            </div>
            <div className='relative flex flex-col min-h-[100vh]'>
                <Image 
                    src="/detalheporta.svg"
                    alt="Detalhe arredondado"
                    width={100}
                    height={100}
                    className='absolute w-[11vh] object-cover z-0 opacity-50 hidden md:block'
                />
                <Image 
                    src="/detalheporta.svg"
                    alt="Detalhe arredondado"
                    width={100}
                    height={100}
                    className='absolute w-[11vh] object-cover z-0 opacity-80 rotate-180 bottom-0 right-0 hidden md:block'
                />
                <p className='text-[#000000] text-[3rem] font-bold flex mx-[5%] mt-[5%] mb-[2%]'>O QUE FAZEMOS</p>
                <div>
                    <OqueFazemos/>
                </div>
            </div>
        </main>
    );
}