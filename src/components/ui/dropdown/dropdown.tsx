import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function Dropdown(props) {
	const { title, list } = props;

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel variant='standard' htmlFor='uncontrolled-native'>
					{title}
				</InputLabel>
				<NativeSelect
					defaultValue={30}
					inputProps={{
						name: title,
						id: "uncontrolled-native",
					}}>
					{list.map((item, index) => (
						<option value={item.value} key={index}>
							{item.label}
						</option>
					))}
				</NativeSelect>
			</FormControl>
		</Box>
	);
}
