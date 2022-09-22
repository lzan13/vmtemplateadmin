/**
 * 附件接口
 */
import request from "@/network/vrequest";

/**
 *  添加附件信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function addAttachment(params: object) {
    return request({
        method: "post",
        url: "/api/v1/attachment",
        data: params,
    });
}
/**
 *  删除附件信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delAttachment(id: string) {
    return request({
        method: "delete",
        url: `/api/v1/attachment/${id}`,
    });
}
/**
 *  批量删除
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function delAttachmentList(params: object) {
    return request({
        method: "delete",
        url: `/api/v1/attachment`,
        params,
    });
}
/**
 *  更新附件信息
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function updateAttachment(id: string, params: object) {
    return request({
        method: "put",
        url: `/api/v1/attachment/${id}`,
        data: params,
    });
}
/**
 *  获取附件信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function attachment(params: object) {
    return request({
        method: "get",
        url: "/api/v1/attachment",
        params,
    });
}
