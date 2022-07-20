<template>
    <div class="dashboard">
        <!-- 数量概要 -->
        <div class="title mb8">数量概要</div>
        <el-row :gutter="16">
            <el-col :xs="24" :sm="12" :lg="6">
                <el-card class="count-item user" shadow="always">
                    <el-row>
                        <el-col :xs="16" :sm="16">
                            <div class="count-item-title">用户数</div>
                            <div class="count-item-title-num">{{ state.data.user.totalCount }}</div>
                        </el-col>
                        <el-col :xs="8" :sm="8">
                            <div class="count-item-tip">昨日新增</div>
                            <div class="count-item-tip-num">{{ state.data.user.dayCount }}</div>
                            <div class="count-item-tip">7日新增</div>
                            <div class="count-item-tip-num">{{ state.data.user.weekCount }}</div>
                            <div class="count-item-tip">30日新增</div>
                            <div class="count-item-tip-num">{{ state.data.user.monthCount }}</div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
                <el-card class="count-item match" shadow="always">
                    <el-row>
                        <el-col :xs="16" :sm="16">
                            <div class="count-item-title">待匹配用户数</div>
                            <div class="count-item-title-num">{{ state.data.match.totalCount }}</div>
                        </el-col>
                        <el-col :xs="8" :sm="8">
                            <div class="count-item-tip">昨日新增</div>
                            <div class="count-item-tip-num">{{ state.data.match.dayCount }}</div>
                            <div class="count-item-tip">7日新增</div>
                            <div class="count-item-tip-num">{{ state.data.match.weekCount }}</div>
                            <div class="count-item-tip">30日新增</div>
                            <div class="count-item-tip-num">{{ state.data.match.monthCount }}</div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
                <el-card class="count-item post" shadow="always">
                    <el-row>
                        <el-col :xs="16" :sm="16">
                            <div class="count-item-title">帖子数</div>
                            <div class="count-item-title-num">{{ state.data.post.totalCount }}</div>
                        </el-col>
                        <el-col :xs="8" :sm="8">
                            <div class="count-item-tip">昨日新增</div>
                            <div class="count-item-tip-num">{{ state.data.post.dayCount }}</div>
                            <div class="count-item-tip">7日新增</div>
                            <div class="count-item-tip-num">{{ state.data.post.weekCount }}</div>
                            <div class="count-item-tip">30日新增</div>
                            <div class="count-item-tip-num">{{ state.data.post.monthCount }}</div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
                <el-card class="count-item feedback" shadow="always">
                    <el-row>
                        <el-col :xs="16" :sm="16">
                            <div class="count-item-title">反馈数</div>
                            <div class="count-item-title-num">{{ state.data.feedback.totalCount }}</div>
                        </el-col>
                        <el-col :xs="8" :sm="8">
                            <div class="count-item-tip">昨日新增</div>
                            <div class="count-item-tip-num">{{ state.data.feedback.dayCount }}</div>
                            <div class="count-item-tip">7日新增</div>
                            <div class="count-item-tip-num">{{ state.data.feedback.weekCount }}</div>
                            <div class="count-item-tip">30日新增</div>
                            <div class="count-item-tip-num">{{ state.data.feedback.monthCount }}</div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <!-- 数据图表 -->
        <div class="title mt16 mb8">数据图表</div>
        <!-- 比例图 -->
        <el-row :gutter="16">
            <el-col :xs="24" :sm="12" :lg="8">
                <el-card shadow="hover">
                    <div class="charts-container-pie" ref="userGenderChartsRef"></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
                <el-card shadow="hover">
                    <div class="charts-container-pie" ref="matchGenderChartsRef"></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
                <el-card shadow="hover">
                    <div class="charts-container-pie" ref="postCategoryChartsRef"></div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 趋势图 -->
        <el-row class="mt16" :gutter="16">
            <el-col :xs="24" :sm="12">
                <el-card shadow="hover">
                    <div class="charts-container-line" ref="userNewsChartsRef"></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12">
                <el-card shadow="hover">
                    <div class="charts-container-line" ref="matchNewsChartsRef"></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12">
                <el-card shadow="hover">
                    <div class="charts-container-line" ref="postNewsChartsRef"></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12">
                <el-card shadow="hover">
                    <div class="charts-container-line" ref="feedbackNewsChartsRef"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, getCurrentInstance } from "vue"
import { useI18n } from "vue-i18n"
import * as echarts from "echarts"
import { useStore } from "@/store/index"

import { countData } from "@/api/dashboard"
import { Data } from "@/utils/vdata"

const { proxy } = getCurrentInstance() as any
const { t } = useI18n()
const store = useStore()
const state = reactive({
    loading: false,
    data: {
        common: Object(),
        feedback: Object(),
        match: Object(),
        post: Object(),
        user: Object(),
    },
})

// 页面加载时
onMounted(() => {
    initData()
})

/**
 * 初始化数据
 */
const initData = async () => {
    const result: any = await countData()
    state.data = result.data

    bindUserGenderCharts()
    bindMatchGenderCharts()
    bindPostCategoryCharts()

    bindUserNewsCharts()
    bindMatchNewsCharts()
    bindPostNewsCharts()
    bindFeedbackNewsCharts()
}
/**
 * 绑定用户性别分布图表数据
 */
const bindUserGenderCharts = () => {
    const charts = echarts.init(proxy.$refs.userGenderChartsRef)
    const user: any = state.data.user
    const option = {
        ...Data.charts.common,
        title: {
            text: "用户性别",
        },
        series: [
            {
                type: "pie",
                radius: ["16%", "64%"],
                ...Data.charts.label,
                ...Data.charts.item,
                data: user.genders,
            },
        ],
    }
    charts.setOption(option)
}
/**
 * 绑定匹配性别分布图表数据
 */
const bindMatchGenderCharts = () => {
    const charts = echarts.init(proxy.$refs.matchGenderChartsRef)
    const match: any = state.data.match
    const option = {
        ...Data.charts.common,
        title: {
            text: "匹配性别",
        },
        series: [
            {
                type: "pie",
                radius: ["16%", "64%"],
                ...Data.charts.label,
                ...Data.charts.item,
                data: match.genders,
            },
        ],
    }
    charts.setOption(option)
}
/**
 * 绑定帖子所属分类图表数据
 */
const bindPostCategoryCharts = () => {
    const charts = echarts.init(proxy.$refs.postCategoryChartsRef)
    const post: any = state.data.post
    const option = {
        ...Data.charts.common,
        title: {
            text: "帖子分类",
        },
        series: [
            {
                type: "pie",
                radius: ["16%", "64%"],
                ...Data.charts.label,
                ...Data.charts.item,
                data: post.categories,
            },
        ],
    }
    charts.setOption(option)
}
/**
 * 绑定用户新增趋势图表数据
 */
const bindUserNewsCharts = () => {
    const charts = echarts.init(proxy.$refs.userNewsChartsRef)
    const user: any = state.data.user
    const xData = user.news.map((item) => {
        return item.name
    })
    const yData = user.news.map((item) => {
        return item.value
    })
    const option = {
        ...Data.charts.common,
        title: {
            text: "用户新增趋势",
        },
        xAxis: {
            type: "category",
            data: xData,
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                type: "line",
                smooth: true,
                data: yData,
            },
        ],
    }
    charts.setOption(option)
}
/**
 * 绑定用户新增趋势图表数据
 */
const bindMatchNewsCharts = () => {
    const charts = echarts.init(proxy.$refs.matchNewsChartsRef)
    const match: any = state.data.match
    const xData = match.news.map((item) => {
        return item.name
    })
    const yData = match.news.map((item) => {
        return item.value
    })
    const option = {
        ...Data.charts.common,
        title: {
            text: "匹配新增趋势",
        },
        xAxis: {
            type: "category",
            data: xData,
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                type: "line",
                smooth: true,
                data: yData,
            },
        ],
    }
    charts.setOption(option)
}
/**
 * 绑定帖子新增趋势图表数据
 */
const bindPostNewsCharts = () => {
    const charts = echarts.init(proxy.$refs.postNewsChartsRef)
    const post: any = state.data.post
    const xData = post.news.map((item) => {
        return item.name
    })
    const yData = post.news.map((item) => {
        return item.value
    })
    const option = {
        ...Data.charts.common,
        title: {
            text: "帖子新增趋势",
        },
        xAxis: {
            type: "category",
            data: xData,
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                type: "line",
                smooth: true,
                data: yData,
            },
        ],
    }
    charts.setOption(option)
}
/**
 * 绑定反馈新增趋势图表数据
 */
const bindFeedbackNewsCharts = () => {
    const charts = echarts.init(proxy.$refs.feedbackNewsChartsRef)
    const feedback: any = state.data.feedback
    const xData = feedback.news.map((item) => {
        return item.name
    })
    const yData = feedback.news.map((item) => {
        return item.value
    })
    const option = {
        ...Data.charts.common,
        title: {
            text: "反馈新增趋势",
        },
        xAxis: {
            type: "category",
            data: xData,
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                type: "line",
                smooth: true,
                data: yData,
            },
        ],
    }
    charts.setOption(option)
}
</script>

<style scoped lang="scss">
.dashboard {
    height: 100%;

    .title {
        font-size: 18px;
        font-weight: 500;
    }

    .count-item {
        color: var(--color-white);

        &-title {
            font-size: 16px;
            font-weight: 500;

            &-num {
                font-size: 24px;
                font-weight: 700;
            }
        }

        &-tip {
            font-size: 10px;

            &-num {
                font-size: 20px;
                font-weight: 600;
            }
        }
    }

    .count-item.user {
        background: #f95959;
    }

    .count-item.match {
        background: #67c23a;
    }

    .count-item.post {
        background: #8595f4;
    }

    .count-item.feedback {
        background: #909399;
    }

    .charts-container {
        &-pie {
            width: 100%;
            height: 320px;
        }

        &-line {
            width: 100%;
            height: 320px;
        }
    }
}
</style>
