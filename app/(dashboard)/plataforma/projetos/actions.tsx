"use server";
import { insertprojetos } from "@/lib/auth-actions";
import { redirect } from "next/navigation";


export async function mandarforms(formData: FormData) {

    const titulo = formData.get("titulo") as string;
    const slug = formData.get("slug") as string;
    const resumo = formData.get("resumo") as string;
    const problema = formData.get("problema") as string;
    const confecao = formData.get("confeccao") as string;
    const resultado = formData.get("resultado") as string;
    let areas = formData.get("areas") as string;
    const cat1 = formData.get("cat1") as string;
    const cat2 = formData.get("cat2") as string;
    const cat3 = formData.get("cat3") as string;
    const links = formData.get("links") as string;
    const ano_inicio = formData.get("ano_inicio") as string;
    const ano_termino = formData.get("ano_termino") as string;
    const foto_principal = formData.get("foto_principal") as File;
    const foto_parceiros = formData.get("foto_parceiros") as File;

    const mudarareas: { [key: string]: string } = {
    "RH": "0",
    "Estratégia": "1",
    "Marketing": "2",
    "NLP": "3",
    "Quant": "4",
    "DS": "5",
    "RL": "6",
    "Comp. V.": "7"
};

    const areasArray = areas
    .split(",")
    .map(area => area.trim())
    .map(area => mudarareas[area] || null) 
    .filter(area => area !== null);

    const categorias = [cat1, cat2, cat3].filter(cat => cat !== "");

    // Vamos transformar links em um array e entre aspas
    const linksArray = links.split(",").map(link => link.trim());

    try {
        const { error } = await insertprojetos(
            titulo,
            slug,
            resumo,
            problema,
            confecao,
            resultado,
            areasArray,
            categorias,
            linksArray,
            ano_inicio,
            ano_termino,
            foto_principal,
            foto_parceiros
        );
        if (error) {
            console.error("Erro ao inserir projeto:", error);
            } 
    } 
    catch (error) {
        console.error("Erro ao chamar função de inserção:", error);
    }
    redirect("/plataforma/projetos");
}