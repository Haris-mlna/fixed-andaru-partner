"use client";

import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

export default function TableDelivery(props) {
	const { rows, handleDetail } = props;

	const [rowSelectionModel, setRowSelectionModel] = useState([]);

	// Ensure rows array has at least 10 items
	const displayRows = rows.length < 10 ? [...rows] : rows;

	const columns = [
		{ field: "OrderNumber", headerName: "Order Number", flex: 1 },
		{ field: "CustomerLabel", headerName: "Nama Customer", flex: 1 },
		{
			field: "DueDate",
			headerName: "Estimasi",
			flex: 1,
			renderCell: params => (
				<div>{params.value ? moment(params.value).format("ll") : ""}</div>
			),
		},
		{ field: "CustomerAddress", headerName: "Alamat", flex: 3 },
		{ field: "Status", headerName: "Status", flex: 1 },
		{
			field: "NumberOfItems",
			headerName: "Barang",
			flex: 1,
			align: "right",
			type: 'number',
		},
	];

	const handleSelectionChange = newRowSelectionModel => {
		setRowSelectionModel(newRowSelectionModel);
		const selectedRows = newRowSelectionModel.map(id =>
			displayRows.find(row => row.Id === id)
		);
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
				onRowClick={params => {
					handleDetail(params.id, params.row);
				}}
				className='font-outfit'
				getRowId={row => row.Id}
				sx={{
					// disable cell selection style
					".MuiDataGrid-cell:focus": {
						outline: "none",
					},
					// pointer cursor on ALL rows
					"& .MuiDataGrid-row:hover": {
						cursor: "pointer",
					},
				}}
			/>
		</div>
	);
}
