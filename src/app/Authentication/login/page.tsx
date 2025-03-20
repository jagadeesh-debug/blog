"use client";
import { useState, useEffect } from "react";
import HomeScreen from "@/app/Auth/Home/page";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
    } else {
      console.log("Login failed");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="w-full h-screen flex items-center flex-col gap-4">
          <HomeScreen />
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col gap-7 items-center justify-center p-4 transition-colors bg-gradient-to-b from-black to-violet-500">
          <form
          
            className="w-full max-w-md p-4 bg-violet-400 flex  gap-y-6 items-center rounded-lg shadow-md flex-col shadow-2xl shadow-gray-800"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email" className="text-lg w-full">
              Email
              <input
                type="email"
                value={email}
                className="w-full text-md p-2 shadow-md border border-gray-300 rounded-lg mt-2 focus:outline-none "
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="password" className="text-lg w-full">
              Password
              <input
                id="password"
                type="password"
                value={password}
                className="w-full text-md p-2 shadow-md border border-gray-300 rounded-lg mt-2 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="w-1/3 p-3 hover:bg-gray-100 hover:shadow-black rounded-lg transition-colors bg-blue-200 shadow-xl">
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
}
