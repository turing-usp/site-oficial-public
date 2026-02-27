"use client";

import Forms from "@/components/public/formularioderegistro";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Cadastre_se(){
    const searchParams = useSearchParams();
    const error = searchParams.get("error") || undefined;
    const success = searchParams.get("success") || undefined;
    return(
        <>
        <div className="flex h-auto my-[10%] md:my-[2%] min-h-[100vh]">
            <div className="flex flex-col md:flex-row mx-[5%] items-center justify-center w-[90%]">
                <div className='flex md:flex-1 justify-center'>
                    <div className='mt-[10%] w-[90%] h-auto min-h-[55vh] py-5 md:mt-0 md:h-[80vh] md:w-[100%] lg:w-[70%] flex flex-col bg-[#162B3F] rounded rounded-[2rem] items-center justify-center'>
                        <Image
                            src="/cadastro.svg"
                            alt="Imagem de cadastro"
                            width={600}
                            height={600}
                            className="mb-[5%] h-[6rem] md:h-[15vh] w-auto "
                        />
                            <p className='text-[#FFFFFF] text-[2rem] font-bold mb-[2%]'>BEM VINDO!</p>
                            <p className='text-[#FFFFFF] text-[0.9rem] md:text-[1rem] text-center mx-[20%] mb-[2%]'>Cadastre as suas informações para aproveitar os nossos serviços. O site é composto por diversas funcionalidades que facilitam sua experiência. Para se cadastrar você está ciente que todas as informações serão armazenadas em um banco de dados.</p>
                    </div>
                </div>
                <div className="flex-col flex-1 h-auto min-h-[60dvh] md:h-[70vh] w-full bg-[#FFFFFF] ">
                    <Forms error={error} success={success} />
                </div>
            </div>
        </div>
        </>
    )
}