import { NextRequest, NextResponse } from "next/server";
import Post from "../../../../../Database/PostModel";
import User from "../../../../../Database/userModel";
import {connectDB }from "../../../../../Database/DB";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json(); // Parse the request body
        const { post, userId } = reqBody;  // Extract the post content and userId

        // Validate the post content and userId
        if (!post || !userId) {
            return NextResponse.json({ error: "Post content and userId are required" }, { status: 400 });
        }

        // Create a new post document
        const newPost = new Post({
            content: post,
            user: userId,  // Associate the post with the user
        });

        // Save the post to the database
        await newPost.save();

        // Optionally, update the user document with the post reference
        await User.findByIdAndUpdate(userId, {
            $push: { posts: newPost._id },  // Add the new post ID to the user's posts array
        });

        // Return a success response with the newly created post
        return NextResponse.json({ message: "Post created successfully", post: newPost }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
