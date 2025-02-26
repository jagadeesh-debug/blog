"use client"
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function UserAccount(user: any) {
    const searchParams = useSearchParams();
    const name = searchParams.get("name")?.toLocaleUpperCase();
    const email = searchParams.get("email")?.toLocaleUpperCase();
    const mobile = searchParams.get("mobile")?.toLocaleUpperCase();
    

    return (
        <>
            <button className="cursor-pointer"><Link href="/Auth/Blog"><i className='bx bx-arrow-back text-2xl'></i></Link></button>
        <div className="w-full h-5/6 flex flex-col items-center justify-center gap-4">
            <div className="w-1/2 p-4 flex border justify-center items-start rounded-lg shadow-md flex-col h-1/6">
                <p>{name}</p>
            </div>
            <div className="w-1/2 p-4 bg-white flex border justify-center items-start rounded-lg shadow-md flex-col h-1/6">
                <p>{email}</p>
            </div>
            <div className="w-1/2 p-4 bg-white flex border justify-center items-start rounded-lg shadow-md flex-col h-1/6">
                <p>{mobile}</p>
            </div>
            <div className="w-1/2 p-4 bg-white flex justify-center items-center rounded-lg flex-col h-1/6">
                <button
                    // onClick={handleSubmit
                    className="bg-blue-500 text-white rounded-lg p-2 w-1/6 shadow-md"
                >
                    Edit
                </button>
            </div>
        </div>
        </>
    );

}