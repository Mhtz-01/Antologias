"use client";

import { useAuth } from "@/domain/context/authContext";

export default function PerfilUsuario() {
    const { user } = useAuth();

    if (!user)
        return (
            <p className="p-10 text-center text-lg text-gray-700">
                Você precisa estar logado para ver esta página.
            </p>
        );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <main className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
                <aside className="w-60 flex flex-col items-center">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Foto do usuário"
                        className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
                    />

                    <button className="w-full bg-[#009ee2] text-white font-medium py-2 rounded-lg mb-6 hover:bg-[#007bb5] transition">
                        Selecione sua foto
                    </button>

                    <div className="flex flex-col w-full space-y-3">
                        <button className="bg-[#2c3e94] text-white py-2 rounded-lg hover:bg-[#24327c] transition font-medium">
                            Dados da ONG
                        </button>
                        <button className="bg-[#2c3e94] text-white py-2 rounded-lg hover:bg-[#24327c] transition font-medium">
                            Meus editais
                        </button>
                        <button className="bg-[#2c3e94] text-white py-2 rounded-lg hover:bg-[#24327c] transition font-medium">
                            Preferências
                        </button>
                    </div>
                </aside>

                <section className="flex-1 space-y-6 text-gray-800">
                    <h3 className="text-xl font-bold border-b pt-4 pb-2">Informações do Responsável</h3>

                    <div>
                        <label className="font-semibold block text-sm text-gray-600">Nome:</label>
                        <p className="text-lg">{user.name}</p>
                    </div>

                    <div>
                        <label className="font-semibold block text-sm text-gray-600">Email:</label>
                        <p className="text-lg">{user.email}</p>
                    </div>

                    <div>
                        <label className="font-semibold block text-sm text-gray-600">Telefone:</label>
                        <p className="text-lg">{user.ngo.contact_phone}</p>
                    </div>
                    
                    <h2 className="text-2xl font-bold border-b pb-2">Informações da ONG</h2>

                    <div>
                        <label className="font-semibold block text-sm text-gray-600">Nome da ONG:</label>
                        <p className="text-lg">{user.ngo.name}</p>
                    </div>

                    <div>
                        <label className="font-semibold block text-sm text-gray-600">Descrição:</label>
                        <p className="text-lg whitespace-pre-wrap">{user.ngo.description}</p>
                    </div>
                </section>
            </main>
        </div>
    );
}
