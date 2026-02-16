import AdminWrapper from './adminwrapper';

interface MembrosInfo {
    titulo: string;
    membros: any[];
    tt_membro: number;
}

interface AbasAdminProps {
    [key: string]: MembrosInfo;
}

export default async function LateralAdmin({ data }: { data: AbasAdminProps }) {
    return <AdminWrapper data={data} />;
}