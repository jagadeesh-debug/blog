"use client"
import { useState } from "react"
import React from "react"

export default function CreatePost({ addPosts }: { addPosts: (newPost: string) => void }) {

    const [post, newPost] = useState("")
    const [isClicked, setClick] = useState(false);

    const handleClick = () => {
        setClick(true); // Show new input when the '+' button is clicked
    }

    const handlePost = () => {
        if (post.trim()) {
            addPosts(post);
            newPost(""); // Reset the input after posting
            setClick(false); // Hide the input after posting
        }
    }

    return (
        <div className="h-2/3 w-full flex justify-center items-end cursor-pointer">
            <div className="flex rounded-full h-fit bg-white shadow-md" onClick={handleClick}>
                <i className='bx bx-plus text-6xl'></i>
            </div>

            {isClicked && (
                <div>
                    <input
                        type="text"
                        value={post}
                        onChange={(e) => newPost(e.target.value)}
                        placeholder="Write a new post..."
                        className="mt-4 p-2 border border-gray-300 rounded"
                    />
                    <button 
                        onClick={handlePost}
                        className="mt-2 p-2 bg-blue-500 text-white rounded"
                    >
                        Post
                    </button>
                </div>
            )}
        </div>
    )
}
