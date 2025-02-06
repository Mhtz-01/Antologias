import { SearchBar } from "./components/searchbar";

export default function NoticeList(){
    return (
        <div className="flex">
            {/* Navbar */}
            <div className="absolute w-full h-14 text-white bg-blue-500 flex px-4 justify-between">
                <p className="font-bold">
                    Acompanhamento de editais
                </p>

                <button>
                    Fazer login
                </button>

            </div>

            <div className="flex flex-col h-screen w-full flex-1">
                {/* Barra de pesquisa */}
                <div className="w-full h-1/4 justify-center items-center flex pt-12">
                    <SearchBar/>
                </div>

                <div className="flex flex-1">
                    {/* Listagem dos editais */}
                    <div className="overflow-y-auto flex items-center flex-col gap-3 bg-blue-200 w-3/4 h-[500px] py-4">
                        {Array.from({ length: 15 }, (_, i) => (
                            <div key={i} className="bg-red-400 w-11/12 h-12">
                                <p>edital</p>
                            </div>
                        ))}
                    </div>

                    {/* Opções de filtro */}
                    <div className="bg-yellow-200 w-1/4">
                        <span>Filtro</span>
                    </div>
                </div>
                
                
            </div>
            {/* footer */}
            <div>

            </div>
        </div>
    )
}
