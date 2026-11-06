import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

const user = axios.create({
    baseURL: "http://localhost:3000/login",
    withCredentials: true
})

export {api, user};