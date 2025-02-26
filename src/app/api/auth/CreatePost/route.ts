import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "../../../../../Database/DB";
import postSchema from "../../../../../Database/PostModel";

ConnectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const newPost = new postSchema(reqBody);
        await newPost.save();
        return NextResponse.json({ message: "Post created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
