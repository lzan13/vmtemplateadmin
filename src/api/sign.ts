/**
 * 账户相关接口
 */
import request from "@/utils/vrequest";

/**
 * ---------------------------- 注册登录 ----------------------------
 */
/**
 * 发送邮箱验证码
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function sendCodeEmail(params: object) {
    return request({
        method: "get",
        url: "/api/v1/sign/sendCodeEmail",
        params,
    });
}
/**
 * 用户登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function signIn(params: object) {
    return request({
        method: "post",
        url: "/api/v1/sign/in",
        data: params,
    });
}

/**
 * 用户退出登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function signOut() {
    return request({
        method: "get",
        url: "/api/v1/sign/out",
    });
}
/**
 * ---------------------------- 个人信息 ----------------------------
 */
/**
 * 更新用户信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateInfo(params: object) {
    return request({
        method: "put",
        url: "/api/v1/info",
        data: params,
    });
}

/**
 * 更新用户密码
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updatePassword(params: object) {
    return request({
        method: "put",
        url: "/api/v1/info/password",
        data: params,
    });
}