import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";

export default function Projetos() {
    return (
        <div>
                <div className="fixed top-0 left-0 right-0 z-10">
                    <Navbar />
                </div>
                <div className="flex flex-row h-[100vh] w-[100%]">
                    <div className="flex flex-col mx-[20%] items-center justify-center text-center gap-[2rem]">
                        <p className="text-[1rem] text-[#766F6F] font-bold">NOSSOS PROJETOS</p>
                        <p className="text-[4rem] font-bold text-[#000000]">O FUTURO, PROJETO A PROJETO</p>
                        <p className="text-[1.5rem] text-[#000000] text-center">Conheça as iniciativas e tecnologias que desenvolvemos no Turing USP para moldar o amanhã da inteligência artificial.</p>
                    </div>
                   <Image 
                      src="/projimgd.svg"
                        alt="Projetos"
                        width={800}
                        height={800}
                        className="absolute w-[35vh] h-auto object-contain right-0 mt-[10%]"
                   />
                   <Image 
                      src="/projimge.svg"
                        alt="Projetos"
                        width={800}
                        height={800}
                        className="absolute w-[35vh] h-auto object-contain object-fill rotate-180 left mt-[15%]"
                   />
                </div>
                <div>
                    <Footer />
                </div>
        </div>
    );
}