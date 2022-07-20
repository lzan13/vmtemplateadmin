<template>
    <div class="config">
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
            <el-table-column label="别名" prop="alias" width="144"></el-table-column>
            <el-table-column label="标题" prop="title" min-width="144"></el-table-column>
            <el-table-column label="描述" prop="desc" min-width="192" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="内容" prop="content" min-width="192" :show-overflow-tooltip="true"></el-table-column>
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
                <el-form-item label="别名" prop="alias">
                    <el-input v-model="state.model.alias" :disabled="state.model.id == ''"
                        :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="state.model.title" :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="state.model.desc" rows="3" type="textarea"
                        :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input v-model="state.model.content" rows="5" type="textarea"
                        :placeholder="$t('str.tips.inputHint')"></el-input>
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
import { onMounted, reactive, computed, getCurrentInstance } from "vue"
import { Plus, Edit, Delete } from "@element-plus/icons-vue"
import { useI18n } from "vue-i18n"
import { addConfig, updateConfig, delConfig, config } from "@/api/config"
import { formatDate } from "@/utils/vdate"

import { ElMessage } from "element-plus"

const { proxy } = getCurrentInstance() as any
const { t } = useI18n()
const state = reactive({
    loading: false,
    dataList: [],
    total: 0,
    page: 1,
    limit: 100,

    showDelPopoverItem: "", // 当前显示的 popover 记录
    isShowEditDialog: false,
    editTitle: "",
    model: {
        id: "",
        alias: "",
        title: "",
        desc: "",
        content: "",
    },
    rules: {
        alias: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 4, max: 32, message: `${t("str.tips.inputLengthLimit")} 4-32`, trigger: "blur" },
        ],
        title: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 12, message: `${t("str.tips.inputLengthLimit")} 1-12`, trigger: "blur" },
        ],
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
    loadConfig()
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
    loadConfig()
}
/**
 * 新增
 */
const addContent = () => {
    state.editTitle = "新增配置"
    state.isShowEditDialog = true
}
/**
 *
 */
const showDelPopover = (value) => {
    state.showDelPopoverItem = value._id
}
/**
 * 取消删除操作
 */
const hideDelPopover = (value) => {
    state.showDelPopoverItem = ""
}
// 判断是否展示
const isShowPopover = (value) => {
    return state.showDelPopoverItem == value._id
}
/**
 * 删除
 */
const delContent = async (value) => {
    hideDelPopover(value)
    try {
        const result = await delConfig(value._id)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadConfig()
}
/**
 * 编辑
 */
const editContent = (data) => {
    state.model = {
        id: data._id,
        alias: data.alias,
        title: data.title,
        desc: data.desc,
        content: data.content,
    }
    state.editTitle = "编辑配置"
    state.isShowEditDialog = true
}

/**
 *  获取配置列表
 */
const loadConfig = async () => {
    state.loading = true

    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await config(params)
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
            result = await updateConfig(state.model.id, state.model)
        } else {
            result = await addConfig(state.model)
        }
    } catch (e) {
        state.loading = false
        return
    }
    state.loading = false
    ElMessage.success(result.msg)

    resetSave()

    // 重新拉取数据
    loadConfig()
}
/**
 * 重置内容编辑对话框
 */
const resetSave = () => {
    state.isShowEditDialog = false
    state.model = {
        id: "",
        alias: "",
        title: "",
        desc: "",
        content: "",
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
