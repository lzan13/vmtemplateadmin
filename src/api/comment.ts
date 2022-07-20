/**
 * 评论接口
 */
import request from "@/utils/vrequest";

/**
 *  添加评论信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addComment(params: object) {
    return request({
        method: "post",
        url: "/api/v1/comment",
        data: params,
    });
}
/**
 *  删除评论信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delComment(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/comment/${id}`,
    });
}
/**
 *  更新评论信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateComment(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/comment/${id}`,
        data: params,
    });
}
/**
 *  获取评论信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function comment(params: object) {
    return request({
        method: "get",
        url: "/api/v1/comment",
        params,
    });
}
