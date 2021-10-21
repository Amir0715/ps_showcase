import axios from "axios";
import store from "../store/store";
import { setLoading } from "../store/actionCreators/loading";
import { setProducts } from "../store/actionCreators/products";
import { setCategories } from "../store/actionCreators/categories";
import { setToken } from "../store/actionCreators/token";
import { setAuthorized } from "../store/actionCreators/authorized";
class ApiClient {
    baseURL = `${process.env.REACT_APP_API_HOST}/api`;
    // token = null;
    // headers = { "Authorization": `Token ${this.token}` };
    timeout = 1000;
    axios = null;

    constructor() {
        this.axios = axios.create({ baseURL: this.baseURL, timeout: this.timeout });
        // этот итерцептор будет выполнять перед каждым запросом
        this.axios.interceptors.request.use((req) => {
            this.dispatch(setLoading(true));
            return req;
        });

        // этот итерцептор будет выполнять после каждого запроса
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
        const data = await response.data;
        this.dispatch(setProducts(data));
        return data;
    }

    async getCategories() {
        const response = await this.axios.get('/categories/');
        const data = await response.data;
        this.dispatch(setCategories(data));
        return data;
    }
    //#region apiLogin
    /**
     * Возращает токен пользователя. Если параметры не пустые и в хранилище нет токена делается пост запрос
     * @param {string?} email - логин пользователя
     * @param {string?} password - пароль пользователя
     */
    async login(email, password) {
        const token = this.getTokenFromLocal();
        if (token) {
            console.log("token from local " + token);
            this.axios.defaults.headers.common['Authorization'] = token;
            this.dispatch(setToken(token));
            this.dispatch(setAuthorized(true));
            return token;
        } else if (email && password) {
            // если в хранилище не оказалось мы делаем запрос и получаем токен
            console.log("login from server " + email + " " + password);
            try {
                const response = await this.axios.post("/auth/token/login/", { email, password });
                const token = await response.data.auth_token;
                console.log(token);
                this.axios.defaults.headers.common['Authorization'] = token;
                this.dispatch(setToken(token));
                this.dispatch(setAuthorized(true));
                return token;
            } catch (error) {
                this.dispatch(setAuthorized(false));
                this.l(error);
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
        return localStorage.getItem('token') ?? sessionStorage.getItem('token') ?? store.getState().token ?? false;
    }

    async getMe() {
        const apiUrl = `${this.baseURL}/auth/users/me/`;
        if (!this.token) {
            // токен не найден
            throw new Error("Токен отстутствует!");
        }
        try {
            // токен существует
            return await this.axios.get(apiUrl).then(response => response.data);
        } catch (error) {
            this.l(error);
        }
    }

    async logout() {
        const apiUrl = `${this.baseURL}/auth/token/logout/`;
        if (!this.token) {
            // токен не найден
            throw new Error("Токен отстутствует!");
        }
        try {
            // токен существует
            const response = await this.axios.post(apiUrl);
            if (response.statusText === "ok") {
                this.token = null;
            }
        } catch (error) {
            this.l(error);
        }
    }

    async registration(username, email, password) {
        const apiUrl = `${process.env.REACT_APP_API_HOST}/auth/users/`;
        try {
            const response = await axios.post(apiUrl,
                {
                    username,
                    email,
                    password,
                });
            if (response.statusText === "OK") {
                return await this.login(username, password).then(response => response.data.auth_token);
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

export default new ApiClient(); // TODO: каждый импорт = новый инстанс ?