import { SET_AUTHORIZED } from "../actions/authorized";

const initial = false;

const authorized = (state = initial, action) => {
    switch (action.type) {
        case SET_AUTHORIZED: return action.value;
        default: return state;
    }
};

export default authorized;