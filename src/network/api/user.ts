/**
 * 账户相关接口
 */
import request from "@/network/vrequest";
/**
 *  添加用户信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addUser(params: object) {
    return request({
        method: "post",
        url: "/api/v1/user",
        data: params,
    });
}
/**
 *  删除用户信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delUser(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/user/${id}`,
    });
}
/**
 *  更新用户信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateUser(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/user/${id}`,
        data: params,
    });
}
/**
 *  获取用户信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function user(params: object) {
    return request({
        method: "get",
        url: "/api/v1/user",
        params,
    });
}
