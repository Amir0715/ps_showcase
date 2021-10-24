import { SET_TOKEN, SET_EMAIL } from "../actions/user";

const initial = { email: "", token: "" };

const user = (state = initial, action) => {
    switch (action.type) {
        case SET_EMAIL: return { ...state, email: action.value };
        case SET_TOKEN: return { ...state, token: action.value };
        default: return state;
    }
};

export default user;