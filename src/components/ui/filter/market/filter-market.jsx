import * as React from "react";
import { IoSearch } from "react-icons/io5";
import BasicSelect from "../../dropdown/dropdown-filter";
import {
	loadManufacture,
	loadSize,
	loadSpec,
	loadType,
} from "./fiter.market.service";

const FilterMarket = ({ handleFindProduct, onChangeFilter }) => {
	const [manufactureselect, setManufactureselect] = React.useState({
		id: "",
		label: "",
	});
	const [typeselect, setTypeselect] = React.useState({ id: "", label: "" });
	const [specselect, setSpecselect] = React.useState({ id: "", label: "" });
	const [sizeselect, setSizeselect] = React.useState({ id: "", label: "" });

	const [manufactureOption, setManufactureOption] = React.useState([]);
	const [typeOption, setTypeOption] = React.useState([]);
	const [specOption, setSpecOption] = React.useState([]);
	const [sizeOption, setSizeOption] = React.useState([]);

	const fetchManufacture = async () => {
		try {
			const res = await loadManufacture();
			if (res) {
				setManufactureOption(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchType = async () => {
		try {
			const res = await loadType(manufactureselect.id);
			if (res) {
				setTypeOption(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchSpec = async () => {
		try {
			const res = await loadSpec(typeselect.id);
			if (res) {
				setSpecOption(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchSize = async () => {
		try {
			const res = await loadSize(specselect.id);
			if (res) {
				setSizeOption(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		fetchManufacture();
	}, []);

	React.useEffect(() => {
		if (manufactureselect.id) {
			fetchType();
			onChangeFilter("Category", manufactureselect.label);
		}
	}, [manufactureselect]);

	React.useEffect(() => {
		if (typeselect.id) {
			fetchSpec();
			onChangeFilter("Type", typeselect.label);
		}
	}, [typeselect]);

	React.useEffect(() => {
		if (specselect.id) {
			fetchSize();
			onChangeFilter("Spec", specselect.label);
		}
	}, [specselect]);

	React.useEffect(() => {
		if (sizeselect.id) {
			onChangeFilter("Size", sizeselect.label);
		}
	}, [sizeselect]);

	const resetFilters = () => {
		setManufactureselect({ id: "", label: "" });
		setTypeselect({ id: "", label: "" });
		setSpecselect({ id: "", label: "" });
		setSizeselect({ id: "", label: "" });
		onChangeFilter("Category", "");
		onChangeFilter("Type", "");
		onChangeFilter("Spec", "");
		onChangeFilter("Size", "");
	};

	return (
		<>
			<div className='w-full flex justify-center items-center sticky px-4 py-4 top-0 z-50'>
				<div className='w-full flex rounded-full h-10 shadow overflow-hidden p-2 bg-white'>
					<div className='w-14 flex justify-center items-center'>
						<IoSearch size={24} className='text-slate-400' />
					</div>
					<input
						type='text'
						className='w-full h-full outline-none font-outfit'
						placeholder='Cari produk...'
						onChange={handleFindProduct}
					/>
				</div>
			</div>
			<div className='flex gap-2 px-4 pb-2'>
				<BasicSelect
					state={manufactureselect}
					setState={setManufactureselect}
					list={manufactureOption}
					valueKey='Id'
					labelKey='ManufactureName'
					placeholder='Manufaktur'
				/>
				<BasicSelect
					state={typeselect}
					setState={setTypeselect}
					list={typeOption}
					valueKey='Id'
					labelKey='TypeName'
					placeholder='Tipe'
				/>
				<BasicSelect
					state={specselect}
					setState={setSpecselect}
					list={specOption}
					valueKey='Id'
					labelKey='SpecificationName'
					placeholder='Spesifikasi'
				/>
				<BasicSelect
					state={sizeselect}
					setState={setSizeselect}
					list={sizeOption}
					valueKey='Id'
					labelKey='Size'
					placeholder='Ukuran'
				/>
				<button
					onClick={resetFilters}
					className='bg-white text-neutral-400 border border-neutral-400 px-4 py-2 rounded'>
					Reset Filters
				</button>
			</div>
		</>
	);
};

export default FilterMarket;
