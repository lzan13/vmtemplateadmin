/**
 * 类型声明，生命 Vuex 内存字段
 */

/**
 * 主题相关
 */
export interface ThemesState {
  // 布局界面控制
  // 是否开启固定 Header 与 Footer
  isFixedHeader: boolean;
  isShowFooter: boolean;

  isFold: boolean;
  // 是否开启菜单手风琴效果
  isAccordion: boolean;

  // 是否开启侧边栏 Logo
  isShowLogo: boolean;
  // 是否开启 Tagsview
  isShowTags: boolean;

  // 是否开启 Tags 缓存
  isCacheTags: boolean;

  // 是否开启深色模式
  isDark: boolean;
  // 是否开启灰色模式
  isGrayscale: boolean;
  // 是否开启水印
  isWartermark: boolean;
  // 水印文案
  wartermarkText: string;

  // 内容页面切换动画：可选值"<slide-right|slide-left|opacitys>"，默认 slide-right
  transitionName: string;

  // 默认初始语言，可选值"<zh-cn|en>"，默认 zh-cn
  language: string;
}

// 路由信息
export interface RoutesState {
  // 普通路由列表
  routesList: Array<object>;
  // 标签路由列表
  tagRoutesList: Array<object>;
  // 缓存路由集合
  keepAliveList: Array<string>;
}

// 信息
export interface InfosState {
  theme: ThemesState;
  // 用户信息
  user: object;
  // 分类信息
  categorys: Array<object>;
  // 职业信息
  professions: Array<object>;
  // 角色信息
  roles: Array<object>;
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
  infos: InfosState;
  routes: RoutesState;
}
