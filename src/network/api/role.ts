/**
 * 角色接口
 */
import request from "@/network/vrequest";

/**
 *  添加角色信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addRole(params: object) {
    return request({
        method: "post",
        url: "/api/v1/role",
        data: params,
    });
}
/**
 *  删除角色信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delRole(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/role/${id}`,
    });
}
/**
 *  更新角色信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateRole(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/role/${id}`,
        data: params,
    });
}
/**
 *  获取角色信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function role(params: object) {
    return request({
        method: "get",
        url: "/api/v1/role",
        params,
    });
}
