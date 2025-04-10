import { useAuth } from "@/domain/context/authContext";
import NGO from "@/domain/entities/ngo";
import User from "@/domain/entities/user";
import { X } from "lucide-react";
import { useState } from "react";


interface LoginModalProps {
    onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login falhou. Verifique suas credenciais.');
            }

            const data = await response.json();
            
            const ngo = new NGO(
                data.ngo.id,
                data.ngo.name,
                data.ngo.description,
                data.ngo.is_formalized,
                data.ngo.start_year,
                data.ngo.contact_phone,
                data.ngo.instagram_link,
                data.ngo.x_link,
                data.ngo.facebook_link,
                data.ngo.pix_qr_code_link,
                data.ngo.gallery_images_url,
                data.ngo.skills,
                data.ngo.causes,
                data.ngo.sdgs
              );
            
              const user = new User(data.user.name, data.user.email, ngo);
            
              login(user);
              onClose();  
        } catch (error) {
            setError("Credenciais inválidas. Tente novamente.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-slate-600">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 animate-fade-in">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Login</h2>
                    <button onClick={onClose}
                        className="top-3 right-3 text-gray-500 hover:text-gray-800 mb-4">
                        <X></X>
                    </button>
                </div>

                {error && <p className="text-red-600 text-sm text-center mb-3">{error}</p>}

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
