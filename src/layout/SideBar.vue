<template>
    <div class="h100">
        <el-aside class="aside" :class="foldStyle">
            <Logo v-if="isShowLogo" />
            <el-scrollbar class="flex-auto" ref="asideScrollbarRef">
                <Vertical :menuList="state.menuList" />
            </el-scrollbar>
        </el-aside>
    </div>
</template>

<script lang="ts" setup>
import { reactive, computed, getCurrentInstance, onBeforeMount, onBeforeUnmount } from "vue"
import { useStore } from "@/store/index"

import Logo from "@/layout/Logo.vue"
import Vertical from "@/layout/nav/menu/Vertical.vue"

const { proxy } = getCurrentInstance() as any
const store = useStore()
const state: any = reactive({
    menuList: [],
})

// 设置菜单展开/收起时的宽度
const foldStyle = computed(() => {
    const { isFold } = store.state.infos.theme

    if (isFold) {
        return ["layout-aside-pc-64"]
    } else {
        return ["layout-aside-pc-180"]
    }
})

// 设置显示/隐藏 logo
const isShowLogo = computed(() => {
    return store.state.infos.theme.isShowLogo
})
// 设置/过滤路由（非静态路由/是否显示在菜单中）
const setupFilterRoutes = () => {
    state.menuList = filterRoutes(store.state.routes.routesList)
}
// 路由过滤递归函数
const filterRoutes = (arr: Array<object>) => {
    return arr
        .filter((item: any) => !item.meta.isHide)
        .map((item: any) => {
            item = Object.assign({}, item)
            if (item.children) item.children = filterRoutes(item.children)
            return item
        })
}
/**
 * 改变高度
 */
const changeHeight = () => {
    if (!proxy.$refs.asideScrollbarRef) return false
    proxy.$refs.asideScrollbarRef.update()
}
// 页面加载前
onBeforeMount(() => {
    setupFilterRoutes()
    // 监听路由变化
    proxy.vbus.on("routesChange", setupFilterRoutes)
    // 监听 theme 配置文件的变化，更新菜单 el-scrollbar 的高度
    proxy.vbus.on("layoutHeightChange", changeHeight)
})
// 页面卸载前
onBeforeUnmount(() => {
    proxy.vbus.off("routesChange", setupFilterRoutes)
    proxy.vbus.off("layoutHeightChange", changeHeight)
})
</script>
