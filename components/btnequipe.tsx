"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

interface MembroEquipe {
    id: number;
    nome: string;
    cargo?: string;
    areas?: number;
    [key: string]: any;
}

interface BotoesnavProps {
    equipe: MembroEquipe[];
}

export default function Botoesnav({ equipe }: BotoesnavProps) {
    const [abaAtiva, setAbaAtiva] = useState(0);
    const [areaEspecificaSelecionada, setAreaEspecificaSelecionada] = useState<number | null>(null);
    
    const Categorias = ["TODOS", "ÁREAS DE FOCO", "ÁREAS DE GESTÃO"];
    
    const area_de_foco = [
        { nome: "Visão Computacional", id: 7,sigla:"CV" },
        { nome: "Processamento de Linguagem Natural", id: 3,sigla:"NLP" },
        { nome: "Finanças Quantitativas", id: 4,sigla:"QF" },
        { nome: "Data Science", id: 5,sigla:"DS" },
        { nome: "Aprendizado por Reforço", id: 6,sigla:"RL" }
    ];
    
    const area_de_gestao = [
        { nome: "RH", id: 0, sigla:"RH" },
        { nome: "Marketing", id: 1, sigla:"MK" },
        { nome: "Estratégia", id: 2, sigla:"EST"}
    ];

    const handleCategoriaClick = (index: number) => {
        setAbaAtiva(index);
        setAreaEspecificaSelecionada(null);
    };
    
    const equipeFiltrada = useMemo(() => {
        if (abaAtiva === 0) {
            // TODOS - sem filtro adicional
            return equipe;
        } else if (abaAtiva === 1) {
            // ÁREAS DE FOCO
            if (areaEspecificaSelecionada === null) {
                return null;
            } else {
                // Se uma área foi selecionada, filtrar por ela
                return equipe.filter(membro => membro.areas === areaEspecificaSelecionada);
            }
        } else if (abaAtiva === 2) {
            // ÁREAS DE GESTÃO
            if (areaEspecificaSelecionada === null) {
                return null;
            } else {
                // Se uma área foi selecionada, filtrar por ela
                return equipe.filter(membro => membro.areas === areaEspecificaSelecionada);
            }
        }
        return equipe;
    }, [abaAtiva, areaEspecificaSelecionada, equipe]);
    return(
    <>
        <div className="flex flex-col h-auto w-[100%]">
            <div className="flex flex-col mx-[5%] my-[5%] object-contain">
                {/* Botões de Categorias */}
                <div className="flex flex-row h-[8vh] w-[100%] items-center justify-center">
                    {Categorias.map((categoria, index) => (
                        <button
                            key={`categoria-${categoria}`}
                            onClick={() => handleCategoriaClick(index)}
                            className={`mx-[5%] my-[2%] text-[#000000] text-[1.5rem] flex-1 h-[8vh] rounded-[1rem] border border-[#F1863D] cursor-pointer duration-500 ease-in-out ${
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
                    <div className="flex flex-row h-[8vh] w-[100%] items-center justify-center mt-[3%]">
                        {(abaAtiva === 1 ? area_de_foco : area_de_gestao).map((area) => (
                            <button
                                key={area.id}
                                onClick={() => setAreaEspecificaSelecionada(area.id)}
                                className={`mx-[2%] my-[5%] text-[#000000] text-[1.2rem] flex-1 h-[8vh] rounded-[1rem] border border-[#F1863D] cursor-pointer duration-500 ease-in-out ${
                                    areaEspecificaSelecionada === area.id
                                    ? 'bg-[#F1863D] text-[#FFFFFF]'
                                    : 'bg-[#FFFFFF] text-[#000000] hover:bg-[#F1863D] hover:text-[#FFFFFF]'
                                }`}
                            >
                                {area.nome}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {/* Grid de Membros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-[5%] pb-[10%]">
                {equipeFiltrada && equipeFiltrada.length > 0 ? (
                    equipeFiltrada.map((membro) => (
                        <Link 
                            href={`/membro/${membro.id}`} 
                            key={membro.id}
                            className="group flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            {/* Container da Imagem */}
                            <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-[#F1863D]">
                                <Image
                                    src={membro.foto_perfil || "/avatar.svg"}
                                    alt={membro.nome}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Info do Membro */}
                            <h3 className="text-xl font-bold text-gray-800 text-center uppercase tracking-tight">
                                {membro.nome}
                            </h3>
                            <p className="text-[#F1863D] font-medium text-sm">
                                {membro.cargo || "Membro"}
                            </p>
                            
                            {/* Ano de Entrada (Histórico que criamos) */}
                            {membro.ano_entrada && (
                                <span className="text-gray-400 text-xs mt-2">
                                    Desde {membro.ano_entrada}
                                </span>
                            )}
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                        <p className="text-gray-400 text-lg italic">
                            {abaAtiva === 0 
                                ? "Nenhum membro cadastrado." 
                                : "Selecione uma sub-área para ver os membros."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    </>
    );
}