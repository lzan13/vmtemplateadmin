import { defineConfig, loadEnv } from "vite"
import { resolve } from "path"

import pluginVue from "@vitejs/plugin-vue"
// html插件
import { createHtmlPlugin } from "vite-plugin-html"
// ElementPlus 自动按需加载插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { env } from "process"


/**
 * Vite 配置参考 https://vitejs.dev/config/
 */
export default ({ mode }) => {
    const envDir = process.cwd() + "/config/"
    const env = loadEnv(mode, envDir, "vmVite")
    process.env = { ...process.env, ...env };

    console.log(env)

    // 跨域代理设置
    const proxy = {
        '/api': {
            target: process.env.vmViteApiHost, // 实际请求接口地址
            changeOrigin: true, // 是否跨域
            secure: Boolean(process.env.vmViteSSL), // 是否https接口
            ws: false, // 是否代理 WebSockets
            rewrite: (path) => path.replace(/^\/api/, "")
        },
    }

    // console.log(process.env)
    const vuePlugin = pluginVue()
    /**配置 html 插件 */
    const htmlPlugin = createHtmlPlugin({
        minify: true,
        /**
         * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
         * @default src/main.ts
         */
        // entry: './src/main.ts',
        /**
         * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
         * @default index.html
         */
        // template: './index.html',

        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
            data: {
                description: process.env.vmViteDescription,
                keywords: process.env.vmViteKeywords,
                title: process.env.vmViteTitle,
            },
        },
    });

    return defineConfig({
        // 静态资源基础路径 base: './' || '',
        base: process.env.vmVitePath,
        envDir: "config", // 环境变量目录
        envPrefix: "vmVite", // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
        optimizeDeps: {
            include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en'],
        },
        plugins: [
            vuePlugin,
            htmlPlugin,
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        resolve: {
            alias: { // 路径别名
                "@": resolve(__dirname, "src"),
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
            },
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"] // 导入时想要省略的扩展名列表
        },
        server: {
            port: Number(process.env.vmVitePort) || 9527, // 端口号
            https: Boolean(process.env.vmViteSSL), // 是否启用 TLS + HTTP/2
            open: Boolean(process.env.vmViteOpen), // 是否在开发服务器启动时自动在浏览器中打开应用程序
            proxy
        },
        build: {
            outDir: 'dist',
            minify: 'esbuild',
            sourcemap: false,
            chunkSizeWarningLimit: 1500,
        },
        define: {
            __VUE_I18N_LEGACY_API__: JSON.stringify(false),
            __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
            __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
        },
    })
}

