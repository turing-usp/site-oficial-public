import ContainerBlue from "@/components/ui/containerblue";
import EditInfos from "@/components/dashboard/editinfos";
import { getUserWithProfile } from "@/lib/auth-actions";
import { canChangeProfileImage } from "@/lib/card-config";

export default async function NavbarDashboard() {
    const { tipo_usuario } = await getUserWithProfile();
    const canChangeImage = canChangeProfileImage(tipo_usuario!);

    return(
        <>
        <ContainerBlue>
            <EditInfos canChangeImage={canChangeImage} />
        </ContainerBlue>
        </>
    );
}