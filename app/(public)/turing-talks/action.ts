"use server";
import { createSupabaseServer } from "@/lib/supabase-server";

export default async function tt(){
   const articles_server = await createSupabaseServer();

    const { data: articles, error } = await articles_server
        .from("articles")
        .select("*")
        .order("published_at", {ascending: false})
       
    if (error){
        console.error(error);
        return {error : error, success : false, artigos : null}
    }
    return {error : null, success : true, artigos : articles} 
}