/**
 * 定义通用中文资源
 */
export default {
    // 路由相关
    router: {
        home: "首页",
        admin: "管理",
        dashboard: "仪表盘",

        config: "配置信息",
        configSite: "站点配置",
        configCategory: "分类管理",
        configProfession: "职业管理",
        configRole: "角色管理",
        configVersion: "版本配置",

        manager: "内容管理",
        managerApplet: "程序列表",
        managerAttachment: "附件列表",
        managerBlacklist: "黑名单列表",
        managerClock: "签到记录",
        managerCode: "验证码",
        managerComment: "评论管理",
        managerCommodity: "商品管理",
        managerFeedback: "反馈管理",
        managerRelation: "用户关系",
        managerGift: "礼物列表",
        managerGiftRelation: "礼物记录",
        managerLike: "喜欢列表",
        managerMatch: "匹配信息",
        managerNotice: "通知列表",
        managerOrder: "订单列表",
        managerPost: "帖子列表",
        managerRoom: "房间列表",
        managerScore: "积分变动",
        managerUser: "用户信息",

        personal: "个人中心",
        settings: "系统设置",

        userAgreement: "用户协议",
        privacyPolicy: "隐私政策",
        userNorm: "用户行为规范",

        search: "搜索",
        searchHint: "搜索路由：支持中文、路由路径",

        noAccess: "当前账户无权访问",
        noAccessDesc: "你可以尝试联系管理员获取相应权限，或登录管理员账户",
        goAuth: "去重新认证",

        notFound: "地址错误，请重新输入地址~",
        notFoundDesc: "你可以先检查网址，然后重新输入或给我们反馈问题。",
        goHome: "去首页",
    },
    // 主题配置
    theme: {
        configTitle: "主题配置",
        reset: "重置设置",

        isFixedHeader: "固定头部",
        isFixedFooter: "固定底部",
        isShowFooter: "显示底部",
        isAccordion: "菜单手风琴效果",
        isShowLogo: "显示 Logo",
        isShowTags: "显示标签",
        isCacheTags: "标签缓存",
        isDragTags: "标签拖拽",
        isShareTags: "标签共用",
        isDark: "黑色模式",
        isGrayscale: "灰色模式",
        isWartermark: "水印效果",
        wartermarkText: "水印文案",
        transitionName: "内容切换动画",
    },
    // 标签相关
    tags: {
        refresh: "刷新",
        close: "关闭",
        closeOther: "关闭其他",
        closeAll: "关闭全部",
    },
    // 通知提醒
    notice: {
        title: "通知提醒",
        allRead: "全部已读",
        goNotice: "前往通知中心",
        empty: "暂无通知",
    },
    // 网络相关
    request: {
        noNetWork: "网络好像有点儿问题，稍等下再试试吧~",
        timeout: "请求超时了，稍等下再试试吧~",
        apiNotFound: "接口不存在呢~",
    },
    // 常用按钮
    btn: {
        add: "添加",
        cancel: "取消",
        complete: "完成",
        delete: "删除",
        dispose: "安排",
        iknown: "我知道了",
        ok: "确定",
        save: "保存",
        codeBtn: "请求验证码",
    },
    // 提醒相关
    tips: {
        clickPreview: "点击预览",

        addSuccess: "添加成功",

        codeWait: "秒后重新获取",

        commonTitle: "温馨提示",
        delMsg: "删除后将无法恢复，请谨慎操作！",
        delSuccess: "删除成功",

        signInvalid: "认证信息已失效，请重新登录认证",

        inputHint: "请输入~",
        inputNull: "输入内容不能为空~",
        inputLengthLimit: "输入内容长度限制: ",

        selectNull: "选择项不能为空~",
        selectHint: "请选择~",

        requestSuccess: "请求成功",
        updateSuccess: "更新成功",
    },
    // 系统信息
    site: {
        siteName: "忘忧大陆",
        siteIndexTitle: "忘忧大陆-修仙一样交友",
        siteAdminTitle: "忘忧大陆管理系统",
        siteDesc: "登录你的个人管理账户开始使用",
        copyright: "Copyright © 2021 VMLoft All Rights Reserved.",
        beian: "粤ICP备14080761号-1",
    },
    // 小程序相关
    applet: {
        type: {
            h5: "H5网页",
            app: "小应用",
            game: "小游戏",
        }
    },
    // 商品
    commodity: {
        // 商品状态 0-待上架 1-上架中 2-已下架 3-售罄
        status: {
            wait: "待上架",
            sale: "上架中",
            offShelf: "已下架",
            sellout: "售罄",
        },
        // 商品类型 商品类型 0-金币充值 1-开通/续费会员 2-普通商品
        type: {
            goldRecharge: "金币充值",
            vipRecharge: "开通会员",
            normal: "普通商品",
        },
    },
    // 匹配时心情 0-开心 1-平淡 2-难过 3-愤怒
    emotion: {
        happy: "开心",
        normal: "平淡",
        sad: "难过",
        anger: "愤怒",
    },
    // 反馈
    feedback: {
        // 处理状态 0-待处理 1-处理中 2-处理完成
        status: {
            wait: "待处理",
            processing: "处理中",
            complete: "已完成",
        },
        // 反馈类型 0-意见建议 1-广告引流 2-政治敏感 3-违法违规 4-色情低俗 5-血腥暴力 6-诱导信息 7-谩骂攻击 8-涉嫌诈骗 9-引人不适 10-其他
        type: {
            opinion: "意见建议",
            ads: "广告引流",
            sensitivity: "政治敏感",
            illegal: "违法违规",
            pornVulgar: "色情低俗",
            violence: "血腥暴力",
            guide: "诱导信息",
            uncivilized: "谩骂攻击",
            fraud: "涉嫌诈骗",
            uncomfortable: "引人不适",
            other: "其它",
        },
    },
    // 礼物
    gift: {
        status: {
            wait: "待上架",
            sale: "上架中",
            offShelf: "已下架",
        },
        type: {
            ordinary: "普通礼物",
            especial: "特效礼物"
        }
    },
    // 订单处理
    order: {
        wait: "待支付",
        paid: "已支付",
        closed: "已关闭",
        error: "支付出错",
    },

    // 审核状态
    status: {
        pass: "通过",
        wait: "等待",
        reject: "拒绝",
    },
    // 积分变动
    score: {
        type: {
            free: "系统赠送",
            recharge: "充值",
            consume: "消费",
        }
    },
};
