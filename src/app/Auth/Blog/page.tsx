"use client";
import React, { useState, useEffect } from "react";
import CreatePost from "@/app/Auth/Blog/CreateBlog/page";
type Post = {
    _id: string;
    content: string;
};

type DecodedToken = {
    id: string;
};

export default function BlogPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("/api/auth/getposts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch posts");

            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const addPost = (newPost: Post) => {
        setPosts((prev) => [newPost, ...prev]);
    };

    return (
        <>
            <div className="h-auto w-full flex flex-col mt-1 bg-white items-center">
                <CreatePost addPost={addPost} />
                {loading ? (
                    <p>Loading posts...</p>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className="mb-4 p-3 rounded-lg w-1/2 shadow-xl shadow-pink-300 flex flex-col gap-y-4 shadow-xl">
                            <div className="w-full p-2  rounded-lg  ">
                                <p className="break-words text-black">{post.content}</p>
                                <div className="w-full flex justify-between mt-3">
                                    <button className="p-3 hover:bg-gray-100 rounded-lg"><i className="bx bx-upvote text-2xl"></i></button>
                                    <button className="p-3 hover:bg-gray-100 rounded-lg"><i className="bx bx-downvote text-2xl"></i></button>
                                    <button className="p-3 hover:bg-gray-100 rounded-lg"><i className="bx bx-comment-detail text-2xl"></i></button>
                                    <button className="p-3 hover:bg-gray-100 rounded-lg"><i className="bx bx-share text-2xl"></i></button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
