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
                    <input name="nome" type="text" placeholder="NOME COMPLETO" required className="h-[5vh] w-full lg:w-[35vw] bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[35vw] mb-[5%] lg:mb-0 mt-[5%] lg:mt-0">
                        <input name="telefone" type="tel" placeholder="TELEFONE" required maxLength={11} className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                        <input name="email" type="email" placeholder="EMAIL" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    </div>
                    <select
                        name="areasDeInteresse"
                        required
                        value={areaDeInteresse}
                        onChange={(e) => setAreaDeInteresse(e.target.value)}
                        className={`h-[5vh] w-full lg:w-[35vw] bg-transparent text-[1rem] mt-[-3%] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1 appearance-none cursor-pointer
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
                        className={`h-[5vh] w-full lg:w-[35vw] bg-transparent text-[1rem] mt-[5%] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1 appearance-none cursor-pointer
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
                    <input name="nome" type="text" placeholder="NOME COMPLETO" required className="h-[5vh] w-full lg:w-[35vw] bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[35vw] mb-[5%] lg:mb-0 mt-[5%] lg:mt-0">
                        <input name="telefone" type="tel" placeholder="TELEFONE" required maxLength={11} className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                        <input name="email" type="email" placeholder="EMAIL" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[35vw] mb-[5%] lg:mb-0">
                        <input name="curso" type="text" placeholder="CURSO E UNIDADE" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                        <input name="anoDeIngresso" type="number" placeholder="ANO DE INGRESSO" required className="h-[5vh] flex-1 bg-transparent text-black text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1 mb-[5%]" />
                    </div>
                    <select
                        name="areasDeInteresse"
                        required
                        value={areaDeInteresse}
                        onChange={(e) => setAreaDeInteresse(e.target.value)}
                        className={`h-[5vh] w-full lg:w-[35vw] bg-transparent text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1 appearance-none cursor-pointer
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
    <main className='flex flex-col md:flex-row min-h-screen md:h-[100vh] w-full items-center justify-center py-10 md:py-0'>
        <div className="flex flex-col md:flex-row mx-[5%] mt-[5%] w-[90%] gap-10 md:gap-0">
            <div className='flex md:w-[40%] lg:flex-1 justify-center items-center'>
                <div className='flex flex-col bg-[#162B3F] min-h-[70vh] md:h-[80vh] w-full md:w-[100%] lg:w-[70%] rounded-[2rem] items-center justify-between py-[10%] px-6 md:ml-[-10%] lg:ml-0'>
                    <Image
                        src={conteudos[estadoAtual].imageSrc}
                        alt="Contato Image"
                        width={300}
                        height={300}
                        className="mt-[3%]"
                    />
                    <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-[#FFFFFF] text-[1.8rem] lg:text-[2rem] font-bold text-center">{conteudos[estadoAtual].titulo}</p>
                        <p className="text-[#FFFFFF] text-[0.9rem] lg:text-[1rem] text-center mx-[20%]">{conteudos[estadoAtual].descricao}</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-3 w-full max-w-[300px] lg:max-w-none">
                        <button onClick={() => setEstadoAtual("parcerias")} className={`h-[3rem] w-[12rem] border border-[#F1863D] border-[0.1rem] text-[#FFFFFF] text-[1rem] rounded-[2rem] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer transition-ease-in-out duration-300 ${estadoAtual === "parcerias" ? "bg-[#F1863D] text-[#FFFFFF]" : "bg-transparent text-[#FFFFFF]"}`}>PARCERIAS</button>
                        <button onClick={() => setEstadoAtual("processoSeletivo")} className={`h-[3rem] w-[12rem] border border-[#F1863D] border-[0.1rem] text-[#FFFFFF] text-[1rem] rounded-[2rem] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer transition-ease-in-out duration-300 ${estadoAtual === "processoSeletivo" ? "bg-[#F1863D] text-[#FFFFFF]" : "bg-transparent text-[#FFFFFF]"}`}>QUERO SER TURING</button>
                    </div>
                </div>
            </div>
            <div className='flex md:w-[60%] lg:flex-1 justify-center items-center'>
                <div className='flex flex-col items-center justify-center w-full'>
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
            </div>
        </div>
    </main>
    );
}