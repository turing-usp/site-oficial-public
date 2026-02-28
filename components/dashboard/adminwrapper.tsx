'use client';

import { useState } from 'react';
import BotaoMembro from './botaomembro';
import ListaUsu from './listausu';

export default function AdminWrapper({ 
    data 
}: { 
    data: {  
        membros: any, // Este é o objeto com as categorias (ex: Ativos, Inativos)
        cargos: {[key: string]: string},  
        areas: {[key: string]: string} 
    } 
}) {
    // 1. Destruture o que vem do servidor
    const { membros, cargos, areas } = data;

    // 2. Defina a aba inicial como a primeira chave do objeto membros (ex: 'Diretoria' ou 'Membros')
    const [abaSelecionada, setAbaSelecionada] = useState<string | null>(
        Object.keys(membros).length > 0 ? Object.keys(membros)[0] : null
    );
    
    // 3. Pegue os membros da categoria selecionada
    // Note que agora acessamos 'membros[abaSelecionada]' e não 'data[abaSelecionada]'
    const membrosParaExibir = (abaSelecionada && membros[abaSelecionada]) 
        ? membros[abaSelecionada].membros 
        : [];

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full h-auto">
            <div id="menu lateral" className="flex flex-col items-center md:w-[20%] w-full">
                <h1 className="text-white text-[1.5rem] md:text-[1rem] xl:text-[1.5rem] text-center my-[5%] font-bold">ADMINISTRAÇÃO</h1>
                <p className="text-gray-300 text-[1rem] text-center mb-[5%]">Gerenciamento de membros</p>
            
                <div className="w-full flex flex-row overflow-x-auto flex-nowrap scrollbar-hide xl:flex-col">
                    {Object.entries(membros).map(([tipo, info]: [string, any]) => (
                        <BotaoMembro 
                            key={tipo} 
                            tipo={tipo} 
                            info={info} 
                            ativo={abaSelecionada === tipo}
                            onClick={() => setAbaSelecionada(tipo)}
                        />
                    ))}
                </div>
            </div>

            <div className="hidden xl:flex w-[0.1rem] bg-gray-700"></div>
            <div className="flex flex-col flex-1">
                <ListaUsu 
                    membros={membrosParaExibir} 
                    cargos={cargos} 
                    areas={areas} 
                />
            </div>
        </div>
    );
}
