import { useState } from "react";

export default function FormularioDeRegistro() {
    const [isAlunoUSP, setIsAlunoUSP] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    return(
        <>
        <div className="flex flex-col items-center justify-center">
            <p className='text-[#000000] text-[2rem] font-bold'>CADASTRE-SE:</p>
            <form>
                <div className="flex flex-col">
                    <input 
                        id="nome"
                        name="nome"
                        type="text"
                        placeholder="NOME COMPLETO"
                        required
                        autoComplete="name"
                        className='flex h-[5vh] w-[40vw] rounded rounded-[2rem] bg-transparent text-[#000000] text-[1rem] mt-[3%] border-[0.1rem] border-[#F1863D] focus:outline-none text-center'
                    ></input>
                    <div className="flex flex-row gap-[2%]">
                        <input 
                            id="datanasc"
                            name="datanasc"
                            type="date"
                            placeholder="DATA DE NASCIMENTO"
                            required
                            autoComplete="bday"
                            className='flex-1 h-[5vh]  rounded rounded-[2rem] bg-transparent text-[#000000] text-[1rem] mt-[3%] border-[0.1rem] border-[#F1863D] focus:outline-none text-center'
                        ></input>
                        <select required className='flex-1 h-[5vh] rounded rounded-[2rem] bg-transparent text-[#000000] text-[1rem] mt-[3%] border-[0.1rem] border-[#F1863D] focus:outline-none text-center'>
                            <option value="" disabled selected className="text-[#000000]">GÊNERO</option>
                            <option value="masculino" className="text-[#000000]">Homem-cis</option>
                            <option value="feminino" className="text-[#000000]">Mulher-cis</option>
                            <option value="outro" className="text-[#000000]">Homem-Trans</option>
                            <option value="outro" className="text-[#000000]">Mulher-Trans</option>
                            <option value="outro" className="text-[#000000]">Não-binário</option>
                            <option value="outro" className="text-[#000000]">Outro</option>
                            <option value="outro" className="text-[#000000]">Prefiro não dizer</option>
                        </select>
                    </div>
                    <select 
                        required 
                        value={isAlunoUSP}
                        onChange={(e) => setIsAlunoUSP(e.target.value)}
                        className='h-[5vh] rounded rounded-[2rem] bg-transparent text-[#000000] text-[1rem] mt-[3%] border-[0.1rem] border-[#F1863D] focus:outline-none text-center'
                    >
                        <option value="" disabled className="text-[#000000]">É Aluno da USP?</option>
                        <option value="sim" className="text-[#000000]">Sim</option>
                        <option value="nao" className="text-[#000000]">Não</option>
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
                                className='h-[5vh] w-[40vw] rounded rounded-[2rem] bg-transparent text-[#000000] text-[1rem] mt-[3%] border-[0.1rem] border-[#F1863D] focus:outline-none text-center valid:text-[#000000] border-[#F1863D] invalid:text-red-500'
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
                            className='h-[5vh] w-[40vw] rounded rounded-[2rem] bg-transparent text-[#000000] text-[1rem] mt-[3%] border-[0.1rem] border-[#F1863D] focus:outline-none text-center'
                        />
                    )}
                    <input
                        id="senha"
                        name="senha"
                        type="password"
                        placeholder="SENHA"
                        required
                        autoComplete="new-password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className='h-[5vh] w-[40vw] rounded rounded-[2rem] bg-transparent text-[#000000] text-[1rem] mt-[3%] border-[0.1rem] border-[#F1863D] focus:outline-none text-center'
                    />
                    <input 
                        id="confirmarsenha"
                        name="confirmarsenha"
                        type="password"
                        placeholder="CONFIRMAR SENHA"
                        required
                        autoComplete="new-password"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        className='h-[5vh] w-[40vw] rounded rounded-[2rem] bg-transparent text-[#000000] text-[1rem] mt-[3%] border-[0.1rem] border-[#F1863D] focus:outline-none text-center'
                    />
                    {confirmarSenha && senha !== confirmarSenha && (
                        <p className="text-[0.8rem] text-red-500 mt-[1%]">As senhas não coincidem.</p>
                    )}
                    <div className="flex justify-center">
                        <button className="h-[3rem] w-[12rem] border border-[#F1863D] border-[0.1rem] text-[#000000] text-[1rem] mt-[5%] rounded-[2rem] hover:bg-[#F1863D] hover:text-[#FFFFFF] cursor-pointer transition-ease-in-out duration-300">CADASTRAR</button>
                    </div>
                </div>
            </form>

        </div>
        </>
    );
}