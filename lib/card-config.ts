// Configuração centralizada de cards (servidor)
export interface CardConfig {
  id: string;
  title: string;
  link: string;
  img_src: string;
  tipo_perfil: number[];
}

export const CARDS_CONFIG: Record<string, CardConfig> = {
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
    link: "/plataforma/area-trabalho",
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

// Função para validar se usuário pode acessar um card
export function canUserAccessCard(tipo_usuario: number, cardId: string): boolean {
  const card = CARDS_CONFIG[cardId];
  if (!card) return false;
  return card.tipo_perfil.includes(tipo_usuario); // aqui ele verifica se o tipo_usuario está na lista de tipos permitidos
}

// Função para pegar cards visíveis para um tipo de usuário
export function getVisibleCards(tipo_usuario: number): CardConfig[] {
  return Object.values(CARDS_CONFIG).filter(card =>
    card.tipo_perfil.includes(tipo_usuario) // aqui ele verifica se o tipo_usuario está na lista de tipos permitidos
  );
}

//Função que será utilizada para enviar quais páginas o integrante terá acesso para colocar na aba lateral de navegação
export function getAccessiblePages(tipo_usuario: number): { title: string; link: string,id: string }[] {
    const accessiblePages: { title: string; link: string,id: string }[] = [];
    for (const card of Object.values(CARDS_CONFIG)) {
        if (card.tipo_perfil.includes(tipo_usuario)) {
            accessiblePages.push({ title: card.title, link: card.link, id: card.id });
        }
    }
    return accessiblePages;
}
