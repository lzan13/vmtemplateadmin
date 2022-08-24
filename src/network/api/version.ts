/**
 * 版本接口
 */
import request from "@/network/vrequest";

/**
 *  添加版本信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addVersion(params: object) {
    return request({
        method: "post",
        url: "/api/v1/version",
        data: params,
    });
}
/**
 *  删除版本信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delVersion(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/version/${id}`,
    });
}
/**
 *  更新版本信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateVersion(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/version/${id}`,
        data: params,
    });
}
/**
 *  获取版本信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function version(params: object) {
    return request({
        method: "get",
        url: "/api/v1/version",
        params,
    });
}
