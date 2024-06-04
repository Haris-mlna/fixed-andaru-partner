"use client";

import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import moment from "moment";

const headCells = [
	{ id: "index", numeric: false, label: "No" },
	{
		id: "DocumentNumber",
		numeric: false,
		disablePadding: false,
		label: "No Invoices",
	},
	{ id: "CustomerAddress", numeric: false, label: "Alamat" },
	{
		id: "CustomerLabel",
		numeric: true,
		disablePadding: false,
		label: "Customer",
	},
	{
		id: "DocumentDueDate",
		numeric: false,
		disablePadding: false,
		label: "Jatuh Tempo",
	},
	{
		id: "DocumentAmount",
		numeric: true,
		disablePadding: false,
		label: "Total Tagihan",
	},
	{
		id: "PayedAmount",
		numeric: true,
		disablePadding: false,
		label: "Total Dibayar",
	},
];

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
	const { numSelected, filterText, onFilterTextChange } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: theme =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: "1 1 100%" }}
					color='inherit'
					variant='subtitle1'
					component='div'>
					{numSelected} selected
				</Typography>
			) : (
				<>
					<Typography
						sx={{ flex: "1 1 100%" }}
						variant='h6'
						id='tableTitle'
						component='div'
						className='font-outfit font-light'>
						List Invoice
					</Typography>
					<div className='w-full h-16 px-4 items-center flex justify-between'>
						<div>
							<input
								type='text'
								placeholder='Search...'
								value={filterText}
								onChange={e => onFilterTextChange(e.target.value)}
								className='font-outfit text-sm p-2 px-4 outline-none rounded-full w-96 shadow'
							/>
						</div>
					</div>
				</>
			)}

			{numSelected > 0 ? (
				<Tooltip title='Delete'>
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title='Filter list'>
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
	filterText: PropTypes.string.isRequired,
	onFilterTextChange: PropTypes.func.isRequired,
};

export default function DataTable(props) {
	const { rows } = props;

	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("DocumentNumber");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(25);
	const [filterText, setFilterText] = React.useState("");

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelected = rows.map(n => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = event => {
		setDense(event.target.checked);
	};

	const isSelected = id => selected.indexOf(id) !== -1;

	const formatCurrency = value => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(value);
	};

	const handleFilterTextChange = text => {
		setFilterText(text);
	};

	const filteredRows = rows.filter(
		row =>
			row.DocumentNumber.toLowerCase().includes(filterText.toLowerCase()) ||
			row.CustomerAddress.toLowerCase().includes(filterText.toLowerCase()) ||
			row.CustomerLabel.toString()
				.toLowerCase()
				.includes(filterText.toLowerCase())
	);

	const sortedRows = filteredRows.sort((a, b) => {
		if (orderBy === "DocumentAmount" || orderBy === "PayedAmount") {
			return order === "asc"
				? a[orderBy] - b[orderBy]
				: b[orderBy] - a[orderBy];
		} else {
			const valA = a[orderBy].toString().toLowerCase();
			const valB = b[orderBy].toString().toLowerCase();
			if (valA < valB) {
				return order === "asc" ? -1 : 1;
			}
			if (valA > valB) {
				return order === "asc" ? 1 : -1;
			}
			return 0;
		}
	});

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<EnhancedTableToolbar
					numSelected={selected.length}
					filterText={filterText}
					onFilterTextChange={handleFilterTextChange}
				/>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby='tableTitle'
						size={dense ? "small" : "medium"}>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{sortedRows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											// onClick={event => handleClick(event, row.id)}
											role='checkbox'
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.Id}
											selected={isItemSelected}
											sx={{ cursor: "pointer" }}>
											<TableCell align='left' className='font-outfit'>
												{index + 1}
											</TableCell>
											<TableCell
												align='left'
												sx={{
													width: "150px",
												}}
												className='font-outfit'>
												{row?.DocumentNumber}
											</TableCell>
											<TableCell
												component='th'
												id={labelId}
												scope='row'
												padding='normal'
												className='font-outfit'
												sx={{
													maxWidth: "400px", // adjust the width as needed
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "nowrap",
												}}>
												{row?.CustomerAddress}
											</TableCell>
											<TableCell align='right' className='font-outfit'>
												{row?.CustomerLabel}
											</TableCell>
											<TableCell align='right' className='font-outfit'>
												{moment(row?.DocumentDueDate).format("ll")}
											</TableCell>
											<TableCell align='right' className='font-outfit'>
												{formatCurrency(row?.DocumentAmount)}
											</TableCell>
											<TableCell
												align='right'
												className='text-teal-400 font-outfit'>
												+{formatCurrency(row?.PayedAmount)}
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[25]}
					component='div'
					count={filteredRows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
