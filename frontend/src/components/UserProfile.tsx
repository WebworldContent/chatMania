import { useEffect, useState } from "react";
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
	const { getLocalItem } = useLocalStore();
	const { email, token } = getLocalItem('data');

	useEffect(() => {
		const getUser = async () => {
			try {
				const response: UserData = await fetchUser(email, token);
				setUser({ ...response });
			} catch (error) {
				console.log(error);
			}
		};

		if (!token) {
			navigate('/login');
			return;
		}

		getUser()

	}, [getLocalItem, email, token, navigate]);

	return (
		<div className="mr-5">
			<div className="flex items-center gap-4">
				<div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
					{user.image ? (<img src={user.image} className="w-200 h-200 rounded-lg"/>) : (<svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>)}
				</div>

				<div className="font-medium dark:text-white">
					<div className="font-serif font-semibold capitalize">{user.name}</div>
					<div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
				</div>
			</div>
		</div>
	)
}

export default UserProfile