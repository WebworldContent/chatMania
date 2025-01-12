import { useEffect, useRef, useState } from "react";
import { useUserProvider } from "../../helpers/customHooks/userProvider";
import ChatHistory from "./ChatHistory";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

const SERVER_ENDPOINT = "http://localhost:5000";
const ChatBox = () => {
  const [message, setMessage] = useState<string>("");
  const { userData } = useUserProvider();
  const { email = "", name = "" } = userData || {};
  const server = useRef<Socket | null>(null);

  useEffect(() => {
    server.current = io(SERVER_ENDPOINT, {
      withCredentials: true
    });

    return () => {
      server.current?.disconnect();
    };
  }, []);

  const handleSend = () => {
    const messageData = { name, email, message };

    if (server.current) {
      server.current.emit("one-to-one", messageData);
    } else {
      console.log("Server not connected");
    }
    setMessage("");
  };

  return (
    <div className="h-auto flex flex-col shadow-2xl w-2/3 p-5 bg-slate-100 m-5">
      <h1 className="text-3xl font-serif font-semibold">Person Name</h1>
      <div className="w-full h-screen rounded-lg mt-5">
        <ChatHistory />
        <div className="flex mt-20">
          <input
            className="w-full p-2 rounded-md border-2 border-slate-400 mr-1"
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="mx-auto block px-6 text-sm tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
