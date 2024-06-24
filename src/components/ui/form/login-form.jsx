import * as React from "react";
import { ContainerModal } from "../../container/container";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { handleLogin } from "../../../app/page.service";
import { useUser } from "../../../context/user/user-context";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { FaRegUser } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const LoginForm = ({ setOpen, open }) => {
	const { setUser, user } = useUser();
	const navigate = useRouter();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [messages, setMessages] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [remember, setRemember] = React.useState(false);

	React.useEffect(() => {
		if (messages) {
			Swal.fire({
				icon: messages?.error,
				text: messages?.text,
			});
		}
	}, [messages]);

	React.useEffect(() => {
		const emailLocal = sessionStorage.getItem("use");
		const passwordLocal = sessionStorage.getItem("pass");
		const localRemember = sessionStorage.getItem("rem");

		if (emailLocal && passwordLocal) {
			setEmail(emailLocal);
			setPassword(passwordLocal);
			// Convert string to boolean
			setRemember(localRemember === "true");
		}
	}, [user]);

	const handleSubmit = e => {
		e.preventDefault();

		if (remember) {
			sessionStorage.setItem("use", email);
			sessionStorage.setItem("pass", password);
			sessionStorage.setItem("rem", remember);
		} else {
			sessionStorage.removeItem("use");
			sessionStorage.removeItem("pass");
			sessionStorage.removeItem("rem");
		}

		handleLogin({
			email,
			password,
			setLoading,
			setUser,
			setMessages,
			navigate,
		}).then(res => {
			if (res === "ok") {
				Swal.fire({
					title: "Login Success!",
					icon: "success",
					text: "Selamat datang di bisnis partner!",
					width: 350,
					timerProgressBar: true,
					timer: 2000,
					showConfirmButton: false,
				});
			}
		});
	};

	const handleInput = e => {
		const { value, id } = e.target;

		if (id === "username") {
			setEmail(value);
		}

		if (id === "password") {
			setPassword(value);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<ContainerModal setOpen={setOpen}>
			{open && (
				<motion.div
					initial={{
						translateY: 100,
						opacity: 0,
					}}
					animate={{
						translateY: 0,
						opacity: 1,
					}}
					style={{
						width: 360,
						height: 420,
					}}
					className='bg-white/40 p-1 rounded flex flex-col'>
					<form
						className='w-full h-full bg-white rounded flex flex-col items-center justify-center p-4 relative gap-2'
						onSubmit={handleSubmit}>
						<div className='border-b-2 pb-2 mb-4 w-full'>
							<h4 className=' text-2xl font-semibold text-neutral-500 '>
								Masuk
							</h4>
							<p className='text-sm text-neutral-400'>
								Selamat datang kembali.
							</p>
						</div>
						<div className='flex flex-col gap-1 w-full'>
							<label htmlFor='username' className='text-sm text-neutral-500'>
								Username
							</label>
							<div className='flex items-center focus:bg-neutral-100 w-full h-10 border border-neutral-200'>
								<div className='px-3 border-r-2'>
									<FaRegUser color='#a3a3a3' />
								</div>
								<input
									type='text'
									onChange={handleInput}
									id='username'
									value={email}
									placeholder='Masukan username anda...'
									className=' outline-none pl-2 text-sm h-full flex-1'
								/>
							</div>
						</div>
						<div className='flex flex-col gap-1 w-full'>
							<label htmlFor='username' className='text-sm text-neutral-500'>
								Password
							</label>
							<div className='flex items-center focus:bg-neutral-100 w-full h-10 border border-neutral-200'>
								<div className='px-3 border-r-2'>
									<IoKeyOutline color='#a3a3a3' />
								</div>
								<input
									type='password'
									onChange={handleInput}
									id='password'
									value={password}
									placeholder='********'
									className=' outline-none pl-2 text-sm h-full flex-1'
								/>
							</div>
						</div>
						<div className='w-full flex justify-between items-center mt-2'>
							<div className='flex gap-1 items-center'>
								<input
									type='checkbox'
									name='remember'
									id='remember'
									checked={remember}
									onChange={() => {
										setRemember(!remember);
									}}
								/>
								<label htmlFor='remember' className='text-xs text-neutral-400'>
									ingat saya
								</label>
							</div>
							<div>
								<p className='text-xs cursor-pointer text-neutral-400 border-b border-b-neutral-400'>
									Lupa password?
								</p>
							</div>
						</div>
						<div className=' pt-2 w-full'>
							<button
								onClick={handleSubmit}
								className='w-full mt-4 h-10 bg-gradient-to-br from-indigo-500 to-blue-400 text-white rounded'>
								{loading ? (
									<CircularProgress size={12} sx={{ color: "white" }} />
								) : (
									"Login"
								)}
							</button>
						</div>
						<button
							className=' absolute top-2 text-slate-400 right-2'
							type='button'
							onClick={handleClose}>
							<IoClose />
						</button>
					</form>
				</motion.div>
			)}
		</ContainerModal>
	);
};

export default LoginForm;
