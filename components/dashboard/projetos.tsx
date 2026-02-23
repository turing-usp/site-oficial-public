"use client";
import Image from "next/image";
import { useState } from "react";
import { mandarforms } from "@/app/(dashboard)/plataforma/projetos/actions";

export default function proj(dados: any) {
    const dadosproj = dados?.dados || {};
    const [setpesquisa, setPesquisa] = useState("");

    const projetosExibidos = dadosproj.filter((projeto: any) => {
        const nomeMatch = projeto.titulo.toLowerCase().includes(setpesquisa.toLowerCase());
        return nomeMatch;
    });

    //SE o botão for clicado vamos tirar os projetos exibidos e o botão de adicionar projeto e o input e mostrar o formulário de criação de projeto, caso contrário, vamos mostrar os projetos exibidos, o botão de adicionar projeto e o input de pesquisa
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const handleNovoProjetoClick = () => {
        setMostrarFormulario(true);
    };
    const [itemAtual, setItemAtual] = useState("RH");
    // Vamos pegar o valor do select e guardar para colocar numa tag p para mostrarmos a area, um projeto pode ter no máximo 3 áreas
    const [areaSelect, setAreaSelect] = useState<string[]>([]);

    const adicionarArea = () => {
                    if(!areaSelect.includes(itemAtual) && areaSelect.length < 3) {
            setAreaSelect([...areaSelect, itemAtual]);
        }
    };

    const [links, setLinks] = useState<string[]>([]);
    const [linkAtual, setLinkAtual] = useState("");
    const adicionarLink = () => {        if(linkAtual && !links.includes(linkAtual)) {
            setLinks([...links, linkAtual]);
            setLinkAtual("");
        }
    };
    // Agora vamos fazer a lógica para pegar as fotos do projeto ou parceiros 
    const [fotoPrincipal, setFotoPrincipal] = useState<File | null>(null);
    const [previewPrincipal, setPreviewPrincipal] = useState<string | null>(null);

    const handleFotoPrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        
        if (file) {
            // Limpa a memória da prévia anterior se ela existir
            if (previewPrincipal) URL.revokeObjectURL(previewPrincipal);

            setFotoPrincipal(file);
            setPreviewPrincipal(URL.createObjectURL(file));
        }
    };
    const [fotoParceiros, setFotoParceiros] = useState<File | null>(null);
    const [previewParceiros, setPreviewParceiros] = useState<string | null>(null);

    const handleFotoParceirosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (previewParceiros) URL.revokeObjectURL(previewParceiros);
            setFotoParceiros(file);
            setPreviewParceiros(URL.createObjectURL(file));
        }
    };

    return (
    <>
        {mostrarFormulario ? (
        <form className="flex-col mx-[5%] w-[90%] h-auto" action={mandarforms} >
            <button 
                id="voltar_projetos" 
                className="mb-6 text-[#F1863D] hover:underline flex items-center gap-2 w-fit cursor-pointer"
                onClick={() => setMostrarFormulario(false)}
            >
                ← Voltar para a lista
            </button>
            <h2 className="text-white text-xl font-bold my-[2%]">Formulário de Criação de Projeto:</h2>
            <label className="text-white mt-4">Título do Projeto:</label>
            <input
                required
                id="titulo"
                name="titulo"
                type="text"
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
            />
            <label className="text-white">Slug (rota) do projeto:</label>
            <input
                required
                id="slug"
                name="slug"
                type="text"
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
            />
            <label className="text-white">Resumo do Projeto:</label>
            <textarea
                required
                id="resumo"
                name="resumo"
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                rows={3}
            />
            <label className="text-white">Problema:</label>
            <textarea
                required
                id="problema"
                name="problema"
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                rows={3}
            />
            <label className="text-white">Confecção:</label>
            <textarea
                required
                id="confeccao"
                name="confeccao"
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                rows={3}
            />
            <label className="text-white">Resultados:</label>
            <textarea
                required
                id="resultado"
                name="resultado"
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                rows={3}
            />
            <div className="flex-col">
                <div className="flex items-start justify-start my-[2%]">
                    <button type="button" className="bg-[#31a039] hover:bg-[#31a039]/90 text-white font-bold py-2 cursor-pointer px-4 rounded-full" onClick={adicionarArea}>Adicionar Área</button>
                    <button type="button" className="bg-[#9c2e41] hover:bg-[#9c2e41]/90 text-white font-bold py-2 cursor-pointer px-4 rounded-full ml-[2%]" onClick={() => setAreaSelect([])}>Limpar Áreas</button>
                </div>
                <select onChange={(e) => setItemAtual(e.target.value)} className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]" >
                    <option value="RH">RH</option>
                    <option value="Estratégia">Estratégia</option>
                    <option value="Marketing">Marketing</option>
                    <option value="NLP">NLP</option>
                    <option value="Quant">Quant</option>
                    <option value="DS">DS</option>
                    <option value="RL">RL</option>
                    <option value="Comp. V.">Comp. V.</option>
                </select>
                <p className="text-white"><span className="text-gray-400">Áreas:</span> {areaSelect.join(', ')}</p>
                <input id="areas" type="hidden" name="areas" value={areaSelect.join(', ')} />
            </div>
            <div className="flex my-[3%]">
                <div className="flex-1">
                    <label className="text-white">Categoria 1:</label>
                    <input
                        name="cat1"
                        id="cat1"
                        required
                        type="text"
                        className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                    />
                </div>
                <div className="flex-1 ml-[2%]">
                    <label className="text-white">Categoria 2:</label>
                    <input
                        name="cat2"
                        id="cat2"
                        type="text"
                        className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                    />
                </div>
                <div className="flex-1 ml-[2%]">
                    <label className="text-white">Categoria 3:</label>
                    <input
                        id="cat3"
                        name="cat3"
                        type="text"
                        className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                    />
                </div>
            </div>
            <div className="flex my-[3%]">
                <div className="flex-1">
                    <label className="text-white">Ano de Início</label>
                    <input
                        required
                        id="ano_inicio"
                        name="ano_inicio"
                        type="text"
                        className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                    />
                </div>
                <div className="flex-1 ml-[2%]">
                    <label className="text-white">Ano de Término</label>
                    <input
                        required
                        id="ano_termino"
                        name="ano_termino"
                        type="text"
                        className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                    />
                </div>
            </div>
            <div className="flex-col">
                <div className="flex items-start justify-start my-[2%]">
                    <button type="button" className="bg-[#31a039] hover:bg-[#31a039]/90 text-white font-bold py-2 cursor-pointer px-4 rounded-full" onClick={adicionarLink}>Adicionar Link</button>
                    <button type="button" className="bg-[#9c2e41] hover:bg-[#9c2e41]/90 text-white font-bold py-2 cursor-pointer px-4 rounded-full ml-[2%]" onClick={() => setLinks(links.slice(0, -1))}>Limpar último link</button>
                </div>
                <label className="text-white">Links:</label>
                <input
                    type="text"
                    className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                    value={linkAtual}
                    onChange={(e) => setLinkAtual(e.target.value)}
                />
                <p className="text-white my-[1%]"><span className="text-gray-400">Links adicionados:</span> {links.join(', ')}</p>
                <input id="links" type="hidden" name="links" value={links.join(', ')} />
            </div>
            <div className="flex">
                <div className="flex-1">
                    <input 
                        required
                        name="foto_principal"
                        accept="image/jpeg" 
                        type="file" 
                        id="foto_principal" 
                        className="hidden" 
                        onChange={handleFotoPrincipalChange} 
                    />
                    <button 
                        type="button"
                        className="bg-[#008FF8] hover:bg-[#008FF8]/90 text-white font-bold py-2 px-4 rounded-full cursor-pointer" 
                        onClick={() => document.getElementById("foto_principal")?.click()}
                    >
                        Foto principal
                    </button>
                    <div className="mt-2 relative w-[200px] h-[150px]">
                        <Image 
                            src={previewPrincipal || "/preview.svg"} 
                            alt="Preview" 
                            fill 
                            className="rounded object-cover" 
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <input 
                        name="foto_parceiros"
                        accept="image/png" 
                        type="file" 
                        id="foto_parceiros" 
                        className="hidden" 
                        onChange={handleFotoParceirosChange} 
                    />
                    <button 
                        type="button"
                        className="bg-[#004679] hover:bg-[#004679]/90 text-white font-bold py-2 px-4 rounded-full cursor-pointer" 
                        onClick={() => document.getElementById("foto_parceiros")?.click()}
                    >
                        Foto parceiros
                    </button>
                    <div className="mt-2 relative w-[200px] h-[150px]">
                        <Image 
                            src={previewParceiros || "/preview.svg"} 
                            alt="Preview" 
                            fill
                            className="rounded object-cover" 
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-end justify-end">
                <button className="mt-[3%] bg-[#F1863D] hover:bg-[#F1863D]/90 text-white font-bold py-2 cursor-pointer px-4 rounded-full">Salvar Projeto</button>
            </div>
        </form>
    ) : (
            <div className="flex-col mx-[5%] w-[90%] h-auto">
                <div className="flex items-center justify-center">
                    <input
                        type="text"
                        placeholder="Pesquisar projetos"
                        className="w-full max-w-xl text-center py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                        value={setpesquisa || ""} 
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                </div>
                <div className="flex items-end justify-end">
                    <button 
                        id="novo_projeto" 
                        className="mt-[2%] bg-[#F1863D] hover:bg-[#F1863D]/90 text-white font-bold py-2 cursor-pointer px-4 rounded-full" 
                        onClick={handleNovoProjetoClick}
                    >
                        Novo Projeto
                    </button>
                </div>
            </div>
    )}
    {!mostrarFormulario && (
            <div className="flex-col mx-[5%] w-[90%] h-auto">
                {projetosExibidos.map((projeto: any) => (
                    <div key={projeto.id} className="flex flex-col my-[2%] p-4 border border-gray-700 rounded-[0.5rem] hover:bg-[#F1863D]/10 cursor-pointer">
                        <h2 className="text-white text-[1.25rem] font-bold">{projeto.titulo}</h2>
                        <p className="text-gray-400 text-sm">{projeto.resumo}</p>
                    </div>
                ))}
            </div>
        )}
        </>
    );
}