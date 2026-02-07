"use server";

import { redirect } from "next/navigation";
import { insertdatanew } from "@/lib/auth-actions";

export async function inserirdados(formData: FormData) {
    const nome = (formData.get("nome") || "").toString();
    const datanasc = (formData.get("datanasc") || "").toString();
    const genero = (formData.get("genero") || "").toString();
    const github = (formData.get("github") || "").toString();
    const linkedin = (formData.get("linkedin") || "").toString();
    const senha_velha = (formData.get("senhaatual") || "").toString();
    const senha_nova = (formData.get("novasenha") || "").toString();
    const confirmar_senha = (formData.get("confirmarsenha") || "").toString();

    if (!nome || !datanasc || !genero) {
        const error = "Campos obrigatórios não preenchidos.";
        console.error("Erro:", error);
        return redirect("/perfil?error=campos-obrigatorios-nao-preenchidos");
    }

    const { error } = await insertdatanew(nome, datanasc, genero, github, linkedin, senha_velha, senha_nova, confirmar_senha);

    if (error) {
        console.error("Erro:", error);
        return redirect("/perfil?error=erro-ao-atualizar");
    }



}