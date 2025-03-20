"use client";

import Edital from "@/domain/entities/edital";
import { useEffect, useState } from "react";
import EditalCard from "@/components/editalcard";
import { SearchBar } from "@/components/searchbar";
import FilterSection from "@/components/filter/editaisfilter";

export default function EditaisList() {
    const [editais, setEditais] = useState<Edital[]>([]);

    const fetchEditais = async () => {
        try {
            const res = await fetch("/api/editais");
            if (!res.ok) throw new Error("Failed to fetch editais");

            const data = await res.json();

            const transformedData = data.map((edital: any) => ({
                ...edital,
                icon: edital.iconurl,
                sponsor: {
                    name: edital.sponsor,
                },
                funding_min: edital.funding_min,
                funding_max: edital.funding_max,
                sdgs: edital.sdgs,
                causes: edital.causes,
                skills: edital.skills,
            }));

            setEditais(transformedData);
        } catch (error) {
            console.error("Error fetching editais:", error);
        }
    };

    useEffect(() => {
        fetchEditais();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <SearchBar />

            {/* Conteúdo Principal */}
            <div className="flex flex-col md:flex-row flex-1 p-4 gap-4">
                {/* Lista de Editais */}
                <div className="flex-1 bg-white shadow-md rounded-lg p-4 overflow-y-auto h-[500px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {editais.map((edital) => (
                            <EditalCard
                                key={edital.id}
                                title={edital.title}
                                description={edital.description}
                                funding_min={edital.funding_min}
                                funding_max={edital.funding_max}
                                sdgs={edital.sdgs}
                                skills={edital.skills}
                                causes={edital.causes}
                                icon={edital.icon}
                                sponsor={edital.sponsor.name}
                            />
                        ))}
                    </div>
                </div>

                {/* Opções de Filtro */}
                <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-4">
                    <FilterSection />
                </div>
            </div>
            
        </div>
    );
}
