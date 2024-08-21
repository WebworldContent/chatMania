const ChatListing = () => {
    return (
        <div className="h-auto flex flex-col shadow-2xl w-1/3 p-5 bg-slate-100 m-5">
            <div className="flex justify-between">
                <h1 className="text-3xl font-serif font-semibold">Chats</h1>
                <button className="bg-blue-300 px-3 font-mono font-medium rounded-lg">Create Chat <span className="text-xl font-medium">+</span></button>
            </div>
            <div className="w-full h-screen bg-slate-200 rounded-lg mt-5 p-2"></div>
        </div>
    )
}

export default ChatListing