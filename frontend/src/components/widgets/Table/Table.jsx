import { Box, Paper, Table, TableContainer, TablePagination } from "@mui/material";
import * as React from "react";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { TableToolbar } from "./TableToolbar";

// Компонент таблицы, принимает через пропсы заголовок, 
// данные заголовков и сами данные 
const MyTable = ({ tabletitle, headCells, data }) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(headCells[0].id);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [rowsPerPageOptions, setRowsPerPageOptions] = React.useState([25, 50, 100]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;


    return (
        <Box>
            <Paper>
                <TableContainer>
                    <TableToolbar
                        numSelected={selected.length}
                        tabletitle={tabletitle}
                    />
                    <Table
                        aria-labelledby="tableTitle"
                        size="small"
                    >
                        {/* <TableHead
                            onSelectAllClick={handleSelectAllClick}
                            order={order}
                            orderBy={orderBy}
                            numSelected={selected.length}
                            dataCount={data.length}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                        /> */}
                        <TableBody
                            data={data}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            order={order}
                            orderBy={orderBy}
                            handleClick={handleClick}
                            headCells={headCells}
                            emptyRows={emptyRows}
                            selected={selected}
                        />
                    </Table>
                </TableContainer>
                {/* <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            </Paper>
        </Box>
    );
};

export { MyTable };