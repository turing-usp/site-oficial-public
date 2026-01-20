export interface Projeto {
  id: string;
  slug: string;
  area1: number;
  area2: number | null;
  area3: number | null;
  titulo: string;
  resumo: string;
  parceiros: string;
  nome_imagem: string;
  cat1: string;
  cat2: string | null;
  cat3: string | null;
  problema: string;
  confeccao: string;
  resultados: string;
}

const categoriasDisponiveis = ["QUANT", "NLP", "RL", "Data Science", "Computer Vision", "Marketing", "RH", "Estratégia"];

export const gerarProjetoAleatorio = (index: number): Projeto => {
  const getRandomArea = (allowNull = false) => {
    if (allowNull && Math.random() > 0.8) return null; // 20% de chance de ser nulo
    return Math.floor(Math.random() * 8); // 0 a 7
  };

  const titulo = `Projeto Turing ${index + 1}`;
  
  // Criando o slug a partir do título (ex: "projeto-turing-1")
  const slug = titulo.toLowerCase().replace(/ /g, "-");

  return {
    id: String(index + 1),
    slug: slug,
    area1: getRandomArea(false) as number,
    area2: getRandomArea(true),
    area3: getRandomArea(true),
    titulo: titulo,
    resumo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus a neque non pharetra. Um resumo longo para testar o layout do header.",
    parceiros: `/parceiro-${Math.floor(Math.random() * 3) + 1}.png`,
    nome_imagem: "/pro.png",
    cat1: categoriasDisponiveis[Math.floor(Math.random() * categoriasDisponiveis.length)],
    cat2: Math.random() > 0.5 ? "Deep Learning" : null,
    cat3: Math.random() > 0.8 ? "Python" : null,
    problema: "Descrição longa do problema: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    confeccao: "Descrição da confecção: Utilizamos modelos de última geração, integrando bibliotecas como PyTorch e Scikit-learn para garantir a máxima eficiência.",
    resultados: "Resultados obtidos: Conseguimos uma acurácia de 95% nos testes iniciais, superando as expectativas do grupo de pesquisa."
  };
};

// Gerando uma lista de 10 projetos para simulação
export const projetosSimulados: Projeto[] = Array.from({ length: 10 }, (_, i) => gerarProjetoAleatorio(i));