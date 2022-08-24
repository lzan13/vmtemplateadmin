<template>
    <div class="giftRelation">
        <div class="top-control">
            <!-- 新增 -->
            <!-- <el-button type="primary" :icon="Plus" round @click="addContent">{{ $t("str.btn.add") }}</el-button> -->
            <div class="flex-auto"></div>
            <!-- 分页导航 -->
            <div v-if="state.dataList && state.dataList.length">
                <el-pagination background @current-change="handleCurrentChange" :current-page="state.page"
                    layout="total, prev, pager, next" :page-size="state.limit" :total="state.total">
                </el-pagination>
            </div>
        </div>
        <el-table class="mt16" :data="state.dataList" :border="true" stripe empty-text="暂无数据">
            <el-table-column label="封面" width="96">
                <template #default="scope">
                    <div class="item-media" v-if="scope.row.cover">
                        <!-- 封面 -->
                        <el-image class="item-img-cover" fit="cover" :src="wrapUrl(scope.row.cover.path) + '!vt96'"
                            :preview-src-list="[wrapUrl(scope.row.cover.path)]" :hide-on-click-modal="true" lazy
                            v-if="wrapUrl(scope.row.cover.path)">
                        </el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="用户" prop="owner" width="200">
                <template #default="scope">
                    <div v-if="scope.row.owner">
                        <el-tag size="small" type="info" v-if="scope.row.owner._id">{{ scope.row.owner._id }}</el-tag>
                        <el-tag size="small" type="danger" v-if="scope.row.owner.nickname">{{ scope.row.owner.nickname
                        }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title" width="96"></el-table-column>
            <el-table-column label="动效" prop="animation" min-width="96">
                <template #default="scope">
                    <el-tag type="warning" size="small">{{ $t('str.tips.clickPreview') }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="价格" prop="price" width="96">
                <template #default="scope">
                    <el-tag type="warning" size="small">{{ scope.row.price }} 币</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="数量" prop="count" width="96">
                <template #default="scope">
                    <el-tag type="warning" size="small">{{ scope.row.count }} 个</el-tag>
                </template>
            </el-table-column>

            <el-table-column :label="$t('str.btn.dispose')" fixed="right" :width="106">
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
import { delGiftRelation, giftRelation } from "@/network/api/giftRelation"
import { formatDate } from "@/utils/vdate"
import { wrapUrl } from "@/utils/vstr"
import { Data } from "@/utils/vdata"

import { ElMessage } from "element-plus"
import type { UploadProps } from "element-plus"

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
    loadGiftRelation()
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
    loadGiftRelation()
}
/**
 * 删除
 */
const delContent = async (value) => {
    try {
        const result = await delGiftRelation(value.relationId)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadGiftRelation()
}
/**
 *  获取附件列表
 */
const loadGiftRelation = async () => {
    state.loading = true

    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await giftRelation(params)
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

.item-media {
    position: relative;
    width: 100%;
    height: 48px;
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

// 解决 el-image 和 el-table 结合使用时 图片预览被el-table遮挡问题
.el-table {

    & :deep(th.el-table__cell),
    :deep(td.el-table__cell) {
        // 设置position 使得 子元素不与其产生新的层叠关系
        position: static;
    }
}
</style>
