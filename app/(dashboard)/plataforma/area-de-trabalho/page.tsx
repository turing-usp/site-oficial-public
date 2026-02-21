import ContainerBlue from "@/components/ui/containerblue";
import { lerctt } from "@/lib/auth-actions";
import CTT from "@/components/dashboard/ctt";


export default async function AreaDeTrabalhoPage() {
    const {data,error} = await lerctt()
    if(error){
        console.error("Error fetching user data:", error);
        return <div>Error loading user data</div>;
    }
    return (
        <>
            <ContainerBlue>
                <CTT dados={data} />
            </ContainerBlue>
        </>
    );
}