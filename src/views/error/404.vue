<template>
    <div class="error">
        <div class="error-flex">
            <div class="left">
                <div class="left-item">
                    <!-- <div class="left-item-animation left-item-num">404</div> -->
                    <div class="left-item-animation left-item-title">{{ $t("str.router.notFound") }}</div>
                    <div class="left-item-animation left-item-msg">{{ $t("str.router.notFoundDesc") }}</div>
                    <div class="left-item-animation left-item-btn">
                        <el-button type="primary" round @click="goHome">{{ $t("str.router.goHome") }}</el-button>
                    </div>
                </div>
            </div>
            <div class="right">
                <img src="@/assets/images/img-error-404.svg" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"

const router = useRouter()
const goHome = () => {
    router.push("/")
}
</script>

<style scoped lang="scss">
.error {
    height: 100%;
    background-color: var(--el-color-white);
    display: flex;

    .error-flex {
        margin: auto;
        display: flex;
        height: 350px;
        width: 900px;
        padding: 32px;

        .left {
            flex: 1;
            height: 100%;
            align-items: center;
            display: flex;

            &-item {
                &-animation {
                    opacity: 0;
                    animation-name: error-num;
                    animation-duration: 0.5s;
                    animation-fill-mode: forwards;
                }

                &-num {
                    color: var(--tips);
                    font-size: 64px;
                    font-weight: 600;
                }

                &-title {
                    font-size: 20px;
                    color: var(--body);
                    margin: 15px 0 5px 0;
                    animation-delay: 0.1s;
                }

                &-msg {
                    color: var(--tips);
                    font-size: 13px;
                    margin-bottom: 30px;
                    animation-delay: 0.2s;
                }

                &-btn {
                    animation-delay: 0.2s;
                }
            }
        }

        .right {
            flex: 1;
            opacity: 0;
            animation-name: error-img;
            animation-duration: 2s;
            animation-fill-mode: forwards;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
