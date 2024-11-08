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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { LinearProgress } from "@mui/material";
import moment from "moment";

// const rows = [
// 	createData(1, "Cupcake", 305, 3.7, 67, 4.3),
// 	createData(2, "Donut", 452, 25.0, 51, 4.9),
// 	createData(3, "Eclair", 262, 16.0, 24, 6.0),
// 	createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
// 	createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
// 	createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
// 	createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
// 	createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
// 	createData(9, "KitKat", 518, 26.0, 65, 7.0),
// 	createData(10, "Lollipop", 392, 0.2, 98, 0.0),
// 	createData(11, "Marshmallow", 318, 0, 81, 2.0),
// 	createData(12, "Nougat", 360, 19.0, 9, 37.0),
// 	createData(13, "Oreo", 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort, head } = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{head.map(headCell => (
					<TableCell
					className="font-outfit"
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
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
	const { numSelected, title } = props;

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
				<Typography
					sx={{ flex: "1 1 100%" }}
					variant='h6'
					id='tableTitle'
					component='div'>
					{title}
				</Typography>
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
};

export default function EnhancedTable({
	title,
	rows,
	head,
	length,
	page,
	setPage,
	setSort,
	rowsPerPage,
	setRowsPerPage,
	loading,
	maximum,
	handleDeliveryDetail,
}) {
	const [order, setOrder] = React.useState("desc");
	const [orderBy, setOrderBy] = React.useState("DueDate");
	const [selected, setSelected] = React.useState([]);
	const [dense, setDense] = React.useState(false);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		const newSort = isAsc ? `${property} desc` : `${property} asc`;
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
		setSort(newSort); // Update the sort state with the new sorting format
	};

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelected = rows.map(n => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = id => selected.indexOf(id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			stableSort(rows, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[order, orderBy, page, rowsPerPage]
	);

	const getStatusClass = status => {
		switch (status) {
			case "Draft":
				return "text-blue-500";
			case "Delivered":
				return "text-teal-500";
			case "OnTheWay":
				return "text-orange-500";
			case "NotDelivered":
				return "text-red-500";
			default:
				return "";
		}
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%" }}>
				<EnhancedTableToolbar title={title} numSelected={selected.length} />
				{loading && <LinearProgress />}
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
							head={head}
						/>
						<TableBody>
							{visibleRows.map((row, index) => {
								const isItemSelected = isSelected(row.id);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										role='checkbox'
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.Id}
										selected={isItemSelected}
										sx={{ cursor: "pointer" }}>
										{head.map(headCell => (
											<TableCell
												onClick={() => {
													handleDeliveryDetail(row.Id, row);
												}}
												key={headCell.id}
												align={headCell.numeric ? "right" : "left"}
												className="font-outfit"
												sx={{
													whiteSpace: "nowrap",
													overflow: "hidden",
													textOverflow: "ellipsis",
												}}>
												{headCell.id === "CustomerAddress" ? (
													<div style={{ maxWidth: 150 }}>
														{row[headCell.id]}
													</div>
												) : headCell.id === "DueDate" ? (
													<div>{moment(row[headCell.id]).format("ll")}</div>
												) : headCell.id === "Status" ? (
													<div className={getStatusClass(row[headCell.id])}>
														{row[headCell.id]}
													</div>
												) : (
													row[headCell.id]
												)}
											</TableCell>
										))}
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
									<TableCell colSpan={head.length} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{loading && <LinearProgress />}
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					disabled={loading}
				/>
			</Paper>
		</Box>
	);
}
