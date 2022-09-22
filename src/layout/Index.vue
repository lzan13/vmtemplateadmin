<template>
    <el-container class="page">
        <SideBar />
        <el-container class="flex-center" :class="{ gotop: !state.isFixedHeader }">
            <Header v-if="state.isFixedHeader" />
            <el-scrollbar class="content-scroll" :class="{ gotop: state.isFixedHeader }" :style="{
                maxHeight: `calc(100vh - ${state.headerHeight} - ${state.footerHeight})`,
            }" ref="scrollbarRef">
                <Header v-if="!state.isFixedHeader" />
                <Content />
            </el-scrollbar>
        </el-container>

        <!-- 底部 -->
        <!-- <Footer :showCopyright="false" :showSponsor="false" :showLinks="false" :showBeian="false"></Footer> -->
        <el-backtop target=".gotop .el-scrollbar__wrap"></el-backtop>
    </el-container>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, reactive, watch } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "@/store/index"
import SideBar from "@/layout/SideBar.vue"
import Header from "@/layout/Header.vue"
import Content from "@/layout/Content.vue"
import Footer from "@/layout/Footer.vue"

const { proxy } = getCurrentInstance() as any
const store = useStore()
const route = useRoute()
const state = reactive({
    isFixedHeader: false,
    isShowFooter: false,
    headerHeight: "0",
    footerHeight: "0",
})
// 设置 main 的高度
const setupSpace = () => {
    state.isFixedHeader = store.state.infos.theme.isFixedHeader
    state.isShowFooter = store.state.infos.theme.isShowFooter
    state.headerHeight = state.isFixedHeader ? "36px" : "0"
    state.footerHeight = state.isShowFooter ? "56px" : "0"
}
const updateHeight = () => {
    setupSpace()
    proxy.$refs.scrollbarRef.update()
}
// 页面加载前
onBeforeMount(() => {
    setupSpace()
    // 监听 theme 配置变化引起的界面高度变化
    proxy.$vbus.on("layoutHeightChange", updateHeight)
})
// 页面销毁前
onBeforeUnmount(() => {
    proxy.$vbus.off("layoutHeightChange", updateHeight)
})
// 监听路由的变化
watch(
    () => route.path,
    () => {
        proxy.$refs.scrollbarRef.scrollTop = 0
    }
)
</script>
<style lang="scss" scoped>
.content-scroll {
    overflow: hidden;
    background: var(--bg-white);
    border-radius: 8px;
}
</style>
