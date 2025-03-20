import Link from "next/link";

export default function HomePage() {
    return (
        <div className="w-full">
            {/* Seção Principal */}
            <section 
                className="relative h-screen flex flex-col justify-center items-center text-center text-white px-6"
                style={{ backgroundImage: "url(/recife.webp)", backgroundSize: "cover", backgroundPosition: "center" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
                <div className="relative z-10 flex flex-col items-center gap-4 max-w-3xl">
                    <h1 className="text-5xl font-extrabold md:text-7xl">Conheça o Antologias</h1>
                    <p className="text-lg md:text-xl">
                        Um repositório de oportunidades de fomento para <strong>organizações do terceiro setor</strong>.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 mt-6">
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-lg">Confira os editais disponíveis</p>
                            <Link href="/editais">
                                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold rounded-lg">
                                    Editais
                                </button>
                            </Link>
                        </div>
                        <span className="text-lg">ou</span>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-lg">Contribua indicando novas oportunidades!</p>
                            <Link href="/contribuir">
                                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 transition-all text-white font-semibold rounded-lg">
                                    Contribuir
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção de Funcionalidades */}
            <section className="h-auto py-20 px-6 bg-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800">Funcionalidades</h2>
                    <p className="text-lg text-gray-600 mt-4">
                        O Antologias oferece diversas funcionalidades para facilitar o acesso a oportunidades de fomento.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 mt-10">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-blue-600">🔍 Filtragem e Pesquisa</h3>
                            <p className="text-gray-700 mt-2">
                                Pesquise e filtre editais por categoria, região, valor do financiamento e mais.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-blue-600">💾 Salvar Editais</h3>
                            <p className="text-gray-700 mt-2">
                                Salve editais de interesse para acessá-los posteriormente de forma rápida.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-blue-600">📬 Notificações Personalizadas</h3>
                            <p className="text-gray-700 mt-2">
                                Receba notificações sobre novos editais alinhados ao seu perfil de atuação.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-blue-600">🤝 Comunidade</h3>
                            <p className="text-gray-700 mt-2">
                                Compartilhe oportunidades e colabore com outras organizações do terceiro setor.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
