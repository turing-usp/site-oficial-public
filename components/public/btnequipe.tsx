"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

interface MembroEquipe {
    id: number;
    nome: string;
    areas_formatadas?: Record<string, string>;
    redes_sociais?: Record<string, string>;
    avatar_url?: string;
    [key: string]: any;
}

interface BotoesnavProps {
    equipe: MembroEquipe[];
    historico: MembroEquipe[];
}


export default function Botoesnav({ equipe, historico }: BotoesnavProps) {
    const [abaAtiva, setAbaAtiva] = useState(0);
    const [areaEspecificaSelecionada, setAreaEspecificaSelecionada] = useState<number | null>(null);
    
    const Categorias = ["TODOS", "ÁREAS DE FOCO", "ÁREAS DE GESTÃO","EMÉRITOS"];
    
    const area_de_foco = [
        { nome: "Visão Computacional", id: 7, sigla: "CompV", logo: "/cv.svg", descricao: "Exploramos técnicas avançadas para permitir que as máquinas interpretem e compreendam imagens e vídeos, possibilitando aplicações inovadoras em diversas áreas." },
        { nome: "Processamento de Linguagem Natural", id: 3, sigla: "NLP", logo: "/nlp.svg", descricao: "Fazemos a comunicação entre as máquinas e os humanos. Por meio de números e letras mapeamos e interpretamos a linguagem natural para a construção de ferramentas como chatbots e assistentes virtuais." },
        { nome: "Finanças Quantitativas", id: 4, sigla: "Quant", logo: "/quant.svg", descricao: "A junção da área Tech com finanças para desenvolver modelos e algoritmos que otimizam investimentos e gerenciam riscos financeiros." },
        { nome: "Data Science", id: 5, sigla: "DS", logo: "/ds.svg", descricao: "Somos verdadeiros analistas de dados e buscamos extrair insights valiosos para orientar decisões estratégicas e impulsionar o sucesso dos nossos projetos." },
        { nome: "Aprendizado por Reforço", id: 6, sigla: "RL", logo: "/rl.svg", descricao: "Como um minotauro em um labirinto, a equipe de RL busca saídas para a conexão entre inteligência artificial e software para a produção de ferramentas inovadoras como robôs e algoritmos que aprendem com a experiência." }
    ];
    
    const area_de_gestao = [
        { nome: "RH", id: 0, sigla: "RH", logo: "/rh.svg", descricao: "Gestão de emoções e pessoas não é uma tarefa fácil, mas nossa equipe de RH está aqui para garantir um ambiente de trabalho saudável e produtivo para todos." },
        { nome: "Marketing", id: 1, sigla: "Marketing", logo: "/mkt.svg", descricao: "Criativos e inovadores, a equipe de marketing é responsável por promover a marca e os produtos da empresa, utilizando estratégias inovadoras para alcançar o público-alvo." },
        { nome: "Estratégia", id: 2, sigla: "Estratégia", logo: "/estrategia.svg", descricao: "Como bons enxadristas, os membros de estratégia devem ser responsáveis por analisar estratégias e formas de ganhar um jogo. Somos responsáveis pelo planejamento e direcionamento estratégico da equipe com empresas e com a própria equipe." }
    ];

    const areas = [...area_de_foco, ...area_de_gestao];
    const areaPorSigla = Object.fromEntries(areas.map(area => [area.sigla, area]));

    const handleCategoriaClick = (index: number) => {
        setAbaAtiva(index);
        setAreaEspecificaSelecionada(null);
    };

    const equipeFiltrada = useMemo(() => {
    let is_equipe = true;

    if (abaAtiva === 0) {
        return { dados: equipe, is_equipe };
    } 
    
    if (abaAtiva === 1) {
        if (areaEspecificaSelecionada === null) return { dados: [], is_equipe }; 
        const areaSelecionada = area_de_foco.find(area => area.id === areaEspecificaSelecionada);
        if (!areaSelecionada) return { dados: [], is_equipe }; 
        
        const areaKey = areaSelecionada.sigla;
        const filtrados = equipe.filter(membro => !!membro.areas_formatadas && areaKey in membro.areas_formatadas);
        return { dados: filtrados, is_equipe };
    } 

    if (abaAtiva === 2) {
        if (areaEspecificaSelecionada === null) return { dados: [], is_equipe };
        const areaSelecionada = area_de_gestao.find(area => area.id === areaEspecificaSelecionada);
        if (!areaSelecionada) return { dados: [], is_equipe }; 
        
        const areaKey = areaSelecionada.sigla;
        const filtrados = equipe.filter(membro => !!membro.areas_formatadas && areaKey in membro.areas_formatadas);
        return { dados: filtrados, is_equipe };
    }

    if (abaAtiva === 3) {
        return { dados: historico, is_equipe: false };
    }

    return { dados: equipe, is_equipe: true };
    }, [abaAtiva, areaEspecificaSelecionada, equipe, historico]);
    return(
    <>
        <div className="flex flex-col h-auto w-[100%]">
            <div className="flex flex-col mx-[5%] my-[5%] object-contain">
                {/* Botões de Categorias */}
                <div className="flex flex-row w-full items-center overflow-x-auto overflow-y-hidden no-scrollbar">
                    {Categorias.map((categoria, index) => (
                        <button
                            key={`categoria-${categoria}`}
                            onClick={() => handleCategoriaClick(index)}
                            className={`whitespace-nowrap min-w-fit mx-[4%] my-[2%] text-[#000000] flex-nowrap text-[0.8rem] md:text-[1.5rem] px-6 h-[4rem] md:flex-1 md:h-[4rem] lg:h-[8vh] rounded-[1rem] border border-[#F1863D] cursor-pointer duration-500 ease-in-out ${
                                abaAtiva === index
                                ?  'bg-[#F1863D] text-[#FFFFFF]' : 'bg-[#FFFFFF] hover:bg-[#F1863D] hover:text-[#FFFFFF]'
                            }`}
                        >
                            {categoria}
                        </button>
                    ))}
                </div>

                {/* Botões de Áreas - Só aparece se TODOS não estiver selecionado */}
                {abaAtiva !== 0 && (
                    <div className="flex flex-row w-full items-center lg:justify-between overflow-x-auto lg:overflow-x-hidden no-scrollbar">
                        {(abaAtiva === 1 || abaAtiva === 2) && (
                            (abaAtiva === 1 ? area_de_foco : area_de_gestao).map((area) => (
                            <button
                                key={area.id}
                                onClick={() => setAreaEspecificaSelecionada(area.id)}
                                className={`
                                mx-2 my-4 px-10 md:px-4 
                                h-[4rem] md:h-[4rem] 
                                flex-none md:flex-1 md:basis-0 
                                text-[0.8rem] md:text-[1rem] lg:text-[1.1rem]
                                rounded-[1rem] border border-[#F1863D] 
                                cursor-pointer duration-500 ease-in-out
                                ${areaEspecificaSelecionada === area.id
                                    ? 'bg-[#F1863D] text-[#FFFFFF]'
                                    : 'bg-[#FFFFFF] text-[#000000] hover:bg-[#F1863D] hover:text-[#FFFFFF]'
                                }
                                `}
                            >
                                {area.nome}
                            </button>
                            ))
                        )}

                        {/* Mensagem específica para Eméritos */}
                        {abaAtiva === 3 && (
                            <p className="mx-[2%] my-[5%] text-[#000000] text-[0.9rem] lg:text-[1.2rem] flex-1 h-[8vh] flex items-center justify-center italic text-center">
                                Nosso agradecimento eterno a todos os membros que fizeram parte da nossa jornada e contribuíram para o crescimento e sucesso da equipe. Vocês sempre farão parte da nossa história e do nosso coração.
                            </p>
                        )}
                    </div>
                )}
                {abaAtiva !== 0 && areaEspecificaSelecionada !== null && (
                    <div className="flex h-auto min-h-[10vh] w-[100%] items-center justify-center mt-[3%]">
                        <div className="flex flex-col md:flex-row mx-[5%] object-contain items-center justify-center">
                            <div className="flex w-[40%] items-center justify-center">
                                <Image 
                                    src={(() => {
                                        const areaSelecionada = (abaAtiva === 1 ? area_de_foco : area_de_gestao)
                                            .find(area => area.id === areaEspecificaSelecionada);
                                        return areaSelecionada?.logo || "/logo.svg";
                                    })()}
                                    alt="Logo da Área"
                                    width={100}
                                    height={100}
                                    className="h-[10vh] w-auto object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-[1.2rem] italic">
                                    {(() => {
                                        const areaSelecionada = (abaAtiva === 1 ? area_de_foco : area_de_gestao)
                                            .find(area => area.id === areaEspecificaSelecionada);
                                        return areaSelecionada?.nome || "";
                                    })()}
                                </p>
                                <p className="text-gray-400 text-[0.9rem] text-lg italic">{(() => {
                                        const areaSelecionada = (abaAtiva === 1 ? area_de_foco : area_de_gestao)
                                            .find(area => area.id === areaEspecificaSelecionada);
                                        return areaSelecionada?.descricao || "";
                                    })()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Grid de Membros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-[5%] pb-[10%]">
                {equipeFiltrada && equipeFiltrada.dados.length > 0 ? (
                    equipeFiltrada.dados.map((membros, index) => (
                        <div
                            key={`membro-${membros.id}-${index}`}
                            className="group relative flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            {/* Emblemas das Áreas - Posicionados no canto superior esquerdo */}
                            {membros.areas_formatadas && (
                                <div className="absolute top-2 left-2 flex flex-col">
                                    {Object.keys(membros.areas_formatadas).map((sigla) => (
                                        <div
                                            key={`emblema-${membros.id}-${sigla}`}
                                            className="relative flex items-center justify-center h-auto w-auto min-w-14 min-h-10"
                                            title={areaPorSigla[sigla]?.nome || sigla}
                                        >
                                            {membros.areas_formatadas?.[sigla] === "Diretor" && equipeFiltrada.is_equipe && (
                                                <Image
                                                    src={"/diretor.svg"}
                                                    alt="Diretor"
                                                    width={20}
                                                    height={20}
                                                    className="absolute h-9 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                                                />
                                            )}
                                            {membros.areas_formatadas?.[sigla] === "Vice-Diretor" && equipeFiltrada.is_equipe && (
                                                <Image
                                                    src={"/vicediretor.svg"}
                                                    alt="Vice-Diretor"
                                                    width={20}
                                                    height={20}
                                                    className="absolute h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                                                />
                                            )}
                                            {membros.areas_formatadas?.[sigla] === "Diretor" && !equipeFiltrada.is_equipe && (
                                                <Image
                                                    src={"/safira.svg"}
                                                    alt="Emérito"
                                                    width={20}
                                                    height={20}
                                                    className="absolute h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                                                />
                                            )}
                                            {membros.areas_formatadas?.[sigla] === "Vice-Diretor" && !equipeFiltrada.is_equipe && (
                                                <Image
                                                    src={"/safira.svg"}
                                                    alt="Emérito"
                                                    width={20}
                                                    height={20}
                                                    className="absolute h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                                                />
                                            )}
                                            {  (
                                            <Image
                                                src={areaPorSigla[sigla]?.logo}
                                                alt={sigla}
                                                width={16}
                                                height={16}
                                                className="relative h-5 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                                            />
                                            )}
                                            
                                        </div>
                                    ))}
                                </div>
                            )}
        
                            {/* Container da Imagem */}
                            <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-[#F1863D]">
                                <Image
                                    src={membros.avatar_url || "/avatar.svg"}
                                    alt={membros.nome}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Info do Membro */}
                            <h3 className="text-xl font-bold text-gray-800 text-center uppercase tracking-tight">
                                {membros.nome}
                            </h3>
                            <p className="text-[#F1863D] font-medium text-sm">
                            {(() => {
                                // 1. Se estiver na aba de Eméritos, define como Ex-Membro
                                if (abaAtiva === 3) return "Ex-Membro";

                                // 2. Se for a aba "Todos" ou se nenhuma área específica foi clicada
                                if (abaAtiva === 0 || areaEspecificaSelecionada === null) return "Membro";

                                // 3. Se houver uma área selecionada, busca o cargo específico
                                const listaAreas = abaAtiva === 1 ? area_de_foco : area_de_gestao;
                                const areaSelecionada = listaAreas.find(a => a?.id === areaEspecificaSelecionada);
                                
                                // Retorna o cargo (Diretor, Vice, etc) ou "Membro" por padrão
                                // Certifique-se de usar o nome da variável do seu .map (ex: membro)
                                return membros.areas_formatadas?.[areaSelecionada?.sigla || ""] || "Membro";
                            })()}
                            </p>
                            <div className="flex flex-row w-[100%] items-center justify-center">
                                <div className="relative flex">
                                    <Link href={membros.redes_sociais?.linkedin || "#"} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src="/linkedin.svg"
                                            alt="LinkedIn"
                                            width={20}
                                            height={20}
                                            className="flex flex-1 object-contain h-8 w-auto"
                                        />
                                    </Link>
                                    <Link href={membros.redes_sociais?.github || "#"} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src="/github.svg"
                                            alt="GitHub"
                                            width={20}
                                            height={20}
                                            className="flex flex-1 object-contain h-8 w-auto mx-[10%]"
                                        />
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                        <p className="text-gray-400 text-lg italic">
                            {abaAtiva === 0 
                                ? "Nenhum membro cadastrado." 
                                : areaEspecificaSelecionada === null
                                    ? "Selecione uma sub-área para ver os membros."
                                    : "Nenhum membro nesta área."}
                        </p>
                    </div>
                    
                )

                
                
                }

            </div>
        </div>
    </>
    );
}