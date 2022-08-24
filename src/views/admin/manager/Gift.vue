<template>
    <div class="gift">
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
            <el-table-column label="标题" prop="title" width="96"></el-table-column>
            <el-table-column label="描述" prop="desc" min-width="192"></el-table-column>
            <el-table-column label="动效" prop="animation" min-width="96">
                <template #default="scope">
                    <el-tag type="warning" size="small" v-if="scope.row.animation">{{ $t('str.tips.clickPreview') }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="价格" prop="price" min-width="96">
                <template #default="scope">
                    <el-tag type="warning" size="small">{{ scope.row.price }} 币</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="status" min-width="96">
                <template #default="scope">
                    <el-tag size="small" v-if="scope.row.status == 0">{{ $t('str.gift.status.wait') }}</el-tag>
                    <el-tag size="small" type="success" v-if="scope.row.status == 1">{{ $t('str.gift.status.sale') }}
                    </el-tag>
                    <el-tag size="small" type="danger" v-if="scope.row.status == 2">{{ $t('str.gift.status.offShelf') }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="类型" prop="type" min-width="96">
                <template #default="scope">
                    <el-tag size="small" v-if="scope.row.type == 0">{{ $t('str.gift.type.ordinary') }}</el-tag>
                    <el-tag size="small" type="success" v-if="scope.row.type == 1">{{ $t('str.gift.type.especial') }}
                    </el-tag>
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
                    <el-input v-model="state.model.title" :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="state.model.desc" rows="5" type="textarea"
                        :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <el-input v-model="state.model.cover" :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                    <!-- <el-upload ref="upload" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        :auto-upload="false" @on-change="onUploadChange">
                        <el-button type="primary" v-if="state.isShowSelectCover">选择文件</el-button>
                    </el-upload>
                    <el-button type="success" @click="onUploadCover">上传</el-button> -->
                </el-form-item>
                <el-form-item label="动效" prop="animation">
                    <el-input v-model="state.model.animation" :placeholder="$t('str.tips.inputHint')" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input-number v-model="state.model.price" :min="9" :max="999999" controls-position="right"
                        :placeholder="$t('str.tips.inputHint')">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="状态" prop="type">
                    <el-select v-model="state.model.status" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.giftStatus" :key="item.id" :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="state.model.type" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.giftTypes" :key="item.id" :label="item.value"
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
import { addGift, updateGift, delGift, gift } from "@/network/api/gift"
import { addAttachment } from "@/network/api/attachment"
import { formatDate } from "@/utils/vdate"
import { wrapUrl } from "@/utils/vstr"
import { Data } from "@/utils/vdata"

import { ElMessage } from "element-plus"
import { UploadInstance, UploadProps } from "element-plus"

const { proxy } = getCurrentInstance() as any
const { t } = useI18n()
const state = reactive({
    loading: false,
    dataList: [],
    total: 0,
    page: 1,
    limit: 100,

    isShowEditDialog: false, // 是否显示编辑框
    isShowSelectCover: true, // 是否显示选择封面
    editTitle: "",
    model: {
        id: "",
        title: "",
        desc: "",
        cover: "",
        animation: "",
        price: 0,
        status: 0,
        type: 0,
    },
    rules: {
        title: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 12, message: `${t("str.tips.inputLengthLimit")} 1-12`, trigger: "blur" },
        ],
        desc: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 10240, message: `${t("str.tips.inputLengthLimit")} 1-128`, trigger: "blur" },
        ],
    },
    selectData: {
        giftStatus: Array(),
        giftTypes: Array(),
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
    state.selectData.giftStatus = Data.selectData.giftStatus
    state.selectData.giftTypes = Data.selectData.giftTypes
    loadGift()
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
    loadGift()
}
/**
 * 新增
 */
const addContent = () => {
    state.editTitle = "新增"
    state.isShowEditDialog = true
}
/**
 * 删除
 */
const delContent = async (value) => {
    try {
        const result = await delGift(value._id)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadGift()
}
/**
 * 编辑
 */
const editContent = (data) => {
    state.model = {
        id: data._id,
        title: data.title,
        desc: data.desc,
        cover: data.cover?._id,
        animation: data.animation?._id,
        price: data.price,
        status: data.status,
        type: data.type,
    }
    state.editTitle = "数据更新"
    state.isShowEditDialog = true
}

/**
 *  获取附件列表
 */
const loadGift = async () => {
    state.loading = true

    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await gift(params)
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
            result = await updateGift(state.model.id, state.model)
        } else {
            result = await addGift(state.model)
        }
    } catch (e) {
        state.loading = false
        return
    }
    state.loading = false
    ElMessage.success(result.msg)

    resetSave()

    // 重新拉取数据
    loadGift()
}

/**
 * 上传组件状态改变
 */
const onUploadChange = (uploadFile, uploadFiles) => {
    state.isShowSelectCover = false
    console.log(uploadFile)
}

/**
 * 上传封面
 */
const onUploadCover = () => {
    //   await addAttachment()
}

/**
 * 上传程序包
 */
const onUploadAnimation = () => { }

/**
 * 重置内容编辑对话框
 */
const resetSave = () => {
    state.isShowEditDialog = false
    state.model = {
        id: "",
        title: "",
        desc: "",
        cover: "",
        animation: "",
        price: 0,
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
