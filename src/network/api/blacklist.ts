/**
 * 关注接口
 */
import request from "@/network/vrequest";

/**
 *  添加关注信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addBlacklist(params: object) {
    return request({
        method: "post",
        url: "/api/v1/blacklist",
        data: params,
    });
}
/**
 *  删除关注信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delBlacklist(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/blacklist/${id}`,
    });
}
/**
 *  批量删除
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delBlacklistList(params: object) {
    return request({
        method: "delete",
        url: `/api/v1/blacklist`,
        params,
    });
}
/**
 *  更新关注信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateBlacklist(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/blacklist/${id}`,
        data: params,
    });
}
/**
 *  获取关注信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function blacklist(params: object) {
    return request({
        method: "get",
        url: "/api/v1/blacklist",
        params,
    });
}
