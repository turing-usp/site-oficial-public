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
                    <input name="nome" type="text" placeholder="NOME COMPLETO" required className="h-[5vh] w-[40vw] bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    <div className="flex flex-row w-[40vw] gap-4">
                        <input name="telefone" type="tel" placeholder="TELEFONE" required maxLength={11} className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                        <input name="email" type="email" placeholder="EMAIL" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    </div>
                    <select
                        name="areasDeInteresse"
                        required
                        value={areaDeInteresse}
                        onChange={(e) => setAreaDeInteresse(e.target.value)}
                        className={`h-[5vh] w-[40vw] bg-transparent text-[1rem] mt-[-3%] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1 appearance-none cursor-pointer
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
                    <textarea
                        name="mensagem"
                        placeholder="CONTE UM POUCO SOBRE SUA IDEIA"
                        required
                        className="w-full h-[15vh] bg-[#162B3F] text-white p-4 rounded-xl focus:outline-none placeholder:text-gray-400 mt-[5%] resize-none border-none"
                    ></textarea>
                </>
            ),
        },
        processoSeletivo: {
            imageSrc: "/queroturing.svg",
            titulo: "QUERO SER TURING",
            descricao: "Se interessou e gostaria de fazer o processo seletivo do grupo? Preencha o formulário ao lado. É preciso ser aluno da USP na cidade de São Paulo.",
            formTitulo: "FORMULÁRIO DE INSCRIÇÃO",
            formCampos: (
                <>
                    <input name="nome" type="text" placeholder="NOME COMPLETO" required className="h-[5vh] w-[40vw] bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    <div className="flex flex-row gap-4 w-[40vw]">
                        <input name="telefone" type="tel" placeholder="TELEFONE" required maxLength={11} className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                        <input name="email" type="email" placeholder="EMAIL" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    </div>
                    <div className="flex flex-row gap-4 w-[40vw]">
                        <input name="curso" type="text" placeholder="CURSO E UNIDADE" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                        <input name="anoDeIngresso" type="number" placeholder="ANO DE INGRESSO" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    </div>
                    <select
                        name="areasDeInteresse"
                        required
                        value={areaDeInteresse}
                        onChange={(e) => setAreaDeInteresse(e.target.value)}
                        className={`h-[5vh] w-[40vw] bg-transparent text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1 appearance-none cursor-pointer
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
                </>
            ),
        }
    }
    
    return (
    <main className='flex flex-row h-[100vh] w-[100%] items-center justify-start'>
            <div className="flex flex-col bg-[#162B3F] h-[80vh] w-[30%] rounded-[2rem] items-center ml-[15%] mt-[5%] py-8">
                <Image
                    src={conteudos[estadoAtual].imageSrc}
                    alt="Contato Image"
                    width={300}
                    height={300}
                    className="mt-[3%]"
                />
                <div className="flex flex-col items-center gap-0 flex-1 justify-center px-6 mb-[10%]">
                    <p className="text-[#FFFFFF] text-[2rem] font-bold">{conteudos[estadoAtual].titulo}</p>
                    <p className="text-[#FFFFFF] text-[1rem] text-center mx-[20%]">{conteudos[estadoAtual].descricao}</p>
                </div>
                <div className="flex flex-row justify-between mb-[20%]">
                    <button onClick={() => setEstadoAtual("parcerias")} className={`h-[3rem] w-[12rem] border border-[#F1863D] border-[0.1rem] text-[#FFFFFF] text-[1rem] rounded-[2rem] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer transition-ease-in-out duration-300 mx-[5%] ${estadoAtual === "parcerias" ? "bg-[#F1863D] text-[#FFFFFF]" : "bg-transparent text-[#FFFFFF]"}`}>PARCERIAS</button>
                    <button onClick={() => setEstadoAtual("processoSeletivo")} className={`h-[3rem] w-[12rem] border border-[#F1863D] border-[0.1rem] text-[#FFFFFF] text-[1rem] rounded-[2rem] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer transition-ease-in-out duration-300 mx-[5%] ${estadoAtual === "processoSeletivo" ? "bg-[#F1863D] text-[#FFFFFF]" : "bg-transparent text-[#FFFFFF]"}`}>QUERO SER TURING</button>
                </div>
            </div>
            <div className='flex flex-col flex-1 items-start justify-between ml-[2%] px-[5%] mt-[4%]'>
                <p className='text-[#000000] text-[2rem] font-bold mb-[5%] text-center w-full'>{conteudos[estadoAtual].formTitulo}</p>
                <div className='w-full max-w-[500px]'>
                    <form id="formContato" action={handleContato} className="flex flex-col">
                        {conteudos[estadoAtual].formCampos}
                    </form>
                </div>
                <div className="flex w-full justify-center">
                    <button type="submit" form="formContato" className="h-[3rem] w-[12rem] border border-[#F1863D] border-[0.1rem] text-[#000000] text-[1rem] mt-[5%] rounded-[2rem] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer transition-ease-in-out duration-300 self-center">ENVIAR</button>
                </div>
            </div>
    </main>
    );
}