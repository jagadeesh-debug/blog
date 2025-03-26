"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  name: string;
  email: string;
  mobile: string;
};

type DecodedToken = {
  _id: string;
  email: string;
};

export default function UserAccount() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          const userId = decoded._id;

          const res = await fetch(`/api/auth/userdetails?userId=${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error("Failed to fetch user details");

          const userData = await res.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  if (!user) return <p className="text-center text-pink-400">Loading user data...</p>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden text-pink-400 gap-y-4">
      <div className="w-1/2 p-4 flex shadow-md shadow-white justify-center items-start rounded-lg flex-col">
        <p>{user.name}</p>
      </div>
      <div className="w-1/2 p-4 flex shadow-md shadow-white justify-center items-start rounded-lg flex-col">
        <p>{user.email}</p>
      </div>
      <div className="w-1/2 p-4 flex shadow-md shadow-white justify-center items-start rounded-lg flex-col">
        <p>{user.mobile}</p>
      </div>
    </div>
  );
}
