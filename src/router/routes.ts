import { RouteRecordRaw } from "vue-router";

/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink:true 2、链接地址不为空`
 *      isAffix：       是否固定在 tagsView 栏上
 *      isHide：        是否隐藏此路由
 *      isIframe：      是否内嵌窗口，，开启条件，`1、isIframe:true 2、链接地址不为空`
 *      isKeepAlive：   是否缓存组件状态
 *      auth：          当前路由权限标识（多个请用逗号隔开），最后转成数组格式，用于与当前用户权限进行对比，控制路由显示、隐藏
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`
 * }
 */

/**
 * 定义动态路由
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回动态路由菜单数据
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "/",
        component: () => import("@/layout/Index.vue"),
        redirect: { name: "dashboard" },
        meta: {
            title: "str.router.admin",
            isKeepAlive: true,
        },
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("@/views/admin/dashboard/Index.vue"),
                meta: {
                    title: "str.router.dashboard",
                    linkUrl: "",
                    isAffix: true,
                    isHide: false,
                    isIframe: false,
                    isKeepAlive: true,
                    auth: 600, // 权限级别
                    icon: "iconfont icon-index",
                },
            }, {
                path: "config",
                name: "config",
                component: () => import("@/layout/Index.vue"),
                meta: {
                    title: "str.router.config",
                    linkUrl: "",
                    isAffix: false,
                    isHide: false,
                    isIframe: false,
                    isKeepAlive: true,
                    auth: 600, // 权限级别
                    icon: "iconfont icon-file",
                },
                children: [
                    {
                        path: "configCategory",
                        name: "configCategory",
                        component: () => import("@/views/admin/config/Category.vue"),
                        meta: {
                            title: "str.router.configCategory",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "configSite",
                        name: "configSite",
                        component: () => import("@/views/admin/config/Config.vue"),
                        meta: {
                            title: "str.router.configSite",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "configProfession",
                        name: "configProfession",
                        component: () => import("@/views/admin/config/Profession.vue"),
                        meta: {
                            title: "str.router.configProfession",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "configRole",
                        name: "configRole",
                        component: () => import("@/views/admin/config/Role.vue"),
                        meta: {
                            title: "str.router.configRole",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "configVersion",
                        name: "configVersion",
                        component: () => import("@/views/admin/config/Version.vue"),
                        meta: {
                            title: "str.router.configVersion",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    },
                ],
            }, {
                path: "manager",
                name: "manager",
                component: () => import("@/layout/Index.vue"),
                meta: {
                    title: "str.router.manager",
                    linkUrl: "",
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: false,
                    isIframe: false,
                    auth: 600, // 权限级别
                    icon: "iconfont icon-control",
                },
                children: [
                    {
                        path: "managerApplet",
                        name: "managerApplet",
                        component: () => import("@/views/admin/manager/Applet.vue"),
                        meta: {
                            title: "str.router.managerApplet",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerAttachment",
                        name: "managerAttachment",
                        component: () => import("@/views/admin/manager/Attachment.vue"),
                        meta: {
                            title: "str.router.managerAttachment",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerBlacklist",
                        name: "managerBlacklist",
                        component: () => import("@/views/admin/manager/Blacklist.vue"),
                        meta: {
                            title: "str.router.managerBlacklist",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerClock",
                        name: "managerClock",
                        component: () => import("@/views/admin/manager/Clock.vue"),
                        meta: {
                            title: "str.router.managerClock",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerCode",
                        name: "managerCode",
                        component: () => import("@/views/admin/manager/Code.vue"),
                        meta: {
                            title: "str.router.managerCode",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerComment",
                        name: "managerComment",
                        component: () => import("@/views/admin/manager/Comment.vue"),
                        meta: {
                            title: "str.router.managerComment",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerCommodity",
                        name: "managerCommodity",
                        component: () => import("@/views/admin/manager/Commodity.vue"),
                        meta: {
                            title: "str.router.managerCommodity",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerFeedback",
                        name: "managerFeedback",
                        component: () => import("@/views/admin/manager/Feedback.vue"),
                        meta: {
                            title: "str.router.managerFeedback",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerGift",
                        name: "managerGift",
                        component: () => import("@/views/admin/manager/Gift.vue"),
                        meta: {
                            title: "str.router.managerGift",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerGiftRelation",
                        name: "managerGiftRelation",
                        component: () => import("@/views/admin/manager/GiftRelation.vue"),
                        meta: {
                            title: "str.router.managerGiftRelation",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerLike",
                        name: "managerLike",
                        component: () => import("@/views/admin/manager/Like.vue"),
                        meta: {
                            title: "str.router.managerLike",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerMatch",
                        name: "managerMatch",
                        component: () => import("@/views/admin/manager/Match.vue"),
                        meta: {
                            title: "str.router.managerMatch",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerNotice",
                        name: "managerNotice",
                        component: () => import("@/views/admin/manager/Notice.vue"),
                        meta: {
                            title: "str.router.managerNotice",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerOrder",
                        name: "managerOrder",
                        component: () => import("@/views/admin/manager/Order.vue"),
                        meta: {
                            title: "str.router.managerOrder",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerPost",
                        name: "managerPost",
                        component: () => import("@/views/admin/manager/Post.vue"),
                        meta: {
                            title: "str.router.managerPost",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerRelation",
                        name: "managerRelation",
                        component: () => import("@/views/admin/manager/Relation.vue"),
                        meta: {
                            title: "str.router.managerRelation",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerRoom",
                        name: "managerRoom",
                        component: () => import("@/views/admin/manager/Room.vue"),
                        meta: {
                            title: "str.router.managerRoom",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerScore",
                        name: "managerScore",
                        component: () => import("@/views/admin/manager/Score.vue"),
                        meta: {
                            title: "str.router.managerScore",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    }, {
                        path: "managerUser",
                        name: "managerUser",
                        component: () => import("@/views/admin/manager/User.vue"),
                        meta: {
                            title: "str.router.managerUser",
                            linkUrl: "",
                            isAffix: false,
                            isHide: false,
                            isIframe: false,
                            isKeepAlive: true,
                            auth: 600, // 权限级别
                        },
                    },
                ],
            }, {
                path: "personal",
                name: "personal",
                component: () => import("@/views/admin/info/Personal.vue"),
                meta: {
                    title: "str.router.personal",
                    linkUrl: "",
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: false,
                    isIframe: false,
                    auth: 600, // 权限级别
                    icon: "iconfont icon-my",
                },
            }, {
                path: "settings",
                name: "settings",
                component: () => import("@/views/admin/settings/Settings.vue"),
                meta: {
                    title: "str.router.settings",
                    linkUrl: "",
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: false,
                    isIframe: false,
                    auth: 600, // 权限级别
                    icon: "iconfont icon-settings",
                },
            },
        ],
    },
];

/**
 * 定义静态路由
 * @returns 返回静态路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
    {
        // 登录界面
        path: "/signIn",
        name: "signIn",
        component: () => import("@/views/sign/SignIn.vue"),
        meta: {
            title: "str.sign.signIn",
        },
    }, {
        // 404 界面
        path: "/404",
        name: "404",
        component: () => import("@/views/error/404.vue"),
        meta: {
            title: "404",
        },
    }, {
        // 401 界面
        path: "/401",
        name: "401",
        component: () => import("@/views/error/401.vue"),
        meta: {
            title: "401",
        },
    },
];
