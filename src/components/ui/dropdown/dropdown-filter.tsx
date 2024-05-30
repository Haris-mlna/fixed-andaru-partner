import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
	const { state, setState, list, valueKey, labelKey, placeholder } = props;

	const handleChange = (event) => {
		if (event.target.value === "") {
			setState({ id: "", label: "" });
		} else {
			const selectedItem = list.find((item) => item[valueKey] === event.target.value);
			setState({
				id: selectedItem[valueKey],
				label: selectedItem[labelKey],
			});
		}
	};

	return (
		<Box sx={{ minWidth: 200 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={state.id}
					label={placeholder}
					onChange={handleChange}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{list &&
						list.map((item) => (
							<MenuItem key={item[valueKey]} value={item[valueKey]}>
								{item[labelKey]}
							</MenuItem>
						))}
				</Select>
			</FormControl>
		</Box>
	);
}
