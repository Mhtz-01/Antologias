import { Search } from "lucide-react";


export function SearchBar(){
    return <div className="flex bg-slate-200 items-center rounded-xl h-16 px-4 gap-3 md:w-6/12 w-11/12">
    <div className="flex flex-1 items-center justify-between">
    <input 
        key='search-bar'
        type="text" 
        placeholder="Digite o nome do edital aqui" 
        className="bg-transparent md:text-lg placeholder-slate-600 outline-none flex-1 text-sm"></input>
    <button>
        <Search className="md:size-8 size-6 text-slate-600" />
    </button>
    </div>
    </div>
}
