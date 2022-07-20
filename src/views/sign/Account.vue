<template>
    <el-form class="account-form" ref="signRef" :model="state.model" :rules="state.rules">
        <el-form-item prop="account">
            <el-input type="text" :placeholder="$t('str.sign.accountHint')" v-model="state.model.account" clearable
                autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item prop="password" @keyup.enter="signInValidate">
            <el-input :type="state.isShowPassword ? 'text' : 'password'" :placeholder="$t('str.sign.passwordHint')"
                v-model="state.model.password" autocomplete="off">
                <template #suffix>
                    <i class="iconfont" :class="state.isShowPassword ? 'icon-lock' : 'icon-unlock'"
                        @click="changeShowPassword"></i>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="sign-content-submit" :round="true" type="primary" @click="signInValidate"
                :loading="state.loading">
                {{ $t("str.sign.signIn") }}
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { useI18n } from "vue-i18n"
import { loadRoutes } from "@/router/index"
import { useStore } from "@/store/index"
import { Session } from "@/utils/vstorage"
import { formatAxis } from "@/utils/vdate"
import { signIn } from "@/api/sign"

const signRef = ref()
const { t } = useI18n()
const { proxy } = getCurrentInstance() as any
const store = useStore()
const route = useRoute()
const router = useRouter()

const state = reactive({
    isShowPassword: false,
    model: {
        account: "",
        password: "",
    },
    rules: {
        account: [
            {
                required: true,
                message: t("str.sign.accountHint"),
                trigger: "blur",
            },
            {
                min: 4,
                max: 16,
                message: t("str.sign.accountRule"),
                trigger: "blur",
            },
        ],
        password: [
            {
                required: true,
                message: t("str.sign.passwordRule"),
                trigger: "blur",
            },
            {
                min: 6,
                max: 20,
                message: t("str.sign.passwordRule"),
                trigger: "blur",
            },
        ],
    },
    loading: false,
})
const changeShowPassword = () => {
    state.isShowPassword = !state.isShowPassword
}
const signInValidate = () => {
    signRef.value.validate((valid) => {
        if (valid) onSignIn()
    })
}

/**
 * 登录
 */
const onSignIn = async () => {
    state.loading = true

    // 组装参数
    const params = { account: state.model.account, password: state.model.password }

    try {
        const result = await signIn(params)

        // 存储 token 到浏览器缓存
        Session.set("token", result.data.token)
        // 存储用户信息到浏览器缓存
        Session.set("user", result.data)
        // 存储用户信息到 vuex
        store.dispatch("infos/setUser", result.data)

        // 加载动态路由数据
        await loadRoutes()

        state.loading = false
        // 加载路由之后再执行登录成功的处理
        signInSuccess()
    } catch (err: any) {
        state.loading = false
    }
}

/**
 * 登录成功，进行后续操作
 */
const signInSuccess = () => {
    // 初始化登录成功显示问候语
    ElMessage.success(`${formatAxis(new Date())}，${t("str.sign.signInSuccess")}`)
    // 登录成功提示
    setTimeout(() => {
        // 关闭 loading
        state.loading = false
        // 登录成功，跳到转首页
        router.push("/")
    }, 300)
}
</script>

<style scoped lang="scss">
.account-form {
    width: 100%;

    .el-input--prefix {
        .el-input__prefix {
            left: 8px !important;
        }

        .el-input__suffix {
            position: absolute;
            height: 100%;
            right: 8px !important;
        }
    }
}
</style>
