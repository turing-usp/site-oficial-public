"use client";
import { useState, useEffect } from 'react';
import { atualizarCargosEmLote, removeMember } from '@/app/(dashboard)/plataforma/admin/actions';
import { banMember } from '@/app/(dashboard)/plataforma/admin/actions';

export default function ListaUsu({ membros }: { membros: any[] }) {
    const [pesquisa, setPesquisa] = useState('');
    
    // Inicializa o estado com a prop recebida
    const [membrosAtivos, setMembrosAtivos] = useState(membros);
    const [membroParaAcao, setMembroParaAcao] = useState<any | null>(null);
    const [confirmacaoNome, setConfirmacaoNome] = useState('');
    const [tipoAcao, setTipoAcao] = useState<'banir' | 'remover' | null>(null);
    const [alteracoes, setAlteracoes] = useState<{[key: string]: number}>({});

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
        setMembroParaAcao(null); // Limpa a ação pendente
        setConfirmacaoNome(''); // Limpa a confirmação
        setTipoAcao(null); // Limpa o tipo de ação
    };

    const handleRemoveMember = async (formData: FormData) => {
        if (!membroParaAcao) return;

    try {
        // 1. Aguarda a resposta do servidor (Segurança em primeiro lugar)
        const { error, success } = await removeMember(membroParaAcao.id, membroParaAcao.nome, formData);

        // 2. Só limpa a interface se o retorno for estritamente true
        if (success === true) {
            removerMembro(membroParaAcao.id);
        } else {
            // Caso o servidor retorne false (ex: senha incorreta)
            alert("Não foi possível remover: verifique os dados informados.");
        }
    } catch (error) {
        // Caso ocorra um erro de rede ou explosão no servidor
        alert("Erro de conexão ao tentar remover o membro.");
    }
    };

    const handleBanMember = async (formData: FormData) => {
        if (!membroParaAcao) return;
        try {
            const { error, success } = await banMember(membroParaAcao.id, membroParaAcao.nome, formData);
            if (success === true) {
                removerMembro(membroParaAcao.id);
            }
            else {
                alert("Não foi possível banir: verifique os dados informados.");
            }
        } catch (error) {
            alert("Erro de conexão ao tentar banir o membro.");
        }
    };
    const handleChangeCargo = (userId: string, novoCargo: number) => {
        setAlteracoes(prev => ({
            ...prev,
            [userId]: novoCargo
        }));
    };
    const handleSalvarTudo = async () => {
    // Transformamos o objeto em um array de objetos para o RPC
    const payload = Object.entries(alteracoes).map(([id, cargo]) => ({
        p_id: id,
        p_cargo: cargo
    }));
    // Chamamos a Server Action enviando o vetor
    const result = await atualizarCargosEmLote(payload);
        if (result.success) {
            setAlteracoes({}); // Limpa as alterações pendentes
        } else {
            alert("Erro ao atualizar cargos: " + result.error);
        }
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
            
            <form action={handleSalvarTudo} className="flex-col w-full h-auto items-center">
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
                                    {membro.is_banned && (
                                        <span className="mr-5 bg-red-100 text-red-700 text-xs px-2 py-1 border border-red-200 flex items-center gap-1">
                                            <p className=''> Banido até {new Date(membro.banned_until).toLocaleDateString()} </p>
                                        </span>
                                    )}
                                    <select 
                                        name = "mudança de cargo"
                                        className="my-2 px-3 rounded-lg bg-gray-600 text-white"
                                        defaultValue={String(membro.tipo_usuario)} 
                                        onChange={(e) => handleChangeCargo(membro.id, parseInt(e.target.value))}
                                    >
                                        <option value="0">Usuário</option>
                                        <option value="1">Membro</option>
                                        <option value="2">Admin</option>
                                        <option value="3">Ex-membro</option>
                                    </select>
                                    <button 
                                        onClick={() => { setMembroParaAcao(membro); setTipoAcao('remover'); }} 
                                        className="text-white bg-red-700 hover:bg-red-800 px-3 py-1 rounded-lg ml-2 transition cursor-pointer"
                                    >
                                        Excluir
                                    </button>
                                    <button 
                                        onClick={() => { setMembroParaAcao(membro); setTipoAcao('banir'); }} 
                                        className="text-white bg-[#722F37] hover:bg-[#5E2129] px-3 py-1 rounded-lg ml-2 transition cursor-pointer"
                                    >
                                        Banir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-[-2%] gap-[3%] flex justify-end items-center">
                    <button type="submit" name="salvar" className="text-[1rem] text-[#FFFFFF] bg-[#F1863D] rounded-[2rem] py-2 px-10 hover:bg-[#C75B2B] cursor-pointer">Salvar</button>
                </div>
            </form>
            {membroParaAcao && (
                            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"> 
                                <div className="bg-gray-800 border border-red-500/30 p-8 rounded-2xl max-w-md w-full shadow-2xl mx-4"> 
                                    <h2 className="text-white text-xl font-bold mb-2">Você tem certeza absoluta?</h2>
                                    
                                    <div className="bg-red-900/20 border-l-4 border-red-600 p-4 mb-6">
                                        <p className="text-red-200 text-sm">
                                            Esta ação <strong>não pode ser desfeita</strong>. Isso irá {tipoAcao === 'banir' ? 'banir' : 'remover'} permanentemente o usuário 
                                            <span className="font-bold text-white"> {membroParaAcao.nome} </span> 
                                            e removerá todos os seus acessos.
                                        </p>
                                    </div>

                                    <p className="text-gray-300 text-sm mb-2">
                                        Por favor, digite <span className="text-white font-bold select-none">a senha requerida</span> para confirmar.
                                    </p>
                                    {tipoAcao === 'banir' ? (
                                        <form action={handleBanMember}>
                                            <input
                                                name='senha'    
                                                type="text"
                                                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white mb-6 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                                                value={confirmacaoNome}
                                                onChange={(e) => setConfirmacaoNome(e.target.value)}
                                                placeholder="Senha de confirmação"
                                                autoFocus
                                            />
                                            <select name="tempoBanimento" className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white mb-6 focus:ring-2 focus:ring-red-600 outline-none transition-all">
                                                <option value="0">1 dia</option>
                                                <option value="1">3 dias</option>
                                                <option value="2">7 dias</option>
                                                <option value="3">1 mês</option>
                                                <option value="4">3 meses</option>
                                                <option value="5"> 1 ano</option>
                                                <option value="6">2 anos</option>
                                                <option value="7">Banimento permanente</option>
                                            </select>
                                            <div className="flex flex-col gap-3">
                                            <button
                                                type='submit'
                                                className={"w-full py-3 rounded-xl font-bold transition-all bg-[#722F37] hover:bg-red-700 text-white"}
                                            >
                                                Banir este usuário
                                            </button>
                                            <button 
                                                type='button'
                                                onClick={() => { setMembroParaAcao(null); setConfirmacaoNome(''); }}
                                                className="text-gray-400 hover:text-white text-sm transition"
                                            >
                                                Cancelar e voltar
                                            </button>
                                        </div>
                                        </form>
                                    ) : (
                                    <form action={handleRemoveMember}>
                                        <input
                                            name='senha'    
                                            type="text"
                                            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white mb-6 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                                            value={confirmacaoNome}
                                            onChange={(e) => setConfirmacaoNome(e.target.value)}
                                            placeholder="Senha de confirmação"
                                            autoFocus
                                        />
                                        <div className="flex flex-col gap-3">
                                            <button
                                                type='submit'
                                                className={"w-full py-3 rounded-xl font-bold transition-all bg-red-600 hover:bg-red-700 text-white"}
                                            >
                                               Remover este usuário
                                            </button>
                                            <button 
                                                type='button'
                                                onClick={() => { setMembroParaAcao(null); setConfirmacaoNome(''); }}
                                                className="text-gray-400 hover:text-white text-sm transition"
                                            >
                                                Cancelar e voltar
                                            </button>
                                        </div>
                                    </form>
                                    )}
                                </div>
                            </div> 
            )}
        </>
    );
}