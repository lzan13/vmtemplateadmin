import { nextTick } from "vue";

/**
 * 页面全局 Loading
 * @method setCss 载入 css
 * @method start 创建 loading
 * @method done 移除 loading
 */
export const NextLoading = {
  // 创建 loading
  start: () => {
    const bodys: Element = document.body;
    const div = document.createElement("div");
    div.setAttribute("class", "loading-next");
    const htmls = `
        <div class='loader'>
          <div class='loader_overlay'></div>
          <div class='loader_cogs'>
            <div class='loader_cogs__top'>
              <div class='top_part'></div>
              <div class='top_part'></div>
              <div class='top_part'></div>
              <div class='top_hole'></div>
            </div>
            <div class='loader_cogs__left'>
              <div class='left_part'></div>
              <div class='left_part'></div>
              <div class='left_part'></div>
              <div class='left_hole'></div>
            </div>
            <div class='loader_cogs__bottom'>
              <div class='bottom_part'></div>
              <div class='bottom_part'></div>
              <div class='bottom_part'></div>
              <div class='bottom_hole'><!-- lol --></div>
            </div>
            <p>loading</p>
          </div>
        </div>
      `;
    div.innerHTML = htmls;
    bodys.insertBefore(div, bodys.childNodes[0]);
    window.nextLoading = true;
  },
  // 移除 loading
  done: () => {
    nextTick(() => {
      setTimeout(() => {
        window.nextLoading = false;
        const el = document.querySelector(".loading-next");
        el && el.parentNode?.removeChild(el);
      }, 320);
    });
  },
};
