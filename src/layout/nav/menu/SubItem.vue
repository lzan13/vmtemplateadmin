<template>
    <template v-for="menu in childs">
        <el-sub-menu :index="menu.path" :key="menu.path" v-if="menu.children && menu.children.length > 0">
            <template #title>
                <i :class="menu.meta.icon"></i>
                <span>{{ $t(menu.meta.title) }}</span>
            </template>
            <sub-item :child="menu.children" />
        </el-sub-menu>
        <el-menu-item :index="menu.path" :key="menu.path + 1" v-else>
            <template v-if="!menu.meta.linkUrl || (menu.meta.linkUrl && menu.meta.isIframe)">
                <i :class="menu.meta.icon ? menu.meta.icon : ''"></i>
                <span>{{ $t(menu.meta.title) }}</span>
            </template>
            <template v-else>
                <a :href="menu.meta.linkUrl" target="_blank" rel="opener">
                    <i :class="menu.meta.icon ? menu.meta.icon : ''"></i>
                    {{ $t(menu.meta.title) }}
                </a>
            </template>
        </el-menu-item>
    </template>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue"

const props = defineProps({
    childs: {
        type: Array as PropType<any[]>,
        default: Array<any>()
    },
})
// 获取父级菜单数据
const childs = computed(() => {
    return props.childs
})
</script>
