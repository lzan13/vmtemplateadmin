import { Module } from "vuex";
import { Session } from "@/utils/vstorage";
import { InfosState, RootStateTypes } from "@/store/interface/index";

/**
 * 定义信息处理配置
 */
const infosModule: Module<InfosState, RootStateTypes> = {
    namespaced: true,
    state: {
        theme: {
            // 布局界面控制
            // 是否开启固定 Header 与 Footer
            isFixedHeader: true,
            isShowFooter: false,

            // 是否折叠菜单
            isFold: false,
            // 是否开启菜单手风琴效果
            isAccordion: true,

            // 是否开启侧边栏 Logo
            isShowLogo: true,
            // 是否开启 Tags
            isShowTags: true,
            // 是否开启 Tags 缓存
            isCacheTags: false,

            // 是否开启深色模式
            isDark: false,
            // 是否开启灰色模式
            isGrayscale: false,
            // 是否开启水印
            isWartermark: false,
            // 水印文案
            wartermarkText: "@lzan13",

            // 内容页面切换动画：可选值"<slide-right|slide-left|opacitys>"，默认 slide-right
            transitionName: "slide-right",

            // 默认初始语言，可选值"<zh-cn|en>"，默认 zh-cn
            language: "zh-cn",
        },
        user: {},
        categorys: Array(),
        professions: Array(),
        roles: Array(),
    },
    mutations: {
        // 设置主题信息
        setTheme(state: any, data: object) {
            state.theme = data;
        },
        // 设置用户信息
        setUser(state: any, data: object) {
            state.user = data;
        },
        // 设置分类信息
        setCategorys(state: any, data: Array<object>) {
            state.categorys = data;
        },
        // 设置职业信息
        setProfessions(state: any, data: Array<object>) {
            state.professions = data;
        },
        // 设置角色信息
        setRoles(state: any, data: Array<object>) {
            state.roles = data;
        },
    },
    actions: {
        // 设置主题信息
        async setTheme({ commit }, data: object) {
            commit("setTheme", data);
        },
        // 设置用户信息
        async setUser({ commit }, data: object) {
            if (data) {
                commit("setUser", data);
            } else {
                if (Session.get("user")) commit("setUser", Session.get("user"));
            }
        },
        // 设置分类信息
        async setCategorys({ commit }, data: Array<object>) {
            commit("setCategorys", data);
        },
        // 设置职业信息
        async setProfessions({ commit }, data: Array<object>) {
            commit("setProfessions", data);
        },
        // 设置角色信息
        async setRoles({ commit }, data: Array<object>) {
            commit("setRoles", data);
        },
    },
};

export default infosModule;
