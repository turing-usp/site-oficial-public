"use client";

import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import Link from "next/link";
import Senha from "@/components/senha";
import { handleLogin } from "./actions";

export default function Login() {
    return (
        <main>
            <div className='fixed top-0 left-0 right-0 z-10'>
                <Navbar/>
            </div>
            <div className='flex flex-row h-[100vh] w-[100%] items-center justify-center'>
                <div className="flex mx-[5%] mt-[5%]">
                    <div className='flex flex-1 justify-center'>
                        <div className='flex flex-col bg-[#162B3F] h-[80vh] w-[70%] rounded rounded-[2rem] items-center'>
                            <Image
                                src="/cadeado.svg"
                                alt="Login Image"
                                width={300}
                                height={300}
                                className='mt-[10%]'
                            />
                            <p className='text-[#FFFFFF] text-[2rem] font-bold mt-[5%]'>BEM VINDO DE VOLTA!</p>
                            <p className='text-[#FFFFFF] text-[1rem] text-center mx-[20%] mt-[2%]'>Digite seu email e senha cadastrados para acessar sua conta Turing! Em caso de esquecimento, utilize a opção de recuperação de senha.</p>
                        </div>
                    </div>
                    <div className='flex flex-1 justify-center'>
                        <div className='flex flex-col items-center justify-center'>
                            <p className='text-[#000000] text-[2rem] font-bold'>LOGIN:</p>
                            <form action={handleLogin}>
                                <div className="flex flex-col mt-[5%] items-center">
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="EMAIL"
                                        required
                                        autoComplete="email"
                                        className='h-[5vh] w-[40vw] border-none bg-transparent text-[#000000] text-[1rem] mt-[5%] focus:outline-none'
                                    />
                                    <div className="flex bg-[#000000] opacity-51 h-[0.1rem] w-[100%]"></div>
                                    <Senha/>
                                    <button className="h-[3rem] w-[12rem] border border-[#F1863D] border-[0.1rem] text-[#000000] text-[1rem] mt-[5%] rounded-[2rem] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer transition-ease-in-out duration-300">ENTRAR</button>
                                    <Link href="/cadastre-se" className="text-[#000000] italic text-[1rem] mt-[5%] hover:underline">Esqueceu a senha?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </main>
    );
}