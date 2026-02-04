"use server";
import { redirect } from "next/navigation";
import { loginUser } from "@/lib/auth-actions";

export async function handleLogin(formData: FormData) {
    const email = (formData.get("email") || "").toString();
    const password = (formData.get("password") || "").toString();

    // Validação básica no servidor
    if (!email || !password) {
        redirect("/login?error=campos-vazios");
        return;
    }

    // loginUser agora cria cookies automaticamente via createSupabaseServer
    const { data, error } = await loginUser({ email, senha: password });

    if (error || !data?.user) {
        redirect("/login?error=credenciais-invalidas");
        console.error("Erro ao fazer login:", error);
        return;
    }

    // ✅ Cookies HttpOnly criados automaticamente pelo Supabase SSR
    // Redireciona para dashboard (middleware do proxy.ts vai proteger)
    redirect("/plataforma");
}
