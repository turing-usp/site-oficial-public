"use server";
import { insertprojetos } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import { removerprojeto } from "@/lib/auth-actions";
import { editarprojeto } from "@/lib/auth-actions";

export async function mandarforms(formData: FormData) {
    const acao = formData.get("acao") as string;
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
    
    console.log("Áreas selecionadas (string):", areas);
    const areasArray = areas
    .split(",")
    .map(area => area.trim())
    .filter(area => area !== null);

    const categorias = [cat1, cat2, cat3].filter(cat => cat !== "");

    // Vamos transformar links em um array e entre aspas
    const linksArray = links.split(",").map(link => link.trim());

    console.log("Dados recebidos do formulário:", acao);
    console.log(areasArray);
    console.log(categorias);

     if (acao === "remover") {
        removerprojeto(
            slug
        );
        redirect("/plataforma/projetos");
    }

    else if (acao === "editar") {
        try {
            const { error } = await editarprojeto(
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
                console.error("Erro ao editar projeto:", error);
            }
        } catch (error) {
            console.error("Erro ao chamar função de edição:", error);
        }
        redirect("/plataforma/projetos");
    }
    else {
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
}