/**
 * 消息实体基类
 *
 * @class IMBMsg
 */
class IMBMsg {
    private _id: string; // 消息Id
    private _from: string; // 发送者
    private _to: string; // 接受者
    private _chatType: number; // 聊天类型 0-单聊 1-群聊 2-聊天室
    private _status: number; // 状态 0-发送中 1-发送成功 2-发送失败
    private _extend: { [key: string]: any }; // 扩展
    private _localId: string; // 前端生成的消息Id，由 时间戳+随机数 组成
    private _time: string; // 前端生成的消息Id，由 时间戳+随机数 组成

    /**
     * 构造函数
     * @param {*} params
     */
    constructor(params: any) {
        this._id = params.id
        this._from = params.from
        this._to = params.to
        this._chatType = params.chatType || 0
        this._status = params.status || 0
        this._extend = params.extend
        this._localId = params.localId
        this._time = params.time
    }

    public get id(): string {
        return this._id;
    }
    public set id(v: string) {
        this._id = v;
    }

    public get from(): string {
        return this._from;
    }
    public set from(v: string) {
        this._from = v;
    }

    public get to(): string {
        return this._to;
    }
    public set to(v: string) {
        this._to = v;
    }

    public get chatType(): number {
        return this._chatType;
    }
    public set chatType(v: number) {
        this._chatType = v;
    }

    public get status(): number {
        return this._status;
    }
    public set status(v: number) {
        this._status = v;
    }

    public get extend(): { [key: string]: any } {
        return this._extend;
    }
    public set extend(v: { [key: string]: any }) {
        this._extend = v;
    }

    public get localId(): string {
        return this._localId;
    }
    public set localId(v: string) {
        this._localId = v;
    }

    public get time(): string {
        return this._time;
    }
    public set time(v: string) {
        this._time = v;
    }

    /**
     * 将对象转为 json
     */
    public toJson() {
        const json = {} as any
        if (this._id) {
            json.id = this._id
        }
        if (this._from) {
            json.from = this._from
        }
        if (this._to) {
            json.to = this._to
        }
        json.chatType = this._chatType

        if (this._extend) {
            json.extend = this._extend
        }
        if (this._localId) {
            json.localId = this._localId
        }
        if (this._time) {
            json.time = this._time
        }
        return json
    }
}

export default IMBMsg