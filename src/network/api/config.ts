/**
 * 配置接口
 */
import request from "@/network/vrequest";

/**
 *  添加配置信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addConfig(params: object) {
    return request({
        method: "post",
        url: "/api/v1/config",
        data: params,
    });
}
/**
 *  删除配置信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delConfig(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/config/${id}`,
    });
}
/**
 *  更新配置信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateConfig(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/config/${id}`,
        data: params,
    });
}
/**
 *  获取配置信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function config(params: object) {
    return request({
        method: "get",
        url: "/api/v1/config",
        params,
    });
}
