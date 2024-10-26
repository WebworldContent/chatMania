import { MouseEvent, useEffect, useState } from "react";
import useLocalStore from "../helpers/localStore"
import { fetchUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import { UserData } from "../interfaces";

const UserProfile = () => {
  const [user, setUser] = useState<UserData>({
    email: '',
    image: '',
    name: ''
  });
  const navigate = useNavigate();
  const { getLocalItem, removeLocal } = useLocalStore();
  const { email, token } = getLocalItem('data');
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response: UserData = await fetchUser(email, token);
        setUser({ ...response });
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'Token expired') {
            navigate('/login');
          } else {
            console.error('Error fetching user:', error.message);
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    if (!token) {
      navigate('/login');
      return;
    }

    getUser()

  }, [getLocalItem, email, token, navigate]);

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    removeLocal('data');
  };

  return (
    <div className="mr-5">
      <div className="flex items-center gap-4" onClick={() => setShowProfile(!showProfile)}>
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <img src={user.image ?? '../assets/default.jpg'} className="w-200 h-200 rounded-lg" />
        </div>

        <div className="font-medium dark:text-white">
          <div className="font-serif font-semibold capitalize">{user.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
        </div>
      </div>
      {showProfile && (<div className="profile-dropdown z-50 w-52 h-40">
        <ul className="dropdown-content text-center text-stone-950 font-sans">
          <li><a href="#">Profile</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#" onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>)}
    </div>
  )
}

export default UserProfile