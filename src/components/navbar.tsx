"use client";

import { useState } from "react";
import Link from "next/link";
import LoginModal from "./loginmodal";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/domain/context/authContext";

export default function Navbar() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <nav className="top-0 left-0 w-full bg-pcr text-white shadow-md z-50">
            <div className="flex items-center justify-between px-6 py-3 md:px-8">

                <Link href="/" className="flex items-center space-x-3">
                    <span className="text-xl md:text-2xl font-bold">Antologias</span>
                </Link>

                <div className="hidden md:flex space-x-6 text-lg font-semibold justify-center items-center">
                    <Link href="/editais" className="hover:text-gray-200 transition">
                        Ver Editais
                    </Link>

                    <Link href="/contribuir">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                            Contribuir
                        </button>
                    </Link>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span>{user.name}</span>
                            <Link href="/userprofile">
                                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition">
                                    Meu Perfil
                                </button>
                            </Link>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                            >
                                Sair
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg transition"
                        >
                            Fazer Login
                        </button>
                    )}
                </div>

                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden flex flex-col items-center bg-pcr py-4 space-y-4 border-t border-gray-600">
                    <Link href="/editais" className="hover:text-gray-200 transition">
                        Ver Editais
                    </Link>

                    <Link href="/contribuir">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                            Contribuir
                        </button>
                    </Link>

                    {user ? (
                        <>
                            <span>Olá, {user.name}</span>
                            <Link href="/userprofile">
                                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition">
                                    Meu Perfil
                                </button>
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                setIsLoginOpen(true);
                                setIsMobileMenuOpen(false);
                            }}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg transition"
                        >
                            Fazer Login
                        </button>
                    )}
                </div>
            )}

            {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
        </nav>
    );
}
