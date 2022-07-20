<template>
    <el-menu router :default-active="state.defaultActive" background-color="transparent" :collapse="state.isFold"
        :unique-opened="isAccordion" :collapse-transition="false">
        <template v-for="menu in menuLists">
            <el-sub-menu :index="menu.path" :key="menu.path" v-if="menu.children && menu.children.length > 0">
                <template #title>
                    <i :class="menu.meta.icon ? menu.meta.icon : ''"></i>
                    <span>{{ $t(menu.meta.title) }}</span>
                </template>
                <SubItem :childs="menu.children" />
            </el-sub-menu>
            <el-menu-item :index="menu.path" :key="menu.path + 1" v-else>
                <i :class="menu.meta.icon ? menu.meta.icon : ''"></i>
                <template #title v-if="!menu.meta.linkUrl || (menu.meta.linkUrl && menu.meta.isIframe)">
                    <span>{{ $t(menu.meta.title) }}</span>
                </template>
                <template #title v-else>
                    <a :href="menu.meta.linkUrl" target="_blank" rel="opener">{{ $t(menu.meta.title) }}</a></template>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script lang="ts" setup>
import { reactive, computed, getCurrentInstance, onMounted, PropType, watch } from "vue"
import { useRoute, onBeforeRouteUpdate, RouteLocationNormalizedLoaded } from "vue-router"
import { useStore } from "@/store/index"

import SubItem from "@/layout/nav/menu/SubItem.vue"

const { proxy } = getCurrentInstance() as any
const store = useStore()
const route = useRoute()


const props = defineProps({
    menuList: {
        type: Array as PropType<any[]>,
        default: Array<any>()
    },
})

const state = reactive({
    defaultActive: "",
    isFold: false,
})
// 获取父级菜单数据
const menuLists = computed(() => {
    return props.menuList || Array<Object>()
})
// 获取布局配置信息
const isAccordion = computed(() => {
    return store.state.infos.theme.isAccordion
})

// 设置菜单的收起/展开
watch(
    store.state.infos.theme,
    () => {
        state.isFold = store.state.infos.theme.isFold
    },
    {
        immediate: true,
    }
)
// 页面加载时
onMounted(() => {
    state.defaultActive = route.name?.toString() || ""
})
// 路由更新时
onBeforeRouteUpdate((to) => {
    state.defaultActive = to.name?.toString() || ""
})
</script>
