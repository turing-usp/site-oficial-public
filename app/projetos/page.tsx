"use client";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { projetosSimulados, Projeto } from "@/data/projetosDara";

export default function Projetos() {
    const Categorias = ["ÁREAS DE FOCO","ÁREAS DE GESTÃO"]
    const [abaAtiva, setAbaAtiva] = useState(0);
    const [subAbaAtiva, setSubAbaAtiva] = useState(0);
    const ÁREAS_DE_FOCO = [
        {
            nome: "Visão Computacional",
            id: "0"
        },
        {
            nome: "Processamento de Linguagem Natural",
            id: "1"
        },
        {
            nome: "Finanças Quantitativas",
            id: "2"
        },
        {
            nome: "Data Science",
            id: "3"
        },
        {
            nome: "Aprendizado por Reforço",
            id: "4"
        }
    ]
    const ÁREAS_DE_GESTÃO = [
        {
            nome: "Recursos Humanos",
            id: "5"
        },
        {   nome: "Marketing",
            id: "6"
        },
        {   nome: "Estratégia",
            id: "7"
        }
    ]
    
    // Resetar subAbaAtiva quando abaAtiva mudar
    useEffect(() => {
        setSubAbaAtiva(0);
    }, [abaAtiva]);

    const subAreasAtuais = (abaAtiva === 0 ? ÁREAS_DE_FOCO : ÁREAS_DE_GESTÃO);
    const idSubAreaAtiva = subAreasAtuais[subAbaAtiva]?.id;

    const projetosFiltrados: Projeto[] = projetosSimulados.filter((projeto: Projeto) => 
        projeto.area1.toString() === idSubAreaAtiva ||
        projeto.area2?.toString() === idSubAreaAtiva ||
        projeto.area3?.toString() === idSubAreaAtiva
    );

    return (
        <div>
                <div className="fixed top-0 left-0 right-0 z-10">
                    <Navbar />
                </div>
                <div className="flex flex-row h-[100vh] w-[100%]">
                    <div className="flex flex-col mx-[20%] items-center justify-center text-center gap-[2rem]">
                        <p className="text-[1.5rem] text-[#766F6F] font-bold">NOSSOS PROJETOS</p>
                        <p className="text-[4rem] font-bold text-[#000000]">O FUTURO, PROJETO A PROJETO</p>
                        <p className="text-[1.5rem] text-[#000000] text-center">Conheça as iniciativas e tecnologias que desenvolvemos no Turing USP para moldar o amanhã da inteligência artificial.</p>
                    </div>
                   <Image 
                      src="/projimgd.svg"
                        alt="Projetos"
                        width={800}
                        height={800}
                        className="absolute w-[35vh] h-auto object-contain right-0 mt-[10%]"
                   />
                   <Image 
                      src="/projimge.svg"
                        alt="Projetos"
                        width={800}
                        height={800}
                        className="absolute w-[35vh] h-auto object-contain object-fill rotate-180 left mt-[15%]"
                   />
                </div>
                <div className="flex flex-col w-[100%] h-auto min-h-[100vh]">
                    <div className="flex flex-col mx-[5%]">
                        <div className="flex flex-row w-[100%] justify-center items-center">
                            {Categorias.map((categoria) => (
                                <button 
                                    key={categoria}
                                    onClick={() => setAbaAtiva(Categorias.indexOf(categoria))}
                                    className={`mx-[5%] my-[2%] text-[#000000] text-[1.5rem] w-[20vw] h-[8vh] rounded-[1rem] border border-[#F1863D] cursor-pointer duration-500 ease-in-out
                                    ${abaAtiva === Categorias.indexOf(categoria) ? 'bg-[#F1863D] text-[#FFFFFF]' : 'bg-[#FFFFFF] hover:bg-[#F1863D] hover:text-[#FFFFFF]'}`}
                                >
                                    {categoria}
                                </button>
                            ))
                                }
                        </div>
                        <div className="flex flex-wrap justify-center items-center w-[100%]">
                            {/* Agora vamos criar um componente que caso seja área de foco vai criar 5 botões e caso seja área de gestão vai criar 3 botões */}
                            {(abaAtiva === 0 ? ÁREAS_DE_FOCO : ÁREAS_DE_GESTÃO).map((area) => (
                                <button
                                    key={area.nome}
                                    onClick ={() => setSubAbaAtiva((abaAtiva === 0 ? ÁREAS_DE_FOCO : ÁREAS_DE_GESTÃO).indexOf(area))}
                                    className={`mx-[2%] my-[1%] text-[#000000] text-[1rem] flex-1 h-[8vh] rounded-[1rem] border border-[#F1863D] cursor-pointer duration-500 ease-in-out
                                    ${subAbaAtiva === (abaAtiva === 0 ? ÁREAS_DE_FOCO : ÁREAS_DE_GESTÃO).indexOf(area) ? 'bg-[#F1863D] text-[#FFFFFF]' : 'bg-[#FFFFFF] hover:bg-[#F1863D] hover:text-[#FFFFFF]'}`}
                                >
                                    {area.nome}
                                </button>
                            ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col mt-[2%]"> 
                        {projetosFiltrados.map((projeto, index) => (
                            <Link href={`/projetos/${projeto.slug}`} className="group flex flex-col bg-[#FFFFFF] overflow-hidden hover: cursor-pointer">
                                <div key={index}>
                                        {/* <div className="flex bg-[#000000] h-[0.05rem] w-[100%] object-contain"></div> */}
                                        <div className="flex flex-row  h-[20vh] items-center justify-center group-hover:bg-[#F5F5F5] group-hover:scale-103 duration-500 ease-in-out">
                                            <div className="flex flex-row h-[20vh] items-center justify-center mx-[5%]">
                                                <Image
                                                    alt="Em breve"
                                                    src={projeto.nome_imagem}
                                                    width={800}
                                                    height={800}
                                                    className="w-[12rem] h-auto object-contain"
                                                />
                                                <div className="flex flex-col mx-[10%]">
                                                    <p className="text-[2rem] text-[#000000] font-bold">{projeto.titulo}</p>
                                                    <p className="text-[1rem] text-[#000000]">{projeto.resumo}</p>
                                                </div>
                                                <Link href={`/projetos/${projeto.slug}`} className="flex bg-transparent text-[#000000] text-[1rem] h-[5vh] w-[15vh] rounded-[1rem] text-center items-center justify-center border-[0.1rem] border-[#F1863D] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer duration-500 ease-in-out">
                                                    Veja mais
                                                </Link>
                                            </div>     
                                        </div>
                                </div>
                            </Link>
                        ))}
                        {/* <div className="flex bg-[#000000] h-[0.05rem] w-[100%] object-contain"></div> */}
                    </div>
                    <div className="flex flex-row justify-center items-center h-[30vh] w-[100%]">
                        <Image
                            alt="Em breve"
                            src="/logo.svg"
                            width={800}
                            height={800}
                            className="w-[8rem] h-auto object-contain"
                        />
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
    );
}