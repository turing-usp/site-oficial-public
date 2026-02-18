"use server"

import { createClient } from "@/utils/supabase/server"

type Projeto = {
    id: string;
    slug: string;
    area: string[];
    titulo: string;
    resumo: string;
    parceiros?: string;
    imagem: string;
    cat?: any;
    problema?: string;
    confeccao?: string;
    resultados?: string;
    anoinicio?: number;
    anofim?: number;
}

export async function getCatalogo()
{
    /* Faz apenas uma busca. Filtros são feitos diretamente no vetor */
    const supabase = await createClient();
    
    const { data, error } = await supabase.from("Projeto").select("");

    if (error) {
        console.error("Ocorreu o seguinte erro ao buscar os projetos:", error);
        return [];
    }

    return data;
}

export async function getProjeto(slug: string)
{
    const supabase = await createClient();
    const { data, error } = await supabase.from("Projeto").select().eq("slug", slug);

    if (error) {
        console.error("Ocorreu o seguinte erro ao buscar o projeto:", error);
        return undefined;
    }
    
    // Retorna o primeiro projeto encontrado (que é o único)
    return data?.[0];
}
