"use client"
export default function Login() {
    return (
        <div className="w-full h-full flex items-center justify-center">

        <form className="w-1/2 p-4 bg-white flex border justify-between items-center rounded-lg shadow-md flex-col h-1/2">
            <label htmlFor="email" className="text-lg">Email
                <input type="email"/>
            </label>
            <label htmlFor="password" className="text-lg">Password
                <input type="password"/>
            </label>
            <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                Login
            </button>
        </form>
        </div>

    )
}