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
            <div className='flex flex-row h-[100vh] w-[100%] mt-[2%] items-center justify-center'>
                <div className='flex w-[45%] mx-[5%]'>
                    <div className='flex flex-col bg-[#162B3F] h-[90vh] w-[100%] rounded rounded-[2rem] items-center'>
                        <Image
                            src="/cadeado.svg"
                            alt="Login Image"
                            width={300}
                            height={300}
                            className='mt-[10%]'
                        />
                        <p className='text=[#FFFFFF] text-[2rem] font-bold mt-[5%]'>ACESSO RESTRITO</p>
                        <p className='text=[#FFFFFF] text-[1rem] text-center mx-[20%] mt-[2%]'>Página destinada apenas a estudantes credenciados do Turing USP. Para entrar use seu email e senha de cadastro Turing.</p>
                    </div>
                </div>
                <div className='flex w-[45%] mx-[5%] justify-center'>
                    <div className='flex flex-col h-[80vh]'>
                        <p className='text-[#000000] text-[2rem] font-bold'>LOGIN:</p>
                        <input
                            type="email"
                            placeholder="EMAIL"
                            className='h-[20hv] w-[30%]'
                            >
                            </input>
                    </div>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </main>
    );
}