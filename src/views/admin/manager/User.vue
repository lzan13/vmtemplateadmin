<template>
    <div class="user">
        <div class="top-control">
            <!-- 新增 -->
            <el-button type="primary" :icon="Plus" round @click="addContent">{{ $t("str.btn.add") }}</el-button>
            <el-button type="danger" :icon="Delete" round @click="delMultiContent">{{ $t("str.btn.deleteMulti") }}
            </el-button>
            <div class="flex-auto"></div>
            <!-- 分页导航 -->
            <div v-if="state.dataList && state.dataList.length">
                <el-pagination background hide-on-single-page @current-change="handleCurrentChange"
                    :current-page="state.page" layout="total, prev, pager, next" :page-size="state.limit"
                    :total="state.total">
                </el-pagination>
            </div>
        </div>
        <!-- 数据表 -->
        <el-table class="mt16" :data="state.dataList" :border="true" stripe size="small" type="index" lazy
            empty-text="暂无数据" @selection-change="handleSelectionChange">
            <el-table-column label="" prop="" type="selection" width="44" />
            <el-table-column label="头像/封面" width="96">
                <template #default="scope">
                    <div class="item-media">
                        <!-- 封面 -->
                        <el-image class="item-img-cover" :key="scope.row.cover" fit="cover"
                            :src="wrapMediaUrl(scope.row.cover) + '!vt96'"
                            :preview-src-list="[wrapMediaUrl(scope.row.cover)]" :hide-on-click-modal="true" lazy
                            v-if="wrapMediaUrl(scope.row.cover)">
                        </el-image>
                        <!-- 头像 -->
                        <el-image class="item-img-avatar" :src="wrapMediaUrl(scope.row.avatar) + '!vt64'"
                            v-if="wrapMediaUrl(scope.row.avatar) != ''"
                            :preview-src-list="[wrapMediaUrl(scope.row.avatar)]" :hide-on-click-modal="true"></el-image>
                        <el-avatar class="item-img-avatar" src=" @/assets/images/img-default-avatar.png" :size="48"
                            v-else></el-avatar>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="角色/性别/职业" prop="cover" min-width="144">
                <template #default="scope">
                    <el-tag size="small" type="success">角色: {{ scope.row.role.title }}</el-tag>
                    <el-tag size="small" type="warning" v-if="scope.row.profession">职业: {{ scope.row.profession.title }}
                    </el-tag>
                    <el-tag size="small" :type="scope.row.gender == 0 ? 'danger' : scope.row.gender == 1 ? '' : 'info'">
                        性别: {{ wrapGender(scope.row.gender) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="用户名/昵称/签名" min-width="256">
                <template #default="scope">
                    <el-tag size="small" type="success">用户名: {{ scope.row.username }}</el-tag>
                    <el-tag size="small" type="warning" v-if="scope.row.nickname">昵称: {{ scope.row.nickname }}</el-tag>
                    <el-tag size="small" type="warning" v-else>昵称: {{ $t('str.info.defaultNickname') }}</el-tag>
                    <el-tag size="small" type="danger">生日: {{ scope.row.birthday }}</el-tag>
                    <el-tag size="small" type="danger">签名: {{ scope.row.signature }}</el-tag>
                    <el-tag size="small" type="info">地区: {{ scope.row.area }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="ID/Phone/Email" min-width="256">
                <template #default="scope">
                    <el-tag size="small" type="success">ID: {{ scope.row._id }}</el-tag>
                    <el-tag size="small" type="warning">手机: {{ scope.row.phone }}</el-tag>
                    <el-tag size="small" type="danger">邮箱: {{ scope.row.email }}</el-tag>
                    <el-tag size="small" type="info">设备Id: {{ scope.row.devicesId }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="余额/粉丝/关注/帖子" min-width="192">
                <template #default="scope">
                    <el-tag size="small" type="warning">粉丝: {{ scope.row.fansCount }}</el-tag>
                    <el-tag size="small" type="danger">关注: {{ scope.row.followCount }}</el-tag>
                    <el-tag size="small" type="info">帖子: {{ scope.row.postCount }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="匹配" min-width="96">
                <template #default="scope">
                    <el-tag size="small" type="warning">缘分: {{ scope.row.matchCount }} </el-tag>
                    <el-tag size="small" type="warning">速聊: {{ scope.row.fastCount }} </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="财富/魅力值" min-width="144">
                <template #default="scope">
                    <el-tag size="small" type="warning">财富: {{ scope.row.score }}</el-tag>
                    <el-tag size="small" type="danger">魅力-总: {{ scope.row.charm }}</el-tag>
                    <el-tag size="small" type="danger">魅力-月: {{ scope.row.charmMonth }} </el-tag>
                    <el-tag size="small" type="danger">魅力-周: {{ scope.row.charmWeek }} </el-tag>

                </template>
            </el-table-column>

            <el-table-column label="签到" prop="clockTime" width="192">
                <template #default="scope">
                    <el-tag size="small" type="success" v-if="scope.row.clockTime">时间: {{ wrapDate(scope.row.clockTime)
                    }} </el-tag>
                    <el-tag size="small" type="warning">次数: {{ scope.row.clockTotalCount }}</el-tag>
                    <el-tag size="small" type="danger">连续: {{ scope.row.clockContinuousCount }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="认证" min-width="192">
                <template #default="scope">
                    <el-tag size="small" type="success" v-if="scope.row.idCardNumber">身份证号:
                        {{ wrapDate(scope.row.idCardNumber) }}</el-tag>
                    <el-tag size="small" type="success" v-if="scope.row.realName">真实姓名: {{ scope.row.realName }}
                    </el-tag>
                    <el-tag size="small" type="warning" v-else>未认证</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="禁言" prop="banned" width="144">
                <template #default="scope">
                    <el-tag size="small" type="danger" v-if="scope.row.banned == 1">禁言</el-tag>
                    <el-tag size="small" type="success" v-else>未禁言</el-tag>
                    <span v-if="scope.row.bannedDate">{{ wrapDate(scope.row.bannedDate) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="更新时间" prop="updatedAt" width="144">
                <template #default="scope">
                    <span>{{ wrapDate(scope.row.updatedAt) }}</span>
                </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column :label="$t('str.btn.dispose')" fixed="right" :width="106">
                <template #default="scope">
                    <!-- 编辑按钮 -->
                    <el-button type="success" circle :icon="Edit" @click="editContent(scope.row)"></el-button>
                    <!-- 删除二次确认提醒 -->
                    <el-popconfirm :title="$t('str.tips.delMsg')" :confirm-button-text="$t('str.btn.ok')"
                        :cancel-button-text="$t('str.btn.cancel')" @confirm="delContent(scope.row)">
                        <template #reference>
                            <el-button type="danger" circle :icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增与编辑对话框 -->
        <el-dialog v-model="state.isShowEditDialog" :title="state.editTitle" :before-close="resetSave" width="36%">
            <el-form class="mr32" :model="state.model" :rules="state.rules" ref="formRef" label-width="72px"
                label-position="right" :width="320" size="small">
                <el-form-item :label="$t('str.info.phone')">
                    <el-input v-model="state.model.phone" :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <el-form-item :label="$t('str.info.email')">
                    <el-input v-model="state.model.email" :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <!-- 用户名/昵称/签名 -->
                <el-form-item :label="$t('str.info.username')" prop="username">
                    <el-input v-model="state.model.username" :placeholder="$t('str.tips.inputHint')" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('str.info.nickname')" prop="nickname">
                    <el-input v-model="state.model.nickname" :placeholder="$t('str.tips.inputHint')" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('str.info.signature')" prop="signature">
                    <el-input v-model="state.model.signature" :placeholder="$t('str.tips.inputHint')" clearable>
                    </el-input>
                </el-form-item>
                <!-- 角色/性别/职业 -->
                <el-form-item label="角色" prop="role">
                    <el-select v-model="state.model.role" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.roles" :key="item.id" :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职业" prop="profession">
                    <el-select v-model="state.model.profession" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.professions" :key="item.id" :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('str.info.gender')" prop="gender">
                    <el-select v-model="state.model.gender" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.genders" :key="item.id" :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 生日 -->
                <!-- <el-form-item label="生日" prop="birthday">
                    <el-date-picker v-model="state.model.birthday" type="date" format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD" :placeholder="$t('str.tips.selectHint')">
                    </el-date-picker>
                </el-form-item> -->
                <!-- 积分 -->
                <el-form-item label="积分" prop="score">
                    <el-input-number v-model="state.model.score" :min="100" :max="999999999" :step="100"
                        controls-position="right" />
                </el-form-item>
                <!-- 魅力-总 -->
                <el-form-item label="魅力-总" prop="charm">
                    <el-input-number v-model="state.model.charm" :min="0" :max="999999999" :step="99"
                        controls-position="right" />
                </el-form-item>
                <!-- 魅力-月 -->
                <el-form-item label="魅力-月" prop="charmMonth">
                    <el-input-number v-model="state.model.charmMonth" :min="0" :max="999999999" :step="99"
                        controls-position="right" />
                </el-form-item>
                <!-- 魅力-周 -->
                <el-form-item label="魅力-周" prop="charmWeek">
                    <el-input-number v-model="state.model.charmWeek" :min="0" :max="999999999" :step="99"
                        controls-position="right" />
                </el-form-item>
                <!-- 禁言状态 -->
                <el-form-item label="禁言状态">
                    <el-switch v-model="state.model.bannedStatus"></el-switch>
                </el-form-item>
                <el-form-item label="禁言时长">
                    <el-input-number v-model="state.model.bannedTime" :min="300" :max="99999999" :step="100"
                        controls-position="right" />
                </el-form-item>
                <el-form-item label="禁言理由">
                    <el-input v-model="state.model.bannedReason" :min="300" :max="99999999" :step="100"
                        controls-position="right" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button size="small" round @click="resetSave">{{ $t("str.btn.cancel") }}</el-button>
                    <el-button type="primary" size="small" round @click="doSave" :loading="state.loading">
                        {{ $t("str.btn.ok") }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, getCurrentInstance } from "vue"
import { Plus, Edit, Delete } from "@element-plus/icons-vue"
import { useI18n } from "vue-i18n"
import { addUser, delUser, delUserList, updateUser, user } from "@/network/api/user"
import { formatDate } from "@/utils/vdate"
import { useStore } from "@/store/index"
import { Data, wrapGender } from "@/utils/vdata"
import { wrapMediaUrl } from "@/utils/vstr"

import { ElMessage } from "element-plus"

const { proxy } = getCurrentInstance() as any
const { t } = useI18n()
const store = useStore()
const state = reactive({
    loading: false,
    dataList: [],
    total: 0,
    page: 1,
    limit: 15,

    selectList: [], // 多选集合

    isShowEditDialog: false,
    editTitle: "",
    model: {
        avatar: "",
        cover: "",
        id: "",
        email: "",
        phone: "",
        username: "",
        nickname: "",
        signature: "",
        gender: 2,
        birthday: "",
        profession: "",
        role: "",
        score: 0,
        charm: 0,
        charmMonth: 0,
        charmWeek: 0,
        banned: 0,
        bannedStatus: false,
        bannedTime: 300,
        bannedReason: "",
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
        profession: { required: true, message: t("str.tips.selectNull"), trigger: "blur" },
        role: { required: true, message: t("str.tips.selectNull"), trigger: "blur" },
        gender: { required: true, message: t("str.tips.selectNull"), trigger: "blur" },
    },
    selectData: {
        genders: Array(),
        professions: Array(),
        roles: Array(),
    },
})
// 页面加载时
onMounted(() => {
    initData()
})
/**
 * 计算 table 高度
 */
const setupTableHeight = () => { }
/**
 * 初始化数据
 */
const initData = () => {
    state.selectData.genders = Data.selectData.genders
    state.selectData.professions = store.state.infos.professions
    state.selectData.roles = store.state.infos.roles
    loadUser()
}

/**
 * 包装日期
 */
const wrapDate = (value) => {
    return formatDate(new Date(value), "YYYY/mm/dd HH:MM:SS")
}
/**
 * 页面变动
 */
const handleCurrentChange = (value) => {
    state.page = value
    loadUser()
}
/**
 * 新增
 */
const addContent = () => {
    state.editTitle = "新增账户"
    state.isShowEditDialog = true
}
/**
 * 删除
 */
const delContent = async (value) => {
    try {
        const result = await delUser(value._id)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadUser()
}
/**
 * 批量删除
 */
const delMultiContent = async () => {
    let ids = ""
    state.selectList.forEach((post: any, index: Number) => {
        if (index == 0) {
            ids = post._id
        } else {
            ids = `${ids},${post._id}`
        }
    })
    try {
        const result = await delUserList({ ids })
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadUser()
}
/**
 * 编辑
 */
const editContent = (data) => {
    state.model = {
        avatar: data.avatar,
        cover: data.cover,
        id: data._id,
        email: data.email,
        phone: data.phone,
        username: data.username,
        nickname: data.nickname,
        signature: data.signature,
        gender: data.gender,
        birthday: data.birthday,
        profession: data.profession && data.profession._id ? data.profession._id : "",
        role: data.role && data.role._id ? data.role._id : "",
        score: data.score,
        charm: data.charm,
        charmMonth: data.charmMonth,
        charmWeek: data.charmWeek,
        banned: data.banned,
        bannedStatus: data.banned == 1,
        bannedTime: 300,
        bannedReason: data.bannedReason,
    }
    state.editTitle = "编辑账户"
    state.isShowEditDialog = true
}

/**
 *  获取配置列表
 */
const loadUser = async () => {
    state.loading = true
    // debugger
    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await user(params)
        state.dataList = result.data.data
        state.total = result.data.totalCount
    } catch (e) { }
    state.loading = false
}

/**
 * 保存内容
 */
const doSave = () => {
    proxy.$refs.formRef.validate((valid) => {
        if (valid) submitSave()
    })
}
/**
 * 提交保存
 */
const submitSave = async () => {
    state.loading = true
    let result
    try {
        if (state.model.id) {
            state.model.banned = state.model.bannedStatus ? 1 : 0
            result = await updateUser(state.model.id, state.model)
        } else {
            result = await addUser(state.model)
        }
    } catch (e) {
        state.loading = false
        return
    }
    state.loading = false
    ElMessage.success(result.msg)

    resetSave()

    // 重新拉取数据
    loadUser()
}
/**
 * 选择集合改变
 */
const handleSelectionChange = (value) => {
    state.selectList = value
}
/**
 * 重置内容编辑对话框
 */
const resetSave = () => {
    state.isShowEditDialog = false
    state.model = {
        avatar: "",
        cover: "",
        id: "",
        email: "",
        phone: "",
        username: "",
        nickname: "",
        signature: "",
        gender: 2,
        birthday: "",
        profession: "",
        role: "",
        score: 0,
        charm: 0,
        charmMonth: 0,
        charmWeek: 0,
        banned: 0,
        bannedStatus: false,
        bannedTime: 300,
        bannedReason: "",
    }
}
</script>

<!-- 添加“scoped”属性以将 CSS 仅限于此组件 -->
<style lang="scss" scoped>
.top-control {
    display: flex;
    align-items: center;
}

.item-media {
    position: relative;
}

.item-img-cover {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.item-img-avatar {
    margin-left: 10px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
}

// 解决 el-image 和 el-table 结合使用时 图片预览被el-table遮挡问题
.el-table {

    & :deep(th.el-table__cell),
    :deep(td.el-table__cell) {
        // 设置position 使得 子元素不与其产生新的层叠关系
        position: static;
    }
}
</style>
