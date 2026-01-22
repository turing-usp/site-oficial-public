import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import Link from "next/link";

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
                            <p className='text-[#FFFFFF] text-[2rem] font-bold mt-[5%]'>ACESSO RESTRITO</p>
                            <p className='text-[#FFFFFF] text-[1rem] text-center mx-[20%] mt-[2%]'>Página destinada apenas a estudantes credenciados do Turing USP. Para entrar use seu email e senha de cadastro Turing.</p>
                        </div>
                    </div>
                    <div className='flex flex-1 justify-center'>
                        <div className='flex flex-col items-center'>
                            <p className='text-[#000000] text-[2rem] font-bold'>LOGIN:</p>
                            <input
                                type="email"
                                placeholder="EMAIL"
                                className='h-[5vh] w-[30vw]'
                                >
                            </input>
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