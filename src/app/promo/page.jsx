import * as React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";

const Promo = () => {
	return (
		<div className='w-full h-screen flex bg-white'>
			<Sidebar />
			<div className='w-full overflow-y-auto'>
				<p>Promo pages</p>
			</div>
		</div>
	);
};

export default Promo;
