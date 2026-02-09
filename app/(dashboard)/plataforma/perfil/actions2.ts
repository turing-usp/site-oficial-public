"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteuser(prevState: any) {
  const supabase = await createClient();

  // 1. Executa a deleção
  const { error: rpcError } = await supabase.rpc('admin_deletar_usuario', {
    target_user_id: (await supabase.auth.getUser()).data.user?.id
  });

  if (rpcError) return { error: rpcError.message, success: false };

  // 2. Desloga e limpa cookies no servidor
  await supabase.auth.signOut();

  // 3. Limpa o cache de rotas do Next.js para todas as páginas protegidas
  revalidatePath('/', 'layout');

  // 4. Redireciona - isso força o navegador a resetar o estado
  redirect("/login");
}