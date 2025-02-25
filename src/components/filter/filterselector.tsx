interface FilterSelectorProps {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}

export default function FilterSelector({ label, isSelected, onClick }: FilterSelectorProps) {
    return (
        <button
            onClick={onClick}
            className={`rounded-xl px-4 py-2 w-fit ${
                isSelected ? "bg-blue-700 text-white" : "bg-blue-500 text-slate-100"
            } hover:bg-blue-600`}
        >
            {label}
        </button>
    );
}
