import { SET_TOKEN, SET_EMAIL } from "../actions/user";

const setToken = (token) => ({
    type: SET_TOKEN,
    value: token,
});

const setEmail = (email) => ({
    type: SET_EMAIL,
    value: email,
});


export { setToken, setEmail };