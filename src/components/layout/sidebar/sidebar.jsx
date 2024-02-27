"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDoubleLeft,
	faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import logo from "@/assets/icons/logo-landscape.png";
import logo_only from "@/assets/icons/andaru-logo.png";
import UserCard from "@/components/ui/user/user-card";
import { configsidebar } from "@/config/config-sidebar";
import { ButtonNavigation } from "@/components/ui/button/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user/user-context";
import { useSidebar } from "@/context/sidebar/sidebar-context";
import { Tooltip } from "@mui/material";

const Sidebar = props => {
	const { userData } = useUser();
	const router = useRouter();
	const { open, toggleOpen } = useSidebar();

	const handleNavigate = link => {
		router.push(link);
	};

	const handleLogout = () => {
		router.push("/");
		localStorage.clear();
	};

	return (
		<div className='relative bg-red-500 flex z-50'>
			<motion.div
				initial={false}
				animate={{ width: open ? 320 : 80 }}
				transition={{ duration: 0.3 }}
				className={`flex flex-col p-2 bg-white min-h-screen border-r border-slate-200 shadow-lg gap-2 z-20`}>
				<motion.div
					animate={{
						display: "flex",
						width: "100%",
						flexDirection: open ? "row" : "column-reverse",
						justifyContent: "space-between",
						alignItems: "center",
						paddingBottom: open ? 10 : 0,
					}}
					className={open ? " border-b-2 border-slate-100" : ""}>
					<motion.div
						initial={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
						animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
						transition={{ duration: 0.3, delay: 0.3 }}
						className={`${open ? "w-full h-12" : "hidden"}`}>
						<Image
							src={logo}
							className={open ? " w-40" : "hidden"}
							alt='logo-andaru'
						/>
					</motion.div>
					<motion.div
						initial={!open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
						animate={!open ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
						transition={{ duration: 0.3, delay: 0.3 }}
						className={`${
							open ? "hidden" : "w-full h-12 flex justify-center items-center"
						}`}>
						<Image
							src={logo_only}
							className={open ? "hidden" : "size-12"}
							alt='logo-andaru'
							priority
						/>
					</motion.div>

					<motion.button
						animate={{
							rotate: open ? 0 : 180,
							position: open ? "relative" : "absolute",
							borderRadius: open ? 4 : 4,
							translateX: open ? 0 : 65,
							width: open ? 40 : 40,
							height: open ? 40 : 40,
						}}
						style={{
							outline: "none",
							color: open ? "#0d6efd" : "#0d6efd",
						}}
						onClick={() => {
							toggleOpen();
						}}
						className=' bg-white bg-opacity-70 z-50'>
						<FontAwesomeIcon width={14} icon={faAngleDoubleLeft} className='' />
					</motion.button>
				</motion.div>

				<UserCard userData={userData} open={open} />

				<div className='flex flex-col gap-2'>
					{/* NAVIGASI LIST */}
					<div className=' border-b border-slate-200 text-slate-400'>
						<label htmlFor='navigation' className='text-xs '>
							Navigasi
						</label>
					</div>
					<div className='flex flex-col gap-1'>
						{configsidebar.navigation.map((item, index) => (
							<ButtonNavigation
								newclassname={open ? "border-b border-slate-100" : ""}
								key={item.name}
								onClick={() => {
									handleNavigate(item.link);
								}}>
								{open ? (
									<motion.div
										initial={
											open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }
										}
										animate={
											open ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
										}
										transition={{ duration: 0.3, delay: 0.3 + index * 0.2 }}
										className=' text-slate-500'>
										{item.name}
									</motion.div>
								) : (
									<div></div>
								)}
								<Tooltip
									title={
										<p
											style={{
												fontFamily: "var(--font-outfit)",
											}}>
											{item.name}
										</p>
									}
									placement='right'>
									<div className='w-14'>
										<FontAwesomeIcon
											width={14}
											className=' text-slate-400'
											icon={item.icons}
										/>
									</div>
								</Tooltip>
							</ButtonNavigation>
						))}
					</div>

					{/* AKUN LIST */}

					<div className=' border-b border-slate-200 text-slate-400'>
						<label htmlFor='navigation' className='text-xs '>
							Akun {open ? "(Admin)" : ""}
						</label>
					</div>
					<div className='flex flex-col gap-1'>
						{configsidebar.account.map((item, index) => (
							<ButtonNavigation
								newclassname={open ? "border-b border-slate-100" : ""}
								key={item.name}
								onClick={() => {
									handleNavigate(item.link);
								}}>
								{open ? (
									<motion.div
										initial={
											open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }
										}
										animate={
											open ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
										}
										transition={{ duration: 0.3, delay: 0.3 + index * 0.2 }}
										className=' text-slate-500'>
										{item.name}
									</motion.div>
								) : (
									<div></div>
								)}
								<Tooltip
									title={
										<p
											style={{
												fontFamily: "var(--font-outfit)",
											}}>
											{item.name}
										</p>
									}
									placement='right'>
									<div className='w-14'>
										<FontAwesomeIcon
											width={14}
											className=' text-slate-400'
											icon={item.icons}
										/>
									</div>
								</Tooltip>
							</ButtonNavigation>
						))}
					</div>

					{/* PENGATURAN LIST */}

					<div className=' border-b border-slate-200 text-slate-400'>
						<label htmlFor='navigation' className='text-xs '>
							Pengaturan {open ? "(Admin)" : ""}
						</label>
					</div>
					<div className='flex flex-col gap-1'>
						{configsidebar.settings.map((item, index) => (
							<ButtonNavigation
								newclassname={open ? "border-b border-slate-100" : ""}
								onClick={() => {
									handleNavigate(item.link);
								}}
								key={item.name}>
								{open ? (
									<motion.div
										initial={
											open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }
										}
										animate={
											open ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
										}
										transition={{ duration: 0.3, delay: 0.3 + index * 0.2 }}
										className=' text-slate-500'>
										{item.name}
									</motion.div>
								) : (
									<div></div>
								)}
								<Tooltip
									title={
										<p
											style={{
												fontFamily: "var(--font-outfit)",
											}}>
											{item.name}
										</p>
									}
									placement='right'>
									<div className='w-14'>
										<FontAwesomeIcon
											width={14}
											className=' text-slate-400'
											icon={item.icons}
										/>
									</div>
								</Tooltip>
							</ButtonNavigation>
						))}
					</div>

					<button
						onClick={handleLogout}
						className='w-full h-10 flex justify-between px-2 items-center rounded text-sm text-red-500 transition-all duration-300 hover:bg-red-100'>
						{open ? (
							<motion.div
								initial={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
								animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
								transition={{ duration: 0.3, delay: 0.3 }}
								className=' text-red-500 text-sm'>
								Keluar
							</motion.div>
						) : (
							<div></div>
						)}
						<div className='w-14'>
							<FontAwesomeIcon width={14} icon={faPowerOff} />
						</div>
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default Sidebar;
