/**
 * 导入文件夹下所有文件
 */
export function importAll(context: any): any {
  // 获取文件路径
  let fileList = context.keys();
  const modules: any = [];
  fileList.forEach((key) => {
    // 加载文件
    let me = context(key);
    const name = key.replace(/^\.\/(.*)\.\w+$/, "$1");
    let data = me.default || me;
    modules[name] = data;
  });
  // TODO: 此处针对的是服务请求模块，具体导出内容需要根据自己的实际业务需求导出。
  return modules;
}

/**
 * 判断两个对象是否相同
 * @param source 源对象
 * @param target 目标对象
 */
export function isEquals(source: any, target: any) {
  return JSON.stringify(source) === JSON.stringify(target);
}

/**
 * 裁剪输入空格
 * @param content 当前值字符串
 * @returns 返回处理后的字符串
 */
export function trim(content: string) {
  return content.replace(/(^\s*)|(\s*$)/g, "");
}
