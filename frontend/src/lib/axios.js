import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/" : "/";

const api = axios.create({
    baseURL: `${BASE_URL}api`,
    withCredentials: true
})

const user = axios.create({
    baseURL: `${BASE_URL}api/login`,
    withCredentials: true
})

export {api, user};