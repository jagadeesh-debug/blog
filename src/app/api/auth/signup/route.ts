import mongoose from "mongoose";
import {connectDB} from "../../../../../Database/DB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "../../../../../Database/userModel";

connectDB();

export async function POST(req:NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, email, password, mobile } = reqBody;

    if (!name || !mobile || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}
