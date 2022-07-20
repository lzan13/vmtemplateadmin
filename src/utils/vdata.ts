/**
 * 常用数据
 */
import { i18n } from "@/i18n/index";

export const Data = {
    // 图标通用数据
    charts: {
        common: {
            color: [
                "#f56c6c",
                "#409eff",
                "#91cc75",
                "#fac858",
                "#ee6666",
                "#73c0de",
                "#3ba272",
                "#fc8452",
                "#9a60b4",
                "#ea7ccc",
            ],
            legend: {
                top: "5%",
                left: "center",
            },
            title: {
                show: true,
                text: "测试标题",
            },
            tooltip: {
                show: true,
                trigger: "axis",
            },
        },
        label: {
            label: {
                show: true,
                fontSize: "14",
                formatter: "{b}:{c}",
                position: "outside",
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: "16",
                    fontWeight: "bold",
                },
            },
            labelLine: {
                show: true,
            },
        },
        item: {
            itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
            },
        },
    },
    // 选择数据
    selectData: {
        appletTypes: [
            { id: 0, value: i18n.global.t("str.applet.type.h5") },
            { id: 1, value: i18n.global.t("str.applet.type.app") },
            { id: 2, value: i18n.global.t("str.applet.type.game") },
        ],
        commodityStatus: [
            { id: 0, value: i18n.global.t("str.commodity.status.wait") },
            { id: 1, value: i18n.global.t("str.commodity.status.sale") },
            { id: 2, value: i18n.global.t("str.commodity.status.offShelf") },
            { id: 3, value: i18n.global.t("str.commodity.status.sellout") },
        ],
        commodityTypes: [
            { id: 0, value: i18n.global.t("str.commodity.type.goldRecharge") },
            { id: 1, value: i18n.global.t("str.commodity.type.vipRecharge") },
            { id: 2, value: i18n.global.t("str.commodity.type.normal") },
        ],
        emotions: [
            { id: 0, value: i18n.global.t("str.emotion.happy") },
            { id: 1, value: i18n.global.t("str.emotion.normal") },
            { id: 2, value: i18n.global.t("str.emotion.sad") },
            { id: 3, value: i18n.global.t("str.emotion.anger") },
        ],
        feedbackStatus: [
            { id: 0, value: i18n.global.t("str.feedback.status.wait") },
            { id: 1, value: i18n.global.t("str.feedback.status.processing") },
            { id: 2, value: i18n.global.t("str.feedback.status.complete") },
        ],
        feedbackTypes: [
            { id: 0, value: i18n.global.t("str.feedback.type.opinion") },
            { id: 1, value: i18n.global.t("str.feedback.type.ads") },
            { id: 2, value: i18n.global.t("str.feedback.type.sensitivity") },
            { id: 3, value: i18n.global.t("str.feedback.type.illegal") },
            { id: 4, value: i18n.global.t("str.feedback.type.pornVulgar") },
            { id: 5, value: i18n.global.t("str.feedback.type.violence") },
            { id: 6, value: i18n.global.t("str.feedback.type.guide") },
            { id: 7, value: i18n.global.t("str.feedback.type.uncivilized") },
            { id: 8, value: i18n.global.t("str.feedback.type.uncomfortable") },
            { id: 9, value: i18n.global.t("str.feedback.type.fraud") },
            { id: 10, value: i18n.global.t("str.feedback.type.other") },
        ],
        genders: [
            { id: 0, value: i18n.global.t("str.info.genderWoman") },
            { id: 1, value: i18n.global.t("str.info.genderMan") },
            { id: 2, value: i18n.global.t("str.info.genderOther") },
        ],
        giftStatus: [
            { id: 0, value: i18n.global.t("str.gift.status.wait") },
            { id: 1, value: i18n.global.t("str.gift.status.sale") },
            { id: 2, value: i18n.global.t("str.gift.status.offShelf") },
        ],
        giftTypes: [
            { id: 0, value: i18n.global.t("str.gift.type.ordinary") },
            { id: 1, value: i18n.global.t("str.gift.type.especial") },
        ],
        orders: [
            { id: 0, value: i18n.global.t("str.order.wait") },
            { id: 1, value: i18n.global.t("str.order.paid") },
            { id: 2, value: i18n.global.t("str.order.closed") },
            { id: 3, value: i18n.global.t("str.order.error") },
        ],
        platforms: [
            { id: 0, value: "Android" },
            { id: 1, value: "iOS" },
            { id: 2, value: "Mac" },
            { id: 3, value: "Windows" },
        ],
        relations: [
            { id: 0, value: "A->B" },
            { id: 1, value: "A<-B" },
            { id: 2, value: "A<->B" },
        ],
        status: [
            { id: 0, value: i18n.global.t("str.status.pass") },
            { id: 1, value: i18n.global.t("str.status.wait") },
            { id: 2, value: i18n.global.t("str.status.reject") },
        ],
    },
};

/**
 * 包装商品状态 0-待上架 1-上架中 2-已下架 3-售罄
 */
export function wrapCommodityStatus(status: number) {
    if (status == 0) {
        return i18n.global.t("str.commodity.status.wait");
    } else if (status == 1) {
        return i18n.global.t("str.commodity.status.sale");
    } else if (status == 2) {
        return i18n.global.t("str.commodity.status.offShelf");
    } else if (status == 3) {
        return i18n.global.t("str.commodity.status.sellout");
    } else {
        return i18n.global.t("str.commodity.status.wait");
    }
}

/**
 * 包装商品类型 0-金币充值 1-会员充值 2-普通商品
 */
export function wrapCommodityType(type: number) {
    if (type == 0) {
        return i18n.global.t("str.commodity.type.goldRecharge");
    } else if (type == 1) {
        return i18n.global.t("str.commodity.type.vipRecharge");
    } else if (type == 2) {
        return i18n.global.t("str.commodity.type.normal");
    } else {
        return i18n.global.t("str.commodity.type.normal");
    }
}

/**
 * 包装心情 0-开心 1-平淡 2-难过 3-愤怒
 */
export function wrapEmotion(emotion: number) {
    if (emotion == 0) {
        return i18n.global.t("str.emotion.happy");
    } else if (emotion == 1) {
        return i18n.global.t("str.emotion.normal");
    } else if (emotion == 2) {
        return i18n.global.t("str.emotion.sad");
    } else if (emotion == 3) {
        return i18n.global.t("str.emotion.anger");
    } else {
        return i18n.global.t("str.emotion.normal");
    }
}

/**
 * 包装反馈处理状态 0-待处理 1-处理中 2-处理完成
 */
export function wrapFeedbackStatus(status: number) {
    if (status == 0) {
        return i18n.global.t("str.feedback.status.wait");
    } else if (status == 1) {
        return i18n.global.t("str.feedback.status.processing");
    } else if (status == 2) {
        return i18n.global.t("str.feedback.status.complete");
    } else {
        return i18n.global.t("str.feedback.status.wait");
    }
}
/**
 * 包装反馈类型 0-意见建议 1-广告引流 2-政治敏感 3-违法违规 4-色情低俗 5-血腥暴力 6-诱导信息 7-谩骂攻击 8-涉嫌诈骗 9-引人不适 10-其他
 */
export function wrapFeedbackType(type: number) {
    if (type == 0) {
        return i18n.global.t("str.feedback.type.opinion");
    } else if (type == 1) {
        return i18n.global.t("str.feedback.type.ads");
    } else if (type == 2) {
        return i18n.global.t("str.feedback.type.sensitivity");
    } else if (type == 3) {
        return i18n.global.t("str.feedback.type.illegal");
    } else if (type == 4) {
        return i18n.global.t("str.feedback.type.pornVulgar");
    } else if (type == 5) {
        return i18n.global.t("str.feedback.type.violence");
    } else if (type == 6) {
        return i18n.global.t("str.feedback.type.guide");
    } else if (type == 7) {
        return i18n.global.t("str.feedback.type.uncivilized");
    } else if (type == 8) {
        return i18n.global.t("str.feedback.type.uncomfortable");
    } else if (type == 9) {
        return i18n.global.t("str.feedback.type.fraud");
    } else {
        return i18n.global.t("str.feedback.type.other");
    }
}

/**
 * 包装用户性别 0-女，1-男，2-神秘
 */
export function wrapGender(gender: number) {
    if (gender == 0) {
        return i18n.global.t("str.info.genderWoman");
    } else if (gender == 1) {
        return i18n.global.t("str.info.genderMan");
    } else {
        return i18n.global.t("str.info.genderOther");
    }
}

/**
 * 包装订单状态 0-待支付 1-支付成功 2-已关闭
 */
export function wrapOrder(gender: number) {
    if (gender == 0) {
        return i18n.global.t("str.order.wait");
    } else if (gender == 1) {
        return i18n.global.t("str.order.paid");
    } else if (gender == 2) {
        return i18n.global.t("str.order.closed");
    } else {
        return i18n.global.t("str.order.error");
    }
}

/**
 * 包装平台名 0-Android 1-iOS 2-Mac 3-PC
 */
export function wrapPlatform(value) {
    if (value == 0) {
        return "Android";
    } else if (value == 1) {
        return "iOS";
    } else if (value == 2) {
        return "Mac";
    } else if (value == 3) {
        return "Windows";
    } else {
        return "Other";
    }
}

/**
 * 包装关注关系 0-A->B，1-B->A，2-A<->B
 */
export function wrapRelation(status: number) {
    if (status == 0) {
        return "A->B";
    } else if (status == 1) {
        return "A<-B";
    } else if (status == 2) {
        return "A<->B";
    } else {
        return "A-B";
    }
}

/**
 * 包装内容审核状态 0-通过 1-待审核 2-拒绝
 */
export function wrapContentStatus(status: number) {
    if (status == 0) {
        return i18n.global.t("str.status.pass");
    } else if (status == 1) {
        return i18n.global.t("str.status.wait");
    } else if (status == 2) {
        return i18n.global.t("str.status.reject");
    } else {
        return i18n.global.t("str.status.wait");
    }
}
