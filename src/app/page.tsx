"use client";
import { useEffect, useState } from "react";
import BlogPosts from "./Auth/Blog/page";
import Login from "./Authentication/login/page";
import RootLayout from "./layout";

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

        setIsAuthenticated(true)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return isAuthenticated ? <RootLayout>{<BlogPosts />}</RootLayout> : <Login/>;
}
