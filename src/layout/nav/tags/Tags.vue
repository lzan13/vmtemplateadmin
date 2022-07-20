<template>
    <div class="tags">
        <el-scrollbar ref="scrollbarRef">
            <ul class="tags-ul">
                <li class="tags-ul-li" v-for="(item, index) in state.tagList" :key="index" :data-name="item.name"
                    :class="{ 'is-active': isActive(item) }" @contextmenu.prevent="showTagMenu(item, $event)"
                    @click="clickTag(item, index)" :ref="(el) => { setTagRef(index, el) }">
                    <span class="mr4">{{ $t(item.meta.title) }}</span>
                    <template v-if="isActive(item)">
                        <el-icon class="tags-ul-li-icon layout-icon-refresh" @click.stop="refreshCurrentTag()">
                            <refreshRight />
                        </el-icon>
                    </template>
                    <el-icon class="tags-ul-li-icon layout-icon-close" v-if="!item.meta.isAffix"
                        @click.stop="closeCurrentTag(item.url)">
                        <close />
                    </el-icon>
                </li>
            </ul>
        </el-scrollbar>
        <TagMenu ref="tagMenuRef" @currentContextmenuClick="clickTagMenu" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, nextTick, onBeforeUpdate, onBeforeMount, onBeforeUnmount, getCurrentInstance, ref } from "vue"
import { RefreshRight, Close, CircleClose, FolderDelete } from "@element-plus/icons-vue"
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router"
import { ElMessage } from "element-plus"
import { useStore } from "@/store/index"
import { Session } from "@/utils/vstorage"
import { isEquals } from "@/utils/vutils"

import TagMenu from "@/layout/nav/tags/TagMenu.vue"

const { proxy } = getCurrentInstance() as any
const tagsRefs = ref([])
const scrollbarRef = ref()
const tagMenuRef = ref()
const store = useStore()
const route = useRoute()
const router = useRouter()
const state: any = reactive({
    routeActive: "",
    position: { x: "", y: "" },
    tagRefsIndex: 0,
    tagList: [],
    tagRoutesList: [],
})
/** 动态设置Ref */
const setTagRef = (index: number, el?: any) => {
    if (el) tagsRefs[index] = el
    // if (el) {
    //     tagsRefs.value.push(el)
    // }
    // (el) => {
    //     if (el) tagsRefs[k] = el
    // }

}

// 设置 tags 高亮
const isActive = (item) => {
    return item.name === state.routeActive
}
// 存储 tagList 到浏览器临时缓存中，页面刷新时，保留记录
const saveTagListToSession = (tagList: Array<object>) => {
    Session.set("tagList", tagList)
}
// 获取 vuex 中的 tagsRoutes 列表
const getTagRoutes = async () => {
    state.routeActive = route.name
    state.tagList = []
    state.tagRoutesList = store.state.routes.tagRoutesList
    initTags()
}
// vuex 中获取路由信息：如果是设置了固定的（isAffix），进行初始化显示
const initTags = async () => {
    if (Session.get("tagList") && store.state.infos.theme.isCacheTags) {
        state.tagList = await Session.get("tagList")
    } else {
        await state.tagRoutesList.map((item: any) => {
            // 先把固定的 Tag 加进去
            if (item.meta.isAffix && !item.meta.isHide) {
                item.url = setTagsHighlight(item)
                state.tagList.push({ ...item })
            }
        })
        //
        await addTag(route.path, route)
    }
    // 初始化当前元素(li)的下标
    getTagRefsIndex(state.routeActive)
}
// 处理可开启多标签详情，单标签详情（动态路由（xxx/:id/:name"），普通路由处理）
const solveAddTag = async (path: string, to?: any) => {
    let isDynamicPath = to.meta.isDynamic ? to.meta.isDynamicPath : path
    let current = state.tagList.filter(
        (item: any) =>
            item.path === isDynamicPath &&
            isEquals(
                to.meta.isDynamic ? (item.params ? item.params : null) : item.query ? item.query : null,
                to.meta.isDynamic ? (to?.params ? to?.params : null) : to?.query ? to?.query : null
            )
    )
    if (current.length <= 0) {
        // 防止：Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.
        let findItem = state.tagRoutesList.find((item: any) => item.path === isDynamicPath)
        if (findItem.meta.isAffix) return false
        if (findItem.meta.linkUrl && !findItem.meta.isIframe) return false
        to.meta.isDynamic ? (findItem.params = to.params) : (findItem.query = to.query)
        findItem.url = setTagsHighlight(findItem)
        state.tagList.push({ ...findItem })
        saveTagListToSession(state.tagList)
    }
}
/**
 * 添加 Tag 未设置隐藏（isHide）也添加到在 tagList 中
 */
const addTag = (path: string, to?: any) => {
    // 防止拿取不到路由信息
    nextTick(async () => {
        // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G

        // 普通路由：参数不同，开启多个 tags
        // await solveAddTag(path, to)
        if (state.tagList.some((item: any) => item.name === to.name)) return false
        let item = state.tagRoutesList.find((item: any) => item.name === to.name)
        if (item.meta.linkUrl && !item.meta.isIframe) return false
        item.url = setTagsHighlight(item)
        await state.tagList.push({ ...item })
        await saveTagListToSession(state.tagList)
    })
}
/**
 * 刷新当前 tag
 */
const refreshCurrentTag = (name: string = "") => {
    let tagName
    if (name) {
        tagName = name
    } else {
        tagName = route.name
    }
    proxy.vbus.emit("refreshCurrentTag", tagName)
}
/**
 * 关闭当前 tag，如果是设置了固定的（isAffix），不可以关闭
 */
const closeCurrentTag = (path: string) => {
    state.tagList.map((item: any, index: number, arr: any) => {
        if (!item.meta.isAffix) {
            if (item.url === path) {
                state.tagList.splice(index, 1)
                setTimeout(() => {
                    if (state.tagList.length === index && state.routeActive === item.name) {
                        // 最后一个且高亮时
                        if (arr[arr.length - 1].meta.isDynamic) {
                            // 动态路由（xxx/:id/:name"）
                            router.push({ name: arr[arr.length - 1].name, params: arr[arr.length - 1].params })
                        } else {
                            // 普通路由
                            router.push({ path: arr[arr.length - 1].path, query: arr[arr.length - 1].query })
                        }
                    } else {
                        // 非最后一个且高亮时，跳转到下一个
                        if (state.tagList.length !== index && state.routeActive === item.name) {
                            if (arr[index].meta.isDynamic) {
                                // 动态路由（xxx/:id/:name"）
                                router.push({ name: arr[index].name, params: arr[index].params })
                            } else {
                                // 普通路由
                                router.push({ path: arr[index].path, query: arr[index].query })
                            }
                        }
                    }
                }, 0)
            }
        }
    })
    saveTagListToSession(state.tagList)
}
/**
 * 关闭其它 tag，如果是设置了固定的（isAffix），不进行关闭
 */
const closeOtherTags = (path: string) => {
    state.tagList = []
    state.tagRoutesList.map((item: any) => {
        if (item.meta.isAffix && !item.meta.isHide) state.tagList.push({ ...item })
    })
    addTag(path, route)
}
/**
 * 关闭全部 tag，如果是设置了固定的（isAffix），不进行关闭
 */
const closeAlltags = () => {
    state.tagList = []
    state.tagRoutesList.map((item: any) => {
        if (item.meta.isAffix && !item.meta.isHide) {
            state.tagList.push({ ...item })
            router.push({ path: state.tagList[state.tagList.length - 1].path })
        }
    })
    saveTagListToSession(state.tagList)
}

// 当前项右键菜单点击，拿当前点击的路由路径对比 浏览器缓存中的 tags 路由数组，取当前点击项的详细路由信息
// 防止 tags 非当前页演示时，操作异常
const getCurrentRouteItem = (path: string, cParams: { [key: string]: any }) => {
    const itemRoute = Session.get("tagList") ? Session.get("tagList") : state.tagList
    return itemRoute.find((item: any) => {
        if (
            item.path === path &&
            isEquals(
                item.meta.isDynamic ? (item.params ? item.params : null) : item.query ? item.query : null,
                cParams && Object.keys(cParams ? cParams : {}).length > 0 ? cParams : null
            )
        ) {
            return item
        } else if (item.path === path && Object.keys(cParams ? cParams : {}).length <= 0) {
            return item
        }
    })
}
/**
 * 点击 Tag 弹出菜单项
 */
const clickTagMenu = async (item) => {
    const cParams = item.meta.isDynamic ? item.params : item.query
    if (!getCurrentRouteItem(item.path, cParams)) return ElMessage({ type: "warning", message: "请正确输入路径及完整参数（query、params）" })
    const { path, name, params, query, meta, url } = getCurrentRouteItem(item.path, cParams)
    switch (item.contextMenuClickId) {
        case 0:
            // 刷新当前
            if (meta.isDynamic) await router.push({ name, params })
            else await router.push({ path, query })
            refreshCurrentTag(item.name)
            break
        case 1:
            // 关闭当前
            closeCurrentTag(url)
            break
        case 2:
            // 关闭其它
            if (meta.isDynamic) await router.push({ name, params })
            else await router.push({ path, query })
            closeOtherTags(path)
            break
        case 3:
            // 关闭全部
            closeAlltags()
            break
    }
}
/**
 * 右键点击时，传 x,y 坐标值到子组件中（props）
 */
const showTagMenu = (item: any, event: any) => {
    const { clientX, clientY } = event
    const position = { x: clientX, y: clientY }
    tagMenuRef.value.openMenu(item, position)
}
/**
 * 当前的 Tag 项点击时，切换路由
 */
const clickTag = (item: any, index: number) => {
    state.tagRefsIndex = index
    router.push(item)
}
/**
 * 处理 Tag 高亮
 */
const setTagsHighlight = (item: any) => {
    let params = item.query && Object.keys(item.query).length > 0 ? item.query : item.params
    if (!params || Object.keys(params).length <= 0) return item.path
    let path = ""
    for (let i in params) {
        path += params[i]
    }
    // 判断是否是动态路由（xxx/:id/:name"）
    return `${item.meta.isDynamic ? item.meta.isDynamicPath : item.path}-${path}`
}
// 更新滚动条显示
const updateScrollbar = () => {
    proxy.$refs.scrollbarRef.update()
}
// 鼠标滚轮滚动
const onHandleScroll = (e: any) => {
    proxy.$refs.scrollbarRef.$refs.wrap.scrollLeft += e.wheelDelta / 4
}
// tags 横向滚动
const tagsMoveToCurrentTag = () => {
    nextTick(() => {
        if (tagsRefs.value.length <= 0) return false
        // 当前 li 元素
        let liDom = tagsRefs.value[state.tagRefsIndex]
        // 当前 li 元素下标
        let liIndex = state.tagRefsIndex
        // 当前 ul 下 li 元素总长度
        let liLength = tagsRefs.value.length
        // 最前 li
        let liFirst: any = tagsRefs.value[0]
        // 最后 li
        let liLast: any = tagsRefs.value[tagsRefs.value.length - 1]
        // 当前滚动条的值
        let scrollRefs = proxy.$refs.scrollbarRef.$refs.wrap
        // 当前滚动条滚动宽度
        let scrollS = scrollRefs.scrollWidth
        // 当前滚动条偏移宽度
        let offsetW = scrollRefs.offsetWidth
        // 当前滚动条偏移距离
        let scrollL = scrollRefs.scrollLeft
        // 上一个 tags li dom
        let liPrevTag: any = tagsRefs.value[state.tagRefsIndex - 1]
        // 下一个 tags li dom
        let liNextTag: any = tagsRefs.value[state.tagRefsIndex + 1]
        // 上一个 tags li dom 的偏移距离
        let beforePrevL: any = ""
        // 下一个 tags li dom 的偏移距离
        let afterNextL: any = ""
        if (liDom === liFirst) {
            // 头部
            scrollRefs.scrollLeft = 0
        } else if (liDom === liLast) {
            // 尾部
            scrollRefs.scrollLeft = scrollS - offsetW
        } else {
            // 非头/尾部
            if (liIndex === 0) beforePrevL = liFirst.offsetLeft - 5
            else beforePrevL = liPrevTag?.offsetLeft - 5
            if (liIndex === liLength) afterNextL = liLast.offsetLeft + liLast.offsetWidth + 5
            else afterNextL = liNextTag.offsetLeft + liNextTag.offsetWidth + 5
            if (afterNextL > scrollL + offsetW) {
                scrollRefs.scrollLeft = afterNextL - offsetW
            } else if (beforePrevL < scrollL) {
                scrollRefs.scrollLeft = beforePrevL
            }
        }
        // 更新滚动条，防止不出现
        updateScrollbar()
    })
}
// 获取 tags 的下标：用于处理 tags 点击时的横向滚动
const getTagRefsIndex = (name: string) => {
    nextTick(async () => {
        // await 使用该写法，防止拿取不到 tagList 列表数据不完整
        // let tagList = await state.tagList
        state.tagRefsIndex = state.tagList.findIndex((item: any) => {
            return item.name === name
        })
        // 添加初始化横向滚动条移动到对应位置
        tagsMoveToCurrentTag()
    })
}

// 页面加载前
onBeforeMount(() => { })
// 页面卸载时
onBeforeUnmount(() => { })
// 页面更新时
onBeforeUpdate(() => {
    tagsRefs.value = []
})
// 页面加载时
onMounted(() => {
    // 初始化 vuex 中的 tagsRoutes 列表
    getTagRoutes()
})
// 路由更新时
onBeforeRouteUpdate(async (to) => {
    state.routeActive = to.name
    await addTag(to.path, to)
    getTagRefsIndex(state.routeActive)
})
</script>

<style scoped lang="scss">
.tags {
    flex: 1;
    overflow: hidden;

    &-ul {
        list-style: none;
        height: 36px;
        display: flex;
        align-items: center;
        color: var(--el-text-color-regular);
        font-size: 12px;
        white-space: nowrap;

        &-li {
            display: flex;
            align-items: center;
            height: 32px;
            line-height: 32px;
            padding: 0 4px 0 8px;
            margin-top: 4px;
            border-radius: 8px 8px 0 0;
            position: relative;
            z-index: 0;
            cursor: pointer;
            justify-content: space-between;

            &:hover {
                background: var(--color-primary-light-9);
                color: var(--color-primary);
            }

            &-icon {
                border-radius: 100%;
                position: relative;
                height: 14px;
                width: 14px;
                text-align: center;
                line-height: 14px;

                &:hover {
                    color: var(--color-white);
                    background-color: var(--color-primary-light-3);
                }
            }

            .layout-icon-refresh {
                width: 24px;
                height: 24px;
                line-height: 24px;
            }

            .layout-icon-close {
                width: 24px;
                height: 24px;
                line-height: 24px;
            }
        }

        .is-active {
            background: var(--bg-white);
            color: var(--color-primary);
            // border-color: var(--color-primary);
        }
    }
}
</style>
