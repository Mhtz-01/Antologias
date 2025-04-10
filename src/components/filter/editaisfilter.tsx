"use client";

import { useState } from "react";
import FilterButton from "./filterbutton";
import FilterField from "./filterfield";

interface SelectedFilters {
    area: string[];
    ods: string[];   
    skills: string[];
}

export default function FilterSection() {
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        area: [],
        ods: [],
        skills: []
    });

    const area = ["Sustentabilidade", "Artes e Cultura", "Educação", "Tecnologia", "Diversidade"];
    const ods = ["ODS1", "ODS2", "ODS3", "ODS4", "ODS5"]
    const skills = ["Artes", "Dança", "Artesanato", "Tecnologia", "Saúde", "Cozinha"]

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
        <div className="flex flex-col place-items-center text-slate-900 my-3 gap-2 overflow-y-auto">
            <span>Filtre sua busca por aqui</span>
            <FilterField label="Causas de interesse" options={area} selectedFilters={selectedFilters.area} setSelectedFilters={(filters) => setSelectedFilters(prev => ({ ...prev, area: filters }))} />
            <FilterField label="ODS" options={ods} selectedFilters={selectedFilters.ods} setSelectedFilters={(filters) => setSelectedFilters(prev => ({ ...prev, ods: filters }))} />
            <FilterField label="Habilidades requisitadas" options={skills} selectedFilters={selectedFilters.skills} setSelectedFilters={(filters) => setSelectedFilters(prev => ({ ...prev, skills: filters }))} />
           
            <FilterButton onClick={applyFilters} />
        </div>
    );
}
