/**
 * 礼物关系接口
 */
import request from "@/network/vrequest";

/**
 *  删除信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delGiftRelation(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/giftRelation/${id}`,
    });
}
/**
 *  获取信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function giftRelation(params: object) {
    return request({
        method: "get",
        url: "/api/v1/giftRelation",
        params,
    });
}
