import { Search } from "lucide-react";

export function SearchBar() {
    return (
        <>
            <div className="w-full flex flex-row items-center justify-center py-6 bg-white shadow-md gap-4 p-4">
                <img
                    className="w-20 md:w-28 object-contain"
                    src="https://i.postimg.cc/VkrcnwPx/bora-impactar.png"
                    alt="Bora Impactar" /><form
                        className="flex bg-slate-200 items-center rounded-xl h-14 px-4 gap-3 w-full max-w-lg text-slate-600"
                        onSubmit={(e) => e.preventDefault()}
                    >
                    <input
                        key="search-bar"
                        type="text"
                        placeholder="Digite o nome do edital aqui"
                        className="bg-transparent text-sm md:text-lg placeholder-slate-600 outline-none flex-1"
                        aria-label="Buscar editais" />
                    <button
                        type="submit"
                        aria-label="Buscar"
                        className="p-2 hover:bg-slate-300 rounded-lg transition"
                    >
                        <Search className="size-6 md:size-8 text-slate-600" />
                    </button>
                </form>
            </div>
        </>
    );
}
