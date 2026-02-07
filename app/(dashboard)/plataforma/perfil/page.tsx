import ContainerBlue from "@/components/ui/containerblue";
import EditInfos from "@/components/dashboard/editinfos";
import { canChangeProfileImageForUser, lerdadosusuario} from "@/lib/auth-actions";

export default async function NavbarDashboard() {
    const canChangeImage = await canChangeProfileImageForUser();
    const userData = await lerdadosusuario();

    return(
        <>
        <ContainerBlue>
            <EditInfos canChangeImage={canChangeImage} userData={userData} />
        </ContainerBlue>
        </>
    );
}