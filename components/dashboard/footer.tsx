import Link from "next/link";
import Image from "next/image";
export default function FooterDashboard() {

    return(
        <div>
            <div className="flex flex-row w-[100%] h-auto min-h-[40dvh] py-[5%] bg-gradient-to-r from-[#EBB84A] to-[#F1863D] justify-center rounded-t-[2rem] mt-[3%]">
                <div className="flex flex-col mx-[5%] md:w-[90%] items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center gap-[5%]">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-row items-center">
                                <Link href="/" className="flex flex-row justify-center items-center">
                                    <Image
                                        src="/logo-branca.svg"
                                        alt="Logo Turing USP"
                                        width={50}
                                        height={50}
                                        className="h-[2rem] md:h-[5rem] mr-[0.5rem]"
                                    />
                                    <p className="text-[1rem] text-[#FFFFFF]"style={{ fontFamily: "var(--font-orbitron)" }}>turing.usp</p>
                                </Link>
                                <Link href="https://www.poli.usp.br/">
                                    <Image
                                        src="/poli-logo.png"
                                        alt="POLI USP"
                                        width={100}
                                        height={100}
                                        className="h-[3rem] md:h-[6rem] w-auto ml-[1rem]"
                                    />      
                                </Link>
                                <Link href="https://www.usp.br/">
                                    <Image
                                        src="/logo_usp_branco.png"
                                        alt="USP"
                                        width={100}
                                        height={100}
                                        className="h-[2rem] md:h-[3.5rem] w-auto ml-[1rem]"
                                    />
                                </Link>
                            </div>
                            <p className="my-[3%] md:my-0"> O maior grupo de inteligência artificial da Universidade de São Paulo.</p>
                        </div>
                        <div className="flex flex-col md:ml-[2rem]">
                            <p>Redes Sociais:</p>
                            <div className="flex flex-row">
                                <Link href="https://www.instagram.com/turing.usp/">
                                    <Image
                                        src="/instagram.svg"
                                        alt="Instagram"
                                        width={150}
                                        height={150}
                                        className="h-[2rem] md:h-[3rem] w-auto"
                                    />
                                </Link>
                                <Link href="https://www.linkedin.com/company/turing-usp/">
                                    <Image
                                        src="/in-branco.svg"
                                        alt="LinkedIn"
                                        width={150}
                                        height={150}
                                        className="h-[2rem] md:h-[3rem] w-auto ml-[1rem]"
                                    />
                                </Link>
                                <Link href="https://www.facebook.com/turing.usp/">
                                    <Image
                                        src="/facebook.svg"
                                        alt="Facebook"
                                        width={150}
                                        height={150}
                                        className="h-[2rem] md:h-[3rem] w-auto ml-[1rem]"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-[100%] h-auto min-h-[10vh] bg-[#F1863D] items-center justify-center">
                <p className="text-[#ffffff] text-[0.8rem] text-center md:text-[1rem]">@Plataforma Turing.USP 2026. Todos os direitos são reservados.</p>
            </div>
        </div>
    )


}