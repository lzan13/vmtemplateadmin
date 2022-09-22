/**
 * 交易信息接口
 */
import request from "@/network/vrequest";

/**
 *  删除签到信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delScore(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/score/${id}`,
    });
}
/**
 *  批量删除
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delScoreList(params: object) {
    return request({
        method: "delete",
        params,
        url: `/api/v1/score`,
    });
}
/**
 *  获取签到信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function score(params: object) {
    return request({
        method: "get",
        url: "/api/v1/score",
        params,
    });
}
