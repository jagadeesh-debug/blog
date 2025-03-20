"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  name: string;
  email: string;
  mobile: string;
};

type DecodedToken = {
  _id: string; // Ensure this matches the structure of your token
  email: string;
  // Add other fields if necessary
};

export default function UserAccount() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Decode the token to get the user ID
          const decoded: DecodedToken = jwtDecode(token);
          const userId = decoded._id;

          // Fetch user details from the API
          const res = await fetch(`/api/auth/userdetails?userId=${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            throw new Error("Failed to fetch user details");
          }

          const userData = await res.json();
          setUser(userData); // Update the state with the fetched user data
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails(); // Call the async function
  }, []);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="w-full  flex flex-col items-center justify-center gap-4">
      <div className="w-1/2  p-4 flex shadow-md shadow-white justify-center items-start rounded-lg shadow-md flex-col ">
        <p>{user.name}</p>
      </div>
      <div className="w-1/2 p-4  flex shadow-md shadow-white justify-center items-start rounded-lg shadow-md flex-col ">
        <p>{user.email}</p>
      </div>
      <div className="w-1/2 p-4 flex sahdow-md shadow-white justify-center items-start rounded-lg shadow-md flex-col ">
        <p>{user.mobile}</p>
      </div>
    </div>
  );
}