import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "../../../../../Database/DB";
import User from "../../../../../Database/userModel";
import bcryptjs from "bcryptjs";
ConnectDB() 
export async function POST(req:NextRequest){
 try{
    const reqBody = await req.json();
    const {email, password} = reqBody;
    if(!email && !password){
        return NextResponse.json({error: "Email and password are required"}, {status: 400});
    }
   const existingUser = await User.findOne({email});
   if(!existingUser){
    return NextResponse.json({error: "User doesnt exist"}, {status: 400});
   }
    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if(!isMatch){
        return NextResponse.json({error: "Password Invalid"}, {status: 400});
    }
    return NextResponse.json({message: "Logged in successfully", status: 200,user:existingUser});
    
    

 }
 catch{
    return NextResponse.json({error: "An error occurred"}, {status: 500});
 }
}