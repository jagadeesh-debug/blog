// app/CreateBlog.tsx

"use client";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    id: string;
}

export default function CreateBlog() {
    const [post, setPost] = useState("");
    const [posts, setPosts] = useState<string[]>([]);
    const [isClicked, setClick] = useState(false);
    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        setClick(true);
        setToggle(true);
    };

    const handlePost = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token from localStorage:", token);

            if (!token) {
                console.error("JWT token not found");
                return;
            }

            const decodedToken = jwtDecode<JwtPayload>(token);
            console.log("Decoded token:", decodedToken);

            if (!decodedToken.id) {
                console.error("User ID not found in JWT");
                return;
            }

            const userId = decodedToken.id;
            console.log("User ID:", userId);

            const res = await fetch("/api/auth/CreatePost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ post: post, userId: userId, token: token }),
            });

            console.log("API Response:", res);
            const responseData = await res.json();
            console.log("Response Data:", responseData);

            if (res.ok && post.trim()) {
                setPosts([...posts, post]);
                setPost("");
                setClick(false);
                setToggle(false);
            } else {
                console.error("Failed to create post");
                console.error("Response status:", res.status);
                console.error("Response text:", await res.text());
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleClose = () => {
        setClick(false);
        setToggle(false);
    };

    return (
        <div className="m-2">
            <div className="h-2/3 w-full flex justify-center items-end cursor-pointer">
                {!toggle && (
                    <div className="flex rounded-full h-fit  shadow-md fixed bottom-0 shadow-md shadow-violet-300" onClick={handleClick}>
                        <i className="bx bx-plus text-6xl text-violet-300 "></i>
                    </div>
                )}

                {isClicked && (
                    <div className="flex flex-col items-center fixed bottom-0">
                        <textarea
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            placeholder="Write a new post..."
                            className="mt-4 p-2 border border-gray-300 rounded w-96 h-32 resize-none"
                        />
                        <div className="flex gap-3 mt-2">
                            <button onClick={handlePost} className="p-2 bg-blue-500 text-white rounded">
                                Post
                            </button>
                            <button onClick={handleClose} className="p-2 bg-red-500 text-white rounded">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}