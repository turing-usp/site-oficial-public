import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Lista_Projetos from "@/components/Lista_projetos";
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