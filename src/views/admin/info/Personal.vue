<template>
    <div class="personal">
        <!-- 个人信息 -->
        <el-card shadow="hover" :header="welcome">
            <el-row>
                <el-col class="infos" :xs="24" :sm="18">
                    <div class="infos-left">
                        <el-image class="infos-left-avatar" :src="wrapMediaUrl(state.user.avatar) + '!vt192'"
                            v-if="wrapMediaUrl(state.user.avatar) != ''"
                            :preview-src-list="[wrapMediaUrl(state.user.avatar)]" :hide-on-click-modal="true">
                        </el-image>
                        <img class="infos-left-avatar" src="@/assets/images/img-default-avatar.png" v-else />
                    </div>
                    <div class="infos-right">
                        <el-row>
                            <el-col :span="24" class="infos-right-item">
                                <div class="infos-right-item-label">{{ $t("str.info.nickname") }}:</div>
                                <div class="infos-right-item-value">{{ nickname }}</div>
                            </el-col>
                            <el-col :span="24" class="infos-right-item">
                                <div class="infos-right-item-label">{{ $t("str.info.identity") }}:</div>
                                <div class="infos-right-item-value">{{ identity }}</div>
                            </el-col>
                            <el-col :span="24" class="infos-right-item">
                                <div class="infos-right-item-label">{{ $t("str.info.signature") }}:</div>
                                <div class="infos-right-item-value">{{ signature }}</div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :xs="0" :sm="6">
                    <span>消息通知</span>
                </el-col>
            </el-row>
        </el-card>

        <!-- 更新信息 -->
        <el-card shadow="hover" class="update-info mt16" header="更新信息">
            <el-form :model="state.model" :rules="state.rules" ref="formRef" label-width="56px" class="mt16 mb24">
                <el-row :gutter="32">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb24">
                        <el-form-item :label="$t('str.info.phone')">
                            <el-input v-model="state.model.phone" disabled :placeholder="$t('str.tips.inputHint')"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb24">
                        <el-form-item :label="$t('str.info.email')">
                            <el-input v-model="state.model.email" disabled :placeholder="$t('str.tips.inputHint')"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb24">
                        <el-form-item :label="$t('str.info.nickname')" prop="nickname">
                            <el-input v-model="state.model.nickname" :placeholder="$t('str.tips.inputHint')" clearable>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb24">
                        <el-form-item :label="$t('str.info.signature')" prop="signature">
                            <el-input v-model="state.model.signature" :placeholder="$t('str.tips.inputHint')" clearable>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb24">
                        <el-form-item :label="$t('str.info.gender')" prop="gender">
                            <el-select v-model="state.model.gender" :placeholder="$t('str.tips.selectHint')" clearable
                                class="w100">
                                <el-option v-for="item in state.selectData.genders" :key="item.id" :label="item.value"
                                    :value="item.id"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mt16">
                        <el-form-item>
                            <el-button class="btn-submit" :round="true" type="primary" @click="updateValidate"
                                :loading="state.infoLoading">
                                {{ $t("str.btn.save") }}
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <!-- 修改密码 -->
        <el-card shadow="hover" class="update-password mt16" header="修改密码">
            <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb24">
                    <el-form :model="state.model" :rules="state.rules" ref="formRef" label-width="56px"
                        class="mt16 mb24">
                        <el-form-item :label="$t('str.info.email')">
                            <el-input v-model="state.model.email" disabled :placeholder="$t('str.tips.inputHint')"
                                clearable></el-input>
                        </el-form-item>
                        <el-form-item class="update-password-code" :label="$t('str.info.code')" prop="code">
                            <el-input v-model="state.model.code" :placeholder="$t('str.tips.inputHint')" clearable>
                            </el-input>
                            <el-button class="update-password-code-btn" :round="true" type="primary"
                                @click="onRequestCode" :loading="state.codeLoading" :disabled="state.codeWait">
                                {{ state.codeWait ? `${state.waitTime} ${$t("str.tips.codeWait")}` :
                                $t("str.btn.codeBtn")
                                }}
                            </el-button>
                        </el-form-item>
                        <el-form-item :label="$t('str.info.password')">
                            <el-input v-model="state.model.password" :placeholder="$t('str.tips.inputHint')" clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btn-submit" :round="true" type="primary" @click="onUpdatePassword"
                                :loading="state.passwordLoading">
                                {{ $t("str.btn.save") }}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed, getCurrentInstance } from "vue"
import { ElMessage } from "element-plus"
import { useI18n } from "vue-i18n"
import { useStore } from "@/store/index"
import { Data, wrapGender } from "@/utils/vdata"
import { formatAxis } from "@/utils/vdate"
import { Session } from "@/utils/vstorage"
import { wrapMediaUrl } from "@/utils/vstr"

import { sendCodeEmail, updateInfo, updatePassword } from "@/network/api/sign"

const { proxy } = getCurrentInstance() as any
const { t } = useI18n()
const store = useStore()
const state = reactive({
    user: Object(),
    infoLoading: false,
    codeLoading: false,
    passwordLoading: false,
    codeWait: false,
    waitTime: 60,
    model: {
        nickname: "",
        signature: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        gender: 2,
    },
    rules: {
        nickname: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 12, message: t("str.info.nicknameRule"), trigger: "blur" },
        ],
        signature: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 2, max: 32, message: t("str.info.signatureRule"), trigger: "blur" },
        ],
        gender: { required: true, message: t("str.tips.selectNull"), trigger: "blur" },
        password: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 6, max: 32, message: t("str.info.passwordRule"), trigger: "blur" },
        ],
    },
    selectData: {
        genders: Array(),
    },
})

// 页面加载时
onMounted(() => {
    initData()
})

// 欢迎语
const welcome = computed(() => {
    let time = formatAxis(new Date())
    let welcome = t("str.info.welcome")
    return `${time}, ${welcome}`
})
// 昵称
const nickname = computed(() => {
    let user = Object.create(state.user)
    if (user) {
        if (user.nickname) {
            return user.nickname
        } else if (user.username) {
            return user.username
        } else if (user.email) {
            return user.email
        } else if (user.phone) {
            return user.phone
        }
    }
})
// 签名
const signature = computed(() => {
    let user = Object.create(state.user)
    if (user && user.signature) {
        return user.signature
    } else {
        return t("str.info.signatureHint")
    }
})
// 签名
const gender = computed(() => {
    return wrapGender(state.model.gender)
})
// 身份信息
const identity = computed(() => {
    let user = Object.create(state.user)
    if (user && user.role && user.role.identity) {
        return user.role.title
    } else {
        return t("str.info.roleUserOther")
    }
})
/**
 * 初始化数据
 */
const initData = () => {
    state.selectData.genders = Data.selectData.genders

    state.user = store.state.infos.user
    let user = Object.create(state.user)
    if (user) {
        state.model.nickname = user.nickname
        state.model.signature = user.signature
        state.model.email = user.email
        state.model.phone = user.phone
        state.model.gender = user.gender
    }
}

/**
 * 保存校验
 */
const updateValidate = () => {
    proxy.$refs.formRef.validate((valid) => {
        if (valid) onUpdateInfo()
    })
}

/**
 * 更新信息
 */
const onUpdateInfo = async () => {
    state.infoLoading = true

    // 组装参数
    const params = { nickname: state.model.nickname, signature: state.model.signature, gender: state.model.gender }
    try {
        const result = await updateInfo(params)

        // 存储用户信息到浏览器缓存
        Session.set("user", result.data)
        // 存储用户信息到 vuex
        store.dispatch("infos/setUser", result.data)

        // 提醒更新成功
        ElMessage.success(t("str.tips.updateSuccess"))

        initData()
    } catch (e) {
    }
    state.infoLoading = false
}

/**
 * 请求验证码
 */
const onRequestCode = async () => {
    state.codeLoading = true

    // 组装参数
    const params = { email: state.model.email }
    try {
        const result = await sendCodeEmail(params)
        state.codeWait = true
        handleTimer()
        // 提醒更新成功
        ElMessage.success(t("str.tips.requestSuccess"))
    } catch (e) { }
    state.codeLoading = false
}
/**
 * 更新密码
 */
const onUpdatePassword = async () => {
    state.passwordLoading = true
    // 组装参数
    const params = { email: state.model.email, code: state.model.code, password: state.model.password }
    try {
        const result = await updatePassword(params)
        state.model.code = ""
        state.model.password = ""
        // 提醒更新成功
        ElMessage.success(t("str.tips.updateSuccess"))
    } catch (e) {
    }
    state.passwordLoading = false
}

/**
 * 处理定时器
 */
const handleTimer = () => {
    setTimeout(() => {
        state.waitTime--;
        if (state.waitTime <= 0) {
            state.codeWait = false;
            state.waitTime = 60;
        } else {
            handleTimer();
        }
    }, 1000);
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/theme/mixins/mixins.scss";

.personal {
    height: 100%;

    .infos {
        display: flex;
        align-items: center;

        &-left {
            &-avatar {
                width: 96px;
                height: 96px;
                border-radius: 50%;
            }
        }

        &-right {
            flex: 1;
            margin-left: 16px;

            &-item {
                display: flex;
                align-items: center;
                margin-top: 4px;
                font-size: 14px;

                &-label {
                    color: var(--tips);
                    @include text-ellipsis(1);
                }

                &-value {
                    margin-left: 8px;
                    color: var(--title);
                    @include text-ellipsis(1);
                }
            }
        }
    }

    .update-password {
        .update-password-code {
            position: relative;

            .update-password-code-btn {
                position: absolute;
                right: 0;
            }
        }
    }
}
</style>
