"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

type Projeto = {
    id: string;
    slug: string;
    area: string[];
    titulo: string;
    resumo: string;
    parceiros?: string;
    imagem: string;
    cat?: any;
    problema?: string;
    confeccao?: string;
    resultados?: string;
    anoinicio?: number;
    anofim?: number;
}

export default function Lista_Projetos({ projetosIniciais }: { projetosIniciais?: Projeto[] }) {
    const Categorias = ["ÁREAS DE FOCO", "ÁREAS DE GESTÃO"]
    const [abaAtiva, setAbaAtiva] = useState(0);
    const [subAbaAtiva, setSubAbaAtiva] = useState(0);
    const ÁREAS_DE_FOCO = [
        {
            nome: "Processamento de Linguagem Natural",
            id: "3"
        },
        {
            nome: "Finanças Quantitativas",
            id: "4"
        },
        {
            nome: "Data Science",
            id: "5"
        },
        {
            nome: "Aprendizado por Reforço",
            id: "6"
        },
        {
            nome: "Visão Computacional",
            id: "7"
        }
    ]
    const ÁREAS_DE_GESTÃO = [
        {
            nome: "Recursos Humanos",
            id: "0"
        },
        {
            nome: "Marketing",
            id: "1"
        },
        {
            nome: "Estratégia",
            id: "2"
        }
    ]

    // Resetar subAbaAtiva quando abaAtiva mudar
    useEffect(() => {
        setSubAbaAtiva(0);
    }, [abaAtiva]);

    const subAreasAtuais = (abaAtiva === 0 ? ÁREAS_DE_FOCO : ÁREAS_DE_GESTÃO);
    const idSubAreaAtiva = subAreasAtuais[subAbaAtiva]?.id;

    const projetosFiltrados = (projetosIniciais ?? []).filter((projeto: Projeto) => {
        const area = typeof projeto.area === "string" ? JSON.parse(projeto.area) : projeto.area;
        return area?.includes(idSubAreaAtiva);
    });

    return (
        <div>
            <div className="min-h-[60dvh] py-20 xl:h-[100vh] flex flex-row w-[100%]">
                <div className="flex-col mx-[10%]   xl:mt-0 flex flex-col xl:mx-[20%] items-center justify-center text-center gap-[2rem]">
                    <p className="text-[0.9rem] md:text-[1.2rem] lg:text-[1.5rem] text-[#766F6F] font-bold">NOSSOS PROJETOS</p>
                    <p className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold text-[#000000]">O FUTURO, PROJETO A PROJETO</p>
                    <p className="text-[0.9rem] md:text-[1.2rem] lg:text-[1.5rem] text-[#000000] text-center">Conheça as iniciativas e tecnologias que desenvolvemos no Turing USP para moldar o amanhã da inteligência artificial.</p>
                </div>
                <Image
                    src="/projimgd.svg"
                    alt="Projetos"
                    width={800}
                    height={800}
                    className="w-[15%] mt-[30%] h-auto md:mt-[20%] max-xl:landscape:mt-0 xl:mt-[5%] xl:w-[35vh] absolute h-auto object-contain right-0"
                />
                <Image
                    src="/projimge.svg"
                    alt="Projetos"
                    width={800}
                    height={800}
                    className="w-[15%] mt-[40%] h-auto md:mt-[25%] max-xl:landscape:mt-0 xl:mt-[10%] xl:w-[35vh] absolute h-auto object-contain object-fill rotate-180 left"
                />
            </div>
            <div className="flex flex-col w-[100%] h-auto min-h-[80vh]">
                <div className="flex flex-col mx-[5%]">
                    <div className="flex flex-row w-[100%] justify-center items-center">
                        {Categorias.map((categoria) => (
                            <button
                                key={categoria}
                                onClick={() => setAbaAtiva(Categorias.indexOf(categoria))}
                                className={`w-[40vw] text-[0.8rem] h-[4rem] md:text-[1rem] xl:text-[1.5rem] mx-[5%] my-[2%] text-[#000000] xl:w-[20vw] rounded-[1rem] border border-[#F1863D] cursor-pointer duration-500 ease-in-out
                                    ${abaAtiva === Categorias.indexOf(categoria) ? 'bg-[#F1863D] text-[#FFFFFF]' : 'bg-[#FFFFFF] hover:bg-[#F1863D] hover:text-[#FFFFFF]'}`}
                            >
                                {categoria}
                            </button>
                        ))
                        }
                    </div>
                    <div className="
                        flex flex-row overflow-x-auto gap-4 px-6 py-4 no-scrollbar
                        xl:flex-row xl:flex-wrap xl:justify-center xl:overflow-x-visible xl:px-0 
                    ">
                        {(abaAtiva === 0 ? ÁREAS_DE_FOCO : ÁREAS_DE_GESTÃO).map((area, index) => (
                            <button
                                key={area.nome}
                                onClick={() => setSubAbaAtiva(index)}
                                className={`
                                    flex-none w-[50%] h-[4rem] text-[0.8rem]
                                    md:text-[1rem] 
                                    lg:flex-1
                                    xl:flex-1 xl:h-[70px]
                                    flex items-center justify-center text-center px-2
                                    text-[0.7rem] xl:text-[1.2rem] font-medium leading-tight whitespace-normal
                                    rounded-[1rem] border border-[#F1863D] transition-all duration-300
                                    hover:cursor-pointer hover:bg-[#F1863D] hover:text-[#FFFFFF]
                                    ${subAbaAtiva === index 
                                        ? 'bg-[#F1863D] text-white' 
                                        : 'bg-white text-black hover:bg-[#F1863D] hover:text-white'}
                                `}
                            >
                                {area.nome}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col mt-[2%]">
                    {projetosFiltrados.map((projeto, index) => (
                        <Link href={`/projetos/${projeto.slug}`} className="group flex flex-col bg-[#FFFFFF] overflow-hidden hover: cursor-pointer" key={index}>
                            {/* <div className="flex bg-[#000000] h-[0.05rem] w-[100%] object-contain"></div> */}
                            <div className="min-h-[20vh] h-auto flex-col xl:h-[20vh] flex xl:flex-row items-center justify-center group-hover:bg-[#F5F5F5] group-hover:xl:scale-103 duration-500 ease-in-out">
                                <div className="flex flex-col xl:flex-row xl:h-[20vh] items-center justify-center mx-[5%]">
                                    <Image
                                        alt="Em breve"
                                        src={projeto.imagem}
                                        width={800}
                                        height={800}
                                        className="w-full h-[10rem] object-cover rounded rounded-md xl:w-[12rem] xl:rounded-none xl:h-auto xl:object-contain"
                                    />
                                    <div className="flex flex-col py-4 xl:py-0 xl:mx-[10%]">
                                        <p className="text-[1.1rem] md:text-[1.5rem] xl:text-[2rem] text-[#000000] font-bold">{projeto.titulo}</p>
                                        <p className="text-sm line-clamp-3 md:line-clamp-2 xl:text-[1rem] xl:line-clamp-none text-[#000000]">{projeto.resumo}</p>
                                    </div>
                                    <div className="hidden xl:flex bg-transparent text-[#000000] text-[1rem] h-[5vh] w-[12vw] rounded-[1rem] text-center items-center justify-center border-[0.1rem] border-[#F1863D] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer duration-500 ease-in-out">
                                        Veja mais
                                    </div>
                                </div>
                            </div>

                        </Link>
                    ))}
                    {/* <div className="flex bg-[#000000] h-[0.05rem] w-[100%] object-contain"></div> */}
                </div>
                <div className="min-h-[5dvh] py-8 xl:h-[30vh] flex flex-row justify-center items-center w-[100%]">
                    <Image
                        alt="Em breve"
                        src="/logo.svg"
                        width={800}
                        height={800}
                        className="w-[6rem] xl:w-[8rem] h-auto object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
