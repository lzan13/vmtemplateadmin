<template>
    <div class="score">
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
            <el-table-column label="用户" prop="owner" min-width="144">
                <template #default="scope">
                    <div v-if="scope.row.owner">
                        <el-tag size="small" type="info" v-if="scope.row.owner._id">{{ scope.row.owner._id }}</el-tag>
                        <el-tag size="small" type="danger" v-if="scope.row.owner.nickname">{{ scope.row.owner.nickname
                        }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title" min-width="144"></el-table-column>
            <el-table-column label="金额" prop="count" width="144"></el-table-column>
            <el-table-column label="备注" prop="remarks" min-width="192"></el-table-column>
            <el-table-column label="类型" prop="type" width="96">
                <template #default="scope">
                    <el-tag size="small" v-if="scope.row.type == 0">{{ $t('str.score.type.free') }}</el-tag>
                    <el-tag size="small" type="success" v-if="scope.row.type == 1">{{ $t('str.score.type.recharge') }}
                    </el-tag>
                    <el-tag size="small" type="success" v-if="scope.row.type == 2">{{ $t('str.score.type.consume') }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="时间" width="160">
                <template #default="scope">
                    <span>{{ wrapDate(scope.row.createdAt) }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('str.btn.dispose')" fixed="right" :width="64">
                <template #default="scope">
                    <!-- 编辑按钮 -->
                    <!-- <el-button type="success" circle :icon="Edit" @click="editContent(scope.row)"></el-button> -->
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
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, getCurrentInstance } from "vue"
import { Plus, Edit, Delete } from "@element-plus/icons-vue"
import { useI18n } from "vue-i18n"
import { delScore, score } from "@/api/score"
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
})
// 页面加载时
onMounted(() => {
    initData()
})
/**
 * 初始化数据
 */
const initData = () => {
    loadScore()
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
    loadScore()
}
/**
 * 删除
 */
const delContent = async (value) => {
    try {
        const result = await delScore(value._id)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadScore()
}
/**
 *  获取签到列表
 */
const loadScore = async () => {
    state.loading = true

    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await score(params)
        state.dataList = result.data.data
        state.total = result.data.totalCount
    } catch (e) { }
    state.loading = false
}
</script>

<!-- 添加“scoped”属性以将 CSS 仅限于此组件 -->
<style lang="scss" scoped>
.top-control {
    display: flex;
    align-items: center;
}
</style>
