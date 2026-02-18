"use client";
import {handleEsqueciSenha} from "./action";
export default function EsqueciSenha(){
    return(
        <>
        <form action={handleEsqueciSenha} className="flex flex-col justify-center w-[90%] mx-[5%] h-[100vh]">
            <p className="text-[1.5rem] text-[#766F6F] font-bold mt-[5%]">ESQUECEU A SUA SENHA?</p>
            <input name="email" type="email" placeholder="Digite seu email cadastrado" className="h-[5vh] w-full bg-transparent text-black text-[1rem] mt-[5%] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1" />
            <div className="flex justify-center">
                <button type="submit" className=" px-12 py-2 border border-[#F1863D] border-[0.1rem] text-[#000000] text-[1rem] mt-[5%] rounded-[2rem] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer transition-ease-in-out duration-300">ENVIAR INSTRUÇÕES</button>
            </div>
        </form>
        </>
    );
}