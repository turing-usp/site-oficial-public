interface MembrosInfo {
    titulo: string;
    membros: any[];
    tt_membro: number;
}

interface AbasAdminProps {
    [key: string]: MembrosInfo;
}

export default async function LateralAdmin({ data }: { data: AbasAdminProps }) {
    return (
        <>
            <div id="menu lateral" className="relative flex-col items-center mx-[5%] w-[20%] h-auto">
                <h1 className="text-white text-[1.5rem] text-center my-[5%]">ADMINISTRAÇÃO</h1>
                <p className="text-gray-300 text-[1rem] text-center mb-[5%]">Gerenciamento de membros</p>
                <div>
                    {Object.entries(data).map(([tipo, info]) => (
                        <button key={tipo} className="flex mb-4 border border-gray-700 rounded-lg p-4 h-auto w-full hover:bg-[#F1863D] hover:bg-opacity-10 transition cursor-pointer">
                            <div>
                                <h2 className="text-white text-[1rem] font-bold">{info.titulo}</h2>
                                <p className="text-gray-300 text-[0.9rem]">Total: {info.tt_membro}</p>
                            </div>
                            <div className="flex items-center justify-end ml-auto">
                                <p className="text-white text-[1.5rem]">&gt;</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="absolute left-150 top-0 h-full w-[0.1rem] mx-[5%] bg-white"></div>
        </>
    );
}