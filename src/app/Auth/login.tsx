"use client"
import { useState } from "react"
export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        console.log(data);
    }
    return (
        <div className="w-full h-full flex items-center justify-center">

        <form className="w-1/2 p-4 bg-white flex border justify-between items-center rounded-lg shadow-md flex-col h-1/2" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-lg">Email
                <input type="email"/>
            </label>
            <label htmlFor="password" className="text-lg">Password
                <input type="password"/>
            </label>
            <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                Login
            </button>
        </form>
        </div>

    )
}