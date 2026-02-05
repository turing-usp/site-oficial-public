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

export async function getUserWithProfile() {
    const supabase = await createSupabaseServer();
    
    // 1. Busca o usuário da Autenticação
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
        return { user: null, tipo_usuario: null, nome: null, error: userError };
    }
    
    // 2. Busca o perfil (ADICIONAMOS O 'nome' NO SELECT)
    const { data: perfil, error: perfilError } = await supabase
        .from('Perfis')
        .select('tipo_usuario, nome') // <--- Adicione a coluna 'nome' aqui
        .eq('id', user.id)
        .single();
    
    if (perfilError || !perfil) {
        return { 
            user, 
            tipo_usuario: null, 
            nome: user.user_metadata?.nome || "Usuário", 
            error: perfilError 
        };
    }
    
    return { 
        user, 
        tipo_usuario: perfil.tipo_usuario, 
        nome: perfil.nome, 
        error: null 
    };
}

export async function getNavbarUserData() {
  const supabase = await createSupabaseServer();

  // 1. Busca o usuário da sessão atual
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { user: null, avatarUrl: '/default-avatar.png' };
  }

  // 2. Monta a URL (Como o bucket é público, usamos getPublicUrl)
  // Se o bucket fosse privado, aqui usaríamos createSignedUrl
  const { data: { publicUrl } } = supabase
    .storage
    .from('avatars')
    .getPublicUrl(`${user.id}.png`);

  return {
    avatarUrl: publicUrl
  };
}

export async function updateAvatar() {
  const { user, tipo_usuario, error } = await getUserWithProfile();
  if (error || !user) {
    return { ok: false, error: "Usuário não autenticado." };
  }
  if (tipo_usuario !== 1 && tipo_usuario !== 2) {
    return { ok: false, error: "Sem permissão para atualizar o avatar." };
  }
  const supabase = await createSupabaseServer();
  return { ok: true };
}