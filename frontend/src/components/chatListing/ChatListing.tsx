import { useEffect, useState } from "react"
import { fetchAllUsers } from "../../services/user";
import { UserData } from "../../interfaces";
import { useUserProvider } from "../../helpers/customHooks/userProvider";
import io from "socket.io-client";

const SERVER_ENDPOINT = 'http://localhost:5000';
const ChatListing = () => {
  const [users, setUsers] = useState<Array<UserData>>([]);
  const { userData } = useUserProvider();
  const { email, token } = userData || {};
  console.log(email, token);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchAllUsers(token);
        if (!response) {
          throw new Error('No user available');
        }
        const usersExceptLoginOne: UserData[] = response.filter(user => user.email !== email);
        setUsers(usersExceptLoginOne);
      } catch (error) {
        console.log(error);
      }
    }

    if (!token) {
      return;
    }

    getUsers()

  }, [token, email]);

  const handleConnect = (user: UserData) => {
    const server = io(SERVER_ENDPOINT);
    server.emit('setup', user);
    server.on('connected', () => setSocketConnected(true));
  }

  return (
    <div className="h-auto flex flex-col shadow-2xl w-1/3 p-5 bg-slate-100 m-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-serif font-semibold">Chats</h1>
        <button className="bg-blue-300 px-3 font-mono font-medium rounded-lg">Create Chat <span className="text-xl font-medium">+</span></button>
      </div>
      <div className="w-full h-screen bg-slate-200 rounded-lg mt-5 p-2">
        <ul className="p-1 mb-5">
          {users.map(user => (<li className="p-3 mb-3 active:shadow-sm shadow-lg w-full active:bg-cyan-500 hover:bg-cyan-400 bg-cyan-300 rounded-xl" key={user.email} onClick={() => handleConnect(user)} >
            <div className="font-serif font-medium text-center text-xl">{user.name}</div><div className="font-mono font-light text-gray-700 text-center text-sm">{user.email}</div></li>))}
        </ul>
      </div>
    </div>
  )
}

export default ChatListing