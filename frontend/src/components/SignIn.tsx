import { SubmitHandler, useForm } from "react-hook-form"
import { LoginUser } from "../interfaces";
import { signInUser } from "../services/login";
import { useNavigate } from "react-router-dom";
import { useUserProvider } from "../helpers/customHooks/userProvider";

const SignIn = () => {
  const { setUserData } = useUserProvider(); 
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>()

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    try {
      console.log(data);
      const response = await signInUser(data);
      if (response.status) {
        console.log(response);
        const { token, email } = response;
        setUserData({ token, email }); // will use redux here moving forward instead of context API
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error("Login error:", error);
      // Optionally handle error (e.g., show a notification to the user)
      navigate('/login');
    }
  };

  return (
    <div className="p-5 w-full mb-5">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email <span className="text-red-600">*</span></label>
          <input type="email" id="email" {...register("email", { required: "Error: cannot be empty", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Error: incorrect email' } })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
          {errors.email && (
            <div>
              {errors.email.type === 'required' && <p>{errors.email.message}</p>}
              {errors.email.type === 'pattern' && <p>{errors.email.message}</p>}
            </div>
          )}
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password <span className="text-red-600">*</span></label>
          <input type="password" id="password" {...register("password", { required: 'Error: cannot be empty', minLength: 1 })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>
        <div className="flex items-start mb-5"></div>
        <button type="submit" className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
      </form>
    </div>
  )
}

export default SignIn