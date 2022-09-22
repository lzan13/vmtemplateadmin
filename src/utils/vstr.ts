const imgSuffixArr = [".gif", ".jpg", ".jpeg", ".png"]
/**
 * 包装资源路径
 */
export function wrapMediaUrl(path: string) {
    if (!path) return "";

    const suffix = path.slice(path.lastIndexOf("."))
    if (imgSuffixArr.indexOf(suffix) === -1) return ""

    if (path.indexOf("http") != -1) {
        return path;
    } else {
        return `${import.meta.env.vmViteMediaHost}${path}`;
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
