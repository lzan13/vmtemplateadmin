import { Module } from "vuex";
import { RoutesState, RootStateTypes } from "@/store/interface/index";

/**
 * 定义路由信息配置
 */
const routesModule: Module<RoutesState, RootStateTypes> = {
    namespaced: true,
    state: {
        routesList: [],
        tagRoutesList: [],
        keepAliveList: [],
    },
    mutations: {
        // 设置路由列表
        setRoutesList(state: any, data: Array<object>) {
            state.routesList = data;
        },
        // 设置 tags 路由列表
        setTagRoutesList(state: any, data: Array<object>) {
            state.tagRoutesList = data;
        },
        // 设置路由缓存列表
        setKeepAliveList(state: any, data: Array<object>) {
            state.keepAliveList = data;
        },
    },
    actions: {
        // 设置路由列表
        async setRoutesList({ commit }, data: Array<object>) {
            commit("setRoutesList", data);
        },
        // 设置 tags 路由列表
        async setTagRoutesList({ commit }, data: Array<object>) {
            commit("setTagRoutesList", data);
        },
        // 设置路由缓存列表
        async setKeepAliveList({ commit }, data: Array<object>) {
            commit("setKeepAliveList", data);
        },
    },
};

export default routesModule;
