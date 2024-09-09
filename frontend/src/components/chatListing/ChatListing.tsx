import { useEffect, useState } from "react"
import { fetchAllUsers } from "../../services/user";
import useLocalStore from "../../helpers/localStore";
import { UserData } from "../../interfaces";

const ChatListing = () => {
  const [users, setUsers] = useState<Array<UserData>>([]);
  const { getLocalItem } = useLocalStore();
  const { email, token } = getLocalItem('data');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchAllUsers(token);
        const usersExceptLoginOne: UserData[] = response.filter(user => user.email !== email);
        setUsers(usersExceptLoginOne);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    getUsers()

  }, [token, email]);

  return (
    <div className="h-auto flex flex-col shadow-2xl w-1/3 p-5 bg-slate-100 m-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-serif font-semibold">Chats</h1>
        <button className="bg-blue-300 px-3 font-mono font-medium rounded-lg">Create Chat <span className="text-xl font-medium">+</span></button>
      </div>
      <div className="w-full h-screen bg-slate-200 rounded-lg mt-5 p-2">
        <ul className="p-1 mb-5">
          {users.map(user => (<li className="p-3 w-full bg-cyan-300 rounded-xl" key={user.email}>
            <div className="font-serif font-medium text-center text-xl">{user.name}</div><div className="font-mono font-light text-gray-700 text-center text-sm">{user.email}</div></li>))}
        </ul>
      </div>
    </div>
  )
}

export default ChatListing