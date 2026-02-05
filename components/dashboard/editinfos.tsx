"use client";

import Image from "next/image";
import { updateAvatar } from "@/lib/auth-actions";

interface EditInfosProps {
  canChangeImage: boolean;
}

export default function EditInfos({ canChangeImage }: EditInfosProps) {
  const mudarimagem = async () => {
    const result = await updateAvatar();
    if (!result.ok) {
      alert(result.error);
    }
  };

  return (
    <div className="flex-col h-auto mx-[5%] w-[90%]">
      <div className="flex-col my-[3%]">
        <p className="text-[#FFFFFF] text-[1.5rem]">Editar informações do perfil</p>
        <div className="flex justify-center items-center gap-[5%]">
          <Image
            src="/avatar.svg"
            alt="Imagem de perfil"
            width={120}
            height={120}
            className="border-[#F1863D] border-4 rounded-full my-[2%]"
          />
          {canChangeImage ? (
            <button
              onClick={mudarimagem}
              className="text-[1rem] text-[#FFFFFF] bg-[#008FF8] rounded-[2rem] py-2 px-8 hover:bg-[#006FCC] cursor-pointer"
            >
              Alterar Imagem
            </button>
          ) : (
            <p className="text-[#FFFFFF] bg-red-500 rounded-[2rem] py-2 px-8">Você não tem permissão para mudar a imagem.</p>
          )}
        </div>
      </div>
    </div>
  );
}