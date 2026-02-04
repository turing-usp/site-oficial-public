import Link from "next/link";
import Image from "next/image";
import Logout from "@/components/dashboard/btnlogout";

export default function NavbarDashboard() {

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
            <div>
                <Logout />
            </div>
        </nav>
    );
}