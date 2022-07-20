import { nextTick } from "vue";
import router from "@/router/index";
import { i18n } from "@/i18n/index";

/**
 * 设置浏览器标题国际化
 */
export function useTitle() {
    return () => {
        nextTick(() => {
            let routeTitle = i18n.global.t(
                router.currentRoute.value.meta.title as any
            );
            let siteTitle;
            if (
                router.currentRoute.value.path == "/" ||
                router.currentRoute.value.path == "/agreement" ||
                router.currentRoute.value.path == "/policy" ||
                router.currentRoute.value.path == "/norm"
            ) {
                siteTitle = i18n.global.t("str.site.siteIndexTitle");
            } else {
                siteTitle = i18n.global.t("str.site.siteAdminTitle");
            }
            document.title = `${routeTitle} - ${siteTitle}` || siteTitle;
        });
    };
}
