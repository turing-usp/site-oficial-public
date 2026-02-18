import { trocarSenha } from "@/lib/auth-actions";
import { redirect } from "next/navigation";

export async function handleUpdatePassword(formData: FormData) {
    const password = formData.get("senha") as string;
    const confirmPassword = formData.get("confirmarsenha") as string;

    if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
    }

    // Vamos validar o número de caracteres e os demais agora 
    if (password.length < 8) {
        alert("A senha deve conter pelo menos 8 caracteres.");
        return;
    }
    if (!/[A-Z]/.test(password)) {
        alert("A senha deve conter pelo menos uma letra maiúscula.");
        return;
    }
    if (!/[a-z]/.test(password)) {
        alert("A senha deve conter pelo menos uma letra minúscula.");
        return;
    }
    if (!/\d/.test(password)) {
        alert("A senha deve conter pelo menos um número.");
        return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        alert("A senha deve conter pelo menos um caractere especial.");
        return;
    }
    
    // A MÁGICA ACONTECE AQUI:
    const { error } = await trocarSenha(password);
    if (error) {
        alert("Erro ao atualizar a senha: " + error.message);
        return;
    }

    //se deu certo vou redirecionar para login, onde o usuário pode entrar com a nova senha
    redirect("/login");
}