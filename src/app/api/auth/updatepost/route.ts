import { NextRequest,NextResponse } from "next/server";
import Post from "../../../../../Database/PostModel"
import { connectDB } from "../../../../../Database/DB";
export async function PUT(req: NextRequest) {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    console.log(id);
    if(!id){
        return NextResponse.json({error:"Post ID is required"},{status:400});
    }
    try{
        const post = await Post.findById(id);
        if(!post){
            return NextResponse.json({error:"Post not found"},{status:404});
        }
        const reqBody = await req.json();
        const {content} = reqBody;
        if(!content){
            return NextResponse.json({error:"Post content is required"},{status:400});
        }
        post.content = content;
        await post.save();
        return NextResponse.json({message:"Post updated successfully"});
    }
    
    catch(error){
        console.error("Error updating post:",error);
        return NextResponse.json({error:"Error updating post"},{status:500});
    }
}