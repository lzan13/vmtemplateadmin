<template>
    <div class="theme">
        <el-drawer :title="$t('str.theme.configTitle')" v-model="state.isShowTheme" direction="rtl" destroy-on-close
            size="320px" @close="closeTheme">
            <el-scrollbar class="theme-content">
                <!-- 固定头部开关 -->
                <div class="theme-content-flex">
                    <div class="theme-content-flex-label">{{ $t("str.theme.isFixedHeader") }}</div>
                    <div class="theme-content-flex-value">
                        <el-switch v-model="state.theme.isFixedHeader" @change="onHeaderSwitch"></el-switch>
                    </div>
                </div>
                <!-- 显示底部开关 -->
                <div class="theme-content-flex mt16">
                    <div class="theme-content-flex-label">{{ $t("str.theme.isShowFooter") }}</div>
                    <div class="theme-content-flex-value">
                        <el-switch v-model="state.theme.isShowFooter" @change="onFooterSwitch"></el-switch>
                    </div>
                </div>
                <el-divider></el-divider>
                <!-- 菜单手风琴开关 -->
                <div class="theme-content-flex mt36">
                    <div class="theme-content-flex-label">{{ $t("str.theme.isAccordion") }}</div>
                    <div class="theme-content-flex-value">
                        <el-switch v-model="state.theme.isAccordion" @change="onSaveThemeConfig"></el-switch>
                    </div>
                </div>
                <!-- 显示 Logo 开关 -->
                <div class="theme-content-flex mt16">
                    <div class="theme-content-flex-label">{{ $t("str.theme.isShowLogo") }}</div>
                    <div class="theme-content-flex-value">
                        <el-switch v-model="state.theme.isShowLogo" @change="onShowLogoSwitch"></el-switch>
                    </div>
                </div>
                <!-- Tags 相关开关 -->
                <div class="theme-content-flex mt16">
                    <div class="theme-content-flex-label">{{ $t("str.theme.isShowTags") }}</div>
                    <div class="theme-content-flex-value">
                        <el-switch v-model="state.theme.isShowTags" @change="onSaveThemeConfig"></el-switch>
                    </div>
                </div>
                <div class="theme-content-flex mt16">
                    <div class="theme-content-flex-label">{{ $t("str.theme.isCacheTags") }}</div>
                    <div class="theme-content-flex-value">
                        <el-switch v-model="state.theme.isCacheTags" @change="onSaveThemeConfig"></el-switch>
                    </div>
                </div>
                <el-divider></el-divider>
                <!-- 深色开关 -->
                <div class="theme-content-flex mt16">
                    <div class="theme-content-flex-label">{{ $t("str.theme.isDark") }}</div>
                    <div class="theme-content-flex-value">
                        <el-switch v-model="state.theme.isDark" @change="onDarkSwitch"></el-switch>
                    </div>
                </div>
                <!-- 灰色开关 -->
                <div class="theme-content-flex mt16">
                    <div class="theme-content-flex-label">{{ $t("str.theme.isGrayscale") }}</div>
                    <div class="theme-content-flex-value">
                        <el-switch v-model="state.theme.isGrayscale" @change="onGrayscaleSwitch"></el-switch>
                    </div>
                </div>
                <el-divider></el-divider>
                <!-- 水印开关 -->
                <div class="theme-content-flex mt16">
                    <div class="theme-content-flex-label">{{ $t("str.theme.isWartermark") }}</div>
                    <div class="theme-content-flex-value">
                        <el-switch v-model="state.theme.isWartermark" @change="onWartermarkSwitch"></el-switch>
                    </div>
                </div>
                <!-- 水印内容输入 -->
                <div class="theme-content-flex mt8">
                    <div class="theme-content-flex-label">{{ $t("str.theme.wartermarkText") }}</div>
                    <div class="theme-content-flex-value">
                        <el-input v-model="state.theme.wartermarkText" size="small" style="width: 120px"
                            @input="onWartermarkInput($event)"></el-input>
                    </div>
                </div>
                <el-divider></el-divider>
                <!-- 内容切换动画 -->
                <div class="theme-content-flex mt16">
                    <div class="theme-content-flex-label">{{ $t("str.theme.transitionName") }}</div>
                    <div class="theme-content-flex-value">
                        <el-select v-model="state.theme.transitionName" :placeholder="$t('str.tips.selectHint')"
                            size="small" style="width: 120px" @change="onSaveThemeConfig">
                            <el-option label="slide-right" value="slide-right"></el-option>
                            <el-option label="slide-left" value="slide-left"></el-option>
                            <el-option label="opacitys" value="opacitys"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-scrollbar>

            <div class="theme-control">
                <el-button class="theme-control-reset" type="info" @click="onSettingsReset">{{ $t("str.theme.reset") }}
                </el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, getCurrentInstance, reactive, onBeforeMount, onBeforeUnmount } from "vue"
import { useStore } from "@/store/index"
import { Local } from "@/utils/vstorage"
import { trim } from "@/utils/vutils"
import Watermark from "@/utils/vwartermark"

const { proxy } = getCurrentInstance() as any
const store = useStore()
const state: any = reactive({
    isShowTheme: false,
    theme: "",
})
/**
 * 初始化主题
 */
const initTheme = () => {
    nextTick(() => {
        setTimeout(() => {
            state.theme = store.state.infos.theme
            // 深色模式
            if (state.theme.isDark) {
                const body = document.documentElement as HTMLElement
                body.setAttribute("data-theme", "dark")
            }
            // 灰色模式
            if (state.theme.isGrayscale) {
                const body = document.documentElement as HTMLElement
                const cssAttr = `grayscale(${state.theme.isGrayscale ? 1 : 0})`
                body.setAttribute("style", `filter: ${cssAttr}`)
            }
            // 水印开关
            state.theme.isWartermark ? Watermark.set(state.theme.wartermarkText) : Watermark.del()
            // 语言国际化
            proxy.$i18n.locale = state.theme.language
        }, 100)
    })
}
/**
 * 打开主题设置界面
 */
const openTheme = (show) => {
    state.isShowTheme = show
    state.theme = store.state.infos.theme
}
/**
 * 关闭主题设置界面
 */
const closeTheme = () => {
    state.isShowTheme = false
    onSaveThemeConfig()
}

/**
 * 固定头部开关
 */
const onHeaderSwitch = () => {
    proxy.vbus.emit("layoutHeightChange")

    onSaveThemeConfig()
}

/**
 * 底部开关
 */
const onFooterSwitch = () => {
    proxy.vbus.emit("layoutHeightChange")

    onSaveThemeConfig()
}
/**
 * 显示 Logo 开关
 */
const onShowLogoSwitch = () => {
    proxy.vbus.emit("layoutHeightChange")

    onSaveThemeConfig()
}

/**
 * 深色开关
 */
const onDarkSwitch = () => {
    const body = document.documentElement as HTMLElement
    if (state.theme.isDark) {
        body.setAttribute("data-theme", "dark")
    } else {
        body.setAttribute("data-theme", "")
    }

    onSaveThemeConfig()
}

/**
 * 灰度开关
 */
const onGrayscaleSwitch = () => {
    const body = document.documentElement as HTMLElement
    const cssAttr = `grayscale(${state.theme.isGrayscale ? 1 : 0})`
    body.setAttribute("style", `filter: ${cssAttr}`)
    onSaveThemeConfig()
}

/**
 * 水印开关
 */
const onWartermarkSwitch = () => {
    state.theme.isWartermark ? Watermark.set(state.theme.wartermarkText) : Watermark.del()
    onSaveThemeConfig()
}
/**
 * 水印文案
 */
const onWartermarkInput = (content: string) => {
    state.theme.wartermarkText = trim(content)
    if (state.theme.wartermarkText === "") return false
    if (state.theme.isWartermark) Watermark.set(state.theme.wartermarkText)
    onSaveThemeConfig()
}

/**
 * 保存主题设置到本地，这里是永久存储
 */
const onSaveThemeConfig = () => {
    console.log("-lz- onSaveThemeConfig")
    store.state.infos.theme = state.theme

    Local.remove("theme")
    Local.set("theme", store.state.infos.theme)
}
/**
 * 恢复默认设置
 */
const onSettingsReset = () => {
    Local.remove("theme")
    window.location.reload()
}

/**
 * 页面加载时
 */
onBeforeMount(() => {
    // 初始化主题
    initTheme()
    // 监听 theme 配置变化
    proxy.vbus.on("openTheme", openTheme)
})
/**
 * 页面卸载时
 */
onBeforeUnmount(() => {
    proxy.vbus.off("openTheme", openTheme)
})
</script>

<style scoped lang="scss">
.theme {
    position: absolute;
    top: 0;
    left: 0;

    &-content {
        height: calc(100vh - 77px - 50px);
        padding: 0 32px;

        :deep(.el-scrollbar__view) {
            overflow-x: hidden !important;
        }

        &-flex {
            display: flex;
            align-items: center;

            &-label {
                flex: 1;
                color: var(--body);
            }
        }
    }

    &-control {
        margin: 0 16px;

        &-reset {
            width: 100%;
        }
    }
}
</style>
