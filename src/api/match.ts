/**
 * 匹配接口
 */
import request from "@/utils/vrequest";

/**
 *  添加匹配信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addMatch(params: object) {
    return request({
        method: "post",
        url: "/api/v1/match",
        data: params,
    });
}
/**
 *  删除匹配信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delMatch(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/match/${id}`,
    });
}
/**
 *  更新匹配信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateMatch(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/match/${id}`,
        data: params,
    });
}
/**
 *  获取匹配信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function match(params: object) {
    return request({
        method: "get",
        url: "/api/v1/match",
        params,
    });
}
