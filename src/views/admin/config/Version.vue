<template>
    <div class="version">
        <div class="top-control">
            <!-- 新增 -->
            <el-button type="primary" :icon="Plus" round @click="addContent">{{ $t("str.btn.add") }}</el-button>
            <div class="flex-auto"></div>
            <!-- 分页导航 -->
            <div v-if="state.dataList && state.dataList.length">
                <el-pagination background @current-change="handleCurrentChange" :current-page="state.page"
                    layout="total, prev, pager, next" :page-size="state.limit" :total="state.total">
                </el-pagination>
            </div>
        </div>
        <el-table class="mt16" :data="state.dataList" :border="true" stripe empty-text="暂无数据">
            <el-table-column label="平台" prop="platform" width="96">
                <template #default="scope">
                    <span>{{ wrapPlatform(scope.row.platform) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title" min-width="96"></el-table-column>
            <el-table-column label="更新描述" prop="desc" min-width="192" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="下载地址" prop="url" min-width="192"></el-table-column>
            <el-table-column label="按钮" width="96">
                <template #default="scope">
                    <el-tag size="small" type="danger">{{ scope.row.negativeBtn }}</el-tag>
                    <el-tag size="small" type="success">{{ scope.row.positiveBtn }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="版本" width="128">
                <template #default="scope">
                    <el-tag type="warning" size="small">版本号：{{ scope.row.versionCode }}</el-tag>
                    <el-tag type="success" size="small">版本名：{{ scope.row.versionName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="强制更新" prop="force" width="96">
                <template #default="scope">
                    <el-tag type="success" size="small" v-if="scope.row.force">{{ scope.row.force }}</el-tag>
                    <el-tag type="warning" size="small" v-else>{{ scope.row.force }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="更新时间" prop="updatedAt" width="160">
                <template #default="scope">
                    <span>{{ wrapDate(scope.row.updatedAt) }}</span>
                </template>
            </el-table-column>

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
        <el-dialog v-model="state.isShowEditDialog" :title="state.editTitle" :before-close="resetSave" width="30%">
            <el-form class="mr32" :model="state.model" :rules="state.rules" ref="formRef" label-width="96px"
                label-position="right" size="small">
                <el-form-item label="平台" prop="platform">
                    <el-select v-model="state.model.platform" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.platforms" :key="item.id" :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="state.model.title" :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="更新描述" prop="desc">
                    <el-input v-model="state.model.desc" rows="6" type="textarea"
                        :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="下载地址" prop="url">
                    <el-input v-model="state.model.url" :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="消极按钮" prop="negativeBtn">
                    <el-input v-model="state.model.negativeBtn" :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="积极按钮" prop="positiveBtn">
                    <el-input v-model="state.model.positiveBtn" :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="版本号" prop="versionCode">
                    <el-input v-model="state.model.versionCode" :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="版本名" prop="versionName">
                    <el-input v-model="state.model.versionName" :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="强制更新">
                    <el-switch v-model="state.model.force"></el-switch>
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
import { addVersion, updateVersion, delVersion, version } from "@/network/api/version"
import { formatDate } from "@/utils/vdate"
import { Data, wrapPlatform } from "@/utils/vdata"

import { ElMessage } from "element-plus"

const { proxy } = getCurrentInstance() as any
const { t } = useI18n()
const state = reactive({
    loading: false,
    dataList: [],
    total: 0,
    page: 1,
    limit: 20,

    isShowEditDialog: false,
    editTitle: "",
    model: {
        id: "",
        platform: 0,
        title: "",
        desc: "",
        url: "https://vmloft.com/nepenthe/",
        negativeBtn: "",
        positiveBtn: "",
        versionCode: 2,
        versionName: "0.0.2",
        force: false,
    },
    rules: {
        platform: { required: true, message: t("str.tips.selectNull"), trigger: "blur" },
        title: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 12, message: `${t("str.tips.inputLengthLimit")} 1-12`, trigger: "blur" },
        ],
        desc: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 0, max: 800, message: `${t("str.tips.inputLengthLimit")} 1-128`, trigger: "blur" },
        ],
        url: { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
        versionCode: { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
        versionName: { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
    },
    selectData: {
        platforms: Array(),
    },
})
// 页面加载时
onMounted(() => {
    initData()
})
/**
 * 初始化数据
 */
const initData = () => {
    state.selectData.platforms = Data.selectData.platforms
    loadVersion()
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
    loadVersion()
}
/**
 * 新增
 */
const addContent = () => {
    state.editTitle = "新增版本配置"
    state.isShowEditDialog = true
}
/**
 * 删除
 */
const delContent = async (value) => {
    try {
        const result = await delVersion(value._id)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadVersion()
}
/**
 * 编辑
 */
const editContent = (data) => {
    state.model = {
        id: data._id,
        platform: data.platform,
        title: data.title,
        desc: data.desc,
        url: data.url,
        negativeBtn: data.negativeBtn, // 版本号
        positiveBtn: data.positiveBtn, // 版本名称
        versionCode: data.versionCode,
        versionName: data.versionName,
        force: data.force,
    }
    state.editTitle = "编辑版本配置"
    state.isShowEditDialog = true
}

/**
 *  获取配置列表
 */
const loadVersion = async () => {
    state.loading = true

    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await version(params)
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
            result = await updateVersion(state.model.id, state.model)
        } else {
            result = await addVersion(state.model)
        }
    } catch (e) {
        state.loading = false
        return
    }
    state.loading = false
    ElMessage.success(result.msg)

    resetSave()

    // 重新拉取数据
    loadVersion()
}
/**
 * 重置内容编辑对话框
 */
const resetSave = () => {
    state.isShowEditDialog = false
    state.model = {
        id: "",
        platform: 0,
        title: "",
        desc: "",
        url: "https://vmloft.com/nepenthe/",
        negativeBtn: "",
        positiveBtn: "",
        versionCode: 1,
        versionName: "0.0.2",
        force: false,
    }
}
</script>

<!-- 添加“scoped”属性以将 CSS 仅限于此组件 -->
<style lang="scss" scoped>
.top-control {
    display: flex;
    align-items: center;
}
</style>
