import { ReactNode } from 'react';
import Subnav from '../dashboard/subnav';
import { getAccessiblePagesForUser } from '@/lib/auth-actions';

interface ContainerBlueProps {
    children: ReactNode;
}

export default async function ContainerBlue({ children }: ContainerBlueProps) {
        const pages = await getAccessiblePagesForUser();
        
        if (pages.length === 0) {
            return (
                <div className="flex h-auto min-h-[100vh] w-[90%] mx-[5%]">
                    <p className="text-[#000000]">Nenhuma página acessível para este usuário.</p>
                </div>
            );
        }
    return(
            <div className="flex h-auto min-h-[100vh]">
                        <div className=" flex w-[10%] mx-[5%] mt-[5%]">
                            <Subnav pages={pages} />
                        </div>
                        <div className="flex h-auto w-[80%] bg-[#162B3F] rounded-tl-[2rem] rounded-bl-[2rem] mt-[5%]">
                            <div className="p-8 w-full">
                                {children}
                            </div>
                        </div>
            </div>
    );
}