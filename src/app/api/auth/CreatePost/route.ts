// app/api/auth/CreatePost/route.ts

import { NextRequest, NextResponse } from "next/server";
import Post from "../../../../../Database/PostModel";
import User from "../../../../../Database/userModel";
import { connectDB } from "../../../../../Database/DB";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }

    try {
        console.log("Received POST request");
        const reqBody = await req.json();
        const { post, token } = reqBody;

       

        if (!token) {
            console.error("Token is missing");
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        const secret = process.env.JWT_TOKEN;
        if (!secret) {
            console.error("JWT secret not defined");
            return NextResponse.json({ error: "JWT secret not defined" }, { status: 500 });
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, secret) as { id: string };
            console.log("Decoded Token:", decodedToken);
        } catch (error) {
            console.error("Invalid token:", error);
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const userId = decodedToken.id;
        console.log("User ID:", userId);
        if (!post || !userId) {
            console.error("Post or userId is missing");
            return NextResponse.json({ error: "Post content and userId are required" }, { status: 400 });
        }

        const newPost = new Post({
            content: post,
            user: userId,
        });

        try {
            await newPost.save();
            console.log("Post saved successfully");
        } catch (saveError) {
            console.error("Error saving post:", saveError);
            return NextResponse.json({ error: "Error saving post" }, { status: 500 });
        }

        try {
            await User.findByIdAndUpdate(userId, {
                $push: { posts: newPost._id },
            });
            console.log("User updated successfully");
        } catch (updateError) {
            console.error("Error updating user:", updateError);
            return NextResponse.json({ error: "Error updating user" }, { status: 500 });
        }

        return NextResponse.json({ message: "Post created successfully", post: newPost }, { status: 201 });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}