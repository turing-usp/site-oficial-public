'use server';
import { createSupabaseServer } from "@/lib/supabase-server";


/**
 * @typedef {Object} CardConfig
 * @property {string} id
 * @property {string} title
 * @property {string} link
 * @property {string} img_src
 * @property {number[]} tipo_perfil - Controle de acesso (nunca expor ao cliente)
 */

/**
 * Configuração de cards com regras de controle de acesso
 * ⚠️ NUNCA expor tipo_perfil ao cliente
 * @type {Record<string, CardConfig>}
 */
const CARDS_CONFIG = {
  perfil: {
    id: 'perfil',
    title: "Perfil",
    link: "/plataforma/perfil",
    img_src: "/perfil.svg",
    tipo_perfil: [0, 1, 2, 3]
  },
  area_trabalho: {
    id: 'area_trabalho',
    title: "Área de Trabalho",
    link: "/plataforma/area-de-trabalho",
    img_src: "/areatrabalho.svg",
    tipo_perfil: [1, 2]
  },
  cursos: {
    id: 'cursos',
    title: "Cursos",
    link: "/plataforma/cursos",
    img_src: "/cursos.svg",
    tipo_perfil: [0, 1, 2, 3]
  },
  admin: {
    id: 'admin',
    title: "Administração",
    link: "/plataforma/admin",
    img_src: "/admin.svg",
    tipo_perfil: [2]
  }
};

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
  // Retorna apenas dados públicos, sem informações de controle de acesso
  return Object.values(CARDS_CONFIG)
    .filter(card => card.tipo_perfil.includes(tipo_usuario))
    .map(({ id, title, link, img_src }) => ({ id, title, link, img_src }));
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
 * @returns {Promise<{user: any; tipo_usuario: number | null; nome: string | null; datanasc: string | null; genero: string | null; email: string | null; avatarUrl: string | null; redes_sociais: {github: string | null; linkedin: string | null} | null; temredes: boolean; temdelete: boolean; error: any}>}
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
      temdelete: false,
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
      temdelete: false,
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
      temdelete: true,
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
    temdelete: false,
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

        const { data, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: senha_velha
        });
        if (error || !data.user) {
            return { data: null, error: "Senha atual incorreta." };
        }

        const { error: updateError } = await supabase.auth.updateUser({
            password: senha_nova
        });
        if (updateError) {
            return { data: null, error: updateError.message };
        }
    }

    // 3. Processar FOTO DE PERFIL
    let avatarUrl = null;
    if (foto && foto.size > 0) {
        const filePath = `${user.id}/profile.png`;
        
        console.log("DEBUG: Iniciando upload", { userId: user.id, filePath, fotoSize: foto.size });
        
        try {
            const buffer = await foto.arrayBuffer();
            
            const { error: uploadError } = await supabase
                .storage
                .from('avatars')
                .upload(filePath, Buffer.from(buffer), { 
                    upsert: true,
                    contentType: foto.type
                });

            if (uploadError) {
                console.error("DEBUG: Erro no upload:", uploadError);
                return { data: null, error: `Erro ao fazer upload: ${uploadError.message}` };
            }

            // IMPORTANTE: Gerar URL com cache busting
            const { data: { publicUrl } } = supabase
                .storage
                .from('avatars')
                .getPublicUrl(filePath);

            // Adicionar timestamp para forçar refresh da imagem
            avatarUrl = `${publicUrl}?t=${Date.now()}`;
            
            console.log("DEBUG: URL gerada:", avatarUrl);
        } catch (err) {
            console.error("DEBUG: Erro no processamento:", err);
            return { data: null, error: `Erro ao processar imagem: ${err.message}` };
        }
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
    console.log("DEBUG: Dados a modificar antes do avatar:", vetor_modificacoes);
    // CRÍTICO: Certificar que a URL é atualizada mesmo que seja null
    if (avatarUrl !== null) {
        vetor_modificacoes.avatar_url = avatarUrl;
        console.log("DEBUG: Atualizando avatar_url com:", avatarUrl);
    }

    // 5. Atualizar PERFIL no banco (se houver modificações)
    if (Object.keys(vetor_modificacoes).length > 0) {
        console.log("DEBUG: Modificações a fazer:", vetor_modificacoes);
        
        const { data, error } = await supabase
            .from('Perfis')
            .update(vetor_modificacoes)
            .eq('id', user.id);

        if (error) {
            console.error("DEBUG: Erro ao atualizar banco:", error);
            return { data: null, error: error.message };
        }
        
        console.log("DEBUG: Update bem-sucedido", data);
        return { data, error: null };
    }
    return { data: null, error: "Nenhuma modificação foi feita." };
}

export async function lerdadospublicos(){
    const supabase = await createSupabaseServer();
    const {data,error} = await supabase
        .from('equipe_ativa')
        .select('*');
        if (error) {
            console.error("Erro ao buscar dados da equipe:", error);
        }
    return {data, error};
}

export async function acessarmembrosadmin() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('Perfis')
    .select('id, nome, email, tipo_usuario, areas, is_banned, banned_until');
    
  if (error) {
    console.error("Erro ao buscar dados dos membros:", error);
    return { error, membros_por_tipo: {}, cargos, areas };
  }

  // Vamos criar uma função: pode editar o cargo? só se for tipo um ou dois, pode ser uma variável 

    data?.forEach(membro => {
      if (membro.tipo_usuario === 2 || membro.tipo_usuario === 1 || membro.tipo_usuario === 3) {
        membro.podeEditarCargo = true; // Adiciona a propriedade diretamente no objeto do membro
      }
      else{
        membro.podeEditarCargo = false; // Adiciona a propriedade diretamente no objeto do membro
      }
    });

  // Vamos criar um dicionário com as áreas e cargos para facilitar a leitura no frontend

  const areas = {
    0: "RH",
    1: "Estratégia",
    2: "Marketing",
    3: "NLP",
    4: "Quant",
    5: "DS",
    6: "RL",
    7:"CompV"
  }

  const cargos = {
    0: "Diretor",
    1: "Vice-Diretor",
    2: "Membro"
  }

  
  // Agrupar membros por tipo (usando números como chaves, não strings)
  const membros_por_tipo = {
    "UC": { titulo: "Usuários Comuns", membros: [], tt_membro: 0 },
    "M": { titulo: "Membros", membros: [], tt_membro: 0 },
    "A": { titulo: "Administradores", membros: [], tt_membro: 0 },
    "E": { titulo: "Ex-Membros", membros: [], tt_membro: 0 }
  };

  const traducao_tipo_usuario = {
    0: "UC",
    1: "M",
    2: "A",
    3: "E"
  };


  // Filtrar no JS
  data?.forEach(membro => {
    if (membros_por_tipo[traducao_tipo_usuario[membro.tipo_usuario]]) {
      membros_por_tipo[traducao_tipo_usuario[membro.tipo_usuario]].membros.push(membro);
    }
  });

  // Calcular o total de membros por tipo
  for (const tipo in membros_por_tipo) {
    membros_por_tipo[tipo].tt_membro = membros_por_tipo[tipo].membros.length;
  }

  return { error: null, membros_por_tipo, cargos, areas };
}

export async function areascargos(id,areas_cargos){
    const supabase = await createSupabaseServer();
    const {data, error} = await supabase 
        .from('Perfis')
        .update({ areas: JSON.parse(areas_cargos) }) 
        .eq('id', id);

    if (error) {
        console.error("Erro ao atualizar áreas e cargos:", error);
        return { error: error.message, success: false };
    }

    return { error: null, success: true };
}