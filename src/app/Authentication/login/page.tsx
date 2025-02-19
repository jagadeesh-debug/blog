"use client"
import Nav from "@/app/Auth/Nav/page";
import { Router, useRouter } from "next/router";
import { useState } from "react"
export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if(res.ok){
            setIsAuthenticated(true);
        }
        console.log(data, isAuthenticated);
    }
    return (
        <>
        {isAuthenticated ? router.push("/Auth/account") : 
            <div className="w-full h-full flex items-center justify-center">

            <form className="w-1/2 p-4 bg-white flex border justify-between items-center rounded-lg shadow-md flex-col h-1/2" onSubmit={handleSubmit}>
                <label htmlFor="email" className="text-lg">Email
                    <input type="email" value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                </label>
                <label htmlFor="password" className="text-lg">Password
                    <input type="password" value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                </label>
                <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    Login
                </button>
            </form>
            </div>
        }
        </>
        

    )
}