"use client";
import Image from "next/image";
import { useState } from "react";

export default function Senha() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <label htmlFor="password" className="sr-only">Senha</label>
            <div className="flex relative w-full">
                <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="SENHA"
                    required
                    autoComplete="current-password"
                    className='h-[5vh] w-[40vw] border-none bg-transparent text-[#000000] text-[1rem] mt-[5%] focus:outline-none pr-8'
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-[50%] -translate-y-1/2 cursor-pointer"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                <Image
                        src={showPassword ? "/venda.svg" : "/olhoaberto.svg"}
                        alt="Toggle Password Visibility"
                        width={20}
                        height={20}
                        className="h-[1.5rem] w-auto"
                />
                </button>
            </div>
            <div className="flex bg-[#000000] opacity-51 h-[0.1rem] w-[100%]"></div>
        </>
    );
}