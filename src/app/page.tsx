"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogPosts from "./Auth/Blog/page";
import UserAccount from "./Auth/account/page";
import Login from "./Authentication/login/page";
import RootLayout from "./layout";
import SignUp from "./Authentication/signup/page";

export default function LandingScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        setIsAuthenticated(true)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return isAuthenticated ? <RootLayout>{<BlogPosts />}</RootLayout> : <Login/>;
}
