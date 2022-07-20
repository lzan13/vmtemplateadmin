import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { i18n } from "@/i18n/index";
import { Session } from "./vstorage";

// 配置新建一个 axios 实例
const service = axios.create({
    // baseURL: import.meta.env.vmViteApiHost,
    baseURL: "",
    timeout: 50000,
    headers: { "Content-Type": "application/json" },
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
    // 跨域设置
    // (<AxiosRequestHeaders>(<AxiosRequestConfig>config).headers).common["Access-Control-Allow-Origin"] = "*";
    // (<AxiosRequestHeaders>(<AxiosRequestConfig>config).headers).common["Access-Control-Allow-Headers"] =
    //     "Accept,Authorization,Cache-Control,Content-Type,Content-Length,DNT,If-Modified-Since,Keep-Alive,Origin,Referer,sec-ch-ua,sec-ch-ua-mobile,sec-ch-ua-platform,User-Agent,X-Mx-ReqToken,X-Requested-With,";
    // (<AxiosRequestHeaders>(<AxiosRequestConfig>config).headers).common["Access-Control-Allow-Methods"] = "POST,DELETE,PUT,PATCH,GET,OPTIONS";

    // 在发送请求之前做些什么 token
    if (Session.get("token")) {
        (<AxiosRequestHeaders>(<AxiosRequestConfig>config).headers).common["Authorization"] = `${Session.get("token")}`;
    }
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        const res = response.data;
        if (res.code && res.code !== 0) {
            // 认证状态过期
            if (res.code === 401) {
                Session.clear(); // 清除浏览器全部临时缓存
                window.location.href = "/signIn"; // 去登录页
                ElMessage.error(i18n.global.t("str.tips.signInvalid"));
            } else {
                ElMessage.error(res.msg);
            }
            return Promise.reject(res);
        } else {
            return response.data;
        }
    },
    (error) => {
        // 对响应错误做点什么
        if (error.message.indexOf("timeout") != -1) {
            ElMessage.error(i18n.global.t("str.tips.timeout"));
        } else if (error.message == "Network Error") {
            ElMessage.error(i18n.global.t("str.tips.noNetwork"));
        } else {
            if (error.response && error.response.statusText) {
                ElMessage.error(error.response.statusText);
            } else {
                ElMessage.error(i18n.global.t("str.tips.apiNotFound"));
            }
        }
        return Promise.reject(error);
    }
);

// 导出 axios 实例
export default service;
