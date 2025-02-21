import BlogPosts from "../Blog/page";
import Nav from "../Nav/page";

export default function HomeScreen(){
    return (
    <>
    <div className="w-full flex flex-col items-center justify-center gap-4">
        <BlogPosts/>
    </div>  
    </>
    )
}