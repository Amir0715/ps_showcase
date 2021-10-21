import { SET_TOKEN } from "../actions/token";

const initial = "";

const token = (state = initial, action) => {
    switch (action.type) {
        case SET_TOKEN: return action.value;
        default: return state;
    }
};

export default token;