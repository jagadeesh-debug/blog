import { connectDB } from "../../../../../Database/DB";
import PostModel from "../../../../../Database/PostModel";
import { NextResponse } from "next/server";
connectDB();

export async function GET(req:any){
    try{
        const posts = await PostModel.find();
        if(!posts){
            return NextResponse.json({error: 'Posts not found'}, {status: 404});
        }
        return NextResponse.json(posts, {status: 200});
    }
    catch(err){
        return NextResponse.json({error: 'An error occurred'}, {status: 500});
    }
}