export const ContainerModal = ({ children, setOpen }) => {
	const stopPropagation = event => {
		event.stopPropagation();
	};

	const closeModal = () => {
		setOpen(false);
	};

	return (
		<div
			className='w-full h-screen bg-black/40 fixed top-0 left-0 flex justify-center items-center'
			style={{
				zIndex: 110,
			}}
			onClick={closeModal}>
			<div onClick={stopPropagation}>{children}</div>
		</div>
	);
};

export const ContainerContent = ({ children }) => {
	return (
		<div className='w-full h-full flex justify-center'>
			<div className='w-full max-w-7xl'>{children}</div>
		</div>
	);
};
