/**
 * 反馈接口
 */
import request from "@/network/vrequest";

/**
 *  添加反馈信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addFeedback(params: object) {
    return request({
        method: "post",
        url: "/api/v1/feedback",
        data: params,
    });
}
/**
 *  删除反馈信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delFeedback(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/feedback/${id}`,
    });
}
/**
 *  批量删除
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delFeedbackList(params: object) {
    return request({
        method: "delete",
        params,
        url: `/api/v1/feedback`,
    });
}
/**
 *  更新反馈信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateFeedback(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/feedback/${id}`,
        data: params,
    });
}
/**
 *  获取反馈信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function feedback(params: object) {
    return request({
        method: "get",
        url: "/api/v1/feedback",
        params,
    });
}
