import { LoginData } from "@/ts/interfaces";
import axios, { AxiosResponse } from "axios";

const API_URL = "https://dummyjson.com/users/add"

export const addUser = async (credentials: LoginData) => {
    const response = await axios.post('https://dummyjson.com/auth/login', {
        username: credentials.username,
        password: credentials.password,
      });
    return response;
}