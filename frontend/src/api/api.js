import axios from "axios";
import store from "../store/store";
import { setLoading } from "../store/actionCreators/loading";
import { setProducts, setCurrentProduct } from "../store/actionCreators/products";
import { setCategories } from "../store/actionCreators/categories";
import { setToken, setEmail } from "../store/actionCreators/user";
import { setAuthorized } from "../store/actionCreators/authorized";

// FIXME: Апи не должен ничего возвращать
// FIXME: При получении не валидного запроса кидать exception

class ApiClient {
    baseURL = `${process.env.REACT_APP_API_HOST}/api`;
    timeout = 1000;
    axios = null;

    constructor() {
        this.axios = axios.create({ baseURL: this.baseURL });
        const token = this.getTokenFromLocal();
        if (token) {
            this.axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        }
        // этот итерцептор будет выполнять перед каждым запросом
        this.axios.interceptors.request.use((req) => {
            this.dispatch(setLoading(true));
            return req;
        });

        // этот итерцептор будет выполняться для каждого ответа
        this.axios.interceptors.response.use((res) => {
            this.dispatch(setLoading(false));
            return res;
        });
    };

    dispatch = (action) => store.dispatch(action);

    /**
     * Получает продукты с сервера и вставляет их в redux store с помощью action SET_PRODUCTS
     */
    async getProducts() {
        const response = await this.axios.get('/products/');
        if (response.status === 200)
        {
            const data = await response.data;
            this.dispatch(setProducts(data));
        }
    }

    async getProduct(id) {
        const response = await this.axios.get(`/products/${id}/`);
        if (response.status === 200)
        {
            const data = await response.data;
            this.dispatch(setCurrentProduct(data));
        }
    }


    async getCategories() {
        const response = await this.axios.get('/categories/');
        const data = await response.data;
        this.dispatch(setCategories(data));
        return data;
    }

    async getAllCategories() {
        const response = await this.axios.get('/all_categories/');
        const data = await response.data;
        this.dispatch(setCategories(data));
        return data;
    }

    // #region apiLogin

    async login(email, password) {
        const token = this.getTokenFromLocal();
        if (token) {
            console.log("token from local " + token);
            this.axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            this.dispatch(setToken(token));
            this.dispatch(setAuthorized(true));
        } else if (email && password) {
            // если в хранилище не оказалось мы делаем запрос и получаем токен
            console.log("login from server " + email + " " + password);
            const response = await this.axios.post("/auth/token/login/", { email, password });
            // FIXME: Нужна ли проверка статус кода 
            if (response.status === 200) {
                const token = await response.data.auth_token;
                this.axios.defaults.headers.common['Authorization'] = `Token ${token}`;
                this.dispatch(setToken(token));
                this.dispatch(setAuthorized(true));
            }
        }
    }

    /**
     * return token from localStorage or sessison or redux store, or false if token doesnt found
     * @returns string | boolean 
     * string - token
     * boolean - false
     */
    getTokenFromLocal() {
        return localStorage.getItem('token') ?? sessionStorage.getItem('token') ?? store.getState().user.token ?? false;
    }

    removeTokenFromLocal() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.dispatch(setToken(""));
    }

    async getMe() {
        const apiUrl = "/auth/users/me/";
        const token = this.getTokenFromLocal();
        if (!token) {
            // токен не найден
            throw new Error("Токен отстутствует!");
        }
        try {
            // токен существует
            const response = await this.axios.get(apiUrl);
            if (response.status === 200) {
                console.log("get me : ", response);
                const email = response.data.email;
                console.log("email is", email);
                this.dispatch(setEmail(email));
                console.log(store.getState().user.email);
            }
        } catch (error) {
            this.l(error);
        }
    }

    async logout() {
        const apiUrl = "/auth/token/logout/";
        const token = this.getTokenFromLocal();

        if (!token) {
            // токен не найден
            throw new Error("Токен отстутствует!");
        }
        try {
            // токен существует
            const response = await this.axios.post(apiUrl);
            if (response.status === 204) {
                this.removeTokenFromLocal();
                this.dispatch(setAuthorized(false));
                this.dispatch(setEmail(""));
            }
        } catch (error) {
            this.l(error);
        }
    }

    //#endregion
    l(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
        console.error(error.config);
    }
}

export default new ApiClient();