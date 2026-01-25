"use server";

import { redirect } from "next/navigation";

export async function handleLogin(formData: FormData) {
    const email = (formData.get("email") || "").toString();
    const password = (formData.get("password") || "").toString();

    // Validação básica no servidor
    if (!email || !password) {
        // Em produção, use um retorno com estado de erro ou redirecione com query params
        // Aqui, apenas interrompemos se os campos estiverem vazios
        return;
    }

    // TODO: Autenticar o usuário (consultar DB/serviço de auth)
    // Exemplo (placeholder):
    // const user = await authService.login(email, password)
    // if (!user) return;

    // Após autenticar, criar sessão/cookies HttpOnly e redirecionar
    // Por ora, apenas redireciona para a página de projetos
    redirect("/projetos");
}
