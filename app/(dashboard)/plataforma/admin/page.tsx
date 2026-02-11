import ContainerBlue from "@/components/ui/containerblue";
import { acessarmembrosadmin } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import LateralAdmin from "@/components/dashboard/lateraladmin";

export default async function AdminPage() {
    const { error , membros_por_tipo} = await acessarmembrosadmin();
    if (error) {
        redirect('/plataforma');
    }
    
    return (
        <>
        <ContainerBlue>
            <LateralAdmin data={membros_por_tipo} />
        </ContainerBlue>
        </>
    );
}