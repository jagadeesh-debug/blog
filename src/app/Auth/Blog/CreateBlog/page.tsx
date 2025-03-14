"use client";
import { useState } from "react";

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
      const res = await fetch("/api/auth/CreatePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: post }),
      });

      if (res.ok && post.trim()) {
        setPosts([...posts, post]);
        setPost("");
        setClick(false);
        setToggle(false);
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
          <div className="flex rounded-full h-fit bg-white shadow-md fixed bottom-0" onClick={handleClick}>
            <i className="bx bx-plus text-6xl"></i>
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
