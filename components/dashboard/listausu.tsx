"use client";
import { useState, useEffect } from 'react';
import { atualizarCargosEmLote, removeMember, banMember, desbanirMember, editareascargos } from '@/app/(dashboard)/plataforma/admin/actions';

export default function ListaUsu({membros,  cargos,  areas }: { membros: any[],  cargos: {[key: string]: string}, areas: {[key: string]: string} }) {
    const [pesquisa, setPesquisa] = useState('');
    
    // Inicializa o estado com a prop recebida
    const [membrosAtivos, setMembrosAtivos] = useState(membros);
    const [membroParaAcao, setMembroParaAcao] = useState<any | null>(null);
    const [confirmacaoNome, setConfirmacaoNome] = useState('');
    const [tipoAcao, setTipoAcao] = useState<'banir' | 'remover' | 'desbanir' | 'editarCargo' | null>(null);
    const [alteracoes, setAlteracoes] = useState<{[key: string]: number}>({});
    const [tempoBanimento, setTempoBanimento] = useState('0');

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

    // 'areasAtuais' reflete o objeto { "id_area": id_posicao }
    const [areasAtuais, setAreasAtuais] = useState<{[key: string]: number}>({});

    // Carrega as áreas do membro selecionado ao abrir o modal
    useEffect(() => {
    if (tipoAcao === 'editarCargo' && membroParaAcao) {
        // Se membroParaAcao.areas não existir no banco, ele usa {}
        setAreasAtuais(membroParaAcao.areas || {}); 
    }
    }, [tipoAcao, membroParaAcao]);
    console.log(cargos, areas);
    console.log("Áreas atuais no estado:", areasAtuais);

    // Muda a posição (Ex: de Membro para Diretor) dentro de uma área
    const handleChangePosicaoNaArea = (idDaArea: string, idDaNovaPosicao: string) => {
        setAreasAtuais(prev => ({
            ...prev,
            [idDaArea]: Number(idDaNovaPosicao)
        }));
    };

    // Remove uma área do membro
    const handleRemoverArea = (idParaRemover: string) => {
        const novoEstado = { ...areasAtuais };
        delete novoEstado[idParaRemover];
        setAreasAtuais(novoEstado);
    };

    // Adiciona uma nova área à lista do membro
    const handleAdicionarNovaArea = () => {
        // Filtra as áreas que ele ainda não possui
        const idsDisponiveis = Object.keys(areas).filter(id => !areasAtuais.hasOwnProperty(id));
        
        if (idsDisponiveis.length > 0) {
            const proximaAreaId = idsDisponiveis[0];
            setAreasAtuais(prev => ({
                ...prev,
                [proximaAreaId]: 2 // Default: 'Membro'
            }));
        } else {
            alert("O membro já participa de todas as áreas.");
        }
    };

    const handleRemoveMember = async (password: string) => {
        if (!membroParaAcao) return;

        try {
            const formData = new FormData();
            formData.append('senha', password);
            
            const { error, success } = await removeMember(membroParaAcao.id, membroParaAcao.nome, formData);

            if (success === true) {
                removerMembro(membroParaAcao.id);
            } else {
                alert("Não foi possível remover: verifique os dados informados.");
            }
        } catch (error) {
            alert("Erro de conexão ao tentar remover o membro.");
        }
        setMembroParaAcao(null);
        setConfirmacaoNome('');
        setTipoAcao(null);
    };

    const handleacaoAreaCargo = async (password: string) => {
        if (!membroParaAcao) return;
        try {
            const formData = new FormData();
            formData.append('senha', password);
            formData.append('areas_cargos', JSON.stringify(areasAtuais));
            formData.append('nome', membroParaAcao.nome);
            

            const { error, success } = await editareascargos(membroParaAcao.id, formData);
            if (success === true) {
                setMembrosAtivos(prevMembros => prevMembros.map(membro => 
                    membro.id === membroParaAcao.id ? { ...membro, areas: areasAtuais } : membro
                ));
                setMembroParaAcao(null);
                setConfirmacaoNome('');
                setTipoAcao(null);
            }
            else {
                alert("Não foi possível atualizar as áreas e cargos: verifique os dados informados.");
            }
        } catch (error) {
            alert("Erro de conexão ao tentar atualizar as áreas e cargos do membro.");
        }
    };

    const handleBanMember = async (password: string, tempoBan: string) => {
        if (!membroParaAcao) return;
        try {
            const formData = new FormData();
            formData.append('senha', password);
            formData.append('tempoBanimento', tempoBan);
            
            const { error, success } = await banMember(membroParaAcao.id, membroParaAcao.nome, formData);
            if (success === true) {
                setMembrosAtivos(prevMembros => prevMembros.map(membro => 
                    membro.id === membroParaAcao.id ? { ...membro, is_banned: true } : membro
                ));
                setMembroParaAcao(null);
                setConfirmacaoNome('');
                setTipoAcao(null);
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
    const handleDesbanirMember = async (password: string) => {
        if (!membroParaAcao) return;
        try {
            const formData = new FormData();
            formData.append('senha', password);
            
            const { error, success } = await desbanirMember(membroParaAcao.id, membroParaAcao.nome, formData);
            console.log("Resultado do desbanimento:", { error, success });
            if (success === true) {
                setMembrosAtivos(prevMembros => prevMembros.map(membro => 
                    membro.id === membroParaAcao.id ? { ...membro, is_banned: false, banned_until: null } : membro
                ));
                setMembroParaAcao(null);
                setConfirmacaoNome('');
                setTipoAcao(null);
            }
            else {
                alert("Não foi possível desbanir: verifique os dados informados.");
            }
        } catch (error) {
            alert("Erro de conexão ao tentar desbanir o membro.");
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
            
            <div className="flex-col w-full h-auto items-center">
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
                                    { membro.is_banned ? (
                                    <button 
                                        onClick={() => { setMembroParaAcao(membro); setTipoAcao('desbanir'); }} 
                                        className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg ml-2 transition cursor-pointer"
                                    >
                                        Desbanir
                                    </button>
                                    ): 
                                    <button 
                                        onClick={() => { setMembroParaAcao(membro); setTipoAcao('banir'); }} 
                                        className="text-white bg-[#722F37] hover:bg-[#5E2129] px-3 py-1 rounded-lg ml-2 transition cursor-pointer"
                                    >
                                        Banir
                                    </button>
                                    }

                                    {membro.podeEditarCargo && (
                                        <button 
                                            onClick={() => { setMembroParaAcao(membro); setTipoAcao('editarCargo'); }} 
                                            className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg ml-2 transition cursor-pointer"
                                        >
                                            Editar
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-[-2%] gap-[3%] flex justify-end items-center">
                    <button type="button" onClick={handleSalvarTudo} className="text-[1rem] text-[#FFFFFF] bg-[#F1863D] rounded-[2rem] py-2 px-10 hover:bg-[#C75B2B] cursor-pointer">Salvar</button>
                </div>
            </div>
            {membroParaAcao && (
                            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={(e) => e.stopPropagation()}> 
                                <div className="bg-gray-800 border border-red-500/30 p-8 rounded-2xl max-w-md w-full shadow-2xl mx-4" onClick={(e) => e.stopPropagation()}> 
                                    <h2 className="text-white text-xl font-bold mb-2">Você tem certeza absoluta?</h2>
                                    
                                    <div className={`border-l-4 ${tipoAcao === 'banir' ? 'border-red-600' : tipoAcao === 'desbanir' ? 'border-green-600' : tipoAcao === 'editarCargo' ? 'border-blue-600' : 'border-red-600'} p-4 mb-6`}>
                                        <p className={`${tipoAcao === 'banir' ? 'text-red-200' : tipoAcao === 'desbanir' ? 'text-green-200' : tipoAcao === 'editarCargo' ? 'text-blue-200' : 'text-red-200'} text-sm`}>
                                            Esta ação <strong>não pode ser desfeita</strong>. Isso irá {tipoAcao === 'banir' ? 'banir' : tipoAcao === 'desbanir' ? 'desbanir' : tipoAcao === 'editarCargo' ? 'editar o cargo do usuário' : 'remover'} o usuário 
                                            <span className="font-bold text-white"> {membroParaAcao.nome} </span> 
                                            e suas respectivas funcionalidades no sistema.
                                        </p>
                                    </div>

                                    <p className="text-gray-300 text-sm mb-2">
                                        Por favor, digite <span className="text-white font-bold select-none">a senha requerida</span> para confirmar.
                                    </p>
                                    {tipoAcao === 'banir' ? (
                                        <div>
                                            <input
                                                type="password"
                                                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white mb-6 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                                                value={confirmacaoNome}
                                                onChange={(e) => { e.stopPropagation(); setConfirmacaoNome(e.target.value); }}
                                                placeholder="Senha de confirmação"
                                                autoFocus
                                            />
                                            <select 
                                                value={tempoBanimento}
                                                onChange={(e) => { e.stopPropagation(); setTempoBanimento(e.target.value); }}
                                                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white mb-6 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                                            >
                                                <option value="0">1 dia</option>
                                                <option value="1">3 dias</option>
                                                <option value="2">7 dias</option>
                                                <option value="3">1 mês</option>
                                                <option value="4">3 meses</option>
                                                <option value="5">1 ano</option>
                                                <option value="6">2 anos</option>
                                                <option value="7">Banimento permanente</option>
                                            </select>
                                            <div className="flex flex-col gap-3">
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); handleBanMember(confirmacaoNome, tempoBanimento); }}
                                                    className={"w-full py-3 rounded-xl font-bold transition-all bg-[#722F37] hover:bg-red-700 text-white"}
                                                >
                                                    Banir este usuário
                                                </button>
                                                <button 
                                                    type='button'
                                                    onClick={(e) => { e.stopPropagation(); setMembroParaAcao(null); setConfirmacaoNome(''); setTempoBanimento('0'); }}
                                                    className="text-gray-400 hover:text-white text-sm transition"
                                                >
                                                    Cancelar e voltar
                                                </button>
                                            </div>
                                        </div>) : (
                                        tipoAcao === 'desbanir' ? (
                                            <div>
                                                <input
                                                    type="password"
                                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white mb-6 focus:ring-2 focus:ring-green-600 outline-none transition-all"
                                                    value={confirmacaoNome}
                                                    onChange={(e) => { e.stopPropagation(); setConfirmacaoNome(e.target.value); }}
                                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                                    placeholder="Senha de confirmação"
                                                    autoFocus
                                                />
                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); handleDesbanirMember(confirmacaoNome); }}
                                                        className={"w-full py-3 rounded-xl font-bold transition-all bg-green-500 hover:bg-green-700 text-white"}
                                                    >
                                                        Desbanir este usuário
                                                    </button>
                                                    <button 
                                                        type='button'
                                                        onClick={(e) => { e.stopPropagation(); setMembroParaAcao(null); setConfirmacaoNome(''); }}
                                                        className="text-gray-400 hover:text-white text-sm transition"
                                                    >
                                                        Cancelar e voltar
                                                    </button>
                                                </div>
                                            </div>
                                        ) 
                                        :
                                        tipoAcao === 'editarCargo' ? (
                                        <div className='flex-col items-center justify-center'> 
                                            <button 
                                                type="button" // Sempre use type button para não dar submit no form
                                                onClick={handleAdicionarNovaArea} 
                                                className="flex items-center justify-center mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                                                >
                                                + Adicionar Área e Posição
                                            </button>

                                                {Object.entries(areasAtuais).map(([idArea, idPosicao]) => (
                                                <div key={idArea} className="flex gap-2 mb-2 items-center">
                                                    <select 
                                                    value={idArea} 
                                                    className="bg-gray-800 text-white border border-gray-600 p-2 rounded-md flex-1"
                                                    onChange={(e) => {
                                                        const novaArea = e.target.value;
                                                        if (areasAtuais[novaArea]) return; // Não deixa duplicar
                                                        const novo = { ...areasAtuais };
                                                        delete novo[idArea];
                                                        novo[novaArea] = idPosicao;
                                                        setAreasAtuais(novo);
                                                    }}
                                                    >
                                                    {Object.entries(areas).map(([id, nome]) => (
                                                        <option 
                                                            key={id} 
                                                            value={id} 
                                                            disabled={areasAtuais.hasOwnProperty(id) && id !== idArea}
                                                        >
                                                        {nome}
                                                        </option>
                                                    ))}
                                                    </select>

                                                    {/* Select de Posição (Ex: Diretor, Membro) */}
                                                    <select 
                                                    name = "areas_cargos"
                                                    value={idPosicao} 
                                                    onChange={(e) => handleChangePosicaoNaArea(idArea, e.target.value)}
                                                    className="bg-gray-800 text-[#F1863D] border border-gray-600 p-2 rounded-md flex-1"
                                                    >
                                                    {Object.entries(cargos).map(([id, nome]) => (
                                                        <option key={id} value={id}>{nome}</option>
                                                    ))}
                                                    </select>

                                                    {/* Botão de Remover */}
                                                    <button 
                                                    type="button"
                                                    onClick={() => handleRemoverArea(idArea)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition"
                                                    >
                                                    🗑️
                                                    </button>
                                                </div>
                                                ))}
                                            <input
                                                type="password"
                                                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white mb-6 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                                value={confirmacaoNome}
                                                onChange={(e) => { e.stopPropagation(); setConfirmacaoNome(e.target.value); }}
                                                placeholder="Senha de confirmação"
                                                autoFocus
                                            />
                                            <div className="flex flex-col gap-3">
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); handleacaoAreaCargo(confirmacaoNome); }}
                                                    className={"w-full py-3 rounded-xl font-bold transition-all bg-blue-600 hover:bg-blue-700 text-white"}
                                                >
                                                    Editar cargo deste usuário
                                                </button>
                                                <button 
                                                    type='button'
                                                    onClick={(e) => { e.stopPropagation(); setMembroParaAcao(null); setConfirmacaoNome(''); setTempoBanimento('0'); }}
                                                    className="text-gray-400 hover:text-white text-sm transition"
                                                >
                                                    Cancelar e voltar
                                                </button>
                                            </div>
                                        </div>
                                        ) :
                                         (
                                            <div>
                                                <input
                                                    type="password"
                                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white mb-6 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                                                    value={confirmacaoNome}
                                                    onChange={(e) => { e.stopPropagation(); setConfirmacaoNome(e.target.value); }}
                                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                                    placeholder="Senha de confirmação"
                                                    autoFocus
                                                />
                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); handleRemoveMember(confirmacaoNome); }}
                                                        className={"w-full py-3 rounded-xl font-bold transition-all bg-red-600 hover:bg-red-700 text-white"}
                                                    >
                                                        Remover este usuário
                                                    </button>
                                                    <button 
                                                        type='button'
                                                        onClick={(e) => { e.stopPropagation(); setMembroParaAcao(null); setConfirmacaoNome(''); }}
                                                        className="text-gray-400 hover:text-white text-sm transition"
                                                    >
                                                        Cancelar e voltar
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div> 
            )}
        </>
    );
}