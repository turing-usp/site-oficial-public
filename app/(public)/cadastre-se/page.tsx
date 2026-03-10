import Forms from "@/components/public/formularioderegistro";
import Image from "next/image";

type CadastreSePageProps = {
    searchParams?: Promise<{ error?: string; success?: string }>;
};

export const metadata = {
    title: "Cadastre-se - Turing USP",
    description: "Cadastre-se no Turing USP para acessar uma variedade de recursos, incluindo cursos, workshops, projetos de pesquisa e eventos relacionados à inteligência artificial. Junte-se a nós para explorar o fascinante mundo da IA e contribuir para o avanço dessa tecnologia revolucionária.",
    keywords: ["Cadastro", "Turing USP", "Inteligência Artificial", "Cursos de IA", "Workshops de IA", "Projetos de IA", "Eventos de IA"],
    authors: [{ name: "Turing USP", url: "https://www.turingusp.com" }],
    openGraph : {
        title: "Cadastre-se - Turing USP",
        description: "Cadastre-se no Turing USP para acessar uma variedade de recursos, incluindo cursos, workshops, projetos de pesquisa e eventos relacionados à inteligência artificial. Junte-se a nós para explorar o fascinante mundo da IA e contribuir para o avanço dessa tecnologia revolucionária.",
        url: "https://www.turingusp.com/cadastre-se",
        images: "/logo.svg",
    },
    alternates: {
        canonical: "https://www.turingusp.com/cadastre-se",
    }
};

export default async function Cadastre_se({ searchParams }: CadastreSePageProps){
    const resolvedSearchParams = await searchParams;
    const error = resolvedSearchParams?.error || undefined;
    const success = resolvedSearchParams?.success || undefined;
    return(
        <>
        <div className="flex h-auto my-[10%] md:my-[2%] min-h-[100vh]">
            <div className="flex flex-col md:flex-row mx-[5%] items-center justify-center w-[90%]">
                <div className='flex md:flex-1 justify-center'>
                    <div className='mt-[10%] w-[90%] h-auto min-h-[55vh] py-5 md:w-[100%] md:min-h-[40rem] lg:mt-0 lg:min-h-[60vh] lg:h-[80vh] lg:w-[70%] flex flex-col bg-[#162B3F] rounded rounded-[2rem] items-center justify-center'>
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
                <div className="flex-col flex-1 h-auto min-h-[60dvh] md:mt-[10%] md:h-[70vh] w-full bg-[#FFFFFF] ">
                    <Forms error={error} success={success} />
                </div>
            </div>
        </div>
        </>
    )
}