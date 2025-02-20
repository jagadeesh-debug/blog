"use client"
import BlogPosts from "@/app/Auth/Blog/page";
import Nav from "@/app/Auth/Nav/page";
import RootLayout from "@/app/layout";
import { set } from "mongoose";
import { Router, useRouter } from "next/router";
import { useState ,useEffect} from "react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [visible,setVisible] = useState(false);   
    
  function handleClick() {
    setVisible(!visible);
    const password = document.getElementById("password") as HTMLInputElement;
    if (password) {
      password.type = visible ? "password" : "text";
    }
  }
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
        {isAuthenticated ?  <BlogPosts/>:  
            <div className="w-full h-full flex items-center justify-center">

            <form className="md:w-1/2 p-4 bg-white flex border gap-y-12 items-center rounded-lg shadow-md flex-col md:h-1/3" onSubmit={handleSubmit}>
                <label htmlFor="email" className="text-lg ">Email
                    <input type="email" value={email} className=" ml-3 text-md md:text-xl MD:px-2 md:ml-12 shadow-md border border-gray-300 rounded-lg"
                    onChange={(e)=>setEmail(e.target.value)}/>
                </label>
                <label htmlFor="password" className="text-lg">Password
                    <div className="relative inline-block ml-2">
                        <input type="password" value={password} className="md:px-2 pr-8 shadow-md border border-gray-300 rounded-lg"
                        onChange={(e)=>setPassword(e.target.value)}/>
                        {visible    ?<i className='bx bx-hide text-md absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer' id="passwordVisible" onClick={handleClick}></i>:<i className='bx bx-show   text-md absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer' id="passwordVisible" onClick={handleClick}></i>}
                    </div>
                </label>
                <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors bg-green-400 shadow-xl w-1/5">
                    Login
                </button>
            </form>
            </div>
        }
        </>
        

    )
}