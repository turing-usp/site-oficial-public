"use client";
import { useState } from "react";

export default function CTT(dados: any) {
    const [isselected, setIsSelected] = useState(false);
    const [abaselect, setAbaselect] = useState<"comercial" | "turing" | null>(null);
    const [cttfocado, setCttfocado] = useState<any | null>(null);
    const dadostt = dados?.dados || {};
    const handleSelect = (base: "comercial" | "quero ser turing") => {
        setAbaselect(base === "comercial" ? "comercial" : "turing");
        setIsSelected(true);
    }
    const cttexibidos = dadostt.filter((item: any) => {
        if (abaselect === "comercial") {
            return item.is_comercial == true;    
        }
        else{
            return item.is_comercial == false;
        }
    })

    // Agora vamos deixar pesquisar funcional, filtrando os contatos exibidos com base no nome ou email
    const [searchTerm, setSearchTerm] = useState("");
        const filteredCttexibidos = cttexibidos.filter((contato: any) => {
        const nomeMatch = contato.nome.toLowerCase().includes(searchTerm.toLowerCase());
        const emailMatch = contato.email.toLowerCase().includes(searchTerm.toLowerCase());
        return nomeMatch || emailMatch;
    });

    // Função para lidar com o clique em um contato e mostrar os detalhes
    const handleContatoClick = (contato: any) => {
        setCttfocado(contato);
    };

    return (
        <>
            <div className="flex items-start h-screen">
                    <div className="flex-col w-[20%] h-auto">
                        <h1 className="text-white text-[1.5rem] text-center my-[3%] font-bold">Contatos:</h1>
                        <div >
                            <div className={`flex w-full my-[5%] h-[12vh] border border-gray-700 rounded-[0.5rem] ${abaselect === "turing" ? "bg-[#F1863D]" : ""} hover:bg-[#F1863D] cursor-pointer`} onClick={() => handleSelect("quero ser turing")}>
                                <div className="flex w-[90%] mx-[5%] items-center justify-center">  
                                    <p className="text-white">Quero ser Turing</p>
                                    <p className="text-white ml-[5%]">&gt;</p>
                                </div>
                            </div>
                            <div className={`flex w-full my-[5%] h-[12vh] border border-gray-700 rounded-[0.5rem] ${abaselect === "comercial" ? "bg-[#F1863D]" : ""} hover:bg-[#F1863D] cursor-pointer`} onClick={() => handleSelect("comercial")}>
                                <div className="flex w-[90%] mx-[5%] items-center justify-center">  
                                    <p className="text-white">Comercial</p>
                                    <p className="text-white ml-[5%]">&gt;</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-full ml-[2%] w-[0.2%] bg-gray-700"></div>
                    <div className="flex flex-col flex-1 h-full p-8"> 
                    <div className="w-full flex justify-center mb-8">
                        <input
                            type="text"
                            placeholder="Pesquisar contatos"
                            className="w-full max-w-xl text-center py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                            value={searchTerm || ""}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex-col">
                        {cttfocado ? (
                            <div className="flex flex-col animate-in fade-in duration-300">
                            <button 
                                onClick={() => setCttfocado(false)} 
                                className="mb-6 text-[#F1863D] hover:underline flex items-center gap-2 w-fit"
                            >
                                ← Voltar para a lista
                            </button>
                            
                            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
                                <h2 className="text-white text-2xl font-bold mb-4">Detalhes do Contato</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-400">Nome: <span className="text-white">{cttfocado.nome}</span></p>
                                    <p className="text-gray-400">Email: <span className="text-white">{cttfocado.email}</span></p>
                                    <p className="text-gray-400">Curso: <span className="text-white">{cttfocado.curso || "Não informado"}</span></p>
                                    <p className="text-gray-400">Ano de entrada: <span className="text-white">{cttfocado.ano_entrada || "Não informado"}</span></p>
                                    <p className="text-gray-400">Telefone: <span className="text-white">{cttfocado.telefone || "Não informado"}</span></p>
                                    <p className="text-gray-400">Áreas de interesse: <span className="text-white">{cttfocado.areasDeInteresse || "Não informado"}</span></p>
                                    <p className="text-gray-400">Tipo de Projeto: <span className="text-white">{cttfocado.tipoDeProjeto || "Não informado"}</span></p>
                                    <div className="mt-6 p-4 bg-gray-900 rounded border border-gray-600">
                                        <p className="text-gray-400 text-sm mb-2 uppercase">Mensagem/Conteúdo:</p>
                                        <p className="text-white">
                                            {cttfocado.mensagem || "Nenhuma mensagem fornecida."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) : (
                            isselected && filteredCttexibidos.map((contato: any, index: number) => (
                                <button key={index} className="flex flex-col my-[1%] rounded-[0.5rem] p-4 w-full bg-gray-700 cursor-pointer hover:bg-gray-600 transition-colors duration-200" onClick={() => handleContatoClick(contato)}>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-gray-400 text-xs uppercase font-bold">Nome:</p>
                                            <p className="text-white">{contato.nome}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs uppercase font-bold">Email:</p>
                                            <p className="text-white">{contato.email}</p>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}