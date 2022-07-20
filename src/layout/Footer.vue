<!-- 组件模板 -->
<template>
    <el-footer :class="[props.fixed ? 'footer fixed' : 'footer']">
        <!-- 链接 -->
        <div class="links" v-if="props.showLinks">
            <router-link to="/about" target="_blank">关于我们</router-link>
            <span class="decoration"> | </span>
            <router-link to="/agreement" target="_blank">用户协议</router-link>
            <span class="decoration"> | </span>
            <router-link to="/policy" target="_blank">隐私政策</router-link>
            <span class="decoration"> | </span>
            <router-link to="/norm" target="_blank">用户行为规范</router-link>
        </div>
        <!-- 提供支持 -->
        <div class="sponsor" v-if="props.showSponsor">
            <p>
                <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" target="_blank">由<img
                        class="logo" src="@/assets/images/logo-upyun.png" />提供CDN加速/云存储服务</a>
                <a href="https://storyset.com/nature" target="_blank">Nature illustrations by Storyset</a>
            </p>
        </div>
        <!-- copyright -->
        <div class="copyright" v-show="props.showCopyright">Copyright © 2022 VMLoft All Rights Reserved.</div>
        <!-- 备案信息 -->
        <div class="beian" v-show="props.showBeian">
            <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2022014860号-1</a>
        </div>
    </el-footer>
</template>

<!-- 脚本 -->
<script lang="ts" setup>
const props = defineProps({
    fixed: {
        type: Boolean,
        default: true,
    },
    showLinks: {
        type: Boolean,
        default: true,
    },
    showSponsor: {
        type: Boolean,
        default: true,
    },
    showCopyright: {
        type: Boolean,
        default: true,
    },
    showBeian: {
        type: Boolean,
        default: true,
    },
})
</script>

<!-- 样式 -->
<style scoped lang="scss">
/*底部*/
.footer.fixed {
    position: absolute;
    bottom: 0;
}

.footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 8px 0;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;

    a:link,
    a:visited {
        margin: 0 8px;
        color: rgba(0, 0, 0, 0.5);
        text-decoration: none;
    }

    a:hover {
        color: rgba(0, 0, 0, 0.7);
    }

    // 链接
    .links {
        display: inline-flex;
        margin-bottom: 8px;
        flex-wrap: wrap;
        justify-content: center;
        line-height: 1.6;

        .decoration {
            color: rgba(0, 0, 0, 0.2);
        }
    }

    // 支持
    .sponsor {
        color: rgba(0, 0, 0, 0.5);
        font-size: 12px;
        margin-top: 2px;
        font-weight: 500;

        p {
            line-height: 14px;
        }

        .logo {
            width: 50px;
            height: 25px;
            vertical-align: middle;
        }
    }

    // 版权信息
    .copyright {
        margin: 2px;
        font-weight: 500;
    }

    // 备案信息
    .beian {
        margin: 2px;
    }
}
</style>
