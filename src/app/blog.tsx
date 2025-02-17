"use client"
import React, { useState } from "react"
import CreatePost from "./CreatePost"

export default function BlogPosts() {
    const [posts, setPosts] = useState<string[]>([]);

    const addPosts = (newPost: string) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    }

    return (
        <div className="h-auto w-full flex flex-col mt-1 bg-white items-center">
            <div className="w-1/2 max-w-1/2 h-1/2 mb-4 p-6 rounded-lg bg-green-300 shadow-md flex flex-col gap-4">
                {posts.map((post, index) => (
                    <div key={index} className="w-full p-4 bg-white rounded-lg shadow-md">
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
                ))}
            </div>
            <CreatePost addPosts={addPosts} />
        </div>
    );
}
