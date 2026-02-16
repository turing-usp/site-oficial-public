"use server";
import { createSupabaseServer } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function removeMember(id: number,nome: string, formData: FormData) {

    //Primeiro vamos verificar se a senha digitada corresponde a # mais os 4 primeiros caracteres do nome do usuário 
    const senha = (formData.get("senha") || "").toString();
    //Vamos pegar as 4 primeiras letras do nome do usuário
    const prefixoEsperado = "#" + nome.slice(0, 4);
    //Vamos deixar tudo em minúsculo para evitar problemas com maiúsculas/minúsculas
    const prefixoEsperadoLower = prefixoEsperado.toLowerCase();
    const senhaLower = senha.toLowerCase();
    if (senhaLower !== prefixoEsperadoLower) {
        return { error: "Senha de confirmação incorreta.", success: false };
    }
    else if (senha.length === 0 || nome.length === 0) {
        return { error: "Nome e senha de confirmação são obrigatórios.", success: false };
    }
    const supabase = await createSupabaseServer();
    // Aqui vamos ajustar para deletar o usuário usando a função RPC que criamos no Supabase, passando o ID do usuário a ser deletado
    const { error: rpcError } = await supabase.rpc('admin_deletar_usuario', {
        target_user_id: id
    });

    if (rpcError) return { error: rpcError.message, success: false };

    revalidatePath('/dashboard/plataforma/admin'); // Revalida o caminho após a remoção
    return { success: true };
}


export async function banMember(id: number, nome: string, formData: FormData) {

    const senha = (formData.get("senha") || "").toString();
    const tempoBanimento = formData.get("tempoBanimento")?.toString() || "0"; // Pega o tempo de banimento selecionado
    // Vamos ter que converter o tempo de banimento para um formato que a função RPC entenda, por exemplo, em dias ou em um timestamp de expiração
    const dicionarioTempoBanimento: { [key: string]: number } = {
        "0": 1, // 1 dia
        "1": 3, // 3 dias
        "2": 7, // 7 dias
        "3": 30, // 1 mês
        "4": 90, // 3 meses
        "5": 365, // 1 ano
        "6": 730, // 2 anos
        "7": 36500 // Banimento permanente
    };
    const diasBanimento = dicionarioTempoBanimento[tempoBanimento] || 1; 
    const prefixoEsperado = "#" + nome.slice(0, 4);
    const prefixoEsperadoLower = prefixoEsperado.toLowerCase().trim();
    const senhaLower = senha.toLowerCase().trim();

    console.log(id,diasBanimento);

    if (senhaLower !== prefixoEsperadoLower) {
        return { error: "Senha de confirmação incorreta.", success: false };
    }
    else if (senha.length === 0 || nome.length === 0) {
        return { error: "Nome e senha de confirmação são obrigatórios.", success: false };
    }
    const supabase = await createSupabaseServer();
    const { error: rpcError } = await supabase.rpc('gerenciar_banimento_seguro', {
        target_user_id: id,
        quantidade_dias: diasBanimento
    });

    if (rpcError) {
        return { error: rpcError.message, success: false };
    }

    revalidatePath('/dashboard/plataforma/admin'); // Revalida o caminho após o banimento
    return { success: true };
}

export async function atualizarCargosEmLote(payload: { p_id: string, p_cargo: number }[]) {
    // 1. Criar o cliente do Supabase no servidor (pega o contexto da sessão)
    const supabase = await createSupabaseServer();

    // 2. Opcional: Validação extra no servidor antes de bater no banco
    if (!payload || payload.length === 0) {
        return { success: false, error: "Nenhuma alteração enviada." };
    }

    // 3. Chamar o RPC
    // Aqui o banco vai validar se quem enviou esse payload realmente é um Admin
    const { error } = await supabase.rpc('atualizar_cargos_lote', {
        updates: payload 
    });

    if (error) {
        console.error("Erro no RPC de lote:", error.message);
        return { success: false, error: error.message };
    }

    // 4. Revalidar a página para os dados novos aparecerem
    revalidatePath('/dashboard/admin');
    
    return { success: true };
}
