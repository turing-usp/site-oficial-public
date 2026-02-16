'use client';

import { useState } from 'react';
import BotaoMembro from './botaomembro';
import ListaUsu from './listausu';

interface MembrosInfo {
    titulo: string;
    membros: any[];
    tt_membro: number;
}

interface AbasAdminProps {
    [key: string]: MembrosInfo;
}

export default function AdminWrapper({ data }: { data: AbasAdminProps }) {
    const [abaSelecionada, setAbaSelecionada] = useState<string | null>(null);
    
    const membrosAtivos = abaSelecionada && data[abaSelecionada] 
        ? data[abaSelecionada].membros 
        : [];

    return (
        <div className="flex gap-4 w-full h-auto">
            <div id="menu lateral" className="flex flex-col items-center w-[20%]">
                <h1 className="text-white text-[1.5rem] text-center my-[5%]">ADMINISTRAÇÃO</h1>
                <p className="text-gray-300 text-[1rem] text-center mb-[5%]">Gerenciamento de membros</p>
                <div className="w-full">
                    {Object.entries(data).map(([tipo, info]) => (
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
            <div className="w-[0.1rem] bg-white"></div>
            <div className="flex flex-col flex-1">
                <ListaUsu membros={membrosAtivos} />
            </div>
        </div>
    );
}
