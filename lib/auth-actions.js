'use server';
import { createSupabaseServer } from "@/lib/supabase-server";

/**
 * @param {Object} formData - User registration data
 * @param {string} formData.email - User email
 * @param {string} formData.senha - User password
 * @param {string} formData.nome - User name
 * @param {Date} formData.datanasc - User birth date
 * @param {string} formData.genero - User gender
 */

export async function registerUser(formData) {
    const supabase = await createSupabaseServer();
    
    const {data, error} = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
        options: {
            data: {
                nome: formData.nome,
                datanasc: formData.datanasc,
                genero: formData.genero
            }
        }
    });
    return {data, error};
}

export async function loginUser(formData) {
    const supabase = await createSupabaseServer();
    
    const {data, error} = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.senha
    });
    return {data, error};
}

export async function logoutUser() {
    const supabase = await createSupabaseServer();
    
    const { error } = await supabase.auth.signOut();
    return { error };
}