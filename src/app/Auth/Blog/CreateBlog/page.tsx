"use client"
import { useEffect, useState } from "react"
import React from "react"

export default function CreatePost({ addPosts }: { addPosts: (newPost: string) => void }) {

    const [post, setPost] = useState("")
    const [isClicked, setClick] = useState(false);
    const [toggle, setToggle] = useState(false);
 
    const handleClick = () => {
        setClick(true);
        setToggle(true);
    }
    const handlePost = () => {
        if (post.trim()) {
            addPosts(post);
            setPost(""); 
            setClick(false);
            setToggle(false);
        }
    }

    const handleClose = () => {
        setClick(false);
        setToggle(false);
    }

        

 

    return (
        <div className="h-2/3 w-full flex justify-center items-end cursor-pointer">
            {!toggle &&
            <div className="flex rounded-full h-fit bg-white shadow-md fixed bottom-0" onClick={handleClick} >
                <i className='bx bx-plus text-6xl'></i>
            </div>
            }   

            {isClicked && (
                <div className="flex flex-col items-center fixed bottom-0">        
                    <textarea
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        placeholder="Write a new post..."
                        className="mt-4 p-2 border border-gray-300 rounded w-96 h-32 resize-none"
                    />
                    <div className="flex flex-row items-center gap-x-3">
                    <button 
                        onClick={handlePost}
                        className="mt-2 p-2 bg-blue-500 text-white rounded"
                    >
                        Post
                    </button>
                    <button 
                        onClick={handleClose}
                        className="mt-2 p-2 bg-red-500 text-white rounded"
                    >
                        Close
                    </button>
                    </div>
                </div>
            )}
        </div>
    )
}
