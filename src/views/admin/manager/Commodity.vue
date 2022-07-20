<template>
    <div class="commodity">
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
            <el-table-column label="标题" prop="title" min-width="128"></el-table-column>
            <el-table-column label="描述" prop="desc" min-width="128"></el-table-column>
            <el-table-column label="价格" min-width="128">
                <template #default="scope">
                    <el-tag size="small" type="warning">原价:￥{{ (scope.row.price / 100).toFixed(2) }}</el-tag>
                    <el-tag size="small" type="danger">现价:￥{{ (scope.row.currPrice / 100).toFixed(2) }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="status" width="96">
                <template #default="scope">
                    <el-tag size="small"
                        :type="scope.row.status == 1 ? 'success' : scope.row.status == 2 ? 'danger' : scope.row.status == 3 ? 'info' : 'warning'">
                        {{ wrapCommodityStatus(scope.row.status) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="类型" prop="type" width="96">
                <template #default="scope">
                    <el-tag size="small"
                        :type="scope.row.type == 1 ? 'danger' : scope.row.type == 2 ? 'success' : 'warning'">
                        {{ wrapCommodityType(scope.row.type) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="remarks" min-width="128" show-overflow-tooltip></el-table-column>
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

                <el-form-item label="标题" prop="title">
                    <el-input v-model="state.model.title" :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="state.model.desc" rows="5" type="textarea"
                        :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input-number v-model="state.model.price" :min="0.01" :max="999999.99" :precision="2"
                        controls-position="right" :placeholder="$t('str.tips.inputHint')">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="现价" prop="currPrice">
                    <el-input-number v-model="state.model.currPrice" :min="0.01" :max="999999.99" :precision="2"
                        controls-position="right" :placeholder="$t('str.tips.inputHint')">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input v-model="state.model.remarks" rows="5" type="textarea"
                        :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <!-- 商品状态 -->
                <el-form-item label="商品状态" prop="status">
                    <el-select v-model="state.model.status" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.commodityStatus" :key="item.id" :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 商品类型 -->
                <el-form-item label="商品类型" prop="type">
                    <el-select v-model="state.model.type" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.commodityTypes" :key="item.id" :label="item.value"
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
import { addCommodity, updateCommodity, delCommodity, commodity } from "@/api/commodity"
import { Data, wrapCommodityStatus, wrapCommodityType } from "@/utils/vdata"
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
        title: "",
        desc: "",
        price: 1,
        currPrice: 1,
        remarks: "",
        status: 0,
        type: 0,
    },
    rules: {
        title: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 24, message: `${t("str.tips.inputLengthLimit")} 1-24`, trigger: "blur" },
        ],
        desc: { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
        status: { required: true, message: t("str.tips.selectNull"), trigger: "blur" },
        type: { required: true, message: t("str.tips.selectNull"), trigger: "blur" },
    },
    selectData: {
        commodityStatus: Array(),
        commodityTypes: Array(),
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
    state.selectData.commodityStatus = Data.selectData.commodityStatus
    state.selectData.commodityTypes = Data.selectData.commodityTypes
    loadCommodity()
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
    loadCommodity()
}
/**
 * 新增
 */
const addContent = () => {
    state.editTitle = "新增商品配置"
    state.isShowEditDialog = true
}
/**
 * 删除
 */
const delContent = async (value) => {
    try {
        const result = await delCommodity(value._id)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadCommodity()
}
/**
 * 编辑
 */
const editContent = (data) => {
    state.model = {
        id: data._id,
        title: data.title,
        desc: data.desc,
        price: data.price / 100,
        currPrice: data.currPrice / 100,
        remarks: data.remarks,
        status: data.status,
        type: data.type,
    }
    state.editTitle = "编辑商品配置"
    state.isShowEditDialog = true
}

/**
 *  获取配置列表
 */
const loadCommodity = async () => {
    state.loading = true

    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await commodity(params)
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
    let data = { ...state.model }
    data.price = data.price * 100
    data.currPrice = data.currPrice * 100
    try {
        if (state.model.id) {
            result = await updateCommodity(state.model.id, data)
        } else {
            result = await addCommodity(data)
        }
    } catch (e) {
        state.loading = false
        return
    }
    state.loading = false
    ElMessage.success(result.msg)

    resetSave()

    // 重新拉取数据
    loadCommodity()
}
/**
 * 重置内容编辑对话框
 */
const resetSave = () => {
    state.isShowEditDialog = false
    state.model = {
        id: "",
        title: "",
        desc: "",
        price: 1,
        currPrice: 1,
        remarks: "",
        status: 0,
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
