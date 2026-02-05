import ContainerBlue from "@/components/ui/containerblue";
import EditInfos from "@/components/dashboard/editinfos";
import { getUserWithProfile } from "@/lib/auth-actions";

export default async function NavbarDashboard() {
    const { tipo_usuario } = await getUserWithProfile();
    const canChangeImage = tipo_usuario === 1 || tipo_usuario === 2;

    return(
        <>
        <ContainerBlue>
            <EditInfos canChangeImage={canChangeImage} />
        </ContainerBlue>
        </>
    );
}