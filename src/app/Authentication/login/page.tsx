"use client";
import Link from "next/link";
import BlogPosts from "@/app/Auth/Blog/page";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const userData = JSON.parse(localStorage.getItem("user")!);
      setUser(userData);
    }
  }, []);

  const handleSubmit = async (e: any) => {
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
      localStorage.setItem("token", data.token); // Store JWT token
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user info
      setIsAuthenticated(true);
      setUser(data.user);
    } else {
      console.log("Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/Authentication/login");
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user}!</p>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
          <BlogPosts />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <form
            className="md:w-1/2 p-4 bg-white flex border gap-y-12 items-center rounded-lg shadow-md flex-col md:h-2/5"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email" className="text-lg">
              Email
              <input
                type="email"
                value={email}
                className="ml-3 text-md md:text-xl md:px-2 md:ml-12 shadow-md border border-gray-300 rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="password" className="text-lg">
              Password
              <input
                id="password"
                type="password"
                value={password}
                className="border shadow-md rounded-md ml-3"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors bg-green-400 shadow-xl w-1/5">
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
}
