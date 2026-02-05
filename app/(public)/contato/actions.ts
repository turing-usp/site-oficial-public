"use server";
import { redirect } from "next/navigation";
import { createClient} from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function handleContato(formData: FormData) {
    const nome = (formData.get("nome") || "").toString();
    const email = (formData.get("email") || "").toString();
    const areasInteresse = (formData.get("areasInteresse") || "").toString();
    const telefone = (formData.get("telefone") || "").toString();
    const mensagem = (formData.get("mensagem") || "").toString();
    const tipoProjeto = (formData.get("tipoProjeto") || "").toString();

    if (!nome || !email || !mensagem){
        redirect("/contato?error=campos-vazios");
    }

    const {error} = await supabase
        .from("contatos")
        .insert([{ nome, email, areasInteresse, telefone, mensagem }]);
    
    if (error) {
        console.error("Erro:", error);
        redirect("/contato?error=erro-ao-enviar");
    }

    redirect("/contato?success=mensagem-enviada");
}