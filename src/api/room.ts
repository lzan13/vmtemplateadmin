/**
 * 房间接口
 */
import request from "@/utils/vrequest";

/**
 *  添加房间信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addRoom(params: object) {
    return request({
        method: "post",
        url: "/api/v1/room",
        data: params,
    });
}
/**
 *  删除房间信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delRoom(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/room/${id}`,
    });
}
/**
 *  更新房间信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateRoom(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/room/${id}`,
        data: params,
    });
}
/**
 *  获取房间信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function room(params: object) {
    return request({
        method: "get",
        url: "/api/v1/room",
        params,
    });
}
