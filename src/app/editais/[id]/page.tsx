"use client"; // Indica que esse componente roda no cliente

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Edital {
    id: string;
    title: string;
    description: string;
    sponsor: string;
    causes: string;
    skills: string;
    sdgs: string;
    funding: string;
    icon: string;
}

export default function EditalExpanded() {
    const params = useParams(); // Obtém os parâmetros da URL
    const router = useRouter();
    const [edital, setEdital] = useState<Edital | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!params.id) {
            setError("ID do edital não fornecido.");
            setLoading(false);
            return;
        }

        const fetchEdital = async () => {
            try {
                const res = await fetch(`/api/editais/${params.id}`);
                if (!res.ok) throw new Error("Edital não encontrado");

                const data: Edital = await res.json();
                setEdital(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEdital();
    }, [params.id]);

    if (loading) {
        return <div className="h-screen flex items-center justify-center text-white text-xl">Carregando...</div>;
    }

    if (error || !edital) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-red-500 text-xl">
                <p>Erro: {error || "Edital não encontrado"}</p>
                <button
                    onClick={() => router.push("/editais")}
                    className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-700 transition-all text-white font-semibold rounded-lg"
                >
                    Voltar para a lista de editais
                </button>
            </div>
        );
    }

    return (
        <section
            className="flex flex-row justify-between items-center p-2 w-full h-screen"
            style={{ backgroundImage: "url(/recife.webp)", backgroundSize: "cover", backgroundPosition: "center" }}
        >
            {/* Seção Esquerda */}
            <div className="h-5/6 flex flex-col justify-start items-start grow m-6">
                <div className="w-full h-5/6 flex flex-col items-center justify-center">
                    <div className="w-full h-1/6 bg-[#F5F5F5] opacity-95 text-black flex items-center justify-center text-xl font-bold">
                        {edital.title}
                    </div>
                    <div className="w-full h-4/6 bg-[#F5F5F5] opacity-95 text-black flex items-center justify-center p-4">
                        {edital.description}
                    </div>
                    <div className="w-full h-1/6 bg-[#F5F5F5] opacity-95 flex items-center justify-center">
                        <button className="px-6 py-3 bg-[#009FE3] opacity-100 hover:bg-green-700 transition-all text-white font-semibold rounded-lg">
                            Inscreva-se!
                        </button>
                    </div>
                </div>
                <div className="w-full h-1/6 bg-[#009FE3] opacity-95 text-white flex items-center justify-center text-lg">
                    {edital.sdgs}
                </div>
            </div>

            {/* Seção Direita */}
            <div className="w-1/3 h-5/6 flex flex-col justify-start items-start m-6">
                <div
                    className="w-full h-2/6 flex items-center justify-center bg-gray-200"
                    style={{
                        backgroundImage: `url(${edital.icon})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
                <div className="w-full h-3/6 bg-[#F5F5F5] opacity-95 flex flex-col items-center justify-center">
                    <div className="w-full h-1/6 bg-[#F5F5F5] opacity-95 text-blue-600 font-semibold flex items-center justify-center">
                        {edital.sponsor}
                    </div>
                    <div className="w-full h-4/6 bg-[#F5F5F5] opacity-95 text-black flex items-center justify-center p-4">
                        {edital.causes}
                    </div>
                    <div className="w-full h-1/6 bg-[#F5F5F5] opacity-95 text-black flex items-center justify-center">
                        {edital.skills}
                    </div>
                </div>
                <div className="w-full h-1/6 bg-[#009FE3] opacity-95 text-white flex items-center justify-center text-lg">
                    {edital.funding}
                </div>
            </div>
        </section>
    );
}
