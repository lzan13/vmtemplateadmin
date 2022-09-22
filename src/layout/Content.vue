<!--内容布局-->
<template>
    <el-main class="content">
        <router-view v-slot="{ Component }">
            <transition :name="transitionName" mode="out-in">
                <keep-alive :include="state.keepAliveNames">
                    <component :is="Component" :key="state.routerViewKey" class="w100" />
                </keep-alive>
            </transition>
        </router-view>
    </el-main>
</template>

<script lang="ts" setup>
import { computed, reactive, getCurrentInstance, onBeforeMount, onBeforeUnmount, nextTick, watch } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "@/store/index"

const { proxy } = getCurrentInstance() as any
const route = useRoute()
const store = useStore()
const state: any = reactive({
    routerViewKey: "",
    keepAliveNames: [],
    keepAliveNameNewList: [],
})
// 设置主界面切换动画
const transitionName = computed(() => {
    return store.state.infos.theme.transitionName
})
// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
    return store.state.routes.keepAliveList
})
/**
 * 刷新 Tag
 */
const refreshTag = (name: string): void => {
    state.keepAliveNames = getKeepAliveNames.value.filter((name: string) => route.name !== name)
    state.routerViewKey = ""
    nextTick(() => {
        state.routerViewKey = name
        state.keepAliveNames = getKeepAliveNames.value
    })
}
// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
    state.keepAliveNames = getKeepAliveNames.value
    proxy.$vbus.on("refreshCurrentTag", refreshTag)
})
// 页面卸载之前
onBeforeUnmount(() => {
    proxy.$vbus.off("refreshCurrentTag", refreshTag)
})
// 监听路由变化，防止 tagsView 多标签时，切换动画消失
watch(
    () => route.fullPath,
    () => {
        state.routerViewKey = route.name
    }
)
</script>
<style lang="scss" scoped>

</style>
