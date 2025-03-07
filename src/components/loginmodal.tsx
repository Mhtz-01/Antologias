import { useState } from "react";

export default function LoginModal(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), 
            });
    
            if (!response.ok) {
                throw new Error('Login failed');
            }
    
            const data = await response.json();
            
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('ngo', JSON.stringify(data.ngo));

            console.log(data)
    
        } catch (error) {
            console.error("Login falhou: ", error);
        }
    }
    

    return(
    <div className="shadow-md border border-slate-300 flex flex-col bg-slate-300 absolute top-12 right-0 z-50 rounded-lg">
        <form className="flex flex-col gap-3 text-black"
              onSubmit={handleSubmit}>
            <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input 
            type="password" 
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit"></input>
        </form>
    </div>
    )
}
