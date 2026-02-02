"use client";
import Image from 'next/image';
import {useState, useEffect} from 'react';

const relatos = [
    {
        id:1,
        nome: "João Pedro Canabrava",
        imagem: "/chefe.jpeg",
        relato: "Entrei no Turing USP em 2024 e logo me apaixonei pelo projeto. É um grupo com enorme atuação e potencial de crescimento que reúne pessoas brilhantes para trabalhar em um dos temas que considero mais relevantes para o futuro da sociedade: IA e ML. Integrei a área de finanças quantitativas e fui diretor da área de estratégia nas quais aprendi muito sobre aplicações de ML no mercado financeiro, administração de grupos e liderança, consegui evoluir muito como estudante e profissional e recebi oportunidades no mercado por conta do networking feito. Além disso, tão importante quanto, conheci pessoas e construí relações que levo com muito carinho. Considero que o grupo foi uma das melhores escolhas do meu período universitário e acompanho, animado, os caminhos que o grupo está trilhando e construindo."
    },
    {
        id:2,
        nome: "Renata Leite Leandro",
        imagem: "/RenataLeite.jpeg",
        relato: "Como estudante da FFLCH interessada em processamento de linguagem natural, o Turing foi essencial para construir a ponte entre linguística e programação. O grupo teve um papel fundamental no meu desenvolvimento profissional e pessoal, e considero que meus anos de Turing foram os melhores da minha graduação."
    },
    {
        id:3,
        nome: "Carlos Pereira",
        imagem: "/ssd.svg",
        relato: "O ambiente colaborativo do Turing me ajudou a crescer profissionalmente e pessoalmente. Recomendo a todos!"
    
    }
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    // Função para pular para o próximo passo
    const nextRelato = () => {
        setCurrentIndex((prev) => (prev === relatos.length - 1 ? 0 : prev + 1)); // Prev é o índice atual do relato e relatos.legth é o número total de relatos, logo, se chegarmos no final dos relatos ele volta para o início
    };

    //Efeito para trocar o relato a cada 8 segundos
    useEffect(() => {
        const interval = setInterval(nextRelato,8000)
        return () => clearInterval(interval);
    }, [currentIndex]);
     
    const relatoAtual = relatos[currentIndex];

    return (
        <div className="flex flex-col w-full h-[60vh] bg-[#162B3F] rounded-[1rem] overflow-hidden justify-center">
            <div className="flex flex-row items-center w-full px-[5%] gap-[4%] pt-[3%]">
                <div className="flex-shrink-0 w-[10vh] h-[10vh] rounded-full overflow-hidden border-[0.2rem] border-[#F1863D]">
                    <Image 
                        src={relatoAtual.imagem}
                        alt="Membro da equipe"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-1 justify-between items-center">
                    <p className="text-[#FFFFFF] text-[1.4rem] font-bold">{relatoAtual.nome}</p>
                    <p className="text-[#F1863D] text-[3.5rem] ml-[1rem] self-start">&#10078;</p>
                </div>
            </div>
            <div className='flex flex-row px-[5%] my-[3%]'>
                <button onClick={() => setCurrentIndex(currentIndex === 0 ? relatos.length - 1 : currentIndex - 1)} className='text-[#F1863D] text-[2rem] mr-[5%]'>&#10094;</button>
                <p className='flex-1 text-center text-[#FFFFFF] text-[1rem]'>{relatoAtual.relato}</p>
                <button onClick={() => setCurrentIndex(currentIndex === relatos.length - 1 ? 0 : currentIndex + 1)} className='text-[#F1863D] text-[2rem] ml-[5%]'>&#10095;</button>
            </div>
            <p className="mx-[5%] text-[#F1863D] text-[3.5rem]">&#10077;</p>
        </div>
    );
}
