/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

interface ImportMetaEnv {
    // 定义环境变量字段
    readonly vmViteDescription: string
    readonly vmViteKeywords: string
    readonly vmViteTitle: string
    readonly vmVitePort: number
    readonly vmVitePath: string
    readonly vmViteSSL: boolean
    readonly vmViteOpen: boolean
    readonly vmViteApiHost: string
    readonly vmViteEnv: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}