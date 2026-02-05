"use client";
import Image from "next/image";
import { handleContato} from "./actions";
import { useState } from "react";

export default function Contato() {
    
    const [areaDeInteresse, setAreaDeInteresse] = useState("");
    const [tipoDeProjeto, setTipoDeProjeto] = useState("");
    const [estadoAtual, setEstadoAtual] = useState("parcerias");

    const conteudos : any = {
        parcerias: {
            imageSrc: "/parcerias.svg",
            titulo: "PARCERIAS",
            descricao: "Se interessou e gostaria de propor um projeto ou parceira? Preencha o formulário ao lado.",
            formTitulo: "FORMULÁRIO DE PARCERIAS",
            formCampos: (
                <>
                    <input name="nome" type="text" placeholder="NOME COMPLETO" required className="h-[5vh] w-full bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    <div className="flex flex-row gap-4">
                        <input name="telefone" type="tel" placeholder="TELEFONE" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                        <input name="email" type="email" placeholder="EMAIL" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    </div>
                    <select
                        name="areasInteresse"
                        required
                        value={areaDeInteresse}
                        onChange={(e) => setAreaDeInteresse(e.target.value)}
                        className={`h-[5vh] w-[40vw] bg-transparent text-[1rem] mt-[5%] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1 appearance-none cursor-pointer
                        ${areaDeInteresse === "" ? "text-[#A6A6B0]" : "text-black"}`}
                        >
                            <option value="" disabled className="text-[#A6A6B0]">ÁREA DE INTERESSE</option>
                            <option value="Computação Visual" className="text-[#000000]">Computação Visual</option>
                            <option value="Processamento de Linguagem Natural" className="text-[#000000]">Processamento de Linguagem Natural</option>
                            <option value="Finanças Quantitativas" className="text-[#000000]">Finanças Quantitativas</option>
                            <option value="Data Science" className="text-[#000000]">Data Science</option>
                            <option value="Aprendizado por Reforço" className="text-[#000000]">Aprendizado por Reforço</option>
                            <option value="Outros" className="text-[#000000]">Outros</option>
                    </select>
                    <select
                        name="tipoDeProjeto"
                        required
                        value={tipoDeProjeto}
                        onChange={(e) => setTipoDeProjeto(e.target.value)}
                        className={`h-[5vh] w-[40vw] bg-transparent text-[1rem] mt-[5%] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1 appearance-none cursor-pointer
                        ${tipoDeProjeto === "" ? "text-[#A6A6B0]" : "text-black"}`}
                        >
                            <option value="" disabled className="text-[#A6A6B0]">TIPO DE PARCERIA</option>
                            <option value="Projeto" className="text-[#000000]">Projeto</option>
                            <option value="Workshop" className="text-[#000000]">Workshop</option>
                            <option value="Palestra" className="text-[#000000]">Palestra</option>
                            <option value="Divulgação" className="text-[#000000]">Divulgação</option>
                            <option value="Outro" className="text-[#000000]">Outro</option>
                    </select>
                </>
            ),
        },
        processoSeletivo: {
            imagemSrc: "/queroturing.svg",
            titulo: "QUERO SER TURING",
            descricao: "Se interessou e gostaria de fazer o processo seletivo do grupo? Preencha o formulário ao lado. É preciso ser aluno da USP na cidade de São Paulo.",
            formTitulo: "FORMULÁRIO DE INSCRIÇÃO",
            formCampos: (
                <>
                    <input name="nome" type="text" placeholder="NOME COMPLETO" required className="h-[5vh] w-full bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    <div className="flex flex-row gap-4">
                        <input name="telefone" type="tel" placeholder="TELEFONE" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                        <input name="email" type="email" placeholder="EMAIL" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    </div>
                    <select
                        name="areasInteresse"
                        required
                        value={areaDeInteresse}
                        onChange={(e) => setAreaDeInteresse(e.target.value)}
                        className={`h-[5vh] w-[40vw] bg-transparent text-[1rem] mt-[5%] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1 appearance-none cursor-pointer
                        ${areaDeInteresse === "" ? "text-[#A6A6B0]" : "text-black"}`}
                        >
                            <option value="" disabled className="text-[#A6A6B0]">ÁREA DE INTERESSE</option>
                            <option value="Computação Visual" className="text-[#000000]">Computação Visual</option>
                            <option value="Processamento de Linguagem Natural" className="text-[#000000]">Processamento de Linguagem Natural</option>
                            <option value="Finanças Quantitativas" className="text-[#000000]">Finanças Quantitativas</option>
                            <option value="Data Science" className="text-[#000000]">Data Science</option>
                            <option value="Aprendizado por Reforço" className="text-[#000000]">Aprendizado por Reforço</option>
                            <option value="Outros" className="text-[#000000]">Outros</option>
                    </select>
                    <input name="curso" type="text" placeholder="CURSO" required className="h-[5vh] w-full bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    <input name="anoDeEntrada" type="number" placeholder="ANO DE ENTRADA" required className="h-[5vh] w-full bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                </>
            ),
        }
    }
    
    return (
    <main className='flex flex-row h-[100vh] w-[100%] items-center justify-start'>
            <div className="flex flex-col bg-[#162B3F] h-[80vh] w-[28%] rounded rounded-[2rem] justify-between items-center ml-[10%] mt-[5%]">
                <Image
                    src={conteudos[estadoAtual].imageSrc}
                    alt="Contato Image"
                    width={300}
                    height={300}
                    className="mt-[10%]"
                />
                <div className="flex flex-col items-center mb-[60%]">
                    <p className="text-[#FFFFFF] text-[2rem] font-bold">{conteudos[estadoAtual].titulo}</p>
                    <p className="text-[#FFFFFF] text-[1rem] text-center mx-[20%]">{conteudos[estadoAtual].descricao}</p>
                </div>
            </div>
    </main>
    );
}