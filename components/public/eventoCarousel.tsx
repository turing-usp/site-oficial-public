    "use client";
    import Image from 'next/image';
    import { useState, useEffect } from 'react';

    const eventos = [
        {
            id: 1,
            nome: "Workshop for Her",
            imagem: "/WorkshopForHer23.jpg",
            descricao: "O Workshop for Her é o maior evento anual do Turing USP, feito e projetado por mulheres para mulheres com interesse em tecnologia. O evento tem como objetivo capacitar e inspirar mulheres a ingressarem na área de tecnologia, aumentando a diversidade e inclusão no setor. O Workshop for Her oferece uma variedade de atividades, incluindo palestras, workshops práticos e painés de discussão, abordando tema como inteligência artificial e ciência de dados. O evento é grátis e aberto a todas as mulheres, independentemente do nível de experiência."
        },
        {
            id: 2,
            nome: "Bússola Jovem",
            imagem: "/bussolaJovem.jpeg",
            descricao: "O evento foi feito em parceria com o Bússola Jovem, um instituto que tem como objetivo auxiliar jovens de baixa renda em zonas periféricas a ingressarem no mercado de trabalho. O evento contou com palestras sobre o Turing e sobre a vivência universitária, além de uma oficina prática de inteligência artificial."
        },
        {
            id:3, 
            nome: "Workshop de Power BI com a Thorogood",
            imagem: "/thorogoodeturing.jpeg",
            descricao: "O Workshop de Power BI com a Thorogood foi um evento realizado em parceria com a empresa de consultoria de tecnologia Thorogood. O workshop teve como objetivo ensinar os participantes a utilizar a ferramenta de visualização de dados Power BI, desenvolvida pela Microsoft. Durante o evento, os participantes aprenderam a criar dashboards interativos e a analisar dados de forma eficiente utilizando o Power BI. O workshop foi gratuito e aberto a todos os interessados da USP em aprimorar suas habilidades em análise de dados e visualização."
        },
        {
            id:4,
            nome: "Palestra com Nubank",
            imagem: "/nubanketuring.jpeg",
            descricao: "A palestra com o Nubank foi um evento realizado em parceria com a empresa de tecnologia financeira Nubank. Durante a palestra, os representantes do Nubank compartilharam insights sobre a cultura da empresa, as oportunidades de carreira e os desafios enfrentados no setor de fintech. O evento foi gratuito e aberto a todos os interessados da USP em aprender mais sobre o mercado de tecnologia financeira e as oportunidades de trabalho no Nubank."
        }
    ];

    export default function EventoCarousel(){
        const [currentIndex, setCurrentIndex] = useState(0);
        // Função para pular para o próximo passo
        const nextEvento = () => {
            setCurrentIndex((prev) => (prev === eventos.length - 1 ? 0 : prev + 1)); // Prev é o índice atual do relato e relatos.legth é o número total de relatos, logo, se chegarmos no final dos relatos ele volta para o início
        };

        //Efeito para trocar o relato a cada 8 segundos
        useEffect(() => {
            const interval = setInterval(nextEvento, 10000);
            return () => clearInterval(interval);
        }, []);

        const eventoAtual = eventos[currentIndex];

        return (
            <div className="flex w-full max-w-6xl h-[60vh] bg-[#162B3F] rounded-2xl p-8 gap-8 items-center">
                <button onClick={() => setCurrentIndex(currentIndex === 0 ? eventos.length - 1 : currentIndex - 1)} className='text-[#F1863D] text-[2rem]'>&#10094;</button>
                <div className="w-[40%] aspect-video rounded-lg border-2 border-[#F1863D] overflow-hidden">
                    <Image
                        src={eventoAtual.imagem}
                        alt={eventoAtual.nome}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-4 w-[60%] ">
                    <p className="text-[#FFFFFF] text-[1.4rem] font-bold mb-4">{eventoAtual.nome}</p>
                    <div className="flex-1 overflow-y-auto">
                        <p className="text-[#FFFFFF] text-[1rem] text-justify">{eventoAtual.descricao}</p>
                    </div>
                </div>
                <button onClick={() => setCurrentIndex(currentIndex === eventos.length - 1 ? 0 : currentIndex + 1)} className='text-[#F1863D] text-[2rem]'>&#10095;</button>
            </div>
        );
    }

