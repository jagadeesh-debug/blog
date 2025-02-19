"use client"
import { useState } from "react";

export default function UserAccount() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [data, setData] = useState({ name: "", email: "", mobile: "" });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/signup", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const responseData = await res.json();
            setData(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="w-1/2 p-4 flex border justify-center items-start rounded-lg shadow-md flex-col h-1/6">
                <p>{data.name}</p>
            </div>
            <div className="w-1/2 p-4 bg-white flex border justify-center items-start rounded-lg shadow-md flex-col h-1/6">
                <p>{data.email}</p>
            </div>
            <div className="w-1/2 p-4 bg-white flex border justify-center items-start rounded-lg shadow-md flex-col h-1/6">
                <p>{data.mobile}</p>
            </div>
            <div className="w-1/2 p-4 bg-white flex justify-center items-center rounded-lg flex-col h-1/6">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white rounded-lg p-2 w-1/6 shadow-md"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}
