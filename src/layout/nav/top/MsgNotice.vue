<template>
    <div class="notice">
        <div class="notice-head">
            <div class="notice-head-title">{{ $t("str.notice.title") }}</div>
            <div class="notice-head-btn" v-if="state.noticeList.length > 0" @click="onAllReadClick">{{
                    $t("str.notice.allRead")
            }}</div>
        </div>
        <div class="notice-content">
            <template v-if="state.noticeList.length > 0">
                <div class="notice-content-item" v-for="(item, index) in state.noticeList" :key="index">
                    <span class="notice-content-item-title">{{ item.title }}</span>
                    <p class="notice-content-item-msg">
                        {{ item.content }}
                    </p>
                    <span class="notice-content-item-time">{{ item.time }}</span>
                </div>
            </template>
            <img class="notice-content-empty" src="@/assets/images/img-no-data.svg" v-else />
        </div>
        <!-- <div class="notice-footer" @click="onGoNoticeClick" v-if="state.noticeList.length > 0">{{ $t('str.notice.goNotice') }}</div> -->
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"

const state = reactive({
    noticeList: [
        {
            title: "关于学习交流群",
            content: "QQ群: 901211985, 欢迎小伙伴入群学习交流",
            time: "2021/10/28 20:08",
        },
    ],
})
// 全部已读点击
const onAllReadClick = () => {
    state.noticeList = []
}
// 前往通知中心点击
const onGoNoticeClick = () => { }
</script>

<style scoped lang="scss">
.notice {
    &-head {
        display: flex;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border;
        color: #333333;
        justify-content: space-between;
        height: 32px;
        align-items: center;

        &-title {
            font-size: 14px;
            font-weight: 500;
        }

        &-btn {
            color: var(--color-primary);
            font-size: 13px;
            cursor: pointer;
            opacity: 0.8;

            &:hover {
                opacity: 1;
            }
        }
    }

    .notice-content {
        width: 100%;
        font-size: 13px;

        &-item {
            padding-top: 12px;

            &:last-of-type {
                padding-bottom: 12px;
            }

            &-title {
                color: var(--title);
                font-size: 14px;
                font-weight: 500;
            }

            &-msg {
                color: var(--body);
                margin-top: 5px;
                margin-bottom: 5px;
            }

            &-time {
                color: var(--tips);
            }
        }

        &-empty {
            width: 144px;
            height: 144px;
            margin: 0 auto;
        }
    }

    .notice-footer {
        height: 35px;
        color: var(--color-primary);
        font-size: 13px;
        cursor: pointer;
        opacity: 0.8;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #ebeef5;

        &:hover {
            opacity: 1;
        }
    }

    :deep(.el-empty__description p) {
        font-size: 13px;
    }
}
</style>
