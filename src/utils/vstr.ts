/**
 * 包装资源路径
 */
export function wrapUrl(path: string) {
    if (!path) return "";
    if (path.indexOf("http") != -1) {
        return path;
    } else {
        return `https://data.nepenthe.vmloft.com${path}`;
    }
}

/**
 * 裁剪输入空格
 * @param content 当前值字符串
 * @returns 返回处理后的字符串
 */
export function trim(content: string) {
    return content.replace(/(^\s*)|(\s*$)/g, "");
}
