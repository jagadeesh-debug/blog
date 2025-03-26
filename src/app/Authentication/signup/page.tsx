"use client";
import { useState } from "react";
import Link from "next/link";
import Login from "../login/page";

export default function SignUp() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigned, setSigned] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, mobile, email, password }),
    });
    if (res.ok) setSigned(true);
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      {isSigned ? (
        <Login />
      ) : (
        <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-black to-violet-500">
          <form
            className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-violet-400  p-6 shadow-xl rounded-lg flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <label className="text-lg flex flex-col">
              Name
              <input
                type="text"
                value={name}
                className="border rounded-md p-2 mt-1 w-full focus:outline-none"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="text-lg flex flex-col">
              Mobile
              <input
                type="text"
                value={mobile}
                className="border rounded-md p-2 mt-1 w-full focus:outline-none"
                onChange={(e) => setMobile(e.target.value)}
              />
            </label>
            <label className="text-lg flex flex-col">
              Email
              <input
                type="email"
                value={email}
                className="border rounded-md p-2 mt-1 w-full focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="text-lg flex flex-col">
              Password
              <input
                type="password"
                value={password}
                className="border rounded-md p-2 mt-1 w-full focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="w-full p-3 bg-violet-400 shadow-md shadow-black  text-black rounded-lg text-white hover:bg-green-500 transition">
              Sign Up
            </button>
            <div className="flex justify-between text-sm text-black">
              <a href="#">Forgot Password?</a>
              <Link href="/Authentication/login">Login</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
