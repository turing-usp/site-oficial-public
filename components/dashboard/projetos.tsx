"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
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
    const [itemAtual, setItemAtual] = useState("0");
    // Vamos pegar o valor do select e guardar para colocar numa tag p para mostrarmos a area, um projeto pode ter no máximo 3 áreas
    const [areaSelect, setAreaSelect] = useState<string[]>([]);

    const adicionarArea = () => {
                    if(!areaSelect.includes(itemAtual) && areaSelect.length < 3) {
            setAreaSelect([...areaSelect, itemAtual]);
        }
    };

    const [links, setLinks] = useState<string[]>([]);
    const [linkAtual, setLinkAtual] = useState("");
    const adicionarLink = () => {
    const linkLimpo = linkAtual.trim();
    if(linkLimpo !== "" && !links.includes(linkLimpo)) {
        setLinks([...links, linkLimpo]);
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

    const [projetoEmEdicao, setProjetoEmEdicao] = useState<any | null>(null);

    const handleEditarclick = (projeto: any) => {
        setProjetoEmEdicao(projeto);
        setMostrarFormulario(true);
        // Aqui você pode preencher os campos do formulário com os dados do projeto selecionado para edição
        setAreaSelect(projeto.area || []);
        const linksDoBanco = projeto.links 
        ? (Array.isArray(projeto.links) ? projeto.links : [projeto.links]) 
        : [];
        setLinks(linksDoBanco);
        
    }

    const mapa_areas: { [key: string]: string } = {
        "0": "RH",
        "1": "Estratégia",
        "2": "Marketing",
        "3": "NLP",
        "4": "Quant",
        "5": "DS",
        "6": "RL",
        "7": "Comp. V."
    }

    const [modaldelete, setModalDelete] = useState(false);

    useEffect(() => {
        if (projetoEmEdicao) {
            // Áreas (lógica anterior)
            const areasBanco = projetoEmEdicao.areas || projetoEmEdicao.area || [];
            setAreaSelect(Array.isArray(areasBanco) ? areasBanco.map(String) : String(areasBanco).split(',').filter(Boolean));

            // Links
            const linksBanco = projetoEmEdicao.links || [];
            // Se o banco retornar string separada por vírgula, transformamos em array
            const linksArray = Array.isArray(linksBanco) 
                ? linksBanco 
                : String(linksBanco).split(',').map(l => l.trim()).filter(Boolean);
                
            setLinks(linksArray);
        } else {
            setAreaSelect([]);
            setLinks([]);
        }
    }, [projetoEmEdicao]);
   
    return (
    <>
        {mostrarFormulario ? (
        <form id="form-projeto" key={projetoEmEdicao?.id || 'novo_projeto'} className="flex-col mx-[5%] w-[90%] h-auto" action={mandarforms} >
            <button 
                id="voltar_projetos" 
                className="mb-6 text-[#F1863D] hover:underline flex items-center gap-2 w-fit cursor-pointer"
                onClick={() => {
                    setMostrarFormulario(false);
                    setProjetoEmEdicao(null);
                    setAreaSelect([]);
                    setLinks([]);
                    setPreviewPrincipal(null);
                    setPreviewParceiros(null);
                }}
            >
                ← Voltar para a lista
            </button>
            <h2 className="text-white text-xl font-bold my-[2%]"> {projetoEmEdicao ? "Editar Projeto" : "Formulário de Criação de Projeto"}</h2>
            <label className="text-white mt-4">Título do Projeto:</label>
            <input
                required
                id="titulo"
                name="titulo"
                defaultValue={projetoEmEdicao?.titulo || ""}
                type="text"
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
            />
            <label className="text-white">Slug (rota) do projeto:</label>
            <input
                required
                readOnly={!!projetoEmEdicao}
                id="slug"
                name="slug"
                defaultValue={projetoEmEdicao?.slug || ""}
                type="text"
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
            />
            <label className="text-white">Resumo do Projeto:</label>
            <textarea
                required
                id="resumo"
                name="resumo"
                defaultValue={projetoEmEdicao?.resumo || ""}
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                rows={3}
            />
            <label className="text-white">Problema:</label>
            <textarea
                required
                id="problema"
                name="problema"
                defaultValue={projetoEmEdicao?.problema || ""}
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                rows={3}
            />
            <label className="text-white">Confecção:</label>
            <textarea
                required
                id="confeccao"
                name="confeccao"
                defaultValue={projetoEmEdicao?.confeccao || ""}
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                rows={3}
            />
            <label className="text-white">Resultados:</label>
            <textarea
                required
                id="resultado"
                name="resultado"
                defaultValue={projetoEmEdicao?.resultados || ""}
                className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                rows={3}
            />
            <div className="flex-col">
                <div className="flex items-start justify-start my-[2%]">
                    <button type="button" className="bg-[#31a039] hover:bg-[#31a039]/90 text-white font-bold py-2 cursor-pointer px-4 rounded-full" onClick={adicionarArea}>Adicionar Área</button>
                    <button type="button" className="bg-[#9c2e41] hover:bg-[#9c2e41]/90 text-white font-bold py-2 cursor-pointer px-4 rounded-full ml-[2%]" onClick={() => setAreaSelect([])}>Limpar Áreas</button>
                </div>
                <select onChange={(e) => setItemAtual(e.target.value)} className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]" >
                    <option value="0">RH</option>
                    <option value="1">Estratégia</option>
                    <option value="2">Marketing</option>
                    <option value="3">NLP</option>
                    <option value="4">Quant</option>
                    <option value="5">DS</option>
                    <option value="6">RL</option>
                    <option value="7">Comp. V.</option>
                </select>
                <input 
                    readOnly 
                    className="text-gray-400 w-full bg-transparent"  
                    type="text" 
                    value={"Áreas selecionadas: " + areaSelect.map(id => mapa_areas[id] || id).join(', ')} 
                />
                <input 
                    type="hidden" 
                    name="areas" 
                    value={areaSelect.join(',')} 
                />
            </div>
            <div className="flex my-[3%]">
                <div className="flex-1">
                    <label className="text-white">Categoria 1:</label>
                    <input
                        name="cat1"
                        id="cat1"
                        required
                        type="text"
                        defaultValue={projetoEmEdicao?.cat[0] || ""}
                        className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                    />
                </div>
                <div className="flex-1 ml-[2%]">
                    <label className="text-white">Categoria 2:</label>
                    <input
                        name="cat2"
                        id="cat2"
                        type="text"
                        defaultValue={projetoEmEdicao?.cat[1] || ""}
                        className="w-full my-[1%] p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                    />
                </div>
                <div className="flex-1 ml-[2%]">
                    <label className="text-white">Categoria 3:</label>
                    <input
                        id="cat3"
                        name="cat3"
                        defaultValue={projetoEmEdicao?.cat[2] || ""}
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
                        defaultValue={projetoEmEdicao?.anoinicio || ""}
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
                        defaultValue={projetoEmEdicao?.anofim || ""}
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
                <div className="flex-col">
                    {links.map((link, index) => (
                        link && (
                            <div key={index} className="flex gap-2 items-center justify-between bg-gray-700 p-2 rounded my-1">
                                <a 
                                    href={link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-400 hover:underline"
                                >
                                    {link}
                                </a>
                                <button 
                                    type="button" 
                                    className="text-red-500 hover:text-red-700 cursor-pointer" 
                                    onClick={() => setLinks(links.filter((_, i) => i !== index))}
                                >
                                    X
                                </button>
                            </div>
                        )
                    ))}
                </div>
                <input 
                    type="hidden" 
                    name="links" 
                    value={Array.isArray(links) ? links.join(',') : links} 
                />
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
                    <div className="mt-2 relative w-[100px] h-[100px] md:w-[200px] md:h-[150px]">
                        <Image 
                            src={previewPrincipal || projetoEmEdicao?.imagem || "/preview.svg"} 
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
                    <div className="mt-2 relative w-[100px] h-[100px] md:w-[200px] md:h-[150px]">
                        <Image 
                            src={previewParceiros || projetoEmEdicao?.parceiros || "/preview.svg"} 
                            alt="Preview" 
                            fill
                            className="rounded object-cover" 
                        />
                    </div>
                </div>
            </div>
            {projetoEmEdicao ? (
                <div className="flex items-end justify-end gap-4">
                    <button 
                        className="mt-[3%] bg-[#F1863D] hover:bg-[#F1863D]/90 text-white font-bold py-2 cursor-pointer px-4 rounded-full"
                        name="acao"
                        value="editar"
                        type="submit"
                        form="form-projeto"
                        formNoValidate
                    >
                        Salvar Edições
                    </button>
                    <button 
                        type="button"
                        className="mt-[3%] bg-transparent border border-[#F1863D] hover: text-white font-bold py-2 cursor-pointer px-4 rounded-full"
                        onClick={() => setModalDelete(true)}
                    >
                        Remover Projeto
                    </button>
                </div>
            ) : (
            <div className="flex items-end justify-end">
                <button className="mt-[3%] bg-[#F1863D] hover:bg-[#F1863D]/90 text-white font-bold py-2 cursor-pointer px-4 rounded-full">Salvar Projeto</button>
            </div>
            )}
            {modaldelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded">
                        <p className="text-white mb-4">Tem certeza que deseja remover este projeto?</p>
                        <div className="flex justify-end gap-4">
                            <button 
                                className="bg-transparent border border-[#F1863D] hover:text-white font-bold py-2 cursor-pointer px-4 rounded-full mr-2"
                                onClick={() => setModalDelete(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-[#F1863D] hover:bg-[#F1863D]/90 text-white font-bold py-2 cursor-pointer px-4 rounded-full"
                                name="acao"
                                value="remover"
                                type="submit"
                                form="form-projeto"
                                formNoValidate
                            >                                
                            Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
                    <div key={projeto.id} className="flex flex-col my-[2%] p-4 border border-gray-700 rounded-[0.5rem] hover:bg-[#F1863D]/10 cursor-pointer" onClick={() => handleEditarclick(projeto)}>
                        <h2 className="text-white text-[1.25rem] font-bold">{projeto.titulo}</h2>
                        <p className="text-gray-400 text-sm">{projeto.resumo}</p>
                    </div>
                ))}
            </div>
        )}
        </>
    );
}