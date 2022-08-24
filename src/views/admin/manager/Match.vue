<template>
    <div class="match">
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
            <el-table-column label="用户" prop="user" width="200">
                <template #default="scope">
                    <div v-if="scope.row.user">
                        <el-tag size="small" type="info" v-if="scope.row.user._id">{{ scope.row.user._id }}</el-tag>
                        <el-tag size="small" type="danger" v-if="scope.row.user.nickname">{{ scope.row.user.nickname }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="内容" prop="content" min-width="256"></el-table-column>
            <el-table-column label="次数" prop="count" width="128">
                <template #default="scope">
                    <el-tag size="small" type="success">可匹配次数:{{ scope.row.fromCount }}</el-tag>
                    <el-tag size="small" type="danger">被匹配次数:{{ scope.row.toCount }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="心情" prop="emotion" width="96">
                <template #default="scope">
                    <el-tag size="small"
                        :type="scope.row.emotion == 0 ? 'success' : scope.row.emotion == 1 ? 'info' : scope.row.emotion == 2 ? 'warning' : 'danger'">
                        {{ wrapEmotion(scope.row.emotion) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="性别" prop="gender" width="96">
                <template #default="scope">
                    <el-tag size="small" :type="scope.row.gender == 0 ? 'danger' : scope.row.gender == 1 ? '' : 'info'">
                        {{ wrapGender(scope.row.gender) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="类型" prop="type" width="96">
                <template #default="scope">
                    <span>{{ scope.row.type }}</span>
                </template>
            </el-table-column>
            <el-table-column label="时间" prop="updatedAt" width="160">
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
        <el-dialog v-model="state.isShowEditDialog" :title="state.editTitle" :before-close="resetSave" width="36%">
            <el-form class="mr32" :model="state.model" :rules="state.rules" ref="formRef" label-width="96px"
                label-position="right" size="small">
                <el-form-item label="内容" prop="content">
                    <el-input v-model="state.model.content" :placeholder="$t('str.tips.inputHint')" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="匹配次数">
                    <el-input-number v-model="state.model.fromCount" :min="0" :max="999999" :step="100"
                        controls-position="right" />
                </el-form-item>
                <el-form-item label="被匹配次数">
                    <el-input-number v-model="state.model.toCount" :min="0" :max="999999" :step="100"
                        controls-position="right" />
                </el-form-item>
                <el-form-item>
                    <el-select v-model="state.model.emotion" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.emotions" :key="item.id" :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="state.model.gender" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.genders" :key="item.id" :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
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
import { addMatch, updateMatch, delMatch, match } from "@/network/api/match"
import { useStore } from "@/store/index"
import { formatDate } from "@/utils/vdate"
import { Data, wrapEmotion, wrapGender } from "@/utils/vdata"

import { ElMessage } from "element-plus"

const { proxy } = getCurrentInstance() as any
const { t } = useI18n()
const store = useStore()
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
        content: "",
        fromCount: 0,
        toCount: 0,
        emotion: 0,
        gender: 2,
        type: 0,
    },
    rules: {
        content: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 128, message: `${t("str.tips.inputLengthLimit")} 1-128`, trigger: "blur" },
        ],
        emotion: { required: true, message: t("str.tips.selectNull"), trigger: "blur" },
        gender: { required: true, message: t("str.tips.selectNull"), trigger: "blur" },
    },
    selectData: {
        emotions: Array(),
        genders: Array(),
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
    state.selectData.emotions = Data.selectData.emotions
    state.selectData.genders = Data.selectData.genders
    loadMatch()
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
    loadMatch()
}
/**
 * 新增
 */
const addContent = () => {
    state.editTitle = "新增匹配"
    state.isShowEditDialog = true
}
/**
 * 删除
 */
const delContent = async (value) => {
    try {
        const result = await delMatch(value._id)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadMatch()
}
/**
 * 编辑
 */
const editContent = (data) => {
    state.model = {
        id: data._id,
        content: data.content,
        fromCount: data.fromCount,
        toCount: data.toCount,
        emotion: data.emotion,
        gender: data.gender,
        type: data.type,
    }
    state.editTitle = "编辑匹配"
    state.isShowEditDialog = true
}

/**
 *  获取匹配列表
 */
const loadMatch = async () => {
    state.loading = true

    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await match(params)
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
            result = await updateMatch(state.model.id, state.model)
        } else {
            result = await addMatch(state.model)
        }
    } catch (e) {
        state.loading = false
        return
    }
    state.loading = false
    ElMessage.success(result.msg)

    resetSave()

    // 重新拉取数据
    loadMatch()
}
/**
 * 重置内容编辑对话框
 */
const resetSave = () => {
    state.isShowEditDialog = false
    state.model = {
        id: "",
        content: "",
        fromCount: 0,
        toCount: 0,
        emotion: 0,
        gender: 2,
        type: 0,
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
