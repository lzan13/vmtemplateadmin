/**
 * 关注接口
 */
import request from "@/network/vrequest";

/**
 *  添加关注信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addRelation(params: object) {
    return request({
        method: "post",
        url: "/api/v1/relation",
        data: params,
    });
}
/**
 *  删除关注信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delRelation(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/relation/${id}`,
    });
}
/**
 *  更新关注信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateRelation(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/relation/${id}`,
        data: params,
    });
}
/**
 *  获取关注信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function relation(params: object) {
    return request({
        method: "get",
        url: "/api/v1/relation",
        params,
    });
}
