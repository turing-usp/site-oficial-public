"use client";
import { useState, useEffect } from 'react';

export default function palavras() {
    const palavras =  [
            "tecnologia",
            "inovação",
            "futuro",
            "ciência",
            "descoberta",
            "criatividade",
            "engenharia",
            "programação",
            "inteligência artificial",
            "Deep Learning",
            "Machine Learning",
            "NLP",
            "DS",
            "Redes Neurais",
            "Comp. Visual",
            "Quant",
            "Aprendizado por Reforço"
        ];
    const posicoes = [
        { top: '10%', left: '15%', color: '#F1863D' },
        { top: '30%', left: '70%', color: '#EBB84A' },
        { top: '50%', left: '40%', color: '#162B3F' },
        { top: '70%', left: '80%', color: '#F1863D' },
        { top: '20%', left: '50%', color: '#162B3F' },
        { top: '60%', left: '20%', color: '#EBB84A' },
    ]

    const BlinkingWords = () => {
        const [activeWord, setActiveWord] = useState({ wordIdx: 0, posIdx: 0 });
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            const cycle = setInterval(() => {
                setIsVisible(false);
                setTimeout(() => {
                    setActiveWord({
                        wordIdx: Math.floor(Math.random() * palavras.length),
                        posIdx: Math.floor(Math.random() * posicoes.length)
                    });
                    setIsVisible(true);
                }, 2000); // Tempo de invisibilidade
            }, 5000); // Troca a cada 5 segundos
            return () => clearInterval(cycle);
        }, []);

        const currentPos = posicoes[activeWord.posIdx];

        return (
            <div>
                <span
                    className={`blinking-span ${isVisible ? 'fade-in' : 'fade-out'}`}
                    style={{
                        position: 'absolute',
                        top: currentPos.top,
                        left: currentPos.left,
                        color: 'transparent',
                        WebkitTextStroke: `1px ${currentPos.color}`,
                        fontSize: '3rem',
                        fontFamily: 'var(--font-irish-grover)'
                    }}
                >
                    {palavras[activeWord.wordIdx]}
                </span>
            </div>
        );
    };

    return <BlinkingWords />;
}