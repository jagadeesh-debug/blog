"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    router.push("/");
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-black shadow-md shadow-violet-400 justify-between items-center px-12 z-50 hidden md:flex">
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
          className="bg-pink-400 text-xl cursor-pointer rounded-md w-28 h-9 shadow-md text-black"
        >
          Logout
        </button>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 right-0 w-full h-14 bg-black flex items-center justify-between px-5 md:hidden z-50">
        <span className="text-pink-400 text-2xl font-bold">Bloggit</span>
        <i
          className={`bx ${isOpen ? 'bx-x' : 'bx-menu-alt-left'} text-white text-4xl cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        ></i>
      </nav>
      
      {isOpen && (
        <div className="fixed top-14 right-0 w-2/3 bg-black shadow-lg flex flex-col items-center py-4  md:hidden">
          <ul className="w-full text-center">
            <li className="text-pink-400 text-xl py-2 border-b border-gray-600">
              <Link href="/Auth/Home" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li className="text-pink-400 text-xl py-2 border-b border-gray-600">
              <Link href="/Auth/Blog" onClick={() => setIsOpen(false)}>MyBlogs</Link>
            </li>
            <li className="text-pink-400 text-xl py-2 border-b border-gray-600">
              <Link href="/Auth/account" onClick={() => setIsOpen(false)}>Account</Link>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="mt-4 bg-pink-400 text-xl cursor-pointer rounded-md w-28 h-9 shadow-md text-black"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}