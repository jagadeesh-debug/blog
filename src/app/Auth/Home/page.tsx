"use client";
import { useState, useEffect } from "react";

export default function HomeScreen() {
  const [posts, setPosts] = useState<{ _id: string; content: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/auth/HomePagePosts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Ensure loading stops no matter what
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-screen flex flex-col items-center  justify-center gap-4 pt-16 mt-4 bg-black text-white">
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="w-[80vw] md:w-1/2 p-4 flex justify-center items-start rounded-lg shadow-md flex-col shadow-md shadow-gray-400 text-violet-300 text-sm md:text-md"
          >
            
            <p>{post.content}</p>
            <div className="w-full flex justify-between mt-3">
              <button className="flex items-center justify-center p-3 hover:shadow-md hover:shadow-violet-300 rounded-lg transition-colors">
                <i className="bx bx-upvote  md:text-2xl text-white"></i>
              </button>
              <button className="flex items-center justify-center p-3  hover:shadow-md hover:shadow-violet-300 rounded-lg transition-colors">
                <i className="bx bx-downvote md:text-2xl text-white "></i>
              </button>
              <button className="flex items-center justify-center p-3 hover:shadow-md hover:shadow-violet-300 rounded-lg transition-colors">
                <i className="bx bx-comment-detail md:text-2xl text-white "></i>
              </button>
              <button className="flex items-center justify-center p-3 hover:shadow-md hover:shadow-violet-300 rounded-lg transition-colors">
                <i className="bx bx-share md:text-2xl text-white"></i>
              </button>
              <button className="flex items-center justify-center p-3  hover:shadow-md hover:shadow-violet-300 rounded-lg transition-colors">
                <i className='bx bxs-magic-wand md:text-2xl '></i>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}      
