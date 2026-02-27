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
                        <div className="hidden md:flex md:w-[10%] mx-[5%] mt-[5%]">
                            <Subnav pages={pages} />
                        </div>
                        <div className="flex h-auto w-auto rounded-[2rem] mx-[5%] md:mx-0 md:w-[80%] bg-[#162B3F] md:rounded-tl-[2rem] md:rounded-bl-[2rem] mt-[5%]">
                            <div className="p-8 w-full">
                                {children}
                            </div>
                        </div>
            </div>
    );
}