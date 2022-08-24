import IMBMsg from "./IMBMsg";

/**
 * 普通消息实体类
 *
 * @class IMMessage
 */
class IMMessage extends IMBMsg {
    private _type: number; // 类型 0-文本 1-系统 2-卡片 3-图片 4-语音 5-视频 6-礼物 7-表情 
    private _body: string; // 内容
    private _attachments: Array<any | string>; // 附件

    /**
     * 构造函数
     * @param {*} params
     */
    constructor(params: any) {
        super(params)
        this._type = params.type || 0
        this._body = params.body
        this._attachments = params.attachments
    }

    public get type(): number {
        return this._type;
    }
    public set type(v: number) {
        this._type = v;
    }

    public get body(): string {
        return this._body;
    }
    public set body(v: string) {
        this._body = v;
    }

    public get attachments(): Array<any | string> {
        return this._attachments;
    }
    public set attachments(v: Array<any | string>) {
        this._attachments = v;
    }

    /**
     * 将对象转为 json
     */
    public toJson() {
        const json = super.toJson()
        json.type = this._type
        if (this._body) {
            json.body = this._body
        }
        if (this._attachments) {
            json.attachments = this._attachments
        }
        return json
    }
}

export default IMMessage