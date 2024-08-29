import { SubmitHandler, useForm } from "react-hook-form"
import { UserData } from "../interfaces"
import { createUser } from "../services/register";

const SignUp = () => {
	const { register, handleSubmit, setError, formState: { errors } } = useForm<UserData>();

	const onSubmit: SubmitHandler<UserData> = async (data) => {
		const { name, email, password, repeatPassword, image } = data;
		if (password !== repeatPassword) {
			setError("repeatPassword", {
				type: "manual",
				message: "Error: unmatched passwords"
			});
			return;
		}

		const updatedData = { name, email, password, image };

		try {
			const response = await createUser(updatedData);
			if (response.status) {
				console.log(`User is created!`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="p-5 w-full mb-5">
			<form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name <span className="text-red-600">*</span></label>
					<input type="text" id="name" {...register("name", { required: 'Error: cannot be empty', minLength: 1 })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Name" />
					{errors.name && <p role="alert">{errors.name.message}</p>}
				</div>
				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email <span className="text-red-600">*</span></label>
					<input type="email" id="email" {...register("email", {
						required: 'Error: cannot be empty', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Error: incorrect email' }
					})} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@test.com" />
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
				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password <span className="text-red-600">*</span></label>
					<input type="password" id="repeatPassword" {...register("repeatPassword", { required: 'Error: cannot be empty', minLength: 1 })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
					{errors.repeatPassword && <p role="alert">{errors.repeatPassword.message}</p>}
				</div>

				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload Image</label>
					<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
				</div>

				<button type="submit" className="text-white w-full mt-3 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button>
			</form>
		</div>
	)
}

export default SignUp