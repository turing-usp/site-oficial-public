import Navbar from '../../components/navbar';
import Image from 'next/image';
import Carousel from '../../components/carousel';
import OqueFazemos from '../../components/oquefazemos';
import Footer from '../../components/footer';
import Link from 'next/link';

export default function Home() {
    return (
        <main>
            <div className='h-[100vh] flex flex-row z-0 items-center'>
                <div className='ml-[5%] mr-[5%] flex flex-col w-[45%] items-center justify-center h-[100%]'>
                    <p className='text-[#000000] text-[4rem] text-center font-bold leading-tight'>CONSTRUINDO O FUTURO DA <span className='text-[#F1863D]'>IA</span></p>
                    <p className='mt-[5%] text-[#000000] text-center text-[1.5rem] leading-tight'>Desde 2015 o Turing é o maior grupo voltado a inteligência artificial da USP</p>
                </div>
                <div className='absolute bg-gradient-to-b from-[#EBB84A] to-[#F1863D] w-[40%] h-[100%] top-0 right-0 rounded-tl-[2rem] rounded-bl-[2rem] overflow-hidden'>
                   <Image 
                        src="/circuito.svg"
                        alt="Circuitos"
                        width={100}
                        height={100}
                        className='absolute w-[10vh] h-auto object-cover z-0 left-[10%] top-0 rotate-90'
                   />
                    <Image 
                        src="/circuito.svg"
                        alt="Circuitos"
                        width={100}
                        height={100}
                        className='absolute w-[10vh] h-auto object-cover bottom-0 z-0 rotate-35 left-[8%] origin-left'
                   />
                   <Image 
                        src="/circuito.svg"
                        alt="Circuitos"
                        width={100}
                        height={100}
                        className='absolute w-[10vh] h-auto object-cover bottom-0 z-0 rotate-0 right-0'
                   />
                   <Image 
                        src="/circuito.svg"
                        alt="Circuitos"
                        width={100}
                        height={100}
                        className='absolute w-[10vh] h-auto object-cover z-0 right-[7%] rotate-215 top-0'
                   />
                </div>
                <Image
                    src="/processadorini.svg"
                    alt="Processador"
                    width={800}
                    height={800}
                    className='absolute w-[75vh] h-auto object-contain relative z-0'
                />
            </div>
            <div className='flex flex-row items-center h-[100vh] z-0 relative overflow-hidden'>
                <div className='ml-[5%] flex flex-col w-[45%] items-center justify-center h-[100%]'>
                    <Image
                        src="/fotointe2.jpeg"
                        alt=""
                        width={800}
                        height={800}
                        className='w-[55vh] h-auto border border-[#F1863D] border-[0.2rem] mb-[5%] rotate-354'
                    />
                    <Image
                        src="/fotointeg.jpg"
                        alt=""
                        width={800}
                        height={800}
                        className='w-[55vh] h-auto border border-[#F1863D] border-[0.2rem] rotate-6'
                    />
                </div>
                <div className='mr-[5%] flex flex-col w-[45%] '>
                    <p className='text-[#000000] text-[3rem]  font-bold'>QUEM SOMOS</p>
                    <div className='w-[50%] h-[0.5vh] bg-[#F1863D]'></div>
                    <p className='mt-[5%] text-[#000000]  text-[1.5rem]'>O Turing é um grupo de extensão da USP campus Butantã que foi fundado em 2015 por 5 amigos. Desde então é referência na pesquisa e produção do assunto.</p>
                    <p className='mt-[5%] text-[#000000] text-[1.5rem]'>O grupo tem como objeto de estudos diferentes áreas da inteligência artificial: Data Science, Processamento de Linguagem Natural, Computação visual, Aprendizado por reforço e finanças quantitativas.</p>
                    <div className='mt-[5%] self-center'>
                        <Link href="/equipe">
                            <button className='text-[#000000] bg-[#FFFFFF] border border-[#F1863D] w-[12rem] h-[3rem] rounded rounded-[2rem] hover:scale-103 transition-transform duration-300 cursor-pointer hover:bg-[#F1863D] hover:text-[#FFFFFF]'>CONHEÇA A EQUIPE</button>
                        </Link>
                    </div>
                </div>
                <Image 
                    src="/circuitoorange.svg"
                    alt="Circuitos"
                    width={100}
                    height={100}
                    className='absolute w-[8vh] h-auto object-cover z-0 rotate-90 top-0'
                />
                <Image 
                    src="/circuitoorange.svg"
                    alt="Circuitos"
                    width={100}
                    height={100}
                    className='absolute w-[8vh] h-auto object-cover z-0 rotate-65 origin-left-bottom bottom-0'
                />
                <Image 
                    src="/circuitoorange.svg"
                    alt="Circuitos"
                    width={100}
                    height={100}
                    className='absolute w-[8vh] h-auto object-cover z-0 rotate-270 origin-right-top top-0 right-[7%]'
                />
            </div>
            <div id='secao azul' className='flex flex-col h-[100vh] z-0 relative bg-[#162B3F]'>
                <Image 
                    src="/circuito.svg"
                    alt="Circuitos"
                    width={100}
                    height={100}
                    className='left-[4%] absolute w-[10vh] h-auto object-cover z-0 origin-right-top top-10 rotate-90 '
                />
                <div className='flex justify-center mt-[5%]'>
                    <p className='text-[#FFFFFF] text-[3rem] font-bold'>NOSSOS PILARES</p>
                </div>
                <div className='flex mr-[5%] ml-[5%] mt-[5%] gap-[10%]'>
                   <div className='bg-[#FFFFFF] flex-1 h-[60vh] flex flex-col items-center justify-center rounded-[1rem] hover:scale-105 transition-transform duration-500'>
                        <Image 
                            src="/ssd.svg"
                            alt="SSD"
                            width={800}
                            height={800}
                            className='w-[15vh] h-auto mb-[5%]'
                        />
                        <p className=' text-[#000000] text-[1.5rem] text-center mx-[10%] mb-[5%]'>PESQUISAR</p>
                        <p className=' text-[#000000] text-[1rem] mx-[10%] text-center'>Exploramos artigos científicos e descobertas para aplicarmos em necessidades do cotidiano.</p>
                   </div>
                   <div className='bg-[#FFFFFF] flex-1 h-[60vh] flex flex-col items-center justify-center rounded-[1rem] hover:scale-105 transition-transform duration-500'>
                        <Image 
                            src="/processador.svg"
                            alt="Processador"
                            width={800}
                            height={800}
                            className='w-[22vh] h-auto mb-[5%]'
                        />
                        <p className=' text-[#000000] text-[1.5rem] text-center mx-[10%] mb-[5%]'>APLICAR</p>
                        <p className=' text-[#000000] text-[1rem] mx-[10%] text-center'>Transformamos teoria em código. Desenvolvemos modelos inéditos e aplicações robustas para diversos tipos de uso.</p>
                   </div>
                   <div className='bg-[#FFFFFF] flex-1 h-[60vh] flex flex-col items-center justify-center rounded-[1rem] hover:scale-105 transition-transform duration-500'>
                        <Image 
                            src="/share.svg"
                            alt="Disseminar"
                            width={800}
                            height={800}
                            className='w-[20vh] h-auto mb-[5%]'
                        />
                        <p className=' text-[#000000] text-[1.5rem] text-center mx-[10%] mb-[5%]'>DISSEMINAR</p>
                        <p className=' text-[#000000] text-[1rem] mx-[10%] text-center'>Democratizamos o conhecimento técnico através de cursos, workshops e conteúdos abertos, conectando a USP à sociedade e ao mercado.</p>
                   </div>
                </div>
            </div>
            <div className='flex flex-col h-[100vh] z-0 items-center mt-[5%]'>
                <p className='text-[#000000] text-[3rem] font-bold'>RELATOS</p>
                <Image 
                    src="/background.svg"
                    alt="background"
                    width={800}
                    height={800}
                    className='relative w-[130vh] h-auto object-cover z-0 top-0 left-0 overflow-hidden'
                />
                <div className='absolute z-10 mt-[10%] w-[70%]'>
                    <Carousel/>
                </div>
            </div>
            <div className='relative flex flex-col h-[100vh]'>
                <Image 
                    src="/detalheporta.svg"
                    alt="Detalhe arredondado"
                    width={100}
                    height={100}
                    className='absolute w-[11vh] object-cover z-0 opacity-50'
                />
                <Image 
                    src="/detalheporta.svg"
                    alt="Detalhe arredondado"
                    width={100}
                    height={100}
                    className='absolute w-[11vh] object-cover z-0 opacity-80 rotate-180 bottom-0 right-0'
                />
                <p className='text-[#000000] text-[3rem] font-bold flex mx-[5%] mt-[5%] mb-[2%]'>O QUE FAZEMOS</p>
                <div>
                    <OqueFazemos/>
                </div>
            </div>
        </main>
    );
}