<template>
    <div class="nav-top">
        <Tags v-if="isShowTags" />
        <Control />
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useStore } from "@/store/index"
import Control from "./top/Control.vue"
import Tags from "./tags/Tags.vue"

const store = useStore()
// 是否显示 tagsView
const isShowTags = computed(() => {
    return store.state.infos.theme.isShowTags
})
</script>

<style scoped lang="scss">
.nav-top {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}
</style>