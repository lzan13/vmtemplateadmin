<template>
    <transition name="el-zoom-in-top">
        <div aria-hidden="true" class="el-dropdown__popper el-popper is-light is-pure custom-contextmenu" role="tooltip"
            data-popper-placement="bottom" :style="`top: ${positionTop}px;left: ${positionLeft}px;`"
            :key="Math.random()" v-show="state.isShow">
            <!-- :key="Math.random()" v-show="state.isShow"> -->

            <ul class="el-dropdown-menu">
                <template v-for="(item, index) in state.menuList">
                    <li class="el-dropdown-menu__item" aria-disabled="false" tabindex="-1" :key="index"
                        v-if="!item.affix" @click="onCurrentMenuClick(item.contextMenuClickId)">
                        <el-icon :icon="Close"></el-icon>
                        <span>{{ $t(item.txt) }}</span>
                    </li>
                </template>
            </ul>
            <div class="el-popper__arrow" style="left: 10px"></div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { computed, reactive, onMounted, onUnmounted } from "vue"
import { RefreshRight, Close, CircleClose, FolderDelete } from "@element-plus/icons-vue"

defineExpose({
    openMenu,
})
const emits = defineEmits(["currentContextmenuClick"])
const state = reactive({
    isShow: false,
    position: {} as any,
    menuList: [
        { contextMenuClickId: 0, txt: "str.tags.refresh", affix: false, icon: "RefreshRight" },
        { contextMenuClickId: 1, txt: "str.tags.close", affix: false, icon: "Close" },
        { contextMenuClickId: 2, txt: "str.tags.closeOther", affix: false, icon: "CircleClose" },
        { contextMenuClickId: 3, txt: "str.tags.closeAll", affix: false, icon: "FolderDelete" },
    ],
    item: {},
})
// 父级传过来的坐标 x,y 值
const positionTop = computed(() => {
    return state.position.y + 16
})
const positionLeft = computed(() => {
    return state.position.x
})
// 当前项菜单点击
const onCurrentMenuClick = (contextMenuClickId: number) => {
    emits("currentContextmenuClick", Object.assign({}, { contextMenuClickId }, state.item))
}
// 打开右键菜单：判断是否固定，固定则不显示关闭按钮
function openMenu(item: any, position: any) {
    state.item = item
    state.position = position
    item.meta.isAffix ? (state.menuList[1].affix = true) : (state.menuList[1].affix = false)
    closeMenu()
    setTimeout(() => {
        state.isShow = true
    }, 10)
}
// 关闭右键菜单
const closeMenu = () => {
    state.isShow = false
}
// 监听页面监听进行右键菜单的关闭
onMounted(() => {
    document.body.addEventListener("click", closeMenu)
})
// 页面卸载时，移除右键菜单监听事件
onUnmounted(() => {
    document.body.removeEventListener("click", closeMenu)
})
</script>

<style scoped lang="scss">
.custom-contextmenu {
    transform-origin: center top;
    z-index: 2190;
    position: fixed;

    .el-dropdown-menu__item {
        font-size: 12px !important;
        white-space: nowrap;

        i {
            font-size: 12px !important;
        }
    }
}
</style>
