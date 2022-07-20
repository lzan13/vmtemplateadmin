<template>
    <div class="search">
        <el-dialog v-model="state.isShowSearch" destroy-on-close :modal="false" fullscreen :show-close="false">
            <el-autocomplete v-model="state.menuQuery" :fetch-suggestions="menuSearch"
                :placeholder="$t('str.router.search')" ref="menuAutocompleteRef" @select="onHandleSelect"
                @blur="onSearchBlur">
                <template #default="{ item }">
                    <div><i :class="item.meta.icon" class="mr10"></i>{{ $t(item.meta.title) }}</div>
                </template>
            </el-autocomplete>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { useStore } from "@/store/index"

const menuAutocompleteRef = ref()
const { t } = useI18n()
const store = useStore()
const router = useRouter()

defineExpose({ openSearch })
const state: any = reactive({
    isShowSearch: false,
    menuQuery: "",
    tagsViewList: [],
})

// 搜索弹窗打开
function openSearch() {
    state.menuQuery = ""
    state.isShowSearch = true
    initTageView()
    nextTick(() => {
        menuAutocompleteRef.value.focus()
    })
}
// 搜索弹窗关闭
const closeSearch = () => {
    state.isShowSearch = false
}
// 菜单搜索数据过滤
const menuSearch = (queryString: any, cb: any) => {
    let results = queryString ? state.tagsViewList.filter(createFilter(queryString)) : state.tagsViewList
    cb(results)
}
// 菜单搜索过滤
const createFilter = (queryString: any) => {
    return (restaurant: any) => {
        return (
            restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
            restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
            t(restaurant.meta.title).indexOf(queryString.toLowerCase()) > -1
        )
    }
}
// 初始化菜单数据
const initTageView = () => {
    if (state.tagsViewList.length > 0) return false
    store.state.routes.tagRoutesList.map((v: any) => {
        if (!v.meta.isHide) state.tagsViewList.push({ ...v })
    })
}
// 当前菜单选中时
const onHandleSelect = (item: any) => {
    let { path, redirect } = item
    if (item.meta.linkUrl && !item.meta.isIframe) window.open(item.meta.linkUrl)
    else if (redirect) router.push(redirect)
    else router.push(path)
    closeSearch()
}
// input 失去焦点时
const onSearchBlur = () => {
    closeSearch()
}
</script>

<style scoped lang="scss">
.search {
    :deep(.el-dialog) {
        box-shadow: unset !important;
        border-radius: 0 !important;
        background: rgba(0, 0, 0, 0.15);
    }

    :deep(.el-autocomplete) {
        position: absolute;
        width: 320px;
        top: 100px;
        left: 50%;
        padding: 16px;
        background: var(--bg);
        transform: translateX(-50%);
    }
}
</style>
