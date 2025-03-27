"use client";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import CreateBlog from "./CreateBlog/page";

type Post = {
  _id: string;
  content: string;
};

type DecodedToken = {
  id: string;
  email: string;
};

export default function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.id;
        const res = await fetch(`/api/auth/getposts?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

    fetchPosts();
  }, []);

  const deletePost = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`/api/auth/deletePost?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete post");

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const UpdatePost = async (id: string, newContent: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`/api/auth/updatepost?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newContent }), 
      });

      if (!res.ok) throw new Error("Failed to update post");

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? { ...post, content: newContent } : post
        )
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="w-screen flex flex-col items-center mt-20 text-white bg-black">
      <CreateBlog />
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="mb-4 p-3 rounded-lg w-1/2 shadow-md shadow-white">
            <div className="p-2 rounded-lg">
              <p className="break-words">{post.content}</p>
              <div className="w-full flex justify-between mt-3">
                {/* Edit Button - Now asks for new content */}
                <button
                  onClick={() => {
                    const newContent = prompt("Enter new content:", post.content);
                    if (newContent) UpdatePost(post._id, newContent);
                  }}
                  className="p-3 hover:bg-gray-700 rounded-lg"
                >
                  <i className="bx bx-edit-alt text-2xl"></i>
                </button>
                <button className="p-3 hover:bg-gray-700 rounded-lg">
                  <i className="bx bx-comment-detail text-2xl"></i>
                </button>
                <button className="p-3 hover:bg-gray-700 rounded-lg">
                  <i className="bx bx-share text-2xl"></i>
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => deletePost(post._id)}
                  className="p-3 hover:bg-gray-700 rounded-lg"
                >
                  <i className="bx bx-trash text-2xl"></i>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
