import { SET_TOKEN } from "../actions/token";

const setToken = (token) => ({
    type: SET_TOKEN,
    value: token,
});

export { setToken };