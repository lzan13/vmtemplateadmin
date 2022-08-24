<template>
    <div class="applet">
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
            <el-table-column label="内容" prop="content" min-width="192" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="提示" prop="tips" min-width="56">
                <template #default="scope">
                    <el-tag size="small">{{ scope.row.tips }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="VIP资格" prop="isNeedVIP" min-width="56">
                <template #default="scope">
                    <el-tag type="warning" size="small" v-if="scope.row.isNeedVIP">VIP</el-tag>
                    <el-tag type="success" size="small" v-else>免费</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="类型" prop="type" min-width="64">
                <template #default="scope">
                    <el-tag size="small" v-if="scope.row.type == 0">{{ $t('str.applet.type.h5') }}</el-tag>
                    <el-tag size="small" type="warning" v-if="scope.row.type == 1">{{ $t('str.applet.type.app') }}
                    </el-tag>
                    <el-tag size="small" type="danger" v-if="scope.row.type == 2">{{ $t('str.applet.type.game') }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="程序信息" min-width="192">
                <template #default="scope">
                    <el-tag v-if="scope.row.appId">{{ scope.row.appId }}</el-tag>
                    <el-tag v-if="scope.row.body">{{ scope.row.body.path }}</el-tag>
                    <el-tag v-if="scope.row.url">{{ scope.row.url }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="版本" min-width="72">
                <template #default="scope">
                    <el-tag type="success" size="small">版本号：{{ scope.row.versionCode }}</el-tag>
                    <el-tag type="warning" size="small">版本名：{{ scope.row.versionName }}</el-tag>
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
                <el-form-item label="内容" prop="content">
                    <el-input v-model="state.model.content" rows="5" type="textarea"
                        :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <el-form-item label="提示" prop="tips">
                    <el-input v-model="state.model.tips" :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <el-form-item label="VIP资格" prop="isNeedVIP">
                    <el-switch v-model="state.model.isNeedVIP"></el-switch>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="state.model.type" :placeholder="$t('str.tips.selectHint')">
                        <el-option v-for="item in state.selectData.appletTypes" :key="item.id" :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="程序Id" prop="appId">
                    <el-input v-model="state.model.appId" :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <el-input v-model="state.model.cover" :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                    <!-- <el-upload accept=".gif,.jpg,.png" ref="uploadCover" class="upload-demo" action="" :limit="1"
                        :auto-upload="false" :before-upload="uploadBefore">
                        <el-button type="success">选择封面图</el-button>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="程序包">
                    <el-input v-model="state.model.body" :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                    <!-- <el-upload accept=".wgt,.zip" ref="uploadPackage" class="upload-demo" action="" :limit="1"
                        :auto-upload="false">
                        <el-button type="success">选择程序包</el-button>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="地址" prop="url">
                    <el-input v-model="state.model.url" :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="版本号" prop="versionCode">
                    <el-input v-model="state.model.versionCode" :placeholder="$t('str.tips.inputHint')"></el-input>
                </el-form-item>
                <el-form-item label="版本名" prop="versionName">
                    <el-input v-model="state.model.versionName" :placeholder="$t('str.tips.inputHint')"></el-input>
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
import { addApplet, updateApplet, delApplet, applet } from "@/network/api/applet"
import { addAttachment } from "@/network/api/attachment"
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

    isShowEditDialog: false,
    editTitle: "",
    model: {
        id: "",
        title: "",
        content: "",
        tips: "",
        isNeedVIP: false,
        type: 0,
        appId: "",
        cover: "",
        body: "",
        url: "",
        versionCode: 1,
        versionName: "0.0.1",
    },
    rules: {
        title: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 12, message: `${t("str.tips.inputLengthLimit")} 1-12`, trigger: "blur" },
        ],
        content: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 10240, message: `${t("str.tips.inputLengthLimit")} 1-800`, trigger: "blur" },
        ],
    },
    selectData: {
        appletTypes: Array(),
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
    state.selectData.appletTypes = Data.selectData.appletTypes
    loadApplet()
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
    loadApplet()
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
        const result = await delApplet(value._id)
    } catch (e) {
        return
    }
    ElMessage.success(t("str.tips.delSuccess"))

    // 重新拉取数据
    loadApplet()
}
/**
 * 编辑
 */
const editContent = (data) => {
    state.model = {
        id: data._id,
        title: data.title,
        content: data.content,
        tips: data.tips,
        isNeedVIP: data.isNeedVIP,
        type: data.type,
        appId: data.appId,
        cover: data.cover?._id,
        body: data.body?._id,
        url: data.url,
        versionCode: data.versionCode,
        versionName: data.versionName,
    }
    state.editTitle = "数据更新"
    state.isShowEditDialog = true
}

/**
 *  获取附件列表
 */
const loadApplet = async () => {
    state.loading = true

    // 组装参数
    const params = { page: state.page - 1, limit: state.limit }
    try {
        const result = await applet(params)
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
            result = await updateApplet(state.model.id, state.model)
        } else {
            result = await addApplet(state.model)
        }
    } catch (e) {
        state.loading = false
        return
    }
    state.loading = false
    ElMessage.success(result.msg)

    resetSave()

    // 重新拉取数据
    loadApplet()
}

const uploadBefore: UploadProps["beforeUpload"] = (rawFile: any) => {
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("Avatar picture size can not exceed 2MB!")
        return false
    }
    return true
}
/**
 * 上传封面
 */
const uploadCover = () => {
    //   await addAttachment()
}

/**
 * 上传程序包
 */
const uploadPackage = () => { }

/**
 * 重置内容编辑对话框
 */
const resetSave = () => {
    state.isShowEditDialog = false
    state.model = {
        id: "",
        title: "",
        content: "",
        tips: "",
        isNeedVIP: false,
        type: 0,
        appId: "",
        cover: "",
        body: "",
        url: "",
        versionCode: 1,
        versionName: "0.0.1",
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
