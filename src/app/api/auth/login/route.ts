import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../Database/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import {connectDB} from "../../../../../Database/DB";

connectDB();
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
const jwt_key = process.env.JWT_TOKEN;

export async function POST(req: NextRequest) {

  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

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

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      jwt_key!,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Logged in successfully",
      token,
      user: { id: existingUser._id, email: existingUser.email }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
