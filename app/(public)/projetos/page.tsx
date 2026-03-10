import Lista_Projetos from "@/components/public/Lista_projetos";
import { getCatalogo, getProjeto } from "@/app/(public)/projetos/actions";

export const metadata = {
    title: "Projetos - Turing USP",
    description: "Explore os projetos de pesquisa em inteligência artificial desenvolvidos pelo Turing USP, o maior grupo de IA da Universidade de São Paulo. Nossos projetos abrangem uma variedade de tópicos, incluindo aprendizado de máquina, visão computacional, processamento de linguagem natural e muito mais. Junte-se a nós para conhecer as iniciativas inovadoras que estão impulsionando o avanço da inteligência artificial e contribuindo para a democratização do conhecimento nessa área fascinante.",
    keywords: ["Projetos", "Turing USP", "Inteligência Artificial", "Pesquisa em IA", "Aprendizado de Máquina", "Visão Computacional", "Processamento de Linguagem Natural"],
    authors: [{ name: "Turing USP", url: "https://www.turingusp.com" }],
    openGraph : {
        title: "Projetos - Turing USP",
        description: "Explore os projetos de pesquisa em inteligência artificial desenvolvidos pelo Turing USP, o maior grupo de IA da Universidade de São Paulo. Nossos projetos abrangem uma variedade de tópicos, incluindo aprendizado de máquina, visão computacional, processamento de linguagem natural e muito mais. Junte-se a nós para conhecer as iniciativas inovadoras que estão impulsionando o avanço da inteligência artificial e contribuindo para a democratização do conhecimento nessa área fascinante.",
        url: "https://www.turingusp.com/projetos",
        images: "/logo.svg",
    },
    alternates: {
        canonical: "https://www.turingusp.com/projetos",
    }
};

export default async function Projetos() {
    const projetos = await getCatalogo();
    return (
        <div>
            <div>
                <Lista_Projetos projetosIniciais={projetos as any} />
            </div>
        </div>
    );
}