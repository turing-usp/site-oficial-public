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
            <div className="min-h-[60dvh] py-20 lg:h-[100vh] flex flex-row w-[100%]">
                <div className="flex-col mx-[10%]   lg:mt-0 flex flex-col lg:mx-[20%] items-center justify-center text-center gap-[2rem]">
                    <p className="text-[0.9rem] lg:text-[1.5rem] text-[#766F6F] font-bold">NOSSOS PROJETOS</p>
                    <p className="text-[2rem] lg:text-[4rem] font-bold text-[#000000]">O FUTURO, PROJETO A PROJETO</p>
                    <p className="text-[0.9rem] lg:text-[1.5rem] text-[#000000] text-center">Conheça as iniciativas e tecnologias que desenvolvemos no Turing USP para moldar o amanhã da inteligência artificial.</p>
                </div>
                <Image
                    src="/projimgd.svg"
                    alt="Projetos"
                    width={800}
                    height={800}
                    className="w-[15%] mt-[30%] h-auto max-lg:landscape:mt-0 lg:mt-[5%] lg:w-[35vh] absolute h-auto object-contain right-0"
                />
                <Image
                    src="/projimge.svg"
                    alt="Projetos"
                    width={800}
                    height={800}
                    className="w-[15%] mt-[40%] h-auto max-lg:landscape:mt-0 lg:mt-[10%] lg:w-[35vh] absolute h-auto object-contain object-fill rotate-180 left"
                />
            </div>
            <div className="flex flex-col w-[100%] h-auto min-h-[80vh]">
                <div className="flex flex-col mx-[5%]">
                    <div className="flex flex-row w-[100%] justify-center items-center">
                        {Categorias.map((categoria) => (
                            <button
                                key={categoria}
                                onClick={() => setAbaAtiva(Categorias.indexOf(categoria))}
                                className={`w-[40vw] text-[0.8rem]   lg:text-[1.5rem] mx-[5%] my-[2%] text-[#000000]  lg:w-[20vw] h-[8vh] rounded-[1rem] border border-[#F1863D] cursor-pointer duration-500 ease-in-out
                                    ${abaAtiva === Categorias.indexOf(categoria) ? 'bg-[#F1863D] text-[#FFFFFF]' : 'bg-[#FFFFFF] hover:bg-[#F1863D] hover:text-[#FFFFFF]'}`}
                            >
                                {categoria}
                            </button>
                        ))
                        }
                    </div>
                    <div className="
                        /* Mobile: Scroll horizontal com tamanho fixo para não esmagar */
                        flex flex-row overflow-x-auto gap-4 px-6 py-4 no-scrollbar
                        
                        /* Desktop: Distribuição automática (flex-1) */
                        lg:flex-row lg:flex-wrap lg:justify-center lg:overflow-x-visible lg:px-0 
                    ">
                        {(abaAtiva === 0 ? ÁREAS_DE_FOCO : ÁREAS_DE_GESTÃO).map((area, index) => (
                            <button
                                key={area.nome}
                                onClick={() => setSubAbaAtiva(index)}
                                className={`
                                    /* MOBILE: Tamanho fixo para garantir o scroll e leitura */
                                    flex-none w-[160px] h-[60px]
                                    
                                    /* DESKTOP: Vira flex-1 para ocupar o espaço proporcionalmente */
                                    lg:flex-1 lg:h-[70px]
                                    
                                    /* Alinhamento e Texto */
                                    flex items-center justify-center text-center px-2
                                    text-[0.7rem] lg:text-[1.2rem] font-medium leading-tight whitespace-normal
                                    
                                    /* Estilo Visual */
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
                            <div className=" lg:h-[20vh] flex flex-row items-center justify-center group-hover:bg-[#F5F5F5] group-hover:scale-103 duration-500 ease-in-out">
                                <div className="flex flex-row h-[20vh] items-center justify-center mx-[5%]">
                                    <Image
                                        alt="Em breve"
                                        src={projeto.imagem}
                                        width={800}
                                        height={800}
                                        className="w-[8rem] lg:w-[12rem] h-auto object-contain"
                                    />
                                    <div className="flex flex-col mx-[10%]">
                                        <p className="text-[0.8rem] lg:text-[2rem] text-[#000000] font-bold">{projeto.titulo}</p>
                                        <p className="text-[0.5rem] lg:text-[1rem] text-[#000000]">{projeto.resumo}</p>
                                    </div>
                                    <div className="hidden lg:flex bg-transparent text-[#000000] text-[1rem] h-[5vh] w-[12vw] rounded-[1rem] text-center items-center justify-center border-[0.1rem] border-[#F1863D] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer duration-500 ease-in-out">
                                        Veja mais
                                    </div>
                                </div>
                            </div>

                        </Link>
                    ))}
                    {/* <div className="flex bg-[#000000] h-[0.05rem] w-[100%] object-contain"></div> */}
                </div>
                <div className="min-h-[5dvh] py-8 lg:h-[30vh] flex flex-row justify-center items-center w-[100%]">
                    <Image
                        alt="Em breve"
                        src="/logo.svg"
                        width={800}
                        height={800}
                        className="w-[6rem] lg:w-[8rem] h-auto object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
