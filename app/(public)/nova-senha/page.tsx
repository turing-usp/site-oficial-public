"use client";
import { useState } from "react";
import Image from "next/image";
import { handleUpdatePassword } from "./actions";

export default function Novasenha() {
    const [senha, setSenha] = useState("");
    const [senhaFocused, setSenhaFocused] = useState(false);

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


    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [confirmarSenha, setConfirmarSenha] = useState("");
    return (
        <div className="flex flex-col items-center justify-center h-[100vh] w-full">
            <form action={handleUpdatePassword} className="flex flex-col gap-4 w-[350px]">
                <h1 className="text-2xl text-[#000000] font-bold mb-4">Nova Senha</h1>
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
                                className="h-[0.7rem] w-auto"
                        />
                        </button>
                    </div>
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
                {/* Input de Confirmar Senha */}
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
                                className="h-[0.7rem] w-auto"
                        />
                        </button>
                    </div>
                    {confirmarSenha && senha !== confirmarSenha && (
                        <p className="text-[0.8rem] text-red-500 mt-[1%]">As senhas não coincidem.</p>
                    )}
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        type="submit" 
                        className="h-[3rem] w-[12rem] border border-[#F1863D] border-[0.1rem] text-[#000000] text-[1rem] mt-[5%] rounded-[1rem] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer transition-ease-in-out duration-300"
                    >
                        Atualizar Senha
                    </button>
                </div>
            </form>
        </div>
    );
}