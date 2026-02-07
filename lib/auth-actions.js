'use server';
import { createSupabaseServer } from "@/lib/supabase-server";
import { CARDS_CONFIG } from "@/lib/card-config";

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

export async function contato(formData) {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
        .from('Contato')
        .insert({
            nome: formData.nome,
            email: formData.email,
            areasDeInteresse: formData.areasDeInteresse,
            telefone: formData.telefone,
            mensagem: formData.mensagem,
            tipoDeProjeto: formData.tipoDeProjeto,
            ano_entrada: formData.anoDeIngresso,
            curso : formData.curso
        });
    return { data, error };
}

/**
 * Função para verificar se usuário pode alterar imagem de perfil
 * @param {number} tipo_usuario - The user type
 * @returns {boolean} True if user can change profile image
 */
export async function canChangeProfileImageForUser() {
  const { tipo_usuario, error } = await getUserWithProfile();
  if (error || typeof tipo_usuario !== "number") {
    return false;
  }
  return tipo_usuario === 1 || tipo_usuario === 2;
}

export async function canUserAccessCardForUser(cardId) {
  const { tipo_usuario, error } = await getUserWithProfile();
  if (error || typeof tipo_usuario !== "number") {
    return false;
  }
  const card = CARDS_CONFIG[cardId];
  if (!card) return false;
  return card.tipo_perfil.includes(tipo_usuario);
}

export async function getVisibleCardsForUser() {
  const { tipo_usuario, error } = await getUserWithProfile();
  if (error || typeof tipo_usuario !== "number") {
    return [];
  }
  return Object.values(CARDS_CONFIG).filter(card =>
    card.tipo_perfil.includes(tipo_usuario)
  );
}

export async function getAccessiblePagesForUser() {
  const { tipo_usuario, error } = await getUserWithProfile();
  if (error || typeof tipo_usuario !== "number") {
    return [];
  }
  const accessiblePages = [];
  for (const card of Object.values(CARDS_CONFIG)) {
    if (card.tipo_perfil.includes(tipo_usuario)) {
      accessiblePages.push({ title: card.title, link: card.link, id: card.id });
    }
  }
  return accessiblePages;
}

export async function aceitando_foto(formData) {
  const { user, tipo_usuario, error } = await getUserWithProfile();
  if (error || !user) {
    return { ok: false, error: "Usuário não autenticado." };
  }
  if (tipo_usuario !== 1 && tipo_usuario !== 2) {
    return { ok: false, error: "Sem permissão para atualizar o avatar." };
  }

  const file = formData?.get("file");
  if (!file || typeof file === "string") {
    return { ok: false, error: "Arquivo inválido." };
  }

  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    return { ok: false, error: "Arquivo maior que 2MB." };
  }

  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    return { ok: false, error: "Formato inválido. Use JPG ou PNG." };
  }

  const supabase = await createSupabaseServer();
  const { error: uploadError } = await supabase
    .storage
    .from("avatars")
    .upload(`${user.id}/avatar.png`, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    return { ok: false, error: uploadError.message };
  }

  return { ok: true };
}

/**
 * @returns {Promise<{user: any; tipo_usuario: number | null; nome: string | null; datanasc: string | null; genero: string | null; email: string | null; avatarUrl: string | null; redes_sociais: {github: string | null; linkedin: string | null} | null; temredes: boolean; error: any}>}
 */
export async function lerdadosusuario() {
  const supabase = await createSupabaseServer();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { user: null, tipo_usuario: null, nome: null, datanasc: null, genero: null, email: null, avatarUrl: null, redes_sociais: null, temredes: false, error: userError };
  }
  
  const { data: perfil, error: perfilError } = await supabase
    .from('Perfis')
    .select('tipo_usuario, nome, datanasc, genero, email, redes_sociais, avatar_url')
    .eq('id', user.id)
    .single();

  if (perfilError || !perfil) {
    return {
      user,
      tipo_usuario: null,
      nome: user.user_metadata?.nome || "Usuário",
      datanasc: null,
      genero: null,
      email: null,
      avatarUrl: null,
      redes_sociais: null,
      temredes: false,
      error: perfilError
    };
  }

  if (perfil.tipo_usuario === null || perfil.tipo_usuario === undefined) {
    return {
      user,
      tipo_usuario: null,
      nome: null,
      datanasc: null,
      genero: null,
      email: null,
      avatarUrl: null,
      redes_sociais: null,
      temredes: false,
      error: null
    };
  }

  if (perfil.tipo_usuario === 0 || perfil.tipo_usuario === 3) {
    return {
      user,
      tipo_usuario: perfil.tipo_usuario,
      nome: perfil.nome,
      datanasc: perfil.datanasc,
      genero: perfil.genero,
      email: perfil.email,
      avatarUrl: null,
      redes_sociais: null,
      temredes: false,
      error: null
    };
  }

  return {
    user,
    tipo_usuario: perfil.tipo_usuario,
    nome: perfil.nome,
    datanasc: perfil.datanasc,
    genero: perfil.genero,
    email: perfil.email,
    avatarUrl: perfil.avatar_url,
    redes_sociais: {
    github: perfil.redes_sociais?.github || null,
    linkedin: perfil.redes_sociais?.linkedin || null,
    },
    temredes: true,
    error: null
  };
} 