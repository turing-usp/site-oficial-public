import AdminWrapper from './adminwrapper';

interface MembrosInfo {
    titulo: string;
    membros: any[];
    tt_membro: number;
}

interface AdminData {
    membros: {
        [key: string]: MembrosInfo; // Ex: "Diretoria": { ... }, "Assessoria": { ... }
    };
    cargos: { [key: string]: string };
    areas: { [key: string]: string };
}


export default async function LateralAdmin({ data }: { data: AdminData }) {
    return <AdminWrapper data={data} />;
}