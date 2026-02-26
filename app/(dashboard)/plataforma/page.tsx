import { getUserWithProfile, getVisibleCardsForUser } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import Cards from "@/components/dashboard/cards";

export default async function Plataforma() {
  const { nome, tipo_usuario, error } = await getUserWithProfile();

  if (!nome) {
    redirect('/login');
  }

  // Se não encontrou o tipo_usuario (perfil não existe ou erro), mostra erro visual
  if (tipo_usuario === null || tipo_usuario === undefined) {
    redirect('/login');
  }

  // Busca apenas os cards que o usuário tem permissão
  const visibleCards = await getVisibleCardsForUser();

  return (
    <div className="flex min-h-[100vh] h-auto mx-[5%] w-[90%] justify-center">
        <div className="my-[15%] flex flex-col lg:my-[10%]">
            <p className="text-black text-[2rem] lg:text-[4rem] text-center font-bold">Olá, {nome}</p>
            <p className="text-black text-[1.2rem] my-[2%] text-center">Bem-vindo à plataforma Turing USP! Aqui você encontrará conteúdos exclusivos e recursos para aprimorar seus conhecimentos em inteligência artificial.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-[5%] pb-[10%]">
              {visibleCards.map((card) => (
                <Cards 
                  key={card.id} 
                  title={card.title} 
                  link={card.link} 
                  img_src={card.img_src} 
                />
              ))}
            </div>
        </div>
    </div>
  );
}
