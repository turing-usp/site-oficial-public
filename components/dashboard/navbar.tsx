import Link from "next/link";
import Image from "next/image";
import Logout from "@/components/dashboard/btnlogout";
import { getUserWithProfile } from "@/lib/auth-actions";

export default async function NavbarDashboard() {
    const { avatarUrl } = await getUserWithProfile();

    return(
        <nav className="flex bg-transparent fixed z-10 my-[1%] mx-[5%] w-[90%] justify-between items-center">
            <Link href="/plataforma" className="flex items-center">
                <Image
                    src="/logo.svg"
                    alt="Logo Turing"
                    width={50}
                    height={50}
                />
                <p className='text-[1rem] text-[#F1863D]' style={{ fontFamily: 'var(--font-orbitron)' }}>turing.usp</p>
            </Link>
            <div className="flex gap-[1.5rem]">
                <Logout />
                <Link href="/plataforma/perfil" className="w-[35px] h-[35px] rounded-full overflow-hidden border-[#F1863D] border-2 my-[2%] flex items-center justify-center">
                    <Image
                        src={avatarUrl || "/avatar.svg"}
                        alt="User Icon"
                        width={35}
                        height={35}
                        className="object-cover w-full h-full"
                    />
                </Link>
            </div>
        </nav>
    );
}