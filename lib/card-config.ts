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

