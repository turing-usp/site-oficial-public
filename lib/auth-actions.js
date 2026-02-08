'use server';
import { createSupabaseServer } from "@/lib/supabase-server";
import { CARDS_CONFIG } from "@/lib/card-config";

/**
 * Função auxiliar para obter usuário autenticado
 * @returns {Promise<{user: any; error: string | null}>}
 */
async function getAuthenticatedUser() {
  const supabase = await createSupabaseServer();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { user: null, error: "Usuário não autenticado." };
  }
  
  return { user, error: null };
}

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
      .select('tipo_usuario, nome, avatar_url')
      .eq('id', user.id)
      .single();
    
    if (perfilError || !perfil) {
      return { 
        user, 
        tipo_usuario: null, 
        nome: user.user_metadata?.nome || "Usuário", 
        avatarUrl: null,
        error: perfilError 
      };
    }
    
    return { 
      user, 
      tipo_usuario: perfil.tipo_usuario, 
      nome: perfil.nome, 
      avatarUrl: perfil.avatar_url || null,
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

export async function insertdatanew(nome, datanasc, genero, github, linkedin, senha_velha, senha_nova, confirmar_senha, foto) {
    // 1. Autenticar usuário UMA ÚNICA VEZ
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError) {
        return { data: null, error: authError };
    }

    const supabase = await createSupabaseServer();

    // 2. Processar alteração de SENHA (se fornecida)
    if (senha_velha && senha_nova && confirmar_senha) {
        if (senha_nova !== confirmar_senha) {
            return { data: null, error: "As senhas novas não coincidem." };
        }

        // Verificar se a senha atual está correta
        const { data, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: senha_velha
        });
        if (error || !data.user) {
            return { data: null, error: "Senha atual incorreta." };
        }

        // Atualizar para a nova senha
        const { error: updateError } = await supabase.auth.updateUser({
            password: senha_nova
        });
        if (updateError) {
            return { data: null, error: updateError.message };
        }
    }

    // 3. Processar FOTO DE PERFIL
      let avatarUrl = null;
      if (foto) {
        
        // Usamos o ID do usuário como nome da pasta. 
        // O arquivo dentro pode se chamar 'profile.png' ou qualquer nome fixo.
        const filePath = `${user.id}/profile.png`; 

        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('avatars')
            .upload(filePath, foto, { upsert: true });

        if (uploadError) {
            return { data: null, error: uploadError.message };
        }

        // Obter URL pública usando o mesmo caminho do ID
        const { data: { publicUrl } } = supabase
            .storage
            .from('avatars')
            .getPublicUrl(filePath);

        avatarUrl = publicUrl;
      }

    // 4. Preparar dados do PERFIL para atualizar
    const vetor_modificacoes = {};

    if (nome) vetor_modificacoes.nome = nome;
    if (datanasc) vetor_modificacoes.datanasc = datanasc;
    if (genero) vetor_modificacoes.genero = genero;
    if (github || linkedin) {
        vetor_modificacoes.redes_sociais = {
            github: github || null,
            linkedin: linkedin || null
        };
    }
    if (avatarUrl) vetor_modificacoes.avatar_url = avatarUrl;

    // 5. Atualizar PERFIL no banco (se houver modificações)
    if (Object.keys(vetor_modificacoes).length > 0) {
        const { data, error } = await supabase
            .from('Perfis')
            .update(vetor_modificacoes)
            .eq('id', user.id);

        if (error) {
            return { data: null, error: error.message };
        }
        return { data, error: null };
    }
    return { data: null, error: "Nenhuma modificação foi feita." };
}