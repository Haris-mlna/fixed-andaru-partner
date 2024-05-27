"use client";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import Button from "@mui/material/Button";

export default function TableOrderList(props) {
	const { rows, handleDetail } = props;

	// Function to create empty rows
	const createEmptyRows = count => {
		let emptyRows = [];
		for (let i = 0; i < count; i++) {
			emptyRows.push({ id: `empty-${i}` }); // You can adjust the structure of empty rows as needed
		}
		return emptyRows;
	};

	// Ensure rows array has at least 10 items
	const displayRows =
		rows.length < 10 ? [...rows, ...createEmptyRows(10 - rows.length)] : rows;

	const columns = [
		{ field: "OrderNumber", headerName: "Order Number", flex: 1 },
		{ field: "CustomerId", headerName: "Customer ID", flex: 1 },
		{ field: "SupplierId", headerName: "Supplier ID", flex: 1 },
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
			flex: 1,
			renderCell: params => (
				<div className='w-full h-full flex justify-center items-center'>
					<button
						onClick={() => handleDetail(params.row)}
						className=' border-blue-500 text-blue-500 bg-blue-50 rounded-full h-8 w-16 font-outfit flex justify-center items-center'>
						Detail
					</button>
				</div>
			),
		},
	];

	return (
		<div style={{ height: 700, width: "100%" }}>
			<DataGrid
				rows={displayRows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 }, // Set pageSize to 10
					},
				}}
				className=' font-outfit'
				pageSizeOptions={[5, 10]}
			/>
		</div>
	);
}
