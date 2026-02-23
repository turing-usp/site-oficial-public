import ContainerBlue from "@/components/ui/containerblue";
import { lerprojetos } from "@/lib/auth-actions";
import Proj from "@/components/dashboard/projetos";

export default async function ProjetosPage() {
    const {data,error} = await lerprojetos()
    if(error){
        console.error("Error fetching user data:", error);
        return <div>Error loading user data</div>;
    }
    return (
        <ContainerBlue>
            <Proj dados={data}/>
        </ContainerBlue>
    );
}