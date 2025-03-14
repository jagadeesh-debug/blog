import { NextResponse } from "next/server";
import { connectDB } from "../../../../Database/DB";
import User from "../../../../Database/userModel";

connectDB();

export async function GET(req:any) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ name: user.name, email: user.email, mobile: user.mobile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
