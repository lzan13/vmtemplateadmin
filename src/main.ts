import { createApp } from "vue"
import App from "./App.vue"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import "@/assets/styles/element-variables.scss"

// 包装 mitt 事件总线
import mitt from "mitt";

import { i18n } from "@/i18n/index"
import router from "@/router/index"
import { store, key } from "@/store/index"

const app = createApp(App)

app.use(ElementPlus)
app.use(i18n)
app.use(store, key)
app.use(router)

app.config.globalProperties.vbus = mitt()

app.mount("#app")
