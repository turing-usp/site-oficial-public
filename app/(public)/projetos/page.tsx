import Lista_Projetos from "@/components/public/Lista_projetos";
import { projetosSimulados } from "@/data/projetosDara";

export default async function Projetos() {
    const projetos = projetosSimulados;
    return (
        <div>
            <div>
                <Lista_Projetos projetosIniciais={projetos} />
            </div>
        </div>
    );
}