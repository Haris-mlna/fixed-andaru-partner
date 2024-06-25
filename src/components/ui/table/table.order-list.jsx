"use client";

import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

export default function TableOrderList(props) {
  const { rows, handleDetail, setSelected } = props;

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  // Ensure rows array has at least 10 items
  const displayRows = rows.length < 10 ? [...rows] : rows;

  const columns = [
    { field: "OrderNumber", headerName: "Nomor Pesanan", flex: 1 },
    { field: "InsertedBy", headerName: "PIC", flex: 1 },
    { field: "SupplierName", headerName: "Nama Supplier", flex: 1 },
    { field: "DeliveryAddress", headerName: "Alamat Pengiriman", flex: 2 },
    {
      field: "Date",
      headerName: "Tanggal",
      flex: 1,
      renderCell: (params) => (
        <div>{params.value ? moment(params.value).format("ll") : ""}</div>
      ),
    },
    {
      field: "ExpectedDeliveryDate",
      headerName: "Perkiraan Sampai",
      flex: 1,
      renderCell: (params) => (
        <div>{params.value ? moment(params.value).format("ll") : ""}</div>
      ),
    },
    { field: "Status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5, // Increase the flex value to give more space for the button
      renderCell: (params) => (
        <div className="w-full h-full flex justify-center items-center">
          <button
            onClick={(event) => handleDetail(params.row, event)} // Pass event parameter
            className="border-blue-500 text-blue-500 bg-blue-50 rounded-full h-8 w-20 font-outfit flex justify-center items-center"
          >
            Detail
          </button>
        </div>
      ),
    },
  ];

  const handleSelectionChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    const selectedRows = newRowSelectionModel.map((id) =>
      displayRows.find((row) => row.id === id)
    );
    setSelected(newRowSelectionModel);
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
        className="font-outfit"
        checkboxSelection
      />
    </div>
  );
}
