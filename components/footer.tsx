import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div>
            <div className="flex flex-row w-[100%] h-auto min-h-[40vh] bg-gradient-to-r from-[#EBB84A] to-[#F1863D] justify-center rounded-t-[2rem] mt-[3%]">
                <div className="flex flex-col mx-[5%] w-[90%] items-center justify-center">
                    <div className="flex flex-row items-center gap-[5%]">
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center">
                                <Image
                                    src="/logo-branca.svg"
                                    alt="Logo Turing USP"
                                    width={50}
                                    height={50}
                                    className="h-[5rem] mr-[0.3rem]"
                                />
                                <p
                                    className="text-[1rem] text-[#FFFFFF]"
                                    style={{ fontFamily: "var(--font-orbitron)" }}
                                >
                                    turing.usp
                                </p>
                                <Image
                                    src="/poli-logo.png"
                                    alt="POLI USP"
                                    width={100}
                                    height={100}
                                    className="h-[6rem] w-auto ml-[1rem]"
                                />
                                <Image
                                    src="/logo_usp_branco.png"
                                    alt="USP"
                                    width={100}
                                    height={100}
                                    className="h-[3.5rem] w-auto ml-[1rem]"
                                />
                            </div>
                            <p> O maior grupo de inteligência artificial da Universidade de São Paulo.</p>
                        </div>
                        <div className="flex flex-col">
                            <p>Páginas:</p>
                            <Link href="/">Início</Link>
                            <Link href="/projetos">Projetos</Link>
                            <Link href="/equipes">Equipes</Link>
                            <Link href="/contato">Contato</Link>
                        </div>
                        <div className="flex flex-col ml-[2rem]">
                            <p>Redes Sociais:</p>
                            <div className="flex flex-row">
                                <Link href="https://www.instagram.com/turing.usp/">
                                    <Image
                                        src="/instagram.svg"
                                        alt="Instagram"
                                        width={150}
                                        height={150}
                                        className="h-[3rem] w-auto"
                                    />
                                </Link>
                                <Link href="https://www.linkedin.com/company/turing-usp/">
                                    <Image
                                        src="/in-branco.svg"
                                        alt="LinkedIn"
                                        width={150}
                                        height={150}
                                        className="h-[3rem] w-auto ml-[1rem]"
                                    />
                                </Link>
                                <Link href="https://www.facebook.com/turing.usp/">
                                    <Image
                                        src="/facebook.svg"
                                        alt="Facebook"
                                        width={150}
                                        height={150}
                                        className="h-[3rem] w-auto ml-[1rem]"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-[100%] h-auto min-h-[10vh] bg-[#F1863D] items-center justify-center">
                <p>@Turing 2026. Todos os direitos são reservados.</p>
            </div>
        </div>
    );
}
