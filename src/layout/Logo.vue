<template>
    <div class="logo" v-if="isShowLogo" @click="onFoldMenu">
        <img src="@/assets/images/logo.png" class="logo-img" />
        <span>{{ $t("str.site.siteName") }}</span>
    </div>
    <div class="logo-fold" v-else @click="onFoldMenu">
        <img src="@/assets/images/logo.png" class="logo-fold-img" />
    </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance } from "vue"
import { useStore } from "@/store/index"

const { proxy } = getCurrentInstance() as any
const store = useStore()
// 设置 logo 的显示。classic 经典布局默认显示 logo
const isShowLogo = computed(() => {
    return !store.state.infos.theme.isFold
})
/**
 * 点击实现菜单展开/收起
 */
const onFoldMenu = () => {
    store.state.infos.theme.isFold = !store.state.infos.theme.isFold
}
</script>

<style scoped lang="scss">
.logo {
    width: 180px;
    height: 96px;
    display: flex;
    align-items: center;
    box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
    color: var(--color-primary);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    animation: logoAnimation 0.3s ease-in-out;

    &-img {
        width: 36px;
        margin-left: 20px;
        margin-right: 5px;
    }
}

.logo-fold {
    width: 100%;
    height: 96px;
    display: flex;
    cursor: pointer;
    animation: logoAnimation 0.3s ease-in-out;

    &-img {
        width: 36px;
        margin: auto;
    }

    &:hover {
        img {
            animation: logoAnimation 0.3s ease-in-out;
        }
    }
}
</style>
