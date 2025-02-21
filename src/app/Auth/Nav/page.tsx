import Link from "next/link"
export default function Nav(){
    return(
     <div className="w-full h-16  rounded-xl bg-white shadow-md flex  justify-between items-center px-12 ">
      <div className="flex " >
          <li className="text-red-400 text-xl px-3 cursor-pointer"><Link href="/Auth/Home">Home</Link></li>
          <li className="text-green-500 text-xl px-3 cursor-pointer"><Link href="/Auth/Blog">MyBlogs</Link></li>
          </div>
          <li className="text-green-400 text-xl cursor-pointer"><Link href="/Auth/account">Account</Link></li>
     </div>
    )
  }