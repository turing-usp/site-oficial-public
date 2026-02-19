"use server";
import { createSupabaseServer } from "@/lib/supabase-server";

export default async function supaEventos(){
    const eventos_server = await createSupabaseServer();

    const { data: eventos, error } = await eventos_server
        .from("Eventos")
        .select("*")
        .order("id", {ascending: true})
    if (error){
        console.error(error);
        return {error : error, success : false, eventos : null}
    }
    return {error : null, success : true, eventos : eventos}
}