import io, { Socket } from 'socket.io-client';

import IMMessage from '@/bean/IMMessage';
import IMSignal from '@/bean/IMSignal';

// 处理消息体
const handleMessage = message => {
    // 在入口处直接添加isMyself
    // message.isMyself = store.getters.userId === message.fromId;
};

class WSManager {

    // 单例对象
    private static instance: WSManager;
    // socket 实例
    private _socket: Socket;

    /**获取单例对象实例 */
    static getInstance(): WSManager {
        if (!this.instance) {
            return this.instance = new WSManager();
        }
        return this.instance;
    }

    /**私有构造 */
    private constructor() { }


    /**初始化 socket */
    public initSocket(user) {
        this._socket = io(import.meta.env.vmViteWSHost, {
            authConnect: false, // 是否自动链接，false 情况需要主动调用 socket.connect()
            query: { token: user.token, userId: user._id }, // 这里带上 userId 方便后端知道链接属于谁
            path: "/im", // socket 路径 需要和后端对应
            transports: ["websocket"]
        });
        /**链接监听 */
        this._socket.on('connect', () => {
            console.log('-lz-socket connect');
        });
        this._socket.on('disconnect', () => {
            console.log('-lz-socket disconnect');
        });
        /**监听新消息 */
        this._socket.on('message', data => {
            console.log('-lz-new msg ' + JSON.stringify(data))
        });
        /**监听信令消息 */
        this._socket.on('signal', data => {
            console.log('-lz-new signal ' + JSON.stringify(data))
        });
    }
    /**建立链接 */
    public connect(user) {
        if (!this._socket) {
            this.initSocket(user);
        }
        this._socket.connect();
    }
    /**断开链接 */
    public disconnect() {
        if (this._socket) {
            this._socket.disconnect();
        }
    }

    /**发送消息包 */
    public sendMsg(message: IMMessage) {
        this._socket.emit('message', JSON.stringify(message.toJson()), (code, obj) => {
            console.log(`${code}-${obj}`)
        });
    }
    /**发送信令包 */
    public sendSignal(signal: IMSignal) {
        this._socket.emit('signal', JSON.stringify(signal.toJson()), (code, obj) => {
            console.log(`${code}-${obj}`)
        });
    }
};

export default WSManager;