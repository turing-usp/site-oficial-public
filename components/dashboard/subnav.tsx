"use client";

import { useState } from "react";
import Link from "next/link";

interface Page {
    id: string;
    title: string;
    link: string;
}

interface SubnavProps {
    pages: Page[];
}

export default function SubnavDashboard({ pages }: SubnavProps) {
    if (pages.length === 0) {
        return null;
    }

    const [isMenuOpen, setIsMenuOpen] = useState(true);

    return(
        <>
         <div className="flex-col h-auto w-[10vw] my-[8%]">
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[2rem] text-[#000000] cursor-pointer hover:text-[#F1863D] transition"
            >
                ☰
            </button>
            {isMenuOpen && (
                <div className="flex-col gap-[0.5rem] mt-[1rem]">
                    {pages.map((page) => (
                        <Link 
                            key={page.id} 
                            href={page.link}
                            className="p-2 text-[#000000] text-[1rem] hover:text-[#FFFFFF] w-full hover:bg-[#F1863D] hover:bg-opacity-10 rounded-md block"
                        >
                            {page.title}
                        </Link>
                    ))}
                </div>
            )}
         </div>
        </>
    );
}
