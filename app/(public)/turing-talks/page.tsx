    import tt from './action';
    import TuringTalksClient from './turingtalks-client';

    export const metadata = {
        title: "Turing Talks - Turing USP",
        description: "Turing Talks é uma série de textos escritos com o intuito de prover a disseminação e democratização do conhecimento em inteligência artificial. Nessa série, especialistas em IA compartilham seus conhecimentos, experiências e insights sobre os mais recentes avanços e tendências na área. Junte-se a nós para explorar o fascinante mundo da inteligência artificial através das Turing Talks e fique por dentro das últimas novidades e inovações nessa tecnologia revolucionária.",
        keywords: ["Turing Talks", "Turing USP", "Inteligência Artificial", "Palestras de IA", "Discussões de IA", "Avanços em IA", "Tendências em IA"],
        authors: [{ name: "Turing USP", url: "https://www.turingusp.com" }],
        openGraph : {
            title: "Turing Talks - Turing USP",
            description: "Turing Talks é uma série de textos escritos com o intuito de prover a disseminação e democratização do conhecimento em inteligência artificial. Nessa série, especialistas em IA compartilham seus conhecimentos, experiências e insights sobre os mais recentes avanços e tendências na área. Junte-se a nós para explorar o fascinante mundo da inteligência artificial através das Turing Talks e fique por dentro das últimas novidades e inovações nessa tecnologia revolucionária.",
            url: "https://www.turingusp.com/turing-talks",
            images: "/logo.svg",
        },
        alternates: {
            canonical: "https://www.turingusp.com/turing-talks",
        }
    };

    export default async function TuringTalks(){
        const {error, success, artigos} = await tt();

        if (!success || !artigos) {
            return <div>Erro ao carregar artigos</div>;
        }

        return <TuringTalksClient artigos={artigos} />;
    }