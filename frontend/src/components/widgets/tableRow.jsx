import { Checkbox, TableCell, TableRow } from "@mui/material";

const tableRow = (props) => {
    const getCellsType = () => {
        let res = new Map();
        for (var cell in props.headCells) {
            res.set(props.headCells[cell]['id'], props.headCells[cell]['type']);
        }
        return res;
    };

    const cells = getCellsType();

    const getCells = (row) => {
        let array = [];
        for (var key in row) {
            if (!cells.has(key)) {
                continue;
            }
            let value = row[key];
            switch (cells.get(key)) {
                case "numeric":
                    array.push(
                        <TableCell
                            component="th"
                            id={props.labelId}
                            key={key}
                            scope="row"
                            padding="none"
                        >
                            {value}
                        </TableCell>
                    );
                    break;
                case "boolean":
                    array.push(
                        <TableCell
                            key={key}
                            padding="checkbox"
                        >
                            <Checkbox
                                color="primary"
                                checked={value}
                                disabled
                                inputProps={{
                                    'aria-labelledby': props.labelId,
                                }}
                            />
                        </TableCell>
                    );
                    break;
                case "string":
                    array.push(
                        <TableCell 
                            key={key}
                            align="left">
                            {value}
                        </TableCell>
                    );
                    break;
                default:

                    break;
            }
        }
        return array;
    };

    return (
        <TableRow
            hover
            onClick={(event) => props.handleClick(event, props.row.id)}
            role="checkbox"
            aria-checked={props.isItemSelected}
            tabIndex={-1}
            key={props.row.id}
            selected={props.isItemSelected}
        >
            <TableCell
                padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={props.isItemSelected}
                    inputProps={{
                        'aria-labelledby': props.labelId,
                    }}
                />
            </TableCell>
            {getCells(props.row)}
        </TableRow>
    );
};

export { tableRow as MyTableRow };