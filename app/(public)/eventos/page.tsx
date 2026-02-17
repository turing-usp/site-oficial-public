import Image from 'next/image';
import Link from 'next/link';
import EventoCarousel from '@/components/public/eventoCarousel';

export default function Eventos(){
    return(
        <main>
            <div className="relative flex h-[100vh] w-[100%] items-center justify-center">
                <div className="flex flex-1 items-center relative">
                    <Image 
                        src="/trofeu.svg"
                        alt="imagem Troféu"
                        width={600}
                        height={600}
                        className="absolute left-0 h-[40vh] w-auto"
                    />
                </div>
                    <div className="flex flex-1 flex-col items-center justify-center gap-6">
                        <p className="text-[1.5rem] text-[#766F6F] font-bold">NOSSOS EVENTOS E COMPETIÇÕES</p>
                        <p className="text-[4rem] font-bold text-[#000000] text-center leading-none max-w-[18ch]">IDEIAS QUE EVOLUEM EM CONJUNTO</p>
                        <p className="text-[1.5rem] text-[#000000] text-center">Descubra um pouco mais sobre os eventos organizados pelo Turing ao longo dos anos.</p>
                    </div>
                    <div className="flex flex-1 items-center relative">
                        <Image 
                            src="/calendario.svg"
                            alt="imagem calendário"
                            width={600}
                            height={600}
                            className="absolute right-0 h-[35vh] w-auto"
                        />
                    </div>
            </div>
            <div className="flex justify-center">
                <p className='w-full text-[#000000] text-[3rem] font-bold text-left ml-[10%]'>NOSSOS EVENTOS</p>
            </div>
            <div className="flex w-full items-center justify-center mt-[5%] mb-[5%]">
                <EventoCarousel />
            </div>
            <div id='secao azul' className='flex flex-col min-h-screen h-auto z-0 relative bg-[#162B3F]'>
                <div className='flex justify-center mt-[5%]'>
                    <p className='w-full text-[#FFFFFF] text-[3rem] font-bold text-right mr-[10%]'>NOSSOS COMPETIÇÕES</p>
                </div>
                <div className='flex mr-[5%] ml-[5%] mt-[5%] gap-[10%]'>
                    <div className='bg-[#FFFFFF] flex-1 h-auto mb-[5%] flex flex-col items-center justify-start rounded-[1rem] hover:scale-105 transition-transform duration-500 p-8'>
                        <div className='h-[25vh] flex items-center justify-center mb-[5%]'>
                            <Image 
                                src="/trade.svg"
                                alt="Itaú Quant"
                                width={500}
                                height={500}
                                className='w-full h-full object-contain'
                            />
                        </div>
                        <p className=' text-[#000000] text-[1.5rem] text-center mx-[10%] mb-[5%]'>ITAÚ QUANT</p>
                        <p className=' text-[#000000] text-[1rem] mx-[10%] text-justify'>O Turing tem uma longa tradição na participação da competição anual Itaú Quant, uma competição de modelagem matemática e financeira de uma estratégia quantitativa. O Turing obteve bons resultados em várias edições, com destaque para os robôs Ringo e Nala, que alcançaram as posições de 1º e 3º lugar, respectivamente.</p>
                    </div>
                    <div className='bg-[#FFFFFF] mb-[5%] flex-1 h-auto flex flex-col items-center justify-start rounded-[1rem] hover:scale-105 transition-transform duration-500 p-8'>
                        <div className='h-[25vh] flex items-center justify-center mb-[5%]'>
                            <Image
                                src="/mapa.svg"
                                alt="mapa mundi"
                                width={500}
                                height={500}
                                className='w-full h-full object-contain'
                            />
                        </div>
                        <p className=' text-[#000000] text-[1.5rem] text-center mx-[10%] mb-[5%]'>ABII WAR</p>
                        <p className=' text-[#000000] text-[1rem] mx-[10%] text-justify'>A ABII War foi uma competição voltada ao desenvolvimento de modelos capazes de jogar War contra outros agentes inteligentes. O Turing se destacou ao adotar uma abordagem inovadora que combinava computação visual e aprendizado por reforço, alcançando um desempenho superior e conquistando o título de campeão da edição.</p>
                    </div>
                    <div className='bg-[#FFFFFF] mb-[5%] flex-1 h-auto flex flex-col items-center justify-start rounded-[1rem] hover:scale-105 transition-transform duration-500 p-8'>
                        <div className='h-[25vh] flex items-center justify-center mb-[5%]'>
                            <Image
                                src="/malawi.svg"
                                alt="malawi"
                                width={500}
                                height={500}
                                className='w-full h-full object-contain'
                            />
                        </div>
                        <p className=' text-[#000000] text-[1.5rem] text-center mx-[10%] mb-[5%]'>MALAWI</p>
                        <p className=' text-[#000000] text-[1rem] mx-[10%] text-justify'>Competição realizada em parceria com o governo do Malawi para analisar riscos de desastres naturais em populações rurais por meio de imagens de satélite. O Turing desenvolveu um modelo de computação visual capaz de identificar com precisão a condição dos telhados das residências e mapear as construções mais vulneráveis às fortes chuvas do país.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}