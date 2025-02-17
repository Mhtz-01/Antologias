"use client";

import { useState } from "react";
import FilterButton from "../components/filter/filterbutton";
import FilterField from "../components/filter/filterfield";

interface SelectedFilters {
    area: string[];
    ods: string[];
    region: string[];
}

export default function FilterSection() {
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        area: [],
        ods: [],
        region: []
    });

    const area = ["Sustentabilidade", "Artes e Cultura", "Educação", "Tecnologia", "Diversidade"];
    const ods = ["ODS1"];
    const region = ["Municipal", "Estadual", "Federal", "Internacional"];

    // Enviar filtros ao backend
    const applyFilters = async () => {
        console.log("Filtros selecionados:", selectedFilters);
        try {
            const response = await fetch("/api/filter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedFilters)
            });

            if (!response.ok) throw new Error("Erro ao buscar os dados.");

            const data = await response.json();
            console.log("Resultados:", data);
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    return (
        <div className="flex flex-col place-items-center text-slate-950 my-3 gap-2 overflow-y-auto">
            <span>Filtre sua busca por aqui</span>
            <FilterField label="Área de Interesse" options={area} selectedFilters={selectedFilters.area} setSelectedFilters={(filters) => setSelectedFilters(prev => ({ ...prev, area: filters }))} />
            <FilterField label="ODS" options={ods} selectedFilters={selectedFilters.ods} setSelectedFilters={(filters) => setSelectedFilters(prev => ({ ...prev, ods: filters }))} />
            <FilterField label="Região" options={region} selectedFilters={selectedFilters.region} setSelectedFilters={(filters) => setSelectedFilters(prev => ({ ...prev, region: filters }))} />

            <FilterButton onClick={applyFilters} />
        </div>
    );
}
