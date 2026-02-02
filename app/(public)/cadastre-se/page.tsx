'use client';
import Forms from "@/components/public/formularioderegistro";
import Image from "next/image";
export default function Cadastre_se(){
    return(
        <>
        <div className="flex h-[100vh]">
            <div className="flex mx-[5%] items-center justify-center w-[90%]">
                <div className="flex flex-col flex-1 h-[80vh] w-[70%] bg-[#162B3F] rounded-[2rem] items-center justify-center">
                    <Image
                        src="/cadastro.svg"
                        alt="Imagem de cadastro"
                        width={600}
                        height={600}
                        className="mb-[2%] h-[15vh] w-auto "
                    />
                    <p className='text-[#FFFFFF] text-[2rem] font-bold mb-[5%]'>BEM VINDO!</p>
                    <p className='text-[#FFFFFF] text-[1rem] text-center mx-[20%] mb-[2%]'>Cadastre as suas informações para aproveitar os nossos serviços. O site é composto por diversas funcionalidades que facilitam sua experiência. Para se cadastrar você está ciente que todas as informações serão armazenadas em um banco de dados.</p>
                </div>
                <div className="flex-col flex-1 h-[70vh] w-full bg-[#FFFFFF] ">
                    <Forms />
                </div>
            </div>
        </div>
        </>
    )
}