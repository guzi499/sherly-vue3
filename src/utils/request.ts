import axios, {InternalAxiosRequestConfig, AxiosResponse} from "axios";
import Config from "@/config";
// import {ElNotification, ElMessageBox} from "element-plus";
// import {pickBy, identity, trim} from "lodash";
// import Cookies from "js-cookie";

const service = axios.create({
    timeout: Config.timeout,
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL:
        process.env.NODE_ENV === "production"
            ? process.env.VUE_APP_URL + "/api"
            : "/api",
})

// 请求失败回调函数处理
const error = (error: { request: InternalAxiosRequestConfig, response: AxiosResponse }) => {
    if (error.response.status === 401) {
        // 登录状态过期或未登录
    }
    return Promise.reject(error)
}

// 请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // config.headers["Content-Type"] = config.responseType || "application/json";
    //
    // // 标头设置token
    // if (localStorage.getItem("token")) {
    //     config.headers["token"] = localStorage.getItem("token");
    // }
    //
    // // 登录请求不应该设置token
    // if (config.url === "/login") {
    //     config.headers["token"] = null;
    // }
    // // get请求需要将params中blank的属性删除
    // if (config.method === "get" && config.params) {
    //     Object.keys(config.params).forEach((i) => {
    //         config.params[i] = trim(config.params[i]);
    //     }),
    //         (config.params = pickBy(config.params, identity));
    // }
    return config
}, error => {
    return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
    console.log('response === ', response)
    return response
}, (error) => {
    return Promise.reject(error);
})

export default service
