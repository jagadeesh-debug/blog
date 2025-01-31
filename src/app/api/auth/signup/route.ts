import mongoose from "mongoose";
import connectDB from "../../../../../Database/DB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "../../../../../Database/userModel";
import validator from "validator";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Check if both email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 8);
    console.log(typeof hashedPassword )
    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });


    // Save the new user to the database
    console.log(newUser);
    await newUser.save();
    console.log("User created successfully");
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}
