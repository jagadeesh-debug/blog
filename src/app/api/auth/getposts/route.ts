import { connectDB } from "../../../../../Database/DB";
import Post from "../../../../../Database/PostModel";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const jwt_key = process.env.JWT_TOKEN;
connectDB();

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (!jwt_key) {
            return NextResponse.json({ error: "JWT key is not defined" }, { status: 500 });
        }
        const decodedToken = jwt.verify(token, jwt_key!) as { id: string };
        const userId = decodedToken.id;
        const posts = await Post.find({ user: userId });

        return NextResponse.json(posts, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

// DELETE route for deleting a post
export async function DELETE(req: NextRequest) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, jwt_key!) as { id: string };
        const userId = decodedToken.id;

        const { searchParams } = new URL(req.url);
        const postId = searchParams.get("id");

        if (!postId) {
            return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
        }

        const post = await Post.findOneAndDelete({ _id: postId, user: userId });

        if (!post) {
            return NextResponse.json({ error: "Post not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
