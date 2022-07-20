<template>
    <el-header class="header" :height="headerHeight">
        <Nav />
    </el-header>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import Nav from "@/layout/nav/Index.vue"

// 设置 header 的高度
const headerHeight = computed(() => {
    return "36px"
})
</script>
<style lang="scss" sponed>
.header {
    padding: 0 0 0 8px;
    margin: 0;
}
</style>
