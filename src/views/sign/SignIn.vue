<template>
    <div class="page">
        <div class="logo">
            <img src="@/assets/images/logo.png" />
            <span>{{ $t("str.site.siteName") }}</span>
        </div>
        <el-row>
            <el-col :xs="2" :sm="2" :md="2" :lg="4" :xl="4"> </el-col>
            <el-col :xs="0" :sm="10" :md="10" :lg="8" :xl="8" class="test-bg">
                <div class="sign-left-tips">
                    <img class="tips-cover" src="@/assets/images/img-site-stats.svg" />
                </div>
            </el-col>
            <el-col :xs="20" :sm="10" :md="10" :lg="8" :xl="8" class="test-bg">
                <div class="sign-right-form">
                    <span class="form-title">{{ $t("str.site.siteAdminTitle") }}</span>
                    <span class="form-desc">{{ $t("str.site.siteDesc") }}</span>
                    <!-- <span class="sign-title">{{ $t("str.sign.signIn") }}</span> -->
                    <Account />
                </div>
            </el-col>
            <el-col :xs="2" :sm="2" :md="2" :lg="4" :xl="4"> </el-col>
        </el-row>

        <!-- 底部 -->
        <Footer :fixed="true" :showLinks="false"></Footer>
    </div>
</template>

<script lang="ts" setup>
import { toRefs, reactive } from "vue"
import { useI18n } from "vue-i18n"

import Account from "@/views/sign/Account.vue"
import Footer from "@/layout/Footer.vue"

const { t } = useI18n()
</script>

<style scoped lang="scss">
.page {
    position: relative;

    .logo {
        display: flex;
        align-items: center;
        position: absolute;
        width: 50%;
        height: 96px;
        top: 32px;
        left: 64px;
        align-items: center;
        align-content: center;
        font-size: 18px;
        font-weight: 600;
        color: var(--color-);

        img {
            width: 64px;
            height: 64px;
        }
    }

    .sign-left-tips {
        height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 512px;
        margin: 0 auto;

        .tips-cover {
            width: 320px;
            height: 320px;
        }
    }

    .sign-right-form {
        height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 320px;
        margin: 0 auto;

        .form-title {
            font-size: 24px;
            font-weight: 500;
        }

        .form-desc {
            margin: 8px 0;
            font-size: 16px;
            margin-bottom: 16px;
        }
    }
}
</style>
