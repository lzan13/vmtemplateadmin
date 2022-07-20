// 字体图标 url
const cssCDNList: Array<string> = [
  "//at.alicdn.com/t/font_2889126_mptwf9qc40e.css",
];
// 第三方 js url
const jsCDNList: Array<string> = [];

// 动态批量设置字体图标
export function setCssCDN() {
  if (cssCDNList.length <= 0) return false;
  cssCDNList.map((v) => {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = v;
    link.crossOrigin = "anonymous";
    document.getElementsByTagName("head")[0].appendChild(link);
  });
}

// 动态批量设置第三方js
export function setJSCDN() {
  if (jsCDNList.length <= 0) return false;
  jsCDNList.map((v) => {
    let link = document.createElement("script");
    link.src = v;
    document.body.appendChild(link);
  });
}

/**
 * 批量设置字体图标、动态js
 * @method cssCDN 动态批量设置字体图标
 * @method jsCDN 动态批量设置第三方js
 */
const Introduction = {
  // 设置css
  cssCDN: () => {
    setCssCDN();
  },
  // 设置js
  jsCDN: () => {
    setJSCDN();
  },
};

// 导出函数方法
export default Introduction;
