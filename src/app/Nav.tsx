export default function Nav(){
    return(
     <div className="w-full h-1/2 rounded-xl bg-white shadow-md flex  justify-between items-center px-12 ">
      <div className="flex " >
          <li className="text-red-400 text-xl px-3 cursor-pointer">Home</li>
          <li className="text-green-500 text-xl px-3 cursor-pointer">Blogs</li>
          </div>
          <li className="text-green-400 text-xl cursor-pointer">Account</li>
     </div>
    )
  }