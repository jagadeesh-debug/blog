"use client"
import React, { useState } from "react"
import CreatePost from "@/app/Auth/Blog/CreateBlog/page";
import Nav from "../Nav/page";
export default function BlogPosts() {
    const [posts, setPosts] = useState<string[]>([]);
    
    const addPosts = (newPost: string) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    }


    

    return (
        <>
            <div className="h-auto w-full flex flex-col mt-1 bg-white items-center">
                {posts.map((post, index) => (
            <div key={index} className="mb-4 p-3 rounded-lg w-1/2 bg-gray-300 flex flex-col gap-y-4   shadow-xl">
                    <div  className="w-full  p-2 bg-white rounded-lg shadow-xl shadow-black ">
                        <p className="break-words text-black">{post}</p>
                        <div className="w-full flex justify-between mt-3">
                            <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                                <i className="bx bx-upvote text-2xl"></i>
                            </button>
                            <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                                <i className="bx bx-downvote text-2xl"></i>
                            </button>
                            <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                                <i className="bx bx-comment-detail text-2xl"></i>
                            </button>
                            <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                                <i className="bx bx-share text-2xl"></i>
                            </button>
                        </div>
                    </div>
            </div>
                ))}
            <CreatePost addPosts={addPosts} />
        </div>

        </>

    );
}
