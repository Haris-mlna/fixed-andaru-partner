"use client";

import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

export default function TableOrderList(props) {
	const { rows, handleDetail, setSelected } = props;

	const [rowSelectionModel, setRowSelectionModel] = useState([]);

	// Function to create empty rows
	const createEmptyRows = count => {
		let emptyRows = [];
		for (let i = 0; i < count; i++) {
			emptyRows.push({ id: `empty-${i}`, isEmpty: true });
		}
		return emptyRows;
	};

	// Ensure rows array has at least 10 items
	const displayRows =
		rows.length < 10 ? [...rows, ...createEmptyRows(10 - rows.length)] : rows;

	const columns = [
		{ field: "OrderNumber", headerName: "Order Number", flex: 1 },
		{ field: "InsertedBy", headerName: "Inserted By", flex: 1 },
		{ field: "SupplierName", headerName: "Supplier Name", flex: 1 },
		{ field: "DeliveryAddress", headerName: "Delivery Address", flex: 2 },
		{
			field: "Date",
			headerName: "Date",
			flex: 1,
			renderCell: params => (
				<div>{params.value ? moment(params.value).format("ll") : ""}</div>
			),
		},
		{
			field: "ExpectedDeliveryDate",
			headerName: "Expected Delivery Date",
			flex: 1,
			renderCell: params => (
				<div>{params.value ? moment(params.value).format("ll") : ""}</div>
			),
		},
		{ field: "Status", headerName: "Status", flex: 1 },
		{
			field: "actions",
			headerName: "Actions",
			flex: 1.5, // Increase the flex value to give more space for the button
			renderCell: params => (
				<div className='w-full h-full flex justify-center items-center'>
					<button
						onClick={event => handleDetail(params.row, event)} // Pass event parameter
						className='border-blue-500 text-blue-500 bg-blue-50 rounded-full h-8 w-20 font-outfit flex justify-center items-center'>
						Detail
					</button>
				</div>
			),
		},
	];

	const handleSelectionChange = newRowSelectionModel => {
		setRowSelectionModel(newRowSelectionModel);
		const selectedRows = newRowSelectionModel.map(id =>
			displayRows.find(row => row.id === id)
		);
		setSelected(selectedRows);
	};

	return (
		<div style={{ width: "100%", height: 640 }}>
			<DataGrid
				rows={displayRows}
				columns={columns}
				onRowSelectionModelChange={handleSelectionChange}
				rowSelectionModel={rowSelectionModel}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				className='font-outfit'
				checkboxSelection
			/>
		</div>
	);
}
