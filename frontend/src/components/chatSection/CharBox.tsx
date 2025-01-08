const ChatBox = () => {
  return (
    <div className="h-auto flex flex-col shadow-2xl w-2/3 p-5 bg-slate-100 m-5">
        <h1 className="text-3xl font-serif font-semibold">Person Name</h1>
        <div className="w-full h-screen rounded-lg mt-5">
          <div className="w-full h-5/6 bg-slate-100 border-2 border-slate-400 mb-5 rounded-md">
          </div>
          <div className="flex mt-20">
            <input className="w-full p-2 rounded-md border-2 border-slate-400 mr-1"/>
            <button type="button" className="mx-auto block px-6 text-sm tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Send 
            </button>
          </div>
        </div>
    </div>
  )
}

export default ChatBox