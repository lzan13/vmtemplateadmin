<template>
    <div class="attachment">
        <div class="top-control">
            <!-- 新增 -->
            <el-button type="primary" :icon="Plus" round @click="addContent">{{ $t("str.btn.add") }}</el-button>
            <el-button type="danger" :icon="Delete" round @click="delMultiContent">{{ $t("str.btn.deleteMulti") }}
            </el-button>
            <div class="flex-auto"></div>
            <!-- 分页导航 -->
            <div v-if="state.dataList && state.dataList.length">
                <el-pagination background @current-change="handleCurrentChange" :current-page="state.page"
                    layout="total, prev, pager, next" :page-size="state.limit" :total="state.total">
                </el-pagination>
            </div>
        </div>
        <el-table class="mt16" :data="state.dataList" :border="true" stripe empty-text="暂无数据"
            @selection-change="handleSelectionChange">
            <el-table-column label="" prop="" type="selection" width="44" />
            <el-table-column label="预览" width="96">
                <template #default="scope">
                    <div class="item-media">
                        <!-- 预览图 -->
                        <el-image class="item-img-cover" :key="scope.row.cover" fit="cover"
                            :src="wrapMediaUrl(scope.row.path) + '!vt96'"
                            :preview-src-list="[wrapMediaUrl(scope.row.path)]" :hide-on-click-modal="true" lazy
                            v-if="wrapMediaUrl(scope.row.path)">
                        </el-image>
                        <el-icon class="item-img-cover" v-else>
                            <Paperclip />
                        </el-icon>
                    </div>
                </template>
            </el-table-column>
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
        <!-- 新增弹窗 -->
        <el-dialog v-model="state.isShowAddDialog" title="新增附件" :before-close="resetSave" width="30%">
            <el-form class="mr32" :model="state.model" :rules="state.rules" ref="addFormRef" label-width="96px"
                label-position="right" size="small">
                <el-form-item label="附件">
                    <div class="upload-item">
                        <el-button class="upload-item-btn" type="success">{{$t('str.btn.select')}}</el-button>
                        <input class="upload-item-input" type="file" ref="fileId" @change="handleSelectFile" />
                        <span class="upload-item-tips" v-if="state.selectFile.name">{{state.selectFile.name}}</span>
                    </div>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="state.model.desc" rows="3" type="textarea"
                        :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <el-form-item label="空间" prop="space">
                    <el-input v-model="state.model.space" :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button size="small" round @click="resetSave">{{ $t("str.btn.cancel") }}</el-button>
                    <el-button type="primary" size="small" round @click="doSaveAdd" :loading="state.loading">
                        {{ $t("str.btn.ok") }}</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 编辑对话框 -->
        <el-dialog v-model="state.isShowEditDialog" title="编辑附件" :before-close="resetSave" width="30%">
            <el-form class="mr32" :model="state.model" :rules="state.rules" ref="editFormRef" label-width="96px"
                label-position="right" size="small">
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="state.model.desc" rows="3" type="textarea"
                        :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <el-form-item label="路径" prop="path">
                    <el-input v-model="state.model.path" rows="3" type="textarea"
                        :placeholder="$t('str.tips.inputHint')" clearable></el-input>
                </el-form-item>
                <el-form-item label="空间" prop="space">
                    <el-input v-model="state.model.space" :placeholder="$t('str.tips.inputHint')" clearable></el-input>
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
                    <el-button type="primary" size="small" round @click="doSaveEdit" :loading="state.loading">
                        {{ $t("str.btn.ok") }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, getCurrentInstance } from "vue"
import { Delete, Edit, Paperclip, Plus } from "@element-plus/icons-vue"
import { useI18n } from "vue-i18n"
import { addAttachment, delAttachment, delAttachmentList, updateAttachment, attachment } from "@/network/api/attachment"
import { formatDate } from "@/utils/vdate"
import { wrapMediaUrl } from "@/utils/vstr"

import { ElMessage } from "element-plus"

const { proxy } = getCurrentInstance() as any
const { t } = useI18n()

const state = reactive({
    loading: false,
    dataList: [],
    total: 0,
    page: 1,
    limit: 20,

    selectList: [], // 多选集合

    isShowAddDialog: false,
    isShowEditDialog: false,

    model: {
        id: "",
        desc: "",
        path: "",
        space: "",
        extname: "",
        duration: 0,
        width: 0,
        height: 0,
    },
    selectFile: {} as any, // 新增附件所选文件
    rules: {
        desc: [
            { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
            { min: 1, max: 12, message: `${t("str.tips.inputLengthLimit")} 1-12`, trigger: "blur" },
        ],
        // path: [
        //     { required: true, message: t("str.tips.inputNull"), trigger: "blur" },
        //     { min: 8, max: 128, message: `${t("str.tips.inputLengthLimit")} 8-128`, trigger: "blur" },
        // ],
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
    state.isShowAddDialog = true
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
 * 批量删除
 */
const delMultiContent = async () => {
    let ids = ""
    state.selectList.forEach((post: any, index: Number) => {
        if (index == 0) {
            ids = post._id
        } else {
            ids = `${ids},${post._id}`
        }
    })
    try {
        const result = await delAttachmentList({ ids })
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
        space: data.space,
        extname: data.extname,
        duration: data.duration,
        width: data.width,
        height: data.height,
    }
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
 * 处理选择文件
 */
const handleSelectFile = (event) => {
    // 获取文件
    state.selectFile = event.target.files[0];
    // 这一步是清空选择器已选文件，防止下次选择同一文件不触发此方法
    event.target.value = '';

    console.log(state.selectFile)
}
/**
 * 保存新增
 */
const doSaveAdd = () => {
    proxy.$refs.addFormRef.validate((valid) => {
        if (valid) submitSaveAdd()
    })
}
/**
 * 提交新增
 */
const submitSaveAdd = async () => {
    if (!state.selectFile.name) {
        return ElMessage.error(t("str.tips.selectNull"))
    }
    state.loading = true
    let result
    try {
        const params = new FormData()
        // 添加其他参数
        params.append("desc", state.model.desc)
        params.append("space", state.model.space)
        // 文件一定要放最后
        params.append("file", state.selectFile)
        result = await addAttachment(params)
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
 * 保存编辑
 */
const doSaveEdit = () => {
    proxy.$refs.editFormRef.validate((valid) => {
        if (valid) submitSaveEdit()
    })
}
/**
 * 提交编辑
 */
const submitSaveEdit = async () => {
    state.loading = true
    let result
    try {
        result = await updateAttachment(state.model.id, state.model)
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
 * 选择集合改变
 */
const handleSelectionChange = (value) => {
    state.selectList = value
}
/**
 * 重置内容编辑对话框
 */
const resetSave = () => {
    state.isShowAddDialog = false
    state.selectFile = {}

    state.isShowEditDialog = false
    state.model = {
        id: "",
        desc: "",
        path: "",
        space: "",
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

.item-media {
    position: relative;
    width: 100%;
    height: 48px;

    .item-img-cover {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}

.upload-item {
    display: flex;
    position: relative;

    .upload-item-btn,
    .upload-item-input {
        width: 72px;
    }

    .upload-item-input {
        position: absolute;
        left: 0;
        opacity: 0;
    }

    .upload-item-tips {
        margin-left: 8px;
        width: 192px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
}

/**解决 el-image 和 el-table 结合使用时 图片预览被el-table遮挡问题 */
.el-table {

    & :deep(th.el-table__cell),
    :deep(td.el-table__cell) {
        // 设置position 使得 子元素不与其产生新的层叠关系
        position: static;
    }
}
</style>
