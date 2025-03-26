"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import HomeScreen from "@/app/Auth/Home/page";
import bgi from "../../../../public/spidy.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      window.location.href = "/Auth/Home";
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
        <div className="w-full h-screen flex items-center justify-center p-4 bg-gradient-to-b from-black to-violet-500">
          
          <div className="flex w-full max-w-4xl items-center justify-end">
            {showLogin && (
              <motion.form
                initial={{ opacity: 0, x:-100 }}
                animate={{ opacity: 1, x:-50 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="w-1/2 p-6 bg-white shadow-xl  flex flex-col gap-6 items-center rounded-lg bg-transparent shadow-md shadow-violet-900"
                onSubmit={handleSubmit}
              >
                <label htmlFor="email" className="text-lg w-full">
                  Email
                  <input
                    type="email"
                    value={email}
                    className="w-full text-md p-2 shadow-md border border-gray-300 rounded-lg mt-2 focus:outline-none"
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
                <a href="signup">Sign up</a>
              </motion.form>
            )}           
          <motion.div
              initial={{ opacity: 0, y:-700}}
              animate={{ opacity: 1, y: -100}}
              transition={{ duration: 3.5, ease: "easeOut" }}
              onAnimationComplete={() => setShowLogin(true)}
              className="w-1/2"
              >
              <Image src={bgi} alt="Background" className="object-contain" />
            </motion.div>
              </div>
        </div>
      )}
    </>
  );
}
