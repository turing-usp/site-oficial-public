"use client";
import { useState } from 'react';
export default function ListaUsu({ membros }: { membros: any[] }) {
    const [pesquisa, setPesquisa] = useState('');

    const membrosFiltrados = membros.filter(membro =>
        membro.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        membro.email.toLowerCase().includes(pesquisa.toLowerCase())
    );
    return (
        <>
            <input
                name='pesquisar'
                type="text"
                placeholder="Pesquisar membros"
                className="text-center mb-4 px-40 py-1.5 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D] focus:ring-opacity-50"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
            />
            <div className="flex w-full h-auto items-center">
                {membrosFiltrados.length === 0 ? (
                    <p className="text-gray-300 text-[1rem]">Nenhum membro encontrado.</p>
                ) : (
                    <ul className="flex flex-col w-[90%] ml-[5%] h-full">
                        {membrosFiltrados.map((membro) => (
                            <div key={membro.id} className="flex w-full items-center justify-between px-[5%] mb-4 bg-gray-700 rounded-lg">
                            <div className="flex">
                                <div>
                                    <p className="text-white text-[1rem] font-bold">{membro.nome}</p>
                                    <p className="text-gray-300 text-[0.9rem]">{membro.email}</p>
                                </div>
                                <select 
                                    className="mt-2 px-3 py-1 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#F1863D]"
                                    // Convertemos para String para garantir que o React encontre o value correspondente
                                    defaultValue={String(membro.tipo_usuario)} 
                                >
                                    <option value="" disabled>Cargo</option>
                                    <option value="0">Usuário</option>
                                    <option value="1">Membro</option>
                                    <option value="2">Admin</option>
                                    <option value="3">Ex-membro</option>
                                </select>
                            </div>
                                <div className="flex items-center">
                                    <button className="text-white text-[0.9rem] px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 transition ml-2 cursor-pointer">Excluir</button>
                                </div>
                            </div>
                        ))}
                    </ul>
                )}
            </div>

        </>
    );
}