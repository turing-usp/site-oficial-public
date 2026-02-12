"use client";
import { useState, useEffect } from 'react';

export default function ListaUsu({ membros }: { membros: any[] }) {
    const [pesquisa, setPesquisa] = useState('');
    
    // Inicializa o estado com a prop recebida
    const [membrosAtivos, setMembrosAtivos] = useState(membros);

    // CRUCIAL: Se a lista 'membros' mudar lá fora (ou carregar depois), 
    // precisamos avisar o estado interno para se atualizar.
    useEffect(() => {
        setMembrosAtivos(membros);
    }, [membros]);

    // Sempre filtramos o estado local
    const membrosFiltrados = membrosAtivos.filter(membro =>
        membro.nome?.toLowerCase().includes(pesquisa.toLowerCase()) ||
        membro.email?.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const removerMembro = (id: number) => {
        // Usar a versão de função (prev) garante que você pegue o estado mais atual
        setMembrosAtivos(prevMembros => prevMembros.filter(membro => membro.id !== id));
    };

    const banirMembro = (id: number) => {
        setMembrosAtivos(prevMembros => prevMembros.filter(membro => membro.id !== id));
    };

    return (
        <>
            <input
                type="text"
                placeholder="Pesquisar membros"
                className="text-center mb-4 px-40 py-1.5 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
            />
            
            <div className="flex w-full h-auto items-center">
                {membrosFiltrados.length === 0 ? (
                    <p className="text-gray-300">Nenhum membro encontrado.</p>
                ) : (
                    <ul className="flex flex-col w-[90%] ml-[5%] h-full">
                        {membrosFiltrados.map((membro) => (
                            <li key={membro.id} className="flex w-full items-center justify-between px-[5%] mb-4 bg-gray-700 rounded-lg">
                                <div className="flex py-4">
                                    <div>
                                        <p className="text-white font-bold">{membro.nome}</p>
                                        <p className="text-gray-300 text-sm">{membro.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <select 
                                        className="my-2 px-3 rounded-lg bg-gray-600 text-white"
                                        defaultValue={String(membro.tipo_usuario)} 
                                    >
                                        <option value="0">Usuário</option>
                                        <option value="1">Membro</option>
                                        <option value="2">Admin</option>
                                        <option value="3">Ex-membro</option>
                                    </select>
                                    <button 
                                        onClick={() => removerMembro(membro.id)} 
                                        className="text-white bg-red-700 hover:bg-red-800 px-3 py-1 rounded-lg ml-2 transition cursor-pointer"
                                    >
                                        Excluir
                                    </button>
                                    <button 
                                        onClick={() => banirMembro(membro.id)} 
                                        className="text-white bg-[#722] hover:bg-[#722F37] px-3 py-1 rounded-lg ml-2 transition cursor-pointer"
                                    >
                                        Banir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}