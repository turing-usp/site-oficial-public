import { createSupabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function Plataforma() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-[100vh] h-auto mx-[5%] w-[90%] justify-center">
        <div className="flex flex-col my-[10%]">
            <p className="text-black text-[3rem] text-center font-bold">Olá, {user.user_metadata?.nome}</p>
            <p className="text-black text-[1.2rem] my-[2%] text-center">Bem-vindo à plataforma Turing USP! Aqui você encontrará conteúdos exclusivos e recursos para aprimorar seus conhecimentos em inteligência artificial.</p>
        </div>
    </div>
  );
}
