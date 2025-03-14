import { connectDB } from "../../../../../Database/DB";
import PostModel from "../../../../../Database/PostModel";
    import { NextResponse } from "next/server";

connectDB();

export async function GET(){
    try{
        const posts = await PostModel.find();
        if(!posts){
            return NextResponse.json({error: 'Posts not found'}, {status: 404});
        }
        return NextResponse.json(posts, {status: 200});
    }
    catch(err){
        return NextResponse.json({err}, {status: 500});
    }
}