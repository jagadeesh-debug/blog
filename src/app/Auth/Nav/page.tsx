"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false); // update state after logout
    router.push("/Authentication/login");
  };

  if (!isAuthenticated) return null; // Hide Nav if not logged in

  return (
    <div className="w-full h-16 rounded-xl bg-white shadow-md flex justify-between items-center px-12">
      <div className="flex gap-x-12">
        <li className="text-red-400 text-xl px-3 cursor-pointer list-none">
          <Link href="/Auth/Home">Home</Link>
        </li>
        <li className="text-green-500 text-xl px-3 cursor-pointer list-none">
          <Link href="/Auth/Blog">MyBlogs</Link>
        </li>
        <li className="text-blue-400 text-xl cursor-pointer list-none">
          <Link href="/Auth/account">Account</Link>
        </li>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-300 text-xl cursor-pointer rounded-md w-28 h-9 shadow-md shadow-gray-800"
      >
        Logout
      </button>
    </div>
  );
}
