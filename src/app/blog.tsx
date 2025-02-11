"use client"
import React from "react"
import CreatePost from "./CreatePost"
import { useState } from "react";
export default function BlogPosts() {
    const [posts, setPosts] = useState<string[]>([]);
    const addposts = (newPost: string) => {
        setPosts((PrevPost) => [...PrevPost, newPost])
    }
    return (
        <div className="h-auto w-full flex flex-col mt-1 bg-white  ">
            <div className="w-full h-3/4  mb-4 p-6 rounded-lg  bg-gray-400 shadow-md">
                {posts.map((post, index) => (
                    <div key={index}>{post}
                        <div className="w-1/2 p-4 bg-white flex border justify-between items-center rounded-lg shadow-md ">
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
                        </div></div>
                ))}
            </div>
            <CreatePost addPosts={addposts} />
        </div>
    )
}
