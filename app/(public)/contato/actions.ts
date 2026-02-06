"use server";
import { redirect } from "next/navigation";
import { contato } from "@/lib/auth-actions";



export async function handleContato(formData: FormData) {
    const nome = (formData.get("nome") || "").toString();
    const email = (formData.get("email") || "").toString();
    const telefone = (formData.get("telefone") || "").toString();
    const mensagem = (formData.get("mensagem") || "").toString();
    const tipoDeProjeto = (formData.get("tipoDeProjeto") || "").toString();
    const areasDeInteresse = (formData.get("areasDeInteresse") || "").toString();
    const anoDeIngresso = (formData.get("anoDeIngresso") || "").toString();
    const curso = (formData.get("curso") || "").toString();

    if (!nome || !email){
        redirect("/contato?error=campos-vazios");
    }
    const {error} = await contato({ nome, email, areasDeInteresse, telefone, mensagem, tipoDeProjeto, anoDeIngresso, curso });
    if (error) {
        console.error("Erro:", error);
        redirect("/contato?error=erro-ao-enviar");
    }
    redirect("/contato?success=mensagem-enviada");
}