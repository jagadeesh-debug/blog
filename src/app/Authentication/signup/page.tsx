"use client";
import { useState } from "react";
import Link from "next/link";
import Login from "../login/page";
export default function SignUp() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [issigned,setSigned]=useState(false);


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, mobile, email, password }),
    });
    if(res.ok){
        setSigned(true);
    }

    const data = await res.json();
    console.log(data);
  };

  return (
    <>
    {issigned ? <Login/>:
    <div className="w-full h-full flex items-center justify-center">
      <form className="w-1/2 p-4 bg-white flex border justify-between items-center rounded-lg shadow-md flex-col h-1/2" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-lg">Name
          <input type="text" value={name} className="border rounded-md ml-12"
            onChange={(e) => setName(e.target.value)} />
        </label>
        <label htmlFor="mobile" className="text-lg">Mobile
          <input type="text" value={mobile} className="border rounded-md ml-12"
            onChange={(e) => setMobile(e.target.value)} />
        </label>
        <label htmlFor="email" className="text-lg">Email
          <input type="email" value={email} className="border rounded-md ml-12"
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password" className="text-lg">Password
          <input type="password" value={password} className="border rounded-md ml-9"
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors bg-green-400 shadow-xl">
          Sign Up
        </button>
        <div className="flex  justify-between gap-2">
          <a href="" className="text-blue-400">Forgot Password?</a>
          <Link href="/Authentication/login">Login</Link>
          </div>
      </form>
      </div>
      
    }
    </>
  );
}
