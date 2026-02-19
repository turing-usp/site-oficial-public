import ContainerBlue from "@/components/ui/containerblue";
export default async function AreaDeTrabalhoPage() {
    return (
        <>
            <ContainerBlue>
                <div className="flex items-start h-screen">
                    <div className="flex-col w-[20%] h-auto">
                        <h1 className="text-white text-[1.5rem] text-center my-[3%] font-bold">Contatos:</h1>
                        <div>
                            <div className="flex w-full my-[5%] h-[12vh] border border-gray-700 rounded-[0.5rem] hover:bg-[#F1863D] cursor-pointer">
                                <div className="flex w-[90%] mx-[5%] items-center justify-center">  
                                    <p className="text-white">Quero ser Turing</p>
                                    <p className="text-white ml-[5%]">&gt;</p>
                                </div>
                            </div>
                            <div className="flex w-full my-[5%] h-[12vh] border border-gray-700 rounded-[0.5rem] hover:bg-[#F1863D] cursor-pointer">
                                <div className="flex w-[90%] mx-[5%] items-center justify-center">  
                                    <p className="text-white">Comercial</p>
                                    <p className="text-white ml-[5%]">&gt;</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-full ml-[2%] w-[0.2%] bg-white"></div>
                    <div>
                        
                    </div>
                </div>
            </ContainerBlue>
        </>
    );
}