"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CONTEUDOS = [
    {
        id: 1,
        titulo: "Projetos",
        descricao: "Desenvolvemos soluções para problemas reais utilizando inteligência artificial. São mais de 10 anos de experiência em projetos inovadores e impactantes para o mercado e para a sociedade.",
        imagem: "/heteronimos.png",
        escala: "scale-130",
        href: "/projetos"
    },
    {
        id: 2,
        titulo: "Eventos",
        descricao: "Organizamos eventos para compartilhar conhecimento e promover a integração entre os membros e a comunidade, por meio de workshops, palestras e encontros para a comunidade interna e externa da USP.",
        imagem: "/w4h2025.jpeg",
        escala: "scale-100",
        href: "#"
    },
    {
        id: 3,
        titulo: "Disseminação",
        descricao: "Promovemos a disseminação do conhecimento em inteligência artificial por meio de publicações, cursos e textos escritos com uma linguagem acessível para todos, com o intuito de democratizar o acesso à informação.",
        imagem: "/disseminacao.png",
        escala: "scale-100",
        href: "/turingtalks"
    },
    {
        id: 4,
        titulo: "Competições",
        descricao: "Participamos de competições nacionais e internacionais de inteligência artificial, desafiando nossas habilidades e conhecimentos para alcançar resultados excepcionais e colocar o Turing USP em destaque no cenário global.",
        imagem: "/ABII.jpg",
        escala: "scale-100",
        href: "#"
    }
]

export default function OqueFazemos() {
    // Começa em 0 (Projetos)
    const [abaAtiva, setAbaAtiva] = useState(0);

    return (
        <div>
            {/* Renderização dos Botões */}
            <div className='flex flex-row mx-[5%] gap-[5%]'>
                {CONTEUDOS.map((item, index) => ( //O map funciona como um loop que percorre cada item do array CONTEUDOS e retorna um botão para cada um, além disso pega o indice do item atual no array
                    <button 
                        key={item.id}
                        onClick={() => setAbaAtiva(index)} 
                        className={`flex-1 text-[#FFFFFF] text-[1rem] h-[8vh] rounded-[1rem] cursor-pointer duration-500 ease-in-out
                        ${abaAtiva === index ? 'bg-[#F1863D]' : 'bg-[#162B3F] hover:bg-[#F1863D]'}`}
                    >
                        {item.titulo}
                    </button>
                ))}
            </div>

            <div className='mx-[10%] my-[2%] bg-[#162B3F] flex flex-row h-[50vh] rounded-[1rem] relative overflow-hidden'>
                <div className='w-[45%]'>
                    <div className=' ml-[5%] flex items-center justify-center h-[100%]'>
                        <Image
                            src={CONTEUDOS[abaAtiva].imagem} 
                            alt={CONTEUDOS[abaAtiva].titulo}
                            width={800}
                            height={800}
                            className={`w-[50vh] h-auto border p-[1%] border-[#F1863D] border-[0.2rem] z-10 ${CONTEUDOS[abaAtiva].escala}`}
                        />
                    </div>
               
                    {/* <div className=''>
                        <Image src="/circuitoorange.svg" alt="Circuitos" width={100} height={100} className='absolute w-[2.5vh] h-auto object-cover z-0 rotate-270 top-1/2 -translate-y-1/2 left-[11%]' />
                        <Image src="/circuitoorange.svg" alt="Circuitos" width={100} height={100} className='absolute w-[2.5vh] h-auto object-cover z-0 rotate-0 top-0 left-[22%]' />
                        <Image src="/circuitoorange.svg" alt="Circuitos" width={100} height={100} className='absolute w-[2.5vh] h-auto object-cover z-0 rotate-180 bottom-0 left-[25%]' />
                        <Image src="/circuitoorange.svg" alt="Circuitos" width={100} height={100} className='absolute w-[2.5vh] h-auto object-cover z-0 rotate-90 top-1/2 -translate-y-1/2 left-[35%]' />
                    </div> */}
                </div>

                
                <div className='w-[45%] mx-[5%] flex flex-col justify-center items-center'>
                    <h3 className='text-[#FFFFFF] text-[2rem] font-bold'>
                        {CONTEUDOS[abaAtiva].titulo}
                    </h3>
                    <p className='text-[#FFFFFF] text-center my-[3%]'>
                        {CONTEUDOS[abaAtiva].descricao}
                    </p>
                    <Link className='flex bg-[#F1863D] text-[#FFFFFF] text-[1rem] h-[5vh] w-[25vh] mt-[2%] rounded-[1rem] text-center items-center justify-center hover:bg-[#162B3F] cursor-pointer duration-500 ease-in-out' href={CONTEUDOS[abaAtiva].href}>
                        SAIBA MAIS
                    </Link>
                </div>
            </div>
        </div>
    );
}