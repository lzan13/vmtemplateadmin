/**
 * 分类接口
 */
import request from "@/utils/vrequest";

/**
 *  添加分类信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addCategory(params: object) {
    return request({
        method: "post",
        url: "/api/v1/category",
        data: params,
    });
}
/**
 *  删除分类信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delCategory(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/category/${id}`,
    });
}
/**
 *  更新分类信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateCategory(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/category/${id}`,
        data: params,
    });
}
/**
 *  获取分类信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function category(params: object) {
    return request({
        method: "get",
        url: "/api/v1/category",
        params,
    });
}
