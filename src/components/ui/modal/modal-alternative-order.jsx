import * as React from "react";
import { motion } from "framer-motion";
import { ContainerModal } from "../../container/container";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const ModalAlternativeOrder = ({ open, setOpen }) => {
	const [productName, setProductName] = useState("");
	const [productType, setProductType] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [quantity1, setQuantity1] = useState("");
	const [unit1, setUnit1] = useState("");
	const [quantity2, setQuantity2] = useState("");
	const [unit2, setUnit2] = useState("");

	const handleSubmit = event => {
		event.preventDefault();
		// Handle form submission
		console.log({
			productName,
			productType,
			productDescription,
			quantities: [
				{ quantity: quantity1, unit: unit1 },
				{ quantity: quantity2, unit: unit2 },
			],
		});
	};

	return (
		<ContainerModal setOpen={setOpen}>
			{open && (
				<motion.div
					initial={{ translateY: 100, opacity: 0 }}
					animate={{ translateY: 0, opacity: 1 }}
					style={{ height: 620, width: 800 }}
					className='bg-white rounded flex flex-col p-4'>
					<h2>Form pesanan</h2>
					<form onSubmit={handleSubmit} style={{ marginTop: "1em" }}>
						<div style={{ marginBottom: "1em" }}>
							<label className='text-xs text-neutral-400' htmlFor='productName'>
								Nama produk
							</label>
							<input
								className='border border-neutral-200 rounded text-sm'
								id='productName'
								type='text'
								value={productName}
								onChange={e => setProductName(e.target.value)}
								style={{ width: "100%", padding: "0.5em", marginTop: "0.5em" }}
								placeholder={`PIPA PVC Supramas Abu-abu AW 1/2"`}
							/>
						</div>
						<div style={{ marginBottom: "1em" }}>
							<label className='text-xs text-neutral-400' htmlFor='productType'>
								Tipe produk
							</label>
							<input
								className='border border-neutral-200 rounded text-sm'
								id='productType'
								type='text'
								value={productType}
								onChange={e => setProductType(e.target.value)}
								style={{ width: "100%", padding: "0.5em", marginTop: "0.5em" }}
								placeholder='Pipa / Fitting / etc.'
							/>
						</div>
						<div style={{ marginBottom: "1em" }}>
							<label
								className='text-xs text-neutral-400'
								htmlFor='productDescription'>
								Deskripsi produk (Optional)
							</label>
							<textarea
								id='productDescription'
								value={productDescription}
								className='border text-xs border-neutral-200 rounded resize-none'
								onChange={e => setProductDescription(e.target.value)}
								style={{
									width: "100%",
									padding: "0.5em",
									marginTop: "0.5em",
									height: "100px",
								}}
								placeholder='Masukan deskripsi produk yang menggambarkan produk yang anda pesan'
							/>
						</div>
						<div style={{ marginBottom: "1em", display: "flex", gap: "1em" }}>
							<div>
								<label className='text-xs text-neutral-400' htmlFor='quantity1'>
									Quantity 1
								</label>
								<input
									className='border border-neutral-200 rounded text-sm'
									id='quantity1'
									type='text'
									value={quantity1}
									placeholder='0'
									onChange={e => setQuantity1(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5em",
										marginTop: "0.5em",
									}}
								/>
							</div>
							<div>
								<label className='text-xs text-neutral-400' htmlFor='unit1'>
									Unit 1
								</label>
								<input
									className='border border-neutral-200 rounded text-sm'
									id='unit1'
									type='text'
									value={unit1}
									onChange={e => setUnit1(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5em",
										marginTop: "0.5em",
									}}
									placeholder='Btg / Satuan'
								/>
							</div>
						</div>
						<div style={{ marginBottom: "1em", display: "flex", gap: "1em" }}>
							<div>
								<label className='text-xs text-neutral-400' htmlFor='quantity2'>
									Quantity 2
								</label>
								<input
									className='border border-neutral-200 rounded text-sm'
									id='quantity2'
									type='text'
									value={quantity2}
									onChange={e => setQuantity2(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5em",
										marginTop: "0.5em",
									}}
									placeholder='0'
								/>
							</div>
							<div>
								<label className='text-xs text-neutral-400' htmlFor='unit2'>
									Unit 2
								</label>
								<input
									className='border border-neutral-200 rounded text-sm'
									id='unit2'
									type='text'
									value={unit2}
									onChange={e => setUnit2(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5em",
										marginTop: "0.5em",
									}}
									placeholder='Box'
								/>
							</div>
						</div>
						<div className='w-full flex items-center gap-2'>
							<button
								type='submit'
								className=' bg-gradient-to-br from-indigo-400 to-blue-400 py-2 px-6 rounded-full text-sm text-white'>
								Order
							</button>
							<button
								type='submit'
								className='text-sm border-b-2 p-2 border-black flex items-center'
								onClick={() => {
									setOpen(false);
								}}>
								<IoClose size={20} />
								Close
							</button>
						</div>
					</form>
				</motion.div>
			)}
		</ContainerModal>
	);
};

export default ModalAlternativeOrder;
