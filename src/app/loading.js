"use client";

import * as React from "react";
import { CircularProgress } from "@mui/material";
import WaveSVG from "../components/ui/wave/wave";

const Landing = () => {
	return (
		<div className='w-full relative overflow-hidden h-screen max-h-screen flex items-center justify-center flex-col gap-1 bg-gradient-to-br from-primary to-slate-950'>
			<CircularProgress sx={{ color: "white" }} size={40}></CircularProgress>
			<WaveSVG />
		</div>
	);
};

export default Landing;
