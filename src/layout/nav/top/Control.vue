<template>
    <div class="control">
        <!-- 语言设置 -->
        <el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onLanguageChange">
            <div class="control-icon">
                <i class="iconfont icon-language"></i>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="zh-cn" :disabled="state.language === 'zh-cn'">简体中文</el-dropdown-item>
                    <el-dropdown-item command="en" :disabled="state.language === 'en'">English</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 主题设置 -->
        <div class="control-icon" @click="openTheme()">
            <i class="iconfont icon-skin"></i>
        </div>
        <!-- 搜索 -->
        <div class="control-icon" @click="onSearch">
            <i class="iconfont icon-search"></i>
        </div>
        <!-- 通知 -->
        <div class="control-icon">
            <el-popover placement="bottom" trigger="click" v-model:visible="state.isShowNotice" :width="300"
                popper-class="el-popover-pupop-user-news">
                <template #reference>
                    <el-badge :is-dot="true" @click="state.isShowNotice = !state.isShowNotice">
                        <i class="iconfont icon-bell"></i>
                    </el-badge>
                </template>
                <transition name="el-zoom-in-top">
                    <MsgNotice v-show="state.isShowNotice" />
                </transition>
            </el-popover>
        </div>
        <!-- 头像 -->
        <el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
            <span class="control-info">
                <el-image class="control-info-avatar ml16 mr16" :src="wrapUrl(state.user.avatar) + '!vt64'"
                    v-if="state.user.avatar"></el-image>
                <img src="@/assets/images/img-default-avatar.png" class="control-info-avatar ml16 mr16" v-else />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="/personal">{{ $t("str.router.personal") }}</el-dropdown-item>
                    <el-dropdown-item command="signOutCommon">{{ $t("str.sign.signOut") }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <!-- 退出登录确认对话框 -->
        <el-dialog v-model="state.isShowSignOutDialog" :title="$t('str.btn.cancel')" :before-close="closeSignOutDialog"
            width="30%">
            <span>{{ $t("str.sign.signOutTips") }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeSignOutDialog" round>{{ $t("str.btn.cancel") }}</el-button>
                    <el-button type="primary" round @click="onSignOut" :loading="state.loading">{{ $t("str.btn.ok") }}
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <Search ref="searchRef" />
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { resetRoute } from "@/router/index"
import { useStore } from "@/store/index"
import { useTitle } from "@/utils/vweb"
import { Session, Local } from "@/utils/vstorage"
import { wrapUrl } from "@/utils/vstr"
import { signOut } from "@/api/sign"

import { ElMessageBox, ElMessage } from "element-plus"
import MsgNotice from "./MsgNotice.vue"
import Search from "./Search.vue"

const { t } = useI18n()
const { proxy } = getCurrentInstance() as any
const router = useRouter()
const store = useStore()
const title = useTitle()
const searchRef = ref()
const state = reactive({
    user: Object(),
    language: "zh-cn",
    isShowNotice: false,
    isShowSignOutDialog: false,
    loading: false,
})

// 页面加载时
onMounted(() => {
    state.user = store.state.infos.user
    if (Local.get("theme")) {
        initI18n()
    }
})

// 下拉菜单点击时
const onHandleCommandClick = (path: string) => {
    if (path === "signOutCommon") {
        state.isShowSignOutDialog = true
    } else {
        router.push(path)
    }
}
const closeSignOutDialog = () => {
    state.isShowSignOutDialog = false
}
/**
 * 退出登录
 */
const onSignOut = async () => {
    state.loading = true
    try {
        const result = await signOut()

        Session.clear() // 清除缓存 token 等
        resetRoute() // 删除/重置路由
        router.push("/")
        setTimeout(() => {
            ElMessage.success(t("str.sign.signOutSuccess"))
        }, 200)

        state.loading = false

        closeSignOutDialog()
    } catch (e) {
        state.loading = false
    }
}

/**
 * 菜单搜索点击
 */
const onSearch = () => {
    searchRef.value.openSearch()
}
/**
 * 语言切换
 */
const onLanguageChange = (lang: string) => {
    Local.remove("theme")
    store.state.infos.theme.language = lang
    Local.set("theme", store.state.infos.theme)
    proxy.$i18n.locale = lang

    proxy.vbus.emit("onLanguageChange")

    initI18n()
    title()
}
/**
 * 打开主题设置
 */
const openTheme = () => {
    proxy.vbus.emit("openTheme", true)
}

/**
 * 初始化言语国际化
 */
const initI18n = () => {
    switch (Local.get("theme").language) {
        case "zh-cn":
            state.language = "zh-cn"
            break
        case "en":
            state.language = "en"
            break
        default:
            state.language = "zh-cn"
            break
    }
}
</script>

<style scoped lang="scss">
.control {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: flex-end;

    &-icon {
        padding: 0 10px;
        cursor: pointer;
        color: var(--bg-topBarColor);
        height: 36px;
        line-height: 36px;
        display: flex;
        align-items: center;

        &:hover {
            background: rgba(0, 0, 0, 0.04);

            i {
                display: inline-block;
                animation: logoAnimation 0.3s ease-in-out;
            }
        }
    }

    &-info {
        height: 100%;
        display: flex;
        align-items: center;
        white-space: nowrap;

        &-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }
    }

    :deep(.el-badge__content.is-fixed) {
        top: 12px;
    }
}
</style>
