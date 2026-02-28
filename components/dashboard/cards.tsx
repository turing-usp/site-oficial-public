import Link from "next/link";
import Image from "next/image";

export default function CardDashboard({ title,link,img_src }: { title: string; link: string; img_src: string }) {
    return(
        <Link href={link}>
            <div className="group relative flex flex-col items-center justify-center bg-[#162B3F] p-10 md:p-5 p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <Image
                    src={img_src}
                    alt="Ícone do Card"
                    width={80}
                    height={80}
                    className="h-[20vh] w-auto mb-4"
                />
                <h3 className="text-white text-[2rem] font-bold mb-2 text-center">{title}</h3>
            </div>
        </Link>
    );
}