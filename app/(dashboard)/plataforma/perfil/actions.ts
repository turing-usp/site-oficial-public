"use server";

import { insertdatanew } from "@/lib/auth-actions";

export async function inserirdados(prevState: any, formData: FormData) {
    const nome = (formData.get("nome") || "").toString();
    const datanasc = (formData.get("datanasc") || "").toString();
    const genero = (formData.get("genero") || "").toString();
    const github = (formData.get("GitHub") || "").toString();
    const linkedin = (formData.get("LinkedIN") || "").toString();
    const senha_velha = (formData.get("senhaatual") || "").toString();
    const senha_nova = (formData.get("novasenha") || "").toString();
    const confirmar_senha = (formData.get("confirmarsenha") || "").toString();
    const foto = formData.get("foto") as File | null;

    // Verificar se a foto está nos formatos aceitos
    if (foto && foto.size > 0) {
        const formatosAceitos = ["image/png"];
        if (!formatosAceitos.includes(foto.type)) {
            return {
                error: "Formato de imagem não aceito. Use PNG.",
                success: false,
                data: null
            };
        }
        
        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
        if (foto.size > maxSizeInBytes) {
            return {
                error: "Tamanho da imagem excede o limite de 2MB.",
                success: false,
                data: null
            };
        }
    }

    // Validar campos obrigatórios
    if (!nome || !datanasc || !genero) {
        return {
            error: "Campos obrigatórios não preenchidos: Nome, Data de Nascimento e Gênero são necessários.",
            success: false,
            data: null
        };
    }

    // Chamar a função para atualizar dados
    const { error, data } = await insertdatanew(nome, datanasc, genero, github, linkedin, senha_velha, senha_nova, confirmar_senha, foto);

    if (error) {
        return {
            error: error,
            success: false,
            data: null
        };
    }

    return {
        error: null,
        success: true,
        data: data
    };
}