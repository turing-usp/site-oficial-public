"use client";
import Image from "next/image";
import Link from "next/link";
import Senha from "@/components/public/senha";
import { handleLogin } from "./actions";

export default function Login() {
    return (
        <main>
            <div className='flex flex-col md:flex-row min-h-screen md:h-[100vh] w-full items-center justify-center py-10 md:py-0'>
                <div className="flex flex-col md:flex-row mx-[5%] mt-[5%] w-[90%] gap-10 md:gap-0">
                    <div className='flex flex-1 justify-center items-center'>
                        <div className='flex flex-col bg-[#162B3F] min-h-[60vh] md:h-[80vh] w-full md:w-[70%] rounded-[2rem] items-center justify-center py-[10%] px-6 mt-[5%]'>
                            <Image
                                src="/cadeado.svg"
                                alt="Login Image"
                                width={300}
                                height={300}
                                className='mt-[0%]'
                            />
                            <p className='text-[#FFFFFF] text-[1.8rem] md:text-[2rem] font-bold text-center'>BEM VINDO DE VOLTA!</p>
                            <p className='text-[#FFFFFF] text-[0.9rem] md:text-[1rem] text-center px-4'>Digite seu email e senha cadastrados para acessar sua conta Turing! Em caso de esquecimento, utilize a opção de recuperação de senha.</p>
                        </div>
                    </div>
                    <div className='flex flex-1 justify-center w-full'>
                        <div className='flex flex-col items-center justify-center w-full max-w-[400px] md:max-w-none'>
                            <p className='text-[#000000] text-[2rem] font-bold mb-[5%]'>LOGIN:</p>
                            <form action={handleLogin}>
                                <div className="w-full flex flex-col items-center">
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="EMAIL"
                                        required
                                        autoComplete="email"
                                        className='h-[5vh] w-full bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1'
                                    />
                                    <Senha/>
                                    <button className="h-[3rem] w-[12rem] border border-[#F1863D] border-[0.1rem] text-[#000000] text-[1rem] mt-[10%] md:mt-[5%] rounded-[2rem] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer transition-all duration-300">ENTRAR</button>
                                    <Link href="/esqueciasenha" className="text-[#000000] italic text-[1rem] mt-[3%] hover:underline">Esqueci minha senha</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}