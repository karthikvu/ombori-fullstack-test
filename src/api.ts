import axios, { AxiosResponse } from "axios";
import { ApiResponse, TUser } from "./types";

// Using instance because easier to extend to yaml / .env config
const instance = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 3000,
  headers: { "X-Correlation-ID": Math.random() }, // Ideally use uuid()
});

// Can reduce type chaining by definining them in the types
export const fetchUsers: (
  page?: number
) => Promise<AxiosResponse<ApiResponse<TUser>>> = async (page: number = 1) =>
  await instance.get("/users", { params: { page: page } });
