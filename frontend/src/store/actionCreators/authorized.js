import { SET_AUTHORIZED } from "../actions/authorized";

const setAuthorized = (authorized) => ({
    type: SET_AUTHORIZED,
    value: authorized,
});

export { setAuthorized };