/**
 * 商品接口
 */
import request from "@/utils/vrequest";

/**
 *  添加商品信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addCommodity(params: object) {
    return request({
        method: "post",
        url: "/api/v1/commodity",
        data: params,
    });
}
/**
 *  删除商品信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delCommodity(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/commodity/${id}`,
    });
}
/**
 *  更新商品信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateCommodity(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/commodity/${id}`,
        data: params,
    });
}
/**
 *  获取商品信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function commodity(params: object) {
    return request({
        method: "get",
        url: "/api/v1/commodity",
        params,
    });
}
