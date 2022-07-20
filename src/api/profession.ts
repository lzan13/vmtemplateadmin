/**
 * 职业接口
 */
import request from "@/utils/vrequest";

/**
 *  添加职业信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addProfession(params: object) {
    return request({
        method: "post",
        url: "/api/v1/profession",
        data: params,
    });
}
/**
 *  删除职业信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delProfession(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/profession/${id}`,
    });
}
/**
 *  更新职业信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateProfession(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/profession/${id}`,
        data: params,
    });
}
/**
 *  获取职业信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function profession(params: object) {
    return request({
        method: "get",
        url: "/api/v1/profession",
        params,
    });
}
