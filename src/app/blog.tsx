export default function BlogPosts() {
    return (
        <div className="h-2/3 w-full flex flex-col mt-1  ">
            <div className="w-full h-2/3 mb-4 p-6 rounded-lg  bg-white shadow-md">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi eveniet nobis recusandae, maxime a blanditiis maiores natus nostrum porro amet eos optio ea repellendus saepe voluptatem ipsam architecto aut mollitia?
            </div>
            <div className="w-1/2 p-4 bg-white flex border justify-between items-center rounded-lg shadow-md ">
                <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    <i className="bx bx-upvote text-2xl"></i>
                </button>
                <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    <i className="bx bx-downvote text-2xl"></i>
                </button>
                <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    <i className="bx bx-comment-detail text-2xl"></i>
                </button>
                <button className="flex items-center justify-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    <i className="bx bx-share text-2xl"></i>
                </button>
            </div>
        </div>
    )
}
