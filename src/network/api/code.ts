/**
 * 验证码接口
 */
import request from "@/network/vrequest";

/**
 *  添加验证码信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addCode(params: object) {
    return request({
        method: "post",
        url: "/api/v1/code",
        data: params,
    });
}
/**
 *  删除验证码信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delCode(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/code/${id}`,
    });
}
/**
 *  批量删除
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delCodeList(params: object) {
    return request({
        method: "delete",
        params,
        url: `/api/v1/code`,
    });
}
/**
 *  获取验证码信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function code(params: object) {
    return request({
        method: "get",
        url: "/api/v1/code",
        params,
    });
}
