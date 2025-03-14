"use client";
import { useState, useEffect} from "react";
import HomeScreen from "@/app/Auth/Home/page";

export default function Login() {
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
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsAuthenticated(true);
      setUser(data.user);
    } else {
      console.log("Login failed");
    }
  };

 

  return (
    <>
      {isAuthenticated ? (
        <>
        <HomeScreen/>
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center p-4 transition-colors bg-gray-100">
          <form
            className="w-full max-w-md p-4 bg-white flex border gap-y-6 items-center rounded-lg shadow-md flex-col shadow-xl shadow-gray-800"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email" className="text-lg w-full">
              Email
              <input
                type="email"
                value={email}
                className="w-full text-md p-2 shadow-md border border-gray-300 rounded-lg mt-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="password" className="text-lg w-full">
              Password
              <input
                id="password"
                type="password"
                value={password}
                className="w-full text-md p-2 shadow-md border border-gray-300 rounded-lg mt-2"
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
