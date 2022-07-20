<template>
    <div class="attachment">
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
            <el-table-column label="Id" min-width="192">
                <template #default="scope">
                    <el-tag size="small" type="info">{{ scope.row._id }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="上传者" prop="owner" min-width="192">
                <template #default="scope">
                    <el-tag size="small" type="info">{{ scope.row.owner }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="描述" prop="desc" min-width="96"></el-table-column>
            <el-table-column label="路径" prop="path" min-width="256"></el-table-column>
            <el-table-column label="目录" prop="space" width="144"></el-table-column>
            <el-table-column label="属性" width="144">
                <template #default="scope">
                    <el-tag size="small" type="info" v-if="scope.row.extname">后缀: {{ scope.row.extname }}</el-tag>
                    <el-tag size="small" type="success" v-if="scope.row.width">宽x高: {{ scope.row.width }}x{{
                            scope.row.height
                    }}</el-tag>
                    <el-tag size="small" type="danger" v-if="scope.row.duration">时长: {{ scope.row.duration }}</el-tag>
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
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="state.model.desc" rows="5" type="textarea"
                        :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <el-form-item label="路径" prop="path">
                    <el-input v-model="state.model.path" rows="5" type="textarea"
                        :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <el-form-item label="扩展" prop="extname">
                    <el-input v-model="state.model.extname" :placeholder="$t('str.tips.inputHint')" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="时长">
                    <el-input-number v-model="state.model.duration" :min="0" :max="9999" controls-position="right"
                        :placeholder="$t('str.tips.inputHint')">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="宽高">
                    <el-input-number v-model="state.model.width" :min="0" :max="9999" controls-position="right"
                        :placeholder="$t('str.tips.inputHint')">
                    </el-input-number>
                    <el-input-number v-model="state.model.height" :min="0" :max="9999" controls-position="right"
                        :placeholder="$t('str.tips.inputHint')">
                    </el-input-number>
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
import { addAttachment, updateAttachment, delAttachment, attachment } from "@/api/attachment"
import { formatDate } from "@/utils/vdate"

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
        desc: "",
        path: "",
        extname: "",
        duration: 0,
        width: 0,
        height: 0,
    },
    rules: {
        desc: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 12, message: `${t("str.tips.inputLengthLimit")} 1-12`, trigger: "blur" },
        ],
        path: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 8, max: 128, message: `${t("str.tips.inputLengthLimit")} 8-128`, trigger: "blur" },
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
    loadAttachment()
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
    loadAttachment()
}
/**
 * 新增
 */
const addContent = () => {
    state.editTitle = "新增附件"
    state.isShowEditDialog = true
}
/**
 * 删除
 */
const delContent = async (value) => {
    try {
        const result = await delAttachment(value._id)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadAttachment()
}
/**
 * 编辑
 */
const editContent = (data) => {
    state.model = {
        id: data._id,
        desc: data.desc,
        path: data.path,
        extname: data.extname,
        duration: data.duration,
        width: data.width,
        height: data.height,
    }
    state.editTitle = "编辑附件"
    state.isShowEditDialog = true
}

/**
 *  获取附件列表
 */
const loadAttachment = async () => {
    state.loading = true

    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await attachment(params)
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
            result = await updateAttachment(state.model.id, state.model)
        } else {
            result = await addAttachment(state.model)
        }
    } catch (e) {
        state.loading = false
        return
    }
    state.loading = false
    ElMessage.success(result.msg)

    resetSave()

    // 重新拉取数据
    loadAttachment()
}
/**
 * 重置内容编辑对话框
 */
const resetSave = () => {
    state.isShowEditDialog = false
    state.model = {
        id: "",
        desc: "",
        path: "",
        extname: "",
        duration: 0,
        width: 0,
        height: 0,
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
