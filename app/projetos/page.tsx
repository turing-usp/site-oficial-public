import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Lista_Projetos from "@/components/Lista_projetos";
import { projetosSimulados } from "@/data/projetosDara";

export default async function Projetos() {
    const projetos = projetosSimulados;
    return (
        <div>
                <div className="fixed top-0 left-0 right-0 z-10">
                    <Navbar />
                </div>
                <div>
                    <Lista_Projetos projetosIniciais={projetos} />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
    );
}