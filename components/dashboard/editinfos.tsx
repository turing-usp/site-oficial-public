"use client";

import Image from "next/image";
import { updateAvatar } from "@/lib/auth-actions";
import { redirect } from "next/navigation";

interface EditInfosProps {
  canChangeImage: boolean;
}

export default function EditInfos({ canChangeImage }: EditInfosProps) {
  const mudarimagem = async () => {
    const result = await updateAvatar();
    if (!result.ok) {
      redirect('/plataforma'); // Redireciona de volta para a página de perfil em caso de erro
    }
    else{
      
    }
  };

  return (
    <div className="flex-col h-auto mx-[5%] w-[90%]">
      <div className="flex-col my-[3%]">
        <p className="text-[#FFFFFF] text-[1.5rem]">Editar informações do perfil</p>
        <div className="flex justify-center items-center gap-[5%]">
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              src="/avatar.svg"
              alt="Imagem de perfil"
              width={120}
              height={120}
              className="border-[#F1863D] border-4 rounded-full my-[2%]"
            />
            <p className="text-[#FFFFFF] text-[0.8rem] my-[1%]">As fotos devem estar no formato JPG ou PNG e ter no máximo 2MB.</p>
          </div>
          {canChangeImage ? (
              <button
                onClick={mudarimagem}
                className="text-[1rem] text-[#FFFFFF] bg-[#008FF8] rounded-[2rem] py-2 px-10 hover:bg-[#006FCC] cursor-pointer"
              >
                Alterar Imagem
              </button>
          ) : (
            <p className="text-[#FFFFFF] bg-red-500 rounded-[2rem] py-2 px-8">Você não tem permissão para mudar a imagem.</p>
          )}
        </div>
        <p className="text-[#FFFFFF] text-[1.5rem]">Informações básicas</p>
        <label htmlFor="nome" className="text-white text-[1rem] flex mb-[1%] mt-[2%] cursor-pointer">Nome Completo:</label>
        <input id="nome" name="nome" type="text" className="w-full p-2 rounded-full text-white border-[0.1rem] border-[#F1863D] text-center text-[1rem]" placeholder="Digite seu nome completo" />
        <div className="flex items-center justify-center gap-[5%] my-[2%]">
          <div className="flex-col flex-1">
            <label htmlFor="datanasc" className="text-white text-[1rem] flex my-[1%] cursor-pointer">Data de Nascimento</label>
            <input id="datanasc" name="datanasc" type="date" className="w-full p-2 rounded-full text-white border-[0.1rem] border-[#F1863D] text-center text-[1rem]" />
          </div>
          <div className="flex-col flex-1">
            <label htmlFor="genero" className="text-white text-[1rem] flex my-[1%] cursor-pointer">Gênero:</label>
            <select id="genero" name="genero" className="w-full p-2 rounded-full text-white border-[0.1rem] border-[#F1863D] text-center text-[1rem] bg-transparent">
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
        </div>
        <p className="text-[#FFFFFF] text-[1.5rem] my-[2%]">Informações de contato</p>
        <label htmlFor="email" className="text-white text-[1rem] flex my-[1%] cursor-pointer">Email:</label>
        <input readOnly id="email" name="email" type="email" className="w-full p-2 rounded-full text-white border-[0.1rem] border-[#F1863D] text-center text-[1rem]" placeholder="Digite seu email" />
        <div className="flex items-center justify-center gap-[5%] my-[2%]">
          <div className="flex-col flex-1">
            <label htmlFor="LinkedIN" className="text-white text-[1rem] flex my-[1%] cursor-pointer">LinkedIN</label>
            <input id="LinkedIN" name="LinkedIN" type="text" className="w-full p-2 rounded-full text-white border-[0.1rem] border-[#F1863D] text-center text-[1rem]" placeholder="Digite o link do seu LinkedIN" />
          </div>
          <div className="flex-col flex-1">
            <label htmlFor="GitHub" className="text-white text-[1rem] flex my-[1%] cursor-pointer">GitHub</label>
            <input id="GitHub" name="GitHub" type="text" className="w-full p-2 rounded-full text-white border-[0.1rem] border-[#F1863D] text-center text-[1rem]" placeholder="Digite o link do seu GitHub" />
          </div>
        </div>
        <p className="text-[#FFFFFF] text-[1.5rem] my-[2%]">Redefinir Senha</p>
        <label htmlFor="senhaatual" className="text-white text-[1rem] flex my-[1%] cursor-pointer">Senha atual:</label>
        <input id="senhaatual" name="senhaatual" type="password" className="w-full p-2 rounded-full text-white border-[0.1rem] border-[#F1863D] text-center text-[1rem]" placeholder="Digite sua senha atual" />
        <label htmlFor="novasenha" className="text-white text-[1rem] flex my-[1%] cursor-pointer">Nova senha:</label>
        <input id="novasenha" name="novasenha" type="password" className="w-full p-2 rounded-full text-white border-[0.1rem] border-[#F1863D] text-center text-[1rem]" placeholder="Digite sua nova senha" />
        <label htmlFor="confirmarsenha" className="text-white text-[1rem] flex my-[1%] cursor-pointer">Confirmar nova senha:</label>
        <input id="confirmarsenha" name="confirmarsenha" type="password" className="w-full p-2 rounded-full text-white border-[0.1rem] border-[#F1863D] text-center text-[1rem]" placeholder="Confirme sua nova senha" />
        <div className="my-[2%] gap-[3%] flex justify-end items-center">
          <button className="text-[1rem] text-[#FFFFFF] bg-transparent rounded-[2rem] border-[0.1rem] border-[#F1863D] py-2 px-8 hover:border-transparent hover:bg-[#C75B2B] cursor-pointer">Cancelar</button>
          <button className="text-[1rem] text-[#FFFFFF] bg-[#F1863D] rounded-[2rem]  py-2 px-10 hover:bg-[#C75B2B] cursor-pointer">Salvar</button>
        </div>
        <div className="my-[2%] gap-[3%] flex-col justify-end items-center">
          <p className="text-[#FFFFFF] text-[1.5rem] my-[2%]">Excluir a conta</p>
          <p className="text-[#FFFFFF] text-[1rem] my-[2%]">Essa ação tem consequências permanentes e não pode ser desfeita.</p>
          <button className="text-[1rem] text-[#FFFFFF] bg-red-800 rounded-[2rem] py-2 px-8 hover:bg-red-900 cursor-pointer">Excluir conta</button>
        </div>
      </div>
    </div>
  );
}