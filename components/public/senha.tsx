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
                    className='h-[5vh] w-auto lg:w-[40vw] bg-transparent text-black text-[1rem] mt-[5%] focus:outline-none border-b-[0.1rem] border-black/50 placeholder:text-gray-400 text-left px-1'
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-[70%] -translate-y-1/2 cursor-pointer"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                <Image
                        src={showPassword ? "/venda.svg" : "/olhoaberto.svg"}
                        alt="Toggle Password Visibility"
                        width={20}
                        height={20}
                        className="h-[0.8rem] lg:h-[1.5rem] w-auto"
                />
                </button>
            </div>
        </>
    );
}