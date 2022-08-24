/**
 * 附件接口
 */
import request from "@/network/vrequest";

/**
 *  添加信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addApplet(params: object) {
    return request({
        method: "post",
        url: "/api/v1/applet",
        data: params,
    });
}
/**
 *  删除信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delApplet(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/applet/${id}`,
    });
}
/**
 *  更新信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateApplet(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/applet/${id}`,
        data: params,
    });
}
/**
 *  获取信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function applet(params: object) {
    return request({
        method: "get",
        url: "/api/v1/applet",
        params,
    });
}
