<template>
    <el-config-provider :locale="state.localeLang">
        <router-view />
        <Theme />
    </el-config-provider>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, onBeforeUnmount, getCurrentInstance, nextTick, watch, reactive } from "vue"
import { useRoute } from "vue-router"
import { useTitle } from "@/utils/vweb"
import { useStore } from "@/store/index"
import { Local } from "@/utils/vstorage"
import Introduction from "@/utils/vintroduction"


// element-plus 框架的国家化资源
import enLocale from "element-plus/lib/locale/lang/en";
import zhcnLocale from "element-plus/lib/locale/lang/zh-cn";

import Theme from "@/layout/Theme.vue"

const { proxy } = getCurrentInstance() as any
const route = useRoute()
const store = useStore()
const title = useTitle()
const state = reactive({
    localeLang: {} as any,
})

// 设置初始化，防止刷新时恢复默认
onBeforeMount(() => {
    // 设置批量第三方 icon 图标
    Introduction.cssCDN()
    // 设置批量第三方 js
    Introduction.jsCDN()
    // 监听语言变化
    proxy.$vbus.on("onLanguageChange", onLanguageChange)
})
// 页面加载时
onMounted(() => {
    nextTick(() => {
        // 获取缓存中的布局配置
        if (Local.get("theme")) {
            let theme = Local.get("theme")
            store.dispatch("infos/setTheme", theme)
            setupLocale(theme.language)
        }
    })
})
/**装载 ElementPlus 语言 */
function setupLocale(language: string) {
    if (language == 'zh-cn') {
        state.localeLang = zhcnLocale
    } else {
        state.localeLang = enLocale
    }
}

// 页面销毁前
onBeforeUnmount(() => {
    proxy.$vbus.off("onLanguageChange", onLanguageChange)
})
/**
 * 语言改变
 */
const onLanguageChange = () => {
    const language = store.state.infos.theme.language
    setupLocale(language)
}
// 监听路由的变化，设置网站标题
watch(
    () => route.path,
    () => {
        title()
    }
)
</script>
<style>

</style>
