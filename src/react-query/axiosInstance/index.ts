import axios, {AxiosRequestConfig} from "axios";

import {baseUrl} from "./constants";

export function getJWTHeader(userToken: string): Record<string, string> {
    return {Authorization: `Bearer ${userToken}`};
}

const config: AxiosRequestConfig = {baseURL: baseUrl};
export const axiosInstance = axios.create(config);


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage?.getItem('token'); // Или получите токен из другого источника
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});