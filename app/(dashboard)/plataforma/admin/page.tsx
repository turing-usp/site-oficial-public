import ContainerBlue from "@/components/ui/containerblue";
import { acessarmembrosadmin } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import Adminwrapper from "@/components/dashboard/adminwrapper";

export default async function AdminPage() {
    const { error , membros_por_tipo, cargos, areas} = await acessarmembrosadmin();
    if (error) {
        redirect('/plataforma');
    }
    
    return (
        <>
        <ContainerBlue>
            <Adminwrapper data={{membros: membros_por_tipo, cargos: cargos, areas: areas}} />
        </ContainerBlue>
        </>
    );
}