import { LOADING } from "../actions/loading";

const setLoading = (bool) => (
    {
        type: LOADING,
        value: bool,
    }
);

export { setLoading };