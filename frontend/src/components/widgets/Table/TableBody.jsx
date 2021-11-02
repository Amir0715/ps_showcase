import { TableBody, TableCell, TableRow } from "@mui/material";
import { MyTableRow } from "./TableRow";

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
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const MyTableBody = ({ 
    data, 
    page, 
    rowsPerPage, 
    order, 
    orderBy, 
    handleClick, 
    headCells, 
    emptyRows, 
    selected 
}) => {
    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <TableBody>
            {
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort(getComparator(order, orderBy))
                    .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                            // Возвращаем строку
                            // TODO: ОБОБЩИТЬ
                            <MyTableRow
                                row={row}
                                key={index}
                                isItemSelected={isItemSelected}
                                labelId={labelId}
                                handleClick={handleClick}
                                headCells={headCells}
                            />
                        );
                    })}
            {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: 33 * emptyRows,
                    }}
                >
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
    );
};

export { MyTableBody as TableBody };