"use server";
import { redirect } from "next/navigation";
import { logoutUser } from "@/lib/auth-actions";

export async function handleLogout() {
    const { error } = await logoutUser();
    
    if (error) {
        console.error("Erro ao fazer logout:", error);
    }

    // ✅ Cookies HttpOnly removidos automaticamente pelo Supabase SSR
    redirect("/");
}
