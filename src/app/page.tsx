import ActionCard from "@/components/actioncard";
import FeatureCard from "@/components/featurecard";

export default function HomePage() {
    return (
        <div className="w-full">
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
                    <div className="flex flex-col md:flex-row gap-6 mt-6 items-center">
                        <ActionCard call="Confira os editais disponíveis!" action="Editais" />
                        <span className="text-lg">ou</span>
                        <ActionCard call="Contribua indicando novas oportunidades!" action="Contribuir" />
                    </div>
                </div>
            </section>

            <section className="h-auto py-20 px-6 bg-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800">Funcionalidades</h2>
                    <p className="text-lg text-gray-600 mt-4">
                        O Antologias oferece diversas funcionalidades para facilitar o acesso a oportunidades de fomento.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 mt-10">
                        <FeatureCard
                            feature="🔍 Filtragem e Pesquisa"
                            description="Pesquise e filtre editais por categoria, região, valor do financiamento e mais." />
                        <FeatureCard
                            feature="💾 Salvar Editais"
                            description=" Salve editais de interesse para acessá-los posteriormente de forma rápida." />
                        <FeatureCard
                            feature="📬 Notificações Personalizadas"
                            description="Receba notificações sobre novos editais alinhados ao seu perfil de atuação." />
                        <FeatureCard
                            feature="🤝 Comunidade"
                            description="Compartilhe oportunidades e colabore com outras organizações do terceiro setor." />
                    </div>
                </div>
            </section>
        </div>
    );
}
