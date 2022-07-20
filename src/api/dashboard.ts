/**
 * 仪表盘接口
 */
import request from "@/utils/vrequest";

/**
 *  获取配置信息列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function countData() {
    return request({
        method: "get",
        url: "/api/v1/admin/dashboard",
    });
}
