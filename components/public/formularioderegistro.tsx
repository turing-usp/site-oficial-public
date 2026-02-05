"use client";

import { useState } from "react";
import Image from "next/image";
import { handleCadastro } from "@/app/(public)/cadastre-se/actions";

interface FormularioDeRegistroProps {
    error?: string;
    success?: string;
}

export default function FormularioDeRegistro({ error, success }: FormularioDeRegistroProps) {
    const [isAlunoUSP, setIsAlunoUSP] = useState("");
    const [genero, setGenero] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [senhaFocused, setSenhaFocused] = useState(false);
    const [datanasc, setDatanasc] = useState("");

    // Mapa de mensagens de erro
    const getErrorMessage = (errorCode: string): string => {
        const erros: { [key: string]: string } = {
            "senha-nao-confere": "As senhas não coincidem.",
            "senha-muito-curta": "A senha deve ter no mínimo 8 caracteres.",
            "senha-sem-maiuscula": "A senha deve conter pelo menos uma letra maiúscula.",
            "senha-sem-numero": "A senha deve conter pelo menos um número.",
            "senha-sem-caractere-especial": "A senha deve conter pelo menos um caractere especial.",
            "registro-falhou": "Erro ao registrar. Tente novamente."
        };
        return erros[errorCode] || "Erro desconhecido. Tente novamente.";
    };

    // Função para verificar os requisitos da senha
    const validarSenha = (senha: string) => {
        return {
            temOitoCaracteres: senha.length >= 8,
            temMaiuscula: /[A-Z]/.test(senha),
            temMinuscula: /[a-z]/.test(senha),
            temNumero: /\d/.test(senha),
            temEspecial: /[@$!%*?&#"'_\-+=<>,.;:\/\\|()[\]{}]/.test(senha)
        };
    };

    const requisitos = validarSenha(senha);

    return(
        <>
        <div className="flex flex-col items-center justify-center">
            <p className='text-[#000000] text-[2rem] font-bold'>CADASTRE-SE:</p>
            
            {/* Exibição de erros */}
            {error && (
                <div className="w-[40vw] mt-[3%] p-[2%] bg-red-100 border border-red-500 rounded-[0.5rem] text-red-700 text-center">
                    {getErrorMessage(error)}
                </div>
            )}
            
            {/* Exibição de sucesso */}
            {success && (
                <div className="w-[40vw] mt-[3%] p-[2%] bg-green-100 border border-green-500 rounded-[0.5rem] text-green-700 text-center">
                    {success === "cadastro-realizado" && "Cadastro realizado com sucesso! Redirecionando para login..."}
                </div>
            )}
            
            <form action={handleCadastro}>
                <div className="flex flex-col">
                    <input 
                        id="nome"
                        name="nome"
                        type="text"
                        placeholder="NOME COMPLETO"
                        required
                        autoComplete="name"
                        className='h-[5vh] w-[40vw] bg-transparent text-black text-[1rem] mt-[7%] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1'
                    ></input>
                    <div className="flex flex-row w-[40vw] gap-[4%] items-end mt-[-3%]">
                        <input 
                            id="datanasc"
                            name="datanasc"
                            type="date"
                            placeholder="DATA DE NASCIMENTO"
                            required
                            autoComplete="bday"
                            value={datanasc}
                            onChange={(e) => setDatanasc(e.target.value)}
                            className={`flex-1 h-[5vh] bg-transparent text-[1rem] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1 
                            ${datanasc === "" ? "text-[#B9BBBD]" : "text-black"}`}
                        ></input>
                        <select 
                            name="genero"
                            required 
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                            className={`h-[5vh] w-[40vw] bg-transparent text-[1rem] mt-[5%] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1 appearance-none cursor-pointer 
                            ${genero === "" ? "text-[#A6A6B0]" : "text-black"}`}
                        >
                            <option value="" disabled className="text-[#000000]">GÊNERO</option>
                            <option value="Homem-cis" className="text-[#000000]">Homem-cis</option>
                            <option value="Mulher-cis" className="text-[#000000]">Mulher-cis</option>
                            <option value="Homem-Trans" className="text-[#000000]">Homem-Trans</option>
                            <option value="Mulher-Trans" className="text-[#000000]">Mulher-Trans</option>
                            <option value="Não-binário" className="text-[#000000]">Não-binário</option>
                            <option value="Outro" className="text-[#000000]">Outro</option>
                            <option value="Prefiro não dizer" className="text-[#000000]">Prefiro não dizer</option>
                        </select>
                    </div>
                    <select 
                        name="isAlunoUSP"
                        required 
                        value={isAlunoUSP}
                        onChange={(e) => setIsAlunoUSP(e.target.value)}
                        className={`h-[5vh] w-[40vw] bg-transparent text-[1rem] mt-[3%] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1 appearance-none cursor-pointer 
                            ${isAlunoUSP === "" ? "text-[#A6A6B0]" : "text-black"}`} 
                    >
                        <option value="" disabled>É Aluno da USP?</option>
                        <option value="sim" className="text-black">Sim</option>
                        <option value="nao" className="text-black">Não</option>
                    </select>
                    
                    {isAlunoUSP === "sim" && (
                        <div>
                            <input 
                                id="email"
                                name="email"
                                type="email"
                                pattern=".*@usp\.br$"
                                title="use um email usp"
                                placeholder="EMAIL USP"
                                required
                                autoComplete="email"
                                className='h-[5vh] w-[40vw] bg-transparent text-black text-[1rem] mt-[3%] focus:outline-none border-b-[0.1rem] border-black/50 text-left px-1'
                            />
                            <p className="text-[0.8rem] text-[#000000] italic">Obs: Só será aceito caso seja um email USP.</p>
                        </div>
                    )}
                    {isAlunoUSP === "nao" && (
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="EMAIL"
                            required
                            autoComplete="email"
                            className='h-[5vh] w-[40vw] bg-transparent text-black text-[1rem] mt-[3%] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1'
                        />
                    )}
                    <div className="flex relative w-full ">
                        <input
                            id="senha"
                            name="senha"
                            type={showPassword ? "text" : "password"}
                            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#&quot;'_\-+=<>,.;:\/\\|()[\]{}])[A-Za-z\d@$!%*?&#&quot;'_\-+=<>,.;:\/\\|()[\]{}]{8,}"
                            minLength={8}
                            placeholder="SENHA"
                            required
                            autoComplete="new-password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            onFocus={() => setSenhaFocused(true)}
                            onBlur={() => setSenhaFocused(false)}
                            className='h-[5vh] w-[40vw] bg-transparent text-black text-[1rem] mt-[3%] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1'
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-[65%] right-[2%] cursor-pointer"
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                        <Image
                                src={showPassword ? "/venda.svg" : "/olhoaberto.svg"}
                                alt="Toggle Password Visibility"
                                width={20}
                                height={20}
                                className="h-[1rem] w-auto"
                        />
                        </button>
                    </div>
                    
                    {/* Indicadores de requisitos da senha */}
                    {senha && senhaFocused && (
                        <div className="mt-[2%] text-[0.85rem] space-y-1">
                            <p className={requisitos.temOitoCaracteres ? "text-green-600" : "text-red-500"}>
                                {requisitos.temOitoCaracteres ? "✓" : "✗"} Pelo menos 8 caracteres
                            </p>
                            <p className={requisitos.temMaiuscula ? "text-green-600" : "text-red-500"}>
                                {requisitos.temMaiuscula ? "✓" : "✗"} Uma letra maiúscula
                            </p>
                            <p className={requisitos.temMinuscula ? "text-green-600" : "text-red-500"}>
                                {requisitos.temMinuscula ? "✓" : "✗"} Uma letra minúscula
                            </p>
                            <p className={requisitos.temNumero ? "text-green-600" : "text-red-500"}>
                                {requisitos.temNumero ? "✓" : "✗"} Um número
                            </p>
                            <p className={requisitos.temEspecial ? "text-green-600" : "text-red-500"}>
                                {requisitos.temEspecial ? "✓" : "✗"} Um caractere especial
                            </p>
                        </div>
                    )}

                        <div className="flex-col relative w-full ">
                            <div className="flex relative w-full ">
                                <input 
                                    id="confirmarsenha"
                                    name="confirmarsenha"
                                    minLength={8}
                                    type={showPassword2 ? "text" : "password"}
                                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#&quot;'_\-+=<>,.;:\/\\|()[\]{}])[A-Za-z\d@$!%*?&#&quot;'_\-+=<>,.;:\/\\|()[\]{}]{8,}"
                                    placeholder="CONFIRMAR SENHA"
                                    required
                                    autoComplete="new-password"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    className='h-[5vh] w-[40vw] bg-transparent text-black text-[1rem] mt-[3%] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1'
                                />
                                <button
                                type="button"
                                onClick={() => setShowPassword2(!showPassword2)}
                                className="absolute right-0 top-[65%] right-[2%] cursor-pointer"
                                aria-label={showPassword2 ? "Ocultar senha" : "Mostrar senha"}
                                >
                                <Image
                                        src={showPassword2 ? "/venda.svg" : "/olhoaberto.svg"}
                                        alt="Toggle Password Visibility"
                                        width={20}
                                        height={20}
                                        className="h-[1rem] w-auto"
                                />
                                </button>
                            </div>
                            {confirmarSenha && senha !== confirmarSenha && (
                                <p className="text-[0.8rem] text-red-500 mt-[1%]">As senhas não coincidem.</p>
                            )}
                        </div>
                    <div className="flex justify-center">
                        <button className="h-[3rem] w-[12rem] border border-[#F1863D] border-[0.1rem] text-[#000000] text-[1rem] mt-[5%] rounded-[2rem] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer transition-ease-in-out duration-300">CADASTRAR</button>
                    </div>
                </div>
            </form>

        </div>
        </>
    );
}