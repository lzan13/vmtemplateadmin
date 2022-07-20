/**
 * 页面添加水印效果
 * @param str 水印内容
 * @returns
 */
const setWatermark = (str: string) => {
  const id = "vwartermark";
  if (document.getElementById(id) !== null)
    document.body.removeChild(document.getElementById(id) as any);
  const can = document.createElement("canvas");
  can.width = 250;
  can.height = 180;
  const cans: any = can.getContext("2d");
  cans.rotate((-20 * Math.PI) / 180);
  cans.font = "12px Vedana";
  cans.fillStyle = "rgba(200, 200, 200, 0.30)";
  cans.textAlign = "center";
  cans.textBaseline = "Middle";
  cans.fillText(str, can.width / 10, can.height / 2);
  const div = document.createElement("div");
  div.id = id;
  div.style.pointerEvents = "none";
  div.style.top = "35px";
  div.style.left = "0px";
  div.style.position = "fixed";
  div.style.zIndex = "99999";
  div.style.width = `${document.documentElement.clientWidth}px`;
  div.style.height = `${document.documentElement.clientHeight}px`;
  div.style.background = `url(${can.toDataURL("image/png")}) left top repeat`;
  document.body.appendChild(div);
  return id;
};

/**
 * 页面添加水印效果
 * @method set 设置水印
 * @method del 删除水印
 */
const watermark = {
  // 设置水印
  set: (str: string) => {
    let id = setWatermark(str);
    if (document.getElementById(id) === null) id = setWatermark(str);
  },
  // 删除水印
  del: () => {
    let id = "vwartermark";
    if (document.getElementById(id) !== null)
      document.body.removeChild(document.getElementById(id) as any);
  },
};

// 导出方法
export default watermark;
