"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import FilterSelector from "./filterselector";

interface FilterFieldProps {
    label: string;
    options: string[];
    selectedFilters: string[]; // Opções já selecionadas
    setSelectedFilters: (filters: string[]) => void; // Função para atualizar filtros
}

export default function FilterField({ label, options, selectedFilters, setSelectedFilters }: FilterFieldProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Alterna a seleção de um filtro
    const toggleFilter = (option: string) => {
        if (selectedFilters.includes(option)) {
            setSelectedFilters(selectedFilters.filter(item => item !== option)); // Remove se já estiver selecionado
        } else {
            setSelectedFilters([...selectedFilters, option]); // Adiciona se não estiver
        }
    };

    return (
        <div className="w-3/4">
            {/* Botão para abrir/fechar os filtros */}
            <div
                className="justify-between bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-md w-full place-items-center flex flex-row p-3 shadow-md cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{label}</span>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </div>

            {/* Lista de opções com animação */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="bg-white border-l-slate-500 border-l-2 gap-2 flex flex-wrap p-2">
                    {options.map((option, index) => (
                        <FilterSelector
                            key={index}
                            label={option}
                            isSelected={selectedFilters.includes(option)}
                            onClick={() => toggleFilter(option)}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
