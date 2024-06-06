"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { ContainerContent } from "../components/container/container";
import Image from "next/image";
import { motion } from "framer-motion";

// IMAGE
import pastigroup from "../assets/images/logo-pasti-group.png";
import background from "../assets/images/bg-landing.JPG";
import text_logo from "../assets/icons/Text Only.png";
import phone from "../assets/images/phone-landing.png";
import playstore from "../assets/icons/playstore.png";
import applestore from "../assets/icons/apple-logo.png";
import update_img from "../assets/images/update.svg";
import delivery_img from "../assets/images/delivery.svg";
import collection_img from "../assets/images/collection.svg";
import google_maps from "../assets/icons/google-maps.png";
import LoginForm from "../components/ui/form/login-form";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Landing = () => {
	const [open, setOpen] = React.useState(false);

	const handleOpenModal = () => {
		setOpen(true);
	};

	return (
		<div className='w-full min-h-screen flex flex-col'>
			{open && <LoginForm setOpen={setOpen} open={open} />}
			<StoreButton />
			<nav className='w-full h-16 flex justify-between items-center bg-white'>
				<div className='w-full h-full flex items-center relative justify-end px-4'>
					<motion.button
						whileHover={{
							scale: 0.97,
						}}
						whileTap={{
							scale: 0.96,
						}}
						onClick={handleOpenModal}
						className=' bg-gradient-to-br from-blue-700 to-rose-400 w-24 h-10 rounded text-white cursor-pointer'>
						Masuk
					</motion.button>
					<div className='absolute left-0 px-4'>
						<Image
							src={text_logo}
							width={1592}
							height={925}
							className=' w-20 h-full'
						/>
					</div>
				</div>
			</nav>
			<div
				className='w-full relative'
				style={{
					height: 600,
				}}>
				<div className='w-full h-full absolute left-0 top-0 z-30 flex'>
					<div className='w-1/2 h-full flex flex-col justify-center items-start overflow-hidden p-4'>
						<h1 className='text-white font-bold text-6xl w-full tracking-wide mb-8'>
							Welcome to Andaru Business Partner App
						</h1>
						<p className='text-white w-3/4 text-justify'>
							Di Andaru Business Partner App, kami bertujuan untuk merevolusi
							cara pelanggan berinteraksi dengan perusahaan kami. Aplikasi kami
							dirancang untuk menjadi portal pelanggan yang komprehensif,
							memastikan komunikasi yang mulus dan efisien antara Anda dan tim
							kami melalui website maupun mobile.
						</p>
						<button
							onClick={handleOpenModal}
							className='text-white mt-4 w-40 h-12 border border-white flex justify-center items-center'>
							Masuk
						</button>
					</div>
					<div className='w-1/2 h-full flex flex-col justify-center items-center overflow-hidden'>
						<motion.div
							initial={{
								translateY: 100,
								opacity: 0,
							}}
							animate={{
								translateY: 0,
								opacity: 1,
							}}>
							<Image
								src={phone}
								width={2102}
								height={2524}
								className='w-full h-auto scale-75'
							/>
						</motion.div>
					</div>
				</div>
				<div className='w-full h-full absolute left-0 top-0 z-10'>
					<Image
						src={background}
						alt='background-landing'
						layout='fill'
						objectFit='cover'
						className='w-full h-full'
						priority
					/>
					<div className='w-full h-full absolute top-0 left-0 bg-black/60 z-20'></div>
				</div>
			</div>
			<section className='w-full min-h-screen'>
				<div
					className='w-full flex'
					style={{
						height: 700,
					}}>
					<div className='w-1/2 h-full flex flex-col justify-center p-4'>
						<h1 className='font-bold text-6xl bg-gradient-to-br from-blue-800 to-rose-400 bg-clip-text text-transparent'>
							Stay Updated with the Latest Announcements.
						</h1>
						<p className=' text-lg'>
							Terima berita terbaru dan pembaruan penting langsung dari
							perusahaan kami. Tetap informatif tentang segala hal yang perlu
							Anda ketahui, mulai dari peluncuran produk baru, promo, hingga
							pengumuman penting.
						</p>
					</div>
					<div className='w-1/2 h-full flex flex-col justify-center items-center'>
						<Image
							src={update_img}
							className='w-full h-full object-cover'
							alt='up-to-date'
						/>
					</div>
				</div>

				<div
					className='w-full flex'
					style={{
						height: 700,
					}}>
					<div className='w-1/2 h-full flex flex-col justify-center items-center'>
						<Image
							src={delivery_img}
							className='w-full h-full object-cover'
							alt='up-to-date'
						/>
					</div>
					<div className='w-1/2 h-full flex flex-col justify-center p-4'>
						<h1 className='font-bold text-6xl bg-gradient-to-br from-yellow-400 to-rose-400 bg-clip-text text-transparent'>
							Monitor Your Shipments
						</h1>
						<p className=' text-lg'>
							Awasi pengiriman Anda. Sistem kami memungkinkan Anda untuk melacak
							status pengiriman, memastikan Anda selalu mengetahui keberadaan
							produk Anda.
						</p>
					</div>
				</div>

				<div
					className='w-full flex'
					style={{
						height: 700,
					}}>
					<div className='w-1/2 h-full flex flex-col justify-center p-4'>
						<h1 className='font-bold text-6xl bg-gradient-to-br from-blue-800 to-blue-400 bg-clip-text text-transparent'>
							Manage Your Invoices
						</h1>
						<p className=' text-lg'>
							Tetap di atas urusan keuangan Anda dengan informasi terkini
							tentang pembayaran dan penagihan. Aplikasi kami memberikan
							gambaran jelas tentang semua interaksi keuangan Anda dengan
							perusahaan kami.
						</p>
					</div>
					<div className='w-1/2 h-full flex flex-col justify-center items-center'>
						<Image
							src={collection_img}
							className='w-full h-full object-cover'
							alt='up-to-date'
						/>
					</div>
				</div>
			</section>
			<footer className='w-full bg-white mt-20 p-4'>
				<div className='w-full h-60 border-b-2 flex'>
					<div className='w-2/4 p-4'>
						<div>
							<a href='https://pastigroup.co.id/' className=' cursor-pointer'>
								<Image
									src={pastigroup}
									width={3864}
									height={1152}
									style={{
										width: 400,
									}}
									className=' h-full'
								/>
							</a>
						</div>
						<div className=' w-3/4'>
							<div className='flex'>
								<Image
									src={google_maps}
									width={512}
									height={512}
									className=' size-12 ml-6 mr-4'
								/>
								<p className='text-sm text-neutral-400'>
									Jl. Gg. Haji Delit kp tegal No.88 RT.003/RW.001, Curug Wetan,
									Kec. Curug, kab. Tangerang, Banten
								</p>
							</div>
							<div></div>
						</div>
					</div>
					<div className='w-1/4 flex flex-col items-start'>
						<h4 className='font-semibold'>Contact.</h4>
						<div className='flex items-center'>
							<FaPhoneAlt />
							<h4>Telp. (Kantor)</h4>
						</div>
						<a
							href='tel:02154212378'
							className='text-sm text-neutral-500 cursor-pointer border-b border-neutral-400 '>
							{" "}
							021-5421-2378,
						</a>
						<a
							href='tel:02150715040'
							className='text-sm text-neutral-500 cursor-pointer border-b border-neutral-400 '>
							{" "}
							021-5071-5040
						</a>
						<div className='flex items-center'>
							<FaWhatsapp />
							<h4>Whatsapp.</h4>
						</div>
						<a
							href='https://wa.me/628118755758'
							className='text-sm text-neutral-500 cursor-pointer border-b border-neutral-400 '>
							{" "}
							0811-875-5758
						</a>
						<a
							href='https://wa.me/628118875758'
							className='text-sm text-neutral-500 cursor-pointer border-b border-neutral-400 '>
							{" "}
							0811-887-5758
						</a>
					</div>
					<div className='w-1/4'>
						<h4 className='font-semibold'>Get the app</h4>

						<div className='flex flex-col gap-1 mt-2'>
							<button className='w-40 rounded h-12 text-sm text-black border border-neutral-300 bg-white shadow-sm flex items-center justify-center gap-2'>
								<Image
									src={playstore}
									width={512}
									height={512}
									className=' size-6'
								/>
								<div>
									<p className='text-left text-xs text-neutral-400'>
										Download on the
									</p>
									<p className='text-left'>Playstore</p>
								</div>
							</button>
							<button className='w-40 rounded h-12 text-sm text-black border border-neutral-300 bg-white shadow-sm flex items-center justify-center gap-2'>
								<Image
									src={applestore}
									width={512}
									height={512}
									className=' size-6'
								/>
								<div>
									<p className='text-left text-xs text-neutral-400'>
										Download on the
									</p>
									<p className='text-left'>Appstore</p>
								</div>
							</button>
						</div>
					</div>
				</div>
				<div className='w-full h-8 flex items-center justify-center'>
					<p className='text-xs text-neutral-400'>
						Copyright &copy;2024 , PASTI Group. All rights reserved
					</p>
				</div>
			</footer>
		</div>
	);
};

const StoreButton = () => {
	const [visible, setVisible] = useState(true);
	const lastScrollY = useRef(0);

	const handleScroll = () => {
		if (typeof window !== "undefined") {
			if (window.scrollY > lastScrollY.current) {
				// Scroll down
				setVisible(false);
			} else {
				// Scroll up
				setVisible(true);
			}
			lastScrollY.current = window.scrollY;
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", handleScroll);
			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, []);

	return (
		<motion.div
			animate={{
				translateY: visible ? 0 : 200,
			}}
			className={`fixed bottom-4 right-4 flex flex-col gap-2 z-50 transition-opacity duration-300`}>
			<button className='w-40 rounded h-12 text-sm bg-neutral-950 text-white flex items-center justify-center gap-2'>
				<Image src={playstore} width={512} height={512} className=' size-6' />
				<div>
					<p className='text-left text-xs text-neutral-400'>Download on the</p>
					<p className='text-left'>Playstore</p>
				</div>
			</button>
			<button className='w-40 rounded h-12 text-sm bg-neutral-950 text-white flex items-center justify-center gap-2'>
				<Image
					src={applestore}
					width={512}
					height={512}
					className=' size-6 invert'
				/>
				<div>
					<p className='text-left text-xs text-neutral-400'>Download on the</p>
					<p className='text-left'>Appstore</p>
				</div>
			</button>
		</motion.div>
	);
};

export default Landing;
