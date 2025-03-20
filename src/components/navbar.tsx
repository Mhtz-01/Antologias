"use client";

import { useState } from "react";
import Link from "next/link";
import LoginModal from "./loginmodal";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="top-0 left-0 w-full bg-pcr text-white shadow-md z-50">
            <div className="flex items-center justify-between px-6 py-3 md:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img
                        className="h-12 md:h-14 object-contain"
                        src="https://i.postimg.cc/sxsV4N4p/Horizontal-Branco-2021.png"
                        alt="Logo"
                    />
                </Link>

                {/* Menu Desktop */}
                <div className="hidden md:flex space-x-6 text-lg font-semibold justify-center items-center">
                    <Link href="/" className="hover:text-gray-200 transition">
                        Antologias
                    </Link>

                    <Link href="/contribuir">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                            Contribuir
                        </button>
                    </Link>

                    <button
                        onClick={() => setIsLoginOpen(true)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg transition"
                    >
                        Fazer Login
                    </button>
                </div>

                {/* Botão para Mobile */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Menu Mobile */}
            {isMobileMenuOpen && (
                <div className="md:hidden flex flex-col items-center bg-pcr py-4 space-y-4 border-t border-gray-600">
                    <Link href="/" className="hover:text-gray-200 transition">
                        Antologias
                    </Link>

                    <Link href="/contribuir">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                            Contribuir
                        </button>
                    </Link>

                    <button
                        onClick={() => setIsLoginOpen(true)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg transition"
                    >
                        Fazer Login
                    </button>
                </div>
            )}

            {/* Modal de Login */}
            {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
        </nav>
    );
}
