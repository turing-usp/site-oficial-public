"use server"; 
import { redirect } from "next/navigation";
import {registerUser} from "@/lib/auth-actions";

export async function handleCadastro(formData: FormData) {
    const nome = (formData.get("nome") || "").toString();
    const email = (formData.get("email") || "").toString();
    let datanasc = (formData.get("datanasc")|| "").toString();
    const genero = (formData.get("genero") || "").toString();
    const senha = (formData.get("senha") || "").toString();
    const confirmarSenha = (formData.get("confirmarsenha") || "").toString();

    // Vamos começar configurando as validações de senha 
    if (senha !== confirmarSenha) {
        redirect("/cadastre-se?error=senha-nao-confere");
        return;     
    }

    if (senha.length < 8) {
        redirect("/cadastre-se?error=senha-muito-curta");
        return;     
    }

    if (!/[A-Z]/.test(senha)) {
        redirect("/cadastre-se?error=senha-sem-maiuscula");
        return;     
    }

    if (!/[0-9]/.test(senha)) {
        redirect("/cadastre-se?error=senha-sem-numero");
        return;     
    }

    if (!/[@$!%*?&#"'_\-+=<>,.;:\/\\|()[\]{}]/.test(senha)) {
        redirect("/cadastre-se?error=senha-sem-caractere-especial");
        return;     
    }

    //Agora vamos passar para a função de registro
    const { data, error } = await registerUser({ nome, email, datanasc: new Date(datanasc), genero, senha });

    if (error) {
        console.error("Erro no cadastro:", error);
        redirect("/cadastre-se?error=registro-falhou");
        return;     
    }

    if (!data?.user) {
        redirect("/cadastre-se?error=registro-falhou");
        return;     
    }

    // Sucesso
    redirect("/login?success=cadastro-realizado");

}