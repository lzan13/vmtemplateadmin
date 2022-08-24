<template>
    <div class="container">
        <div class="chat">
            <el-input class="chat-message" v-model="state.content" placeholder="请输入内容" />
            <el-input class="chat-user" v-model="state.otherUser.id" placeholder="请输入内容" />
        </div>

        <div>
            <el-button @click="connect">建立链接</el-button>
            <el-button @click="disconnect">断开链接</el-button>
        </div>

        <div>
            <el-button @click="sendMsg">发送消息</el-button>
            <el-button @click="sendSignal">发送信令</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import WSManager from '@/network/socket/WSManager';

import { useStore } from "@/store/index"
import IMMessage from '@/bean/IMMessage';
import IMSignal from '@/bean/IMSignal';

const ws = WSManager.getInstance()

const store = useStore()

const state = reactive({
    chatList: [],
    content: "hello world!",
    selfUser: {} as any,
    otherUser: {} as any
})

onMounted(() => {
    initData()
})

function initData() {
    state.selfUser = store.state.infos.user
}

/**建立链接 */
const connect = () => {
    ws.connect(state.selfUser)
}

/**断开链接 */
const disconnect = () => {
    ws.disconnect()
}

/**发送消息 */
const sendMsg = () => {
    const msg = new IMMessage({
        from: state.selfUser._id,
        to: state.otherUser.id,
        body: state.content,
        localId: Date.now() + Math.random()
    })
    ws.sendMsg(msg)
    // 重置输入框
    // state.content = '';
};
/**发送信令 */
const sendSignal = () => {
    const signal = new IMSignal({
        from: state.selfUser._id,
        to: state.otherUser.id,
        action: "onlineStatus",
        extend: "{ \"status\": 0 }",
        localId: (Date.now() *1000).toString
    })
    ws.sendSignal(signal)
};

</script>

<style lang="scss" scoped>
</style>
