"use client";
import { logoutUser } from "@/lib/auth-actions";
import { useRouter } from "next/navigation";

export default function BtnLogout() {
    const router = useRouter();
    const handleLogout = async () => {
        const { error } = await logoutUser();
        if (error) {
            console.error("Erro ao fazer logout:", error);
        }
        router.push("/");
    };

    return(
        <button onClick={handleLogout} className="text-[#000000] text-[1rem] hover:cursor-pointer">LOGOUT</button>
    );
}