/**
 * 订单接口
 */
import request from "@/network/vrequest";

/**
 *  添加订单信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addOrder(params: object) {
    return request({
        method: "post",
        url: "/api/v1/order",
        data: params,
    });
}
/**
 *  删除订单信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delOrder(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/order/${id}`,
    });
}
/**
 *  批量删除
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delOrderList(params: object) {
    return request({
        method: "delete",
        params,
        url: `/api/v1/order`,
    });
}
/**
 *  更新订单信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateOrder(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/order/${id}`,
        data: params,
    });
}
/**
 *  获取订单信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function order(params: object) {
    return request({
        method: "get",
        url: "/api/v1/order",
        params,
    });
}
