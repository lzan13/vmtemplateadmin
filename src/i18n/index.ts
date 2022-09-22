/**
 * 国际化配置
 */

import { createI18n } from "vue-i18n";
import { store } from "@/store/index";

/**
 * 定义语言国际化内容
 * /src/i18n/common 下的 ts 为框架的国际化内容
 * /src/i18n/pages 下的 ts 为各界面的国际化内容
 */
/**
 * 框架相关国际化资源
 */
import commonEN from "./common/en";
import commonZHCN from "./common/zh-cn";

/**
 * 各页面国际化资源
 */
import pageSignEN from "./pages/en";
import pageSignZHCN from "./pages/zh-cn";

/**
 * 说明：
 */
const messages = {
    'en': {
        str: {
            ...commonEN,
            ...pageSignEN,
        },
    },
    'zh-cn': {
        str: {
            ...commonZHCN,
            ...pageSignZHCN,
        },
    },
};

/**导出语言国际化 */
export const i18n = createI18n({
    legacy: false, // composition API
    globalInjection: true, //全局生效$t
    locale: store.state.infos.theme.language, // 默认语言
    fallbackLocale: store.state.infos.theme.language,
    messages,
});

// /**装载国际化配置 */
// export function setupI18n(app) {
//     const i18n = createI18n({
//         legacy: false, // composition API
//         globalInjection: true, //全局生效$t
//         locale: store.state.infos.theme.language, // 默认语言
//         fallbackLocale: zhcnLocale.name,
//         messages,
//     });
//     app.use(i18n)
// }
