"use client";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'boxicons/css/boxicons.min.css';

import { useEffect, useState } from "react";
import Nav from "./Auth/Nav/page";
import BlogPosts from "./Auth/Blog/page";
import UserAccount from "./Auth/account/page";
import Login from "./Authentication/login/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await res.json();
        setIsAuthenticated(!isAuthenticated);
  console.log(isAuthenticated);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
   

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} h-screen w-screen`}>
        {children}
      </body>
    </html>
  );
}
