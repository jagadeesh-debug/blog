import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../Database/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "../../../../../Database/DB";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        if (req.method !== "POST") {
            return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
        }

        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ error: "User doesn't exist" }, { status: 400 });
        }

        const isMatch = await bcryptjs.compare(password, existingUser.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_TOKEN!, { expiresIn: "30d" });

        return NextResponse.json({ message: "Logged in successfully", token, user: { id: existingUser._id, email: existingUser.email } }, { status: 200 });

    } catch (error) {
        console.error("Login API error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
