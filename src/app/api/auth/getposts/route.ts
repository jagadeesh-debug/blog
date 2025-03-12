    import { connectDB } from "../../../../../Database/DB";
    import Post from "../../../../../Database/PostModel";
    import { NextResponse, NextRequest } from "next/server";
    import jwt from 'jsonwebtoken';
    import dotenv from "dotenv";
    import path from "path";

    dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
    const jwt_key = process.env.JWT_TOKEN;
    connectDB();

    export async function GET(req: NextRequest) {
        try {
            const token = req.headers.get('Authorization')?.split(' ')[1];
            if (!token) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            if (!jwt_key) {
                return NextResponse.json({ error: 'JWT key is not defined' }, { status: 500 });
            }
            const decodedToken = jwt.verify(token, jwt_key) as { id: string };
            const userId = decodedToken.id;
            console.log(`User ID from token: ${userId}`);
            const posts = await Post.find({ user: userId });
            
            if (!posts || posts.length === 0) {
                return NextResponse.json({ error: 'No posts found for this user' }, { status: 404 });
            }
            return NextResponse.json(posts, { status: 200 });

        } catch (err) {
            console.error(err);
            return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
        }
    }