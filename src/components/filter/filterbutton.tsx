interface FilterButtonProps {
    onClick: () => void;
}

export default function FilterButton({ onClick }: FilterButtonProps){
    return(
        <button 
        onClick={onClick}
        className="justify-center bg-blue-700 text-slate-100 hover:bg-blue-950 rounded-md w-3/4 place-items-center flex flex-row p-3 shadow-md">
            Aplicar Filtros
        </button>
    )
}
