import { SET_HEAD_CELLS, SET_SELECTED_NUMBERS, SET_TABLE_DATA, SET_TABLE_TITLE } from "../actions/table";

const initial = {
    headCells: [{
        id: '',
        type: '',
        align: '',
        disablePadding: false,
        label: '',
    }],
    tableTitle: '',
    tabelData: [],
    selectedNumbers: NaN, 
};

const table = (state = initial, action) => {
    switch (action.type) {
        case SET_HEAD_CELLS: return { ...state, headCells: action.value };
        case SET_TABLE_TITLE: return { ...state, tableTitle: action.value };
        case SET_TABLE_DATA: return { ...state, tabelData: action.value };
        case SET_SELECTED_NUMBERS: return { ...state, selectedNumbers: action.value }
        default: return state;
    }
};

export default table;