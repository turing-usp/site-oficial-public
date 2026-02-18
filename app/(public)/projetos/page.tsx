import Lista_Projetos from "@/components/public/Lista_projetos";
import { getCatalogo, getProjeto } from "@/app/(public)/projetos/actions";

export default async function Projetos() {
    const projetos = await getCatalogo();
    return (
        <div>
            <div>
                <Lista_Projetos projetosIniciais={projetos as any} />
            </div>
        </div>
    );
}