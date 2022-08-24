<template>
    <div class="relation">
        <div class="top-control">
            <!-- 新增 -->
            <!-- <el-button type="primary" :icon="Plus" round @click="addContent">{{$t("str.btn.add")}}</el-button> -->
            <div class="flex-auto"></div>
            <!-- 分页导航 -->
            <div v-if="state.dataList && state.dataList.length">
                <el-pagination background @current-change="handleCurrentChange" :current-page="state.page"
                    layout="total, prev, pager, next" :page-size="state.limit" :total="state.total">
                </el-pagination>
            </div>
        </div>
        <el-table class="mt16" :data="state.dataList" :border="true" stripe empty-text="暂无数据">
            <el-table-column label="用户A" prop="user1" min-width="256">
                <template #default="scope">
                    <div v-if="scope.row.user1">
                        <el-tag size="small" type="info" v-if="scope.row.user1._id">{{ scope.row.user1._id }}</el-tag>
                        <el-tag size="small" type="danger" v-if="scope.row.user1.nickname">{{ scope.row.user1.nickname
                        }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="用户B" prop="user2" min-width="256">
                <template #default="scope">
                    <div v-if="scope.row.user2">
                        <el-tag size="small" type="info" v-if="scope.row.user2._id">{{ scope.row.user2._id }}</el-tag>
                        <el-tag size="small" type="danger" v-if="scope.row.user2.nickname">{{ scope.row.user2.nickname
                        }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="关系" prop="relation" width="96">
                <template #default="scope">
                    <el-tag size="small"
                        :type="scope.row.relation == 2 ? 'success' : scope.row.relation == 1 ? 'warning' : 'info'">
                        {{ wrapRelation(scope.row.relation) }}</el-tag>
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
                <el-form-item label="关系" prop="relation">
                    <el-select v-model="state.model.relation" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.relations" :key="item.id" :label="item.value"
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
import { addRelation, updateRelation, delRelation, relation } from "@/network/api/relation"
import { formatDate } from "@/utils/vdate"
import { Data, wrapRelation } from "@/utils/vdata"

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
        relation: 0,
    },
    rules: {
        contact: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 32, message: `${t("str.tips.inputLengthLimit")} 1-32`, trigger: "blur" },
        ],
        content: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 128, message: `${t("str.tips.inputLengthLimit")} 1-128`, trigger: "blur" },
        ],
    },
    selectData: {
        relations: Array(),
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
    state.selectData.relations = Data.selectData.relations
    loadRelation()
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
    loadRelation()
}
/**
 * 新增
 */
const addContent = () => {
    state.editTitle = "新增关注"
    state.isShowEditDialog = true
}
/**
 * 删除
 */
const delContent = async (value) => {
    try {
        const result = await delRelation(value._id)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadRelation()
}
/**
 * 编辑
 */
const editContent = (data) => {
    state.model = {
        id: data._id,
        relation: data.relation,
    }
    state.editTitle = "编辑关注"
    state.isShowEditDialog = true
}

/**
 *  获取关注列表
 */
const loadRelation = async () => {
    state.loading = true

    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await relation(params)
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
            result = await updateRelation(state.model.id, state.model)
        } else {
            result = await addRelation(state.model)
        }
    } catch (e) {
        state.loading = false
        return
    }
    state.loading = false
    ElMessage.success(result.msg)

    resetSave()

    // 重新拉取数据
    loadRelation()
}
/**
 * 重置内容编辑对话框
 */
const resetSave = () => {
    state.isShowEditDialog = false
    state.model = {
        id: "",
        relation: 0,
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
