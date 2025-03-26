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
    setIsAuthenticated(false);
    router.push("/Authentication/login");
  };

  if (!isAuthenticated) return null; // Hide Nav if not logged in

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-black shadow-md shadow-violet-400 flex justify-between items-center px-12 z-50">
      <ul className="flex gap-x-12">
        <li className="text-pink-400 text-xl px-3 cursor-pointer list-none hover:shadow-md hover:shadow-violet-400 w-28 text-center rounded-md">
          <Link href="/Auth/Home">Home</Link>
        </li>
        <li className="text-pink-400 text-xl px-3 cursor-pointer list-none hover:shadow-md hover:shadow-violet-400 w-28 text-center rounded-md">
          <Link href="/Auth/Blog">MyBlogs</Link>
        </li>
        <li className="text-pink-400 text-xl px-3 cursor-pointer list-none hover:shadow-md hover:shadow-violet-400 w-28 text-center rounded-md">
          <Link href="/Auth/account">Account</Link>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="bg-pink-400 text-xl cursor-pointer rounded-md w-28 h-9 shadow-md text-black "
      >
        Logout
      </button>
    </nav>
  );
}
