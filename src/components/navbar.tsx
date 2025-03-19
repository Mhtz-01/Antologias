"use client"

import Link from "next/link"
import { useState } from "react"
import LoginModal from "./loginmodal"

export default function Navbar() {
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const toggleLogin = () => {
        setIsLoginOpen(!isLoginOpen)
    }
    
    return (
        <div className="absolute w-full h-14 text-white bg-pcr flex px-4 justify-between place-items-center">
            
            <img
                className="size-28 object-contain"
                src="https://i.postimg.cc/sxsV4N4p/Horizontal-Branco-2021.png" />
            <Link href="/">
            <span className="font-extrabold">
                Acompanhamento de editais
            </span>
            </Link>

            <Link href="/contribuir">
                <button>
                    Contribuir
                </button>
            </Link>

            <button onClick={toggleLogin}>
                Fazer login
            </button>

            {isLoginOpen && <LoginModal />}

        </div>
    )
}
