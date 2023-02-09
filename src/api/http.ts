import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: "",
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    "Content-Type": "application/json"
  }
});

const service = {
  get<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.get(url, data);
  },
  post<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.post(url, data);
  },
  put<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.put(url, data);
  },
  delete<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.delete(url, data);
  }
};

export default service;
