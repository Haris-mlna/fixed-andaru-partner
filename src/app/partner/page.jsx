"use client";
import * as React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import PartnerRequest from "./partner-request.component";
import PartnerComponents from "./partner.component";

const Partner = () => {
	const [select, setSelected] = React.useState("partner");

	return (
		<div className='w-full h-screen flex bg-white'>
			<Sidebar />
			<div className='w-full overflow-y-auto'>
				<div className='w-full h-12 bg-white flex shadow items-center px-4'>
					<h4 className='font-semibold tracking-wide '>PARTNER</h4>
				</div>
				<div className='w-full min-h-screen bg-white mt-1'>
					<div className='w-full p-4 flex items-center gap-2'>
						<button
							className={`bg-white border-b-2 
						${select === "partner" ? "border-blue-500 text-blue-500" : "text-neutral-400"}
						`}
							onClick={() => {
								setSelected("partner");
							}}>
							Partner
						</button>
						<button
							className={`bg-white border-b-2 
						${
							select === "partner-request"
								? "border-blue-500 text-blue-500"
								: "text-neutral-400"
						}
						`}
							onClick={() => {
								setSelected("partner-request");
							}}>
							Partner Request
						</button>
					</div>
					<div className='w-full p-4'>
						{select === "partner" && <PartnerComponents />}
						{select === "partner-request" && <PartnerRequest />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Partner;
