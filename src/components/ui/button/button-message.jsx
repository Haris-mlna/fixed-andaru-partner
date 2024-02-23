import * as React from "react";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useCycle } from "framer-motion";

const ButtonMessage = () => {
	const [open, toggleOpen] = useCycle(false, true);

	return (
		<motion.button
			initial={{
				translateY: 200,
			}}
			animate={{
				translateY: 0,
				width: open ? 400 : 64,
				height: open ? 600 : 64,
				borderRadius: open ? "12px" : "50%",
			}}
			onClick={toggleOpen}
			className={` z-50 fixed bottom-4 right-4 shadow-lg border border-slate-200 transition-colors outline-none duration-150 ${
				open ? "bg-white text-blue-500" : "text-white bg-blue-500"
			}`}>
			<FontAwesomeIcon icon={faMessage} />
		</motion.button>
	);
};

export default ButtonMessage;
