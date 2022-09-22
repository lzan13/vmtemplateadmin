/**
 * 喜欢接口
 */
import request from "@/network/vrequest";

/**
 *  添加喜欢信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addLike(params: object) {
    return request({
        method: "post",
        url: "/api/v1/like",
        data: params,
    });
}
/**
 *  删除喜欢信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delLike(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/like/${id}`,
    });
}
/**
 *  批量删除
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delLikeList(params: object) {
    return request({
        method: "delete",
        params,
        url: `/api/v1/like`,
    });
}
/**
 *  更新喜欢信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateLike(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/like/${id}`,
        data: params,
    });
}
/**
 *  获取喜欢信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function like(params: object) {
    return request({
        method: "get",
        url: "/api/v1/like",
        params,
    });
}
