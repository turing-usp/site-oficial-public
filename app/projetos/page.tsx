import Navbar from "@/components/navbar";

export default function Projetos() {
    return (
        <div>
                <div className="fixed top-0 left-0 right-0 z-10">
                    <Navbar />
                </div>
                <div className="flex flex-col h-[100vh] w-[100%]">
                   <p>Nossos Projetos</p>
                </div>
        </div>
    );
}