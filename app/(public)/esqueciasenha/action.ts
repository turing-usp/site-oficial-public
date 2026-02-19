"use server";
import { redirect } from "next/navigation";
import { redefinirSenha } from "@/lib/auth-actions";
export async function handleEsqueciSenha(formData: FormData) {
    const email = formData.get("email") as string;
    const { error } = await redefinirSenha(email);
    if (error) {
        console.error("Erro ao enviar email de redefinição de senha:", error);
        return;
    }
    redirect("/esqueciasenha/sucesso");
}

