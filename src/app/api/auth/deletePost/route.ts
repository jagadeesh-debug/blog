import { connectDB } from "../../../../../Database/DB";
import PostModel from "../../../../../Database/PostModel";
import { NextResponse } from "next/server";

export async function DELETE(request: Request){
    const {searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(id);

    try {
      await connectDB();
      const blogToDelete = await  PostModel.findOneAndDelete({ _id: id });
      if (!blogToDelete) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: "Blog deleted successfully" });
    } catch (error: unknown) {
      return NextResponse.json({error: error}, {status: 500});
    }
  }