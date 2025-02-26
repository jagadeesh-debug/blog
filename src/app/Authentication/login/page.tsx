"use client"
import Link from "next/link";
import UserAccount from "@/app/Auth/account/page";
import BlogPosts from "@/app/Auth/Blog/page";
import HomeScreen from "@/app/Auth/Home/page";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const router = useRouter(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);



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
          setIsAuthenticated(true); // go to home screen
          router.push(`/Auth/account?name=${data.user.name}&email=${data.user.email}&mobile=${data.user.mobile}`);

        } else {
          console.log("Login failed");
        }
    
    };


    const [userAccountData, setUserAccountData] = useState(null);
    return (
        <>
            {isAuthenticated ? <HomeScreen/> :
                <div className="w-full h-full flex items-center justify-center">

                    <form className="md:w-1/2 p-4 bg-white flex border gap-y-12 items-center rounded-lg shadow-md flex-col md:h-2/5" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="text-lg ">Email
                            <input type="email" value={email} className=" ml-3 text-md md:text-xl MD:px-2 md:ml-12 shadow-md border border-gray-300 rounded-lg"
                                onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label htmlFor="password" className="text-lg">Password
                            <div className="relative inline-block ml-2">
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    className="md:px-2 pr-8 shadow-md border border-gray-300 rounded-lg"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>
                        </label>
                        <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors bg-green-400 shadow-xl w-1/5">
                            Login
                        </button>
                        <div className="flex  justify-between gap-2 w-1/2">
                            <a href="" className="text-blue-400">Forgot Password?</a>
                            <Link href="/Authentication/signup">New User?</Link>
                        </div>
                    </form>
                </div>
            }
        </>
    );

}