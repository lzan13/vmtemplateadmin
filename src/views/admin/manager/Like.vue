<template>
    <div class="like">
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
            <el-table-column label="发起人" prop="owner" min-width="256">
                <template #default="scope">
                    <div v-if="scope.row.owner">
                        <el-tag size="small" type="info" v-if="scope.row.owner._id">{{ scope.row.owner._id }}</el-tag>
                        <el-tag size="small" type="danger" v-if="scope.row.owner.nickname">{{ scope.row.owner.nickname
                        }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="相关用户" prop="user" min-width="256">
                <template #default="scope">
                    <div v-if="scope.row.user">
                        <el-tag size="small" type="info" v-if="scope.row.user._id">{{ scope.row.user._id }}</el-tag>
                        <el-tag size="small" type="danger" v-if="scope.row.user.nickname">{{ scope.row.user.nickname }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="相关帖子" prop="post" min-width="256">
                <template #default="scope">
                    <div v-if="scope.row.post">
                        <el-tag size="small" type="info" v-if="scope.row.post._id">{{ scope.row.post._id }}</el-tag>
                        <el-tag size="small" type="danger" v-if="scope.row.post.title">{{ scope.row.post.title }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="相关评论" prop="comment" min-width="256">
                <template #default="scope">
                    <div v-if="scope.row.comment">
                        <el-tag size="small" type="info" v-if="scope.row.comment._id">{{ scope.row.comment._id }}
                        </el-tag>
                        <el-tag size="small" type="danger" v-if="scope.row.comment.content">
                            {{ scope.row.comment.content }}</el-tag>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="时间" prop="createdAt" width="160">
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
import { addLike, updateLike, delLike, like } from "@/network/api/like"
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
})
// 页面加载时
onMounted(() => {
    initData()
})
/**
 * 初始化数据
 */
const initData = () => {
    loadLike()
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
    loadLike()
}
/**
 * 删除
 */
const delContent = async (value) => {
    try {
        const result = await delLike(value._id)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadLike()
}

/**
 *  获取喜欢列表
 */
const loadLike = async () => {
    state.loading = true

    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await like(params)
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
