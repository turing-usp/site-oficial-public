import Image from "next/image";
import { notFound } from "next/navigation";
import { getCatalogo, getProjeto } from "@/app/(public)/projetos/actions";

type Projeto = {
    id: string;
    slug: string;
    area: string[];
    titulo: string;
    resumo: string;
    parceiros?: string;
    imagem: string;
    cat?: any;
    problema?: string;
    confeccao?: string;
    resultados?: string;
    anoinicio?: number;
    anofim?: number;
    links?: any;
}


type ProjetoSlugProps = {
    params: Promise<{
        slug: string;
    }>;
};


// Página server component que lê o slug da rota dinâmica
export default async function ProjetoSlug({ params }: ProjetoSlugProps) {
    const { slug } = await params;
    const projeto = await getProjeto(slug);

    if (!projeto) {
        notFound();
    }


    const converteArea: { [key: string]: string } = {
        "0": "Quant", "1": "NLP", "2": "RL", "3": "DS",
        "4": "Comp Visual", "5": "Marketing", "6": "RH", "7": "Estratégia"
    };

    /* Categoria apenas pega. Para área, está convertendo o id para o nome, supondo que houve a conversão no
    cadastro em si*/
    const lista_categorias = projeto.cat;
    const areas_de_projeto = (projeto.area as string[]).map(id => converteArea[id]);

    // Pega as URLS do projeto
    const urls_do_projeto = projeto.urlProjeto as string[];

    return (
        <div>
            <div className="flex flex-row h-[88vh] w-[100%] justify-center items-center">
                <div className="flex mx-[5%]">
                    <p className="flex flex-1 text-[#000000] text-[4rem]">{projeto.titulo}</p>
                    <p className="flex flex-1 text-[#000000] text-[1.4rem]">{projeto.resumo}</p>
                </div>
            </div>
            <div className="flex flex-row bg-[#F1863D] w-[100%] h-[12vh] justify-between items-center">
                <p className="text-[#FFFFFF] text-[1.2rem] mx-[5%] font-bold">PARCEIROS:</p>
                <div className="flex flex-row mx-[5%]">
                    {projeto.parceiros && (
                        <Image
                            src={projeto.parceiros}
                            alt="Parceiros"
                            width={150}
                            height={50}
                            className=""
                        />
                    )}
                    <Image
                        src="/logo-branca.svg"
                        alt="Turing.usp"
                        width={100}
                        height={50}
                        className="w-[100%] h-[3rem] object-contain"
                    />
                </div>
            </div>
            <div className="flex flex-row max-h-[100vh] max-w-[100vw] items-center justify-center object-contain overflow-hidden">
                <Image
                    src={projeto.imagem}
                    alt={projeto.titulo}
                    width={800}
                    height={800}
                    className="w-[100%] h-auto object-contain"
                />
            </div>
            <div className="flex h-[10rem] w-[100%] justify-center items-center">
                <div className="flex mx-[5%] w-[100%] justify-between">
                    <div className="flex flex-1 flex-col items-center">
                        <p className="text-[#000000] text-[2rem] font-bold mb-[2%]">Categorias:</p>
                        <div className="flex gap-[5%]">
                            {lista_categorias.map((categoria: any, index: number) => (
                                <p key={index} className="flex items-center justify-center text-[#000000] text-[0.9rem] border border-[#F1863D] rounded rounded-[2rem] w-[8rem] min-h-[2rem] text-center">{categoria}</p>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col items-center">
                        <p className="text-[#000000] text-[2rem] font-bold mb-[2%]">Anos:</p>
                        <p className="text-[#000000] text-[1rem]">{projeto.anoinicio} - {projeto.anofim}</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center">
                        <p className="text-[#000000] text-[2rem] font-bold mb-[2%]">Áreas:</p>
                        <div className="flex gap-[5%]">
                            {areas_de_projeto.map((area, index: number) => (
                                <p key={index} className="flex items-center justify-center text-[#000000] text-[0.9rem] border border-[#F1863D] rounded rounded-[2rem] w-[8rem] min-h-[2rem] text-center">{area}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center h-[20vh] w-[100%]">
                <div className="flex mx-[5%] w-[100%] justify-center items-center">
                    <p className="text-[#000000] text-[3rem] font-bold">SOBRE O PROJETO:</p>
                </div>
            </div>
            <div className="flex flex-col mx-[5%] mb-[5%] min-h-[20vh] h-auto w-[90%] items-center ">
                <div className="flex mb-[5%] bg-[#F1863D] rounded-[3rem] h-[3rem] w-[12rem] justify-center items-center">
                    <Image
                        src="/problema.svg"
                        alt="Problema"
                        width={50}
                        height={50}
                        className="w-[2rem] h-auto object-contain"
                    />
                    <p className="text-[#FFFFFF] text-[1rem] font-bold ml-[2%]">Problema</p>
                </div>
                <p className="text-[#000000] text-[3rem] font-bold text-center mb-[5%]">PROBLEMA</p>
                <p className="text-[#000000] text-[1.2rem] mb-[2%]">{projeto.problema}</p>
            </div>
            <div className="flex flex-col mx-[5%] mb-[5%] min-h-[20vh] h-auto w-[90%] items-center ">
                <div className="flex mb-[5%] bg-[#162B3F] rounded-[3rem] h-[3rem] w-[12rem] justify-center items-center">
                    <Image
                        src="/confecção.svg"
                        alt="Confecção"
                        width={50}
                        height={50}
                        className="w-[2rem] h-auto object-contain"
                    />
                    <p className="text-[#FFFFFF] text-[1rem] font-bold ml-[2%]">Confecção</p>
                </div>
                <p className="text-[#000000] text-[3rem] font-bold text-center mb-[5%]">CONFECÇÃO</p>
                <p className="text-[#000000] text-[1.2rem] mb-[2%]">{projeto.confeccao}</p>
            </div>
            <div className="flex flex-col mx-[5%] mb-[5%] min-h-[20vh] h-auto w-[90%] items-center ">
                <div className="flex mb-[5%] bg-[#EBB84A] rounded-[3rem] h-[3rem] w-[12rem] justify-center items-center">
                    <Image
                        src="/resultados.svg"
                        alt="Resultados"
                        width={50}
                        height={50}
                        className="w-[2.2rem] h-auto object-contain"
                    />
                    <p className="text-[#FFFFFF] text-[1rem] font-bold ml-[2%]">Resultados</p>
                </div>
                <p className="text-[#000000] text-[3rem] font-bold text-center mb-[5%]">RESULTADOS</p>
                <p className="text-[#000000] text-[1.2rem] mb-[2%]">{projeto.resultados}</p>
            </div>
            {/* Condicional. Só printa a parte de link do projeto se houver um ou mais cadastrado*/}
            {projeto.links && (
                <div className="flex flex-col mx-[5%] mb-[5%] min-h-[20vh] h-auto w-[90%] items-center">
                    <div className="flex mb-[5%] bg-[#4A90D9] rounded-[3rem] h-[3rem] w-[12rem] justify-center items-center">
                        <Image
                            src="/links.svg"
                            alt="Links"
                            width={50}
                            height={50}
                            className="w-[2rem] h-auto object-contain"
                        />
                        <p className="text-[#FFFFFF] text-[1rem] font-bold ml-[2%]">Links</p>
                    </div>
                    <p className="text-[#000000] text-[3rem] font-bold text-center mb-[5%]">LINKS DO PROJETO</p>
                    {(projeto.links as string[]).map((url, index) => (
                        <a key={index} href={url} className="text-[#F1863D] text-[1.2rem] mb-[2%]">{url}</a>
                    ))}
                </div>
            )}
        </div>
    )
}