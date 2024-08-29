import { useState } from "react"
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp";

const Login = () => {
    const [currentTab, setCurrentTab] = useState('signin');

    return (
        <div className="relative bg-[url('../src/assets/background.jpg')] bg-cover bg-center flex justify-center items-center w-full h-screen">
            <div className="flex shadow-xl justify-center flex-col items-center rounded-xl w-1/3 h-3/4 bg-slate-100">
                <div className="flex justify-between w-full space-x-5 px-14 mb-10">
                    <button onClick={() => setCurrentTab('signin')} type="button" className="text-white w-3/4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignIn</button>
                    <button onClick={() => setCurrentTab('signup')} type="button" className="text-white w-3/4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignUp</button>
                </div>
                {currentTab === 'signin' && <SignIn />}
                {currentTab === 'signup' && <SignUp />}
            </div>
        </div>
    )
}

export default Login