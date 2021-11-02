import {
    SET_HEAD_CELLS,
    SET_SELECTED_NUMBERS,
    SET_TABLE_DATA,
    SET_TABLE_TITLE
} from "../actions/table";

const setHeadCells = (headCells) => ({
    type: SET_HEAD_CELLS,
    value: headCells
});

const setSelectedNumbers = (selectedNumbers) => ({
    type: SET_SELECTED_NUMBERS,
    value: selectedNumbers
});

const setTableData = (data) => ({
    type: SET_TABLE_DATA,
    value: data
});

const setTableTitle = (title) => ({
    type: SET_TABLE_TITLE,
    value: title
});

export { setHeadCells, setSelectedNumbers, setTableData, setTableTitle };