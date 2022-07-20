/**
 * 国际化导出
 */

import { createI18n } from "vue-i18n";
// element-plus 框架的国家化资源
import enLocale from "element-plus/lib/locale/lang/en";
import zhcnLocale from "element-plus/lib/locale/lang/zh-cn";

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
    [enLocale.name]: {
        ...enLocale,
        str: {
            ...commonEN,
            ...pageSignEN,
        },
    },
    [zhcnLocale.name]: {
        ...zhcnLocale,
        str: {
            ...commonZHCN,
            ...pageSignZHCN,
        },
    },
};

// 导出语言国际化
export const i18n = createI18n({
    locale: store.state.infos.theme.language,
    fallbackLocale: zhcnLocale.name,
    messages,
});
