'use client';

interface MembrosInfo {
    titulo: string;
    membros: any[];
    tt_membro: number;
}

interface BotaoMembroProps {
    tipo: string;
    info: MembrosInfo;
    ativo: boolean;
    onClick: () => void;
}

export default function BotaoMembro({ tipo, info, ativo, onClick }: BotaoMembroProps) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-shrink-0 md:mx-[15%] md:w-[12rem] lg:mx-0 mb-4 border rounded-lg p-4 h-auto w-full transition cursor-pointer ${
                ativo 
                    ? 'bg-[#F1863D] bg-opacity-20 border-[#F1863D]' 
                    : 'border-gray-700 hover:bg-[#F1863D] hover:bg-opacity-10'
            }`}
        >
            <div>
                <h2 className="text-white text-[1rem] font-bold">{info.titulo}</h2>
                <p className="text-gray-300 text-[0.9rem]">Total: {info.tt_membro}</p>
            </div>
            <div className="flex items-center justify-end ml-auto">
                <p className="text-white text-[1.5rem]">&gt;</p>
            </div>
        </button>
    );
}
